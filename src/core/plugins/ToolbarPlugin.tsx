import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $getNodeByKey,
  FORMAT_ELEMENT_COMMAND,
  LexicalEditor,
  $getRoot,
  EditorState,
  $setSelection,
} from "lexical";
import { $generateHtmlFromNodes } from "@lexical/html";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $wrapNodes, $isAtNodeEnd } from "@lexical/selection";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode,
} from "@lexical/list";
import { createPortal } from "react-dom";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
} from "@lexical/rich-text";
import {
  $createCodeNode,
  $isCodeNode,
  getDefaultCodeLanguage,
  getCodeLanguages,
} from "@lexical/code";
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $patchStyleText,
  $setBlocksType,
} from "@lexical/selection";
import icon_bold from "../../assets/photos/editor/bold.svg";
import icon_italic from "../../assets/photos/editor/italic.svg";
import icon_underline from "../../assets/photos/editor/underline.svg";
import icon_left from "../../assets/photos/editor/left.svg";
import icon_center from "../../assets/photos/editor/center.svg";
import icon_layout from "../../assets/photos/editor/layout.svg";
import icon_paragrph from "../../assets/photos/editor/paragrph.svg";
import icon_link from "../../assets/photos/editor/link.svg";
import icon_image from "../../assets/photos/editor/photo.svg";
import icon_smile from "../../assets/photos/editor/happy.svg";
import icon_add from "../../assets/photos/editor/plus.svg";
import icon_delete from "../../assets/photos/editor/delete.svg";
import ImageToolbar from "./ImageToolbar";
import { InsertImageDialog } from "./ImagesPlugin";
import { ImagePayload } from "../editor/nodes/ImageNode";
import FileInput from "../editor/ui/FileInput";
import TextInput from "../editor/ui/TextInput";
import Button from "../editor/ui/Button";
import { DialogActions } from "../editor/ui/Dialog";

import DropDown, { DropDownItem } from "../editor/ui/DropDown";
import "./../editor/ui/default.css";
import { $generateNodesFromDOM } from "@lexical/html";
import e from "express";

export type InsertImagePayload = Readonly<ImagePayload>;
const LowPriority = 1;

const supportedBlockTypes = new Set([
  "paragraph",
  "quote",
  "code",
  "h1",
  "h2",
  "ul",
  "ol",
]);

const FONT_FAMILY_OPTIONS: [string, string][] = [
  ["Arial", "Arial"],
  ["Courier New", "Courier New"],
  ["Georgia", "Georgia"],
  ["Times New Roman", "Times New Roman"],
  ["Trebuchet MS", "Trebuchet MS"],
  ["Verdana", "Verdana"],
];

const blockTypeToBlockName: any = {
  code: "Code Block",
  h1: "Large Heading",
  h2: "Small Heading",
  h3: "Heading",
  h4: "Heading",
  h5: "Heading",
  ol: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
  ul: "Bulleted List",
};

function Divider() {
  return <div className="divider" />;
}

function dropDownActiveClass(active: boolean) {
  if (active) return "active dropdown-item-active";
  else return "";
}

function FontDropDown({
  editor,
  value,
  style,
  disabled = false,
  type,
}: {
  editor: LexicalEditor;
  value: string;
  style: string;
  disabled?: boolean;
  type?: string;
}): JSX.Element {
  const handleClick = useCallback(
    (option: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, {
            [style]: option,
          });
        }
      });
    },
    [editor, style]
  );

  const buttonAriaLabel =
    style === "font-family"
      ? "Formatting options for font family"
      : "Formatting options for font size";

  return (
    <DropDown
      disabled={disabled}
      buttonClassName={"font-toolbar-item " + style}
      buttonLabel={value}
      typeMenu={type}
      buttonIconClassName={
        style === "font-family" ? "icon block-type font-family" : ""
      }
      buttonAriaLabel={buttonAriaLabel}>
      {FONT_FAMILY_OPTIONS.map(([option, text]) => (
        <DropDownItem
          className={`item ${dropDownActiveClass(value === option)}`}
          onClick={() => handleClick(option)}
          key={option}>
          <span className="text">{text}</span>
        </DropDownItem>
      ))}
    </DropDown>
  );
}

function positionEditorElement(editor: any, rect: any) {
  if (rect === null) {
    editor.style.opacity = "0";
    editor.style.top = "-1000px";
    editor.style.left = "-1000px";
  } else {
    editor.style.opacity = "1";
    editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`;
    editor.style.left = `${
      rect.left + window.pageXOffset - editor.offsetWidth / 2 + rect.width / 2
    }px`;
  }
}

function FloatingLinkEditor({ editor }: any) {
  const editorRef = useRef(null);
  const inputRef: any = useRef(null);
  const mouseDownRef = useRef(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [isEditMode, setEditMode] = useState(false);
  const [lastSelection, setLastSelection] = useState(null);

  const updateLinkEditor = useCallback(() => {
    const selection: any = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl("");
      }
    }
    const editorElem = editorRef.current;
    const nativeSelection: any = window.getSelection();
    const activeElement = document.activeElement;

    if (editorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const domRange = nativeSelection.getRangeAt(0);
      let rect;
      if (nativeSelection.anchorNode === rootElement) {
        let inner = rootElement;
        while (inner.firstElementChild != null) {
          inner = inner.firstElementChild;
        }
        rect = inner.getBoundingClientRect();
      } else {
        rect = domRange.getBoundingClientRect();
      }

      if (!mouseDownRef.current) {
        positionEditorElement(editorElem, rect);
      }
      setLastSelection(selection);
    } else if (!activeElement || activeElement.className !== "link-input") {
      positionEditorElement(editorElem, null);
      setLastSelection(null);
      setEditMode(false);
      setLinkUrl("");
    }

    return true;
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }: any) => {
        editorState.read(() => {
          updateLinkEditor();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor();
          return true;
        },
        LowPriority
      )
    );
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor();
    });
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <div ref={editorRef} className="link-editor">
      {isEditMode ? (
        <input
          ref={inputRef}
          className="link-input"
          value={linkUrl}
          onChange={(event) => {
            setLinkUrl(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              if (lastSelection !== null) {
                if (linkUrl !== "") {
                  editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
                }
                setEditMode(false);
              }
            } else if (event.key === "Escape") {
              event.preventDefault();
              setEditMode(false);
            }
          }}
        />
      ) : (
        <>
          <div className="link-input">
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
              {linkUrl}
            </a>
            <div
              className="link-edit"
              role="button"
              tabIndex={0}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                setEditMode(true);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

function Select({ onChange, className, options, value }: any) {
  return (
    <select className={className} onChange={onChange} value={value}>
      <option hidden={true} value="" />
      {options.map((option: any) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function getSelectedNode(selection: any) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}

function BlockOptionsDropdownList({
  editor,
  blockType,
  toolbarRef,
  setShowBlockOptionsDropDown,
}: any) {
  const dropDownRef = useRef(null);

  useEffect(() => {
    const toolbar = toolbarRef.current;
    const dropDown: any = dropDownRef.current;

    if (toolbar !== null && dropDown !== null) {
      const { top, left } = toolbar.getBoundingClientRect();
      dropDown.style.top = `${top + 40}px`;
      dropDown.style.left = `${left}px`;
    }
  }, [dropDownRef, toolbarRef]);

  useEffect(() => {
    const dropDown: any = dropDownRef.current;
    const toolbar = toolbarRef.current;

    if (dropDown !== null && toolbar !== null) {
      const handle = (event: any) => {
        const target = event.target;

        if (!dropDown.contains(target) && !toolbar.contains(target)) {
          setShowBlockOptionsDropDown(false);
        }
      };
      document.addEventListener("click", handle);

      return () => {
        document.removeEventListener("click", handle);
      };
    }
  }, [dropDownRef, setShowBlockOptionsDropDown, toolbarRef]);

  const formatParagraph = () => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createParagraphNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatLargeHeading = () => {
    if (blockType !== "h1") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode("h1"));
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatSmallHeading = () => {
    if (blockType !== "h2") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode("h2"));
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatBulletList = () => {
    if (blockType !== "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND);
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatNumberedList = () => {
    if (blockType !== "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND);
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createCodeNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  return (
    <div className="dropdown" ref={dropDownRef}>
      {/* <button className="item" onClick={formatParagraph}>
        <span className="icon paragraph" />
        <span className="text">Normal</span>
        {blockType === "paragraph" && <span className="active" />}
      </button> */}
      <button type="button" className="item" onClick={formatLargeHeading}>
        <span className="icon h1" />
        <span className="text">Heading H1</span>
        {blockType === "h1" && <span className="active" />}
      </button>
      <button type="button" className="item" onClick={formatSmallHeading}>
        <span className="icon h2" />
        <span className="text">Heading H2 </span>
        {blockType === "h2" && <span className="active" />}
      </button>
      <button type="button" className="item" onClick={formatBulletList}>
        <span className="icon bullet-list" />
        <span className="text">Bullet List</span>
        {blockType === "ul" && <span className="active" />}
      </button>
      <button type="button" className="item" onClick={formatNumberedList}>
        <span className="icon numbered-list" />
        <span className="text">Numbered List</span>
        {blockType === "ol" && <span className="active" />}
      </button>
      <button type="button" className="item" onClick={formatQuote}>
        <span className="icon quote" />
        <span className="text">Quote</span>
        {blockType === "quote" && <span className="active" />}
      </button>
      <button type="button" className="item" onClick={formatCode}>
        <span className="icon code" />
        <span className="text">Code Block</span>
        {blockType === "code" && <span className="active" />}
      </button>
    </div>
  );
}

// const [modal, showModal] = useModal();

function InsertImageUploadedDialogBody({
  onClick,
}: {
  onClick: (payload: InsertImagePayload) => void;
}) {
  const [src, setSrc] = useState("");
  const [altText, setAltText] = useState("");

  const isDisabled = src === "";

  const loadImage = (files: FileList | null) => {
    const reader = new FileReader();
    reader.onload = function () {
      if (typeof reader.result === "string") {
        setSrc(reader.result);
      }
      return "";
    };
    if (files !== null) {
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <>
      <FileInput
        label="Image Upload"
        onChange={loadImage}
        accept="image/*"
        data-test-id="image-modal-file-upload"
      />
      <TextInput
        label="Alt Text"
        placeholder="Descriptive alternative text"
        onChange={setAltText}
        value={altText}
        data-test-id="image-modal-alt-text-input"
      />
      <DialogActions>
        <Button
          data-test-id="image-modal-file-upload-btn"
          disabled={isDisabled}
          onClick={() => onClick({ altText, src })}>
          Confirm
        </Button>
      </DialogActions>
    </>
  );
}
const ToolbarPlugin: React.FC<{
  content: string;
  setContent: any;
  setNode: any;
}> = ({ content, setContent, setNode }) => {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [blockType, setBlockType] = useState<string>("paragraph");
  const [fontFamily, setFontFamily] = useState<string>("Arial");
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());
  const [selectedElementKey, setSelectedElementKey] = useState(null);
  const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] =
    useState(false);
  const [codeLanguage, setCodeLanguage] = useState("");
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);

  useEffect(() => {
    editor.update(() => {
      const currentHtmlContent = $generateHtmlFromNodes(editor, null);

      if (content && currentHtmlContent !== content && !editor.isComposing()) {
        const parser = new DOMParser();
        const dom = parser.parseFromString(content, "text/html");
        const nodes = $generateNodesFromDOM(editor, dom);

        const validNodesToInsert = nodes.map((node: any) => {
          const paragraphNode = $createParagraphNode();

          if (node.getType() === "text") {
            paragraphNode.append(node);
            return paragraphNode;
          } else {
            return node;
          }
        });

        const root = $getRoot();
        root.clear();
        root.append(...validNodesToInsert);
        $setSelection(null);
      }
    });
  }, [content]);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey: any = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        setContent(elementDOM?.outerHTML);
        setNode(elementDOM);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
          }
        }
      }
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsCode(selection.hasFormat("code"));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar();
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  const codeLanguges = useMemo(() => getCodeLanguages(), []);
  const onCodeLanguageSelect = useCallback(
    (e: any) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(e.target.value);
          }
        }
      });
    },
    [editor, selectedElementKey]
  );

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const formatParagraph = () => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createParagraphNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  return (
    <div className="toolbar flex items-center flex-row border-b border-header-bottom px-[12px] py-[17px]">
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        className={
          "toolbar-item spaced w-[28px] h-[28px] mr-[14px] " +
          (isBold ? "active" : "")
        }
        aria-label="Format Bold">
        <img src={icon_bold} alt="Format Bold" />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        className={
          "toolbar-item spaced w-[28px] h-[28px] mr-[14px] " +
          (isItalic ? "active" : "")
        }
        aria-label="Format Italics">
        <img src={icon_italic} alt="Format italic" />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        className={
          "toolbar-item spaced w-[28px] h-[28px] mr-[14px] " +
          (isUnderline ? "active" : "")
        }
        aria-label="Format Underline">
        <img src={icon_underline} alt="Format underline" />
      </button>
      <FontDropDown
        disabled={!isEditable}
        style={"font-family"}
        value={fontFamily}
        editor={editor}
        type={"fonts"}
      />
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }}
        className="toolbar-item spaced w-[28px] h-[28px] mr-[14px] "
        aria-label="Left Align">
        <img src={icon_left} alt="Format left" />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }}
        className="toolbar-item spaced w-[28px] h-[28px] mr-[14px] "
        aria-label="Center Align">
        <img src={icon_center} alt="Format center" />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        }}
        className="toolbar-item w-[28px] h-[28px] mr-[14px] "
        aria-label="Justify Align">
        <img src={icon_layout} alt="Format center" />
      </button>{" "}
      <button
        type="button"
        className="toolbar-item spaced w-[28px] h-[28px] mr-[24px] "
        onClick={formatParagraph}>
        <img src={icon_paragrph} alt="Format paragraph" />
        {blockType === "paragraph" && <span className="active" />}
      </button>
      <button
        type="button"
        onClick={insertLink}
        className={
          "toolbar-item spaced w-[28px] h-[28px] mr-[14px] " +
          (isLink ? "active" : "")
        }
        aria-label="Insert Link">
        <i className="format link" />
        <img src={icon_link} alt="Format link" />
      </button>
      {isLink &&
        createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
      <button
        type="button"
        className={"toolbar-item spaced w-[28px] h-[28px] mr-[14px] "}
        aria-label="Insert photo"
        // onClick={() => {
        //   showModal('Insert Image', (onClose) => (
        //     <InsertImageDialog
        //       activeEditor={activeEditor}
        //       onClose={onClose}
        //     />
        //   ));
        // }}
      >
        <img src={icon_image} alt="Insert Images" />
      </button>
      <button
        type="button"
        className={"toolbar-item spaced w-[28px] h-[28px] mr-[14px] "}
        aria-label="Insert emoji">
        <img src={icon_smile} alt="Insert emoji" />
      </button>
      <button
        type="button"
        onClick={() => setShowBlockOptionsDropDown(!showBlockOptionsDropDown)}
        ref={toolbarRef}
        className={"toolbar-item spaced w-[28px] h-[28px] mr-[14px] "}>
        <img src={icon_add} alt="Plus" />
      </button>
      {showBlockOptionsDropDown &&
        createPortal(
          <BlockOptionsDropdownList
            editor={editor}
            blockType={blockType}
            toolbarRef={toolbarRef}
            setShowBlockOptionsDropDown={setShowBlockOptionsDropDown}
          />,
          document.body
        )}
      {/* <DropDown
            disabled={!isEditable}
            buttonClassName="toolbar-item spaced"
            buttonLabel="Insert"
            buttonAriaLabel="Insert specialized editor node"
            buttonIconClassName="icon plus">
            <DropDownItem
              onClick={() => {
                activeEditor.dispatchCommand(
                  INSERT_HORIZONTAL_RULE_COMMAND,
                  undefined,
                );
              }}
              className="item">
              <i className="icon horizontal-rule" />
              <span className="text">Horizontal Rule</span>
            </DropDownItem>
            <DropDownItem
              onClick={() => {
                showModal('Insert Image', (onClose) => (
                  <InsertImageDialog
                    activeEditor={activeEditor}
                    onClose={onClose}
                  />
                ));
              }}
              className="item">
              <i className="icon image" />
              <span className="text">Image</span>
            </DropDownItem>
            <DropDownItem
              onClick={() =>
                insertGifOnClick({
                  altText: 'Cat typing on a laptop',
                  src: catTypingGif,
                })
              }
              className="item">
              <i className="icon gif" />
              <span className="text">GIF</span>
            </DropDownItem>
 
            <DropDownItem
              onClick={() => {
                showModal('Insert Table', (onClose) => (
                  <InsertTableDialog
                    activeEditor={activeEditor}
                    onClose={onClose}
                  />
                ));
              }}
              className="item">
              <i className="icon table" />
              <span className="text">Table</span>
            </DropDownItem>
            <DropDownItem
              onClick={() => {
                showModal('Insert Table', (onClose) => (
                  <InsertNewTableDialog
                    activeEditor={activeEditor}
                    onClose={onClose}
                  />
                ));
              }}
              className="item">
              <i className="icon table" />
              <span className="text">Table (Experimental)</span>
            </DropDownItem>
            <DropDownItem
              onClick={() => {
                showModal('Insert Poll', (onClose) => (
                  <InsertPollDialog
                    activeEditor={activeEditor}
                    onClose={onClose}
                  />
                ));
              }}
              className="item">
              <i className="icon poll" />
              <span className="text">Poll</span>
            </DropDownItem>

 
 
          </DropDown>                                 */}
      {/* <button
        className="flex items-center action-button py-[8px] px-[15px] bg-white rounded-[5px] text-simple-text
        text-[16px] font-medium leading-[20px] shadow-free-trial border-solid border-[1px] ml-auto"
        title="Convert From Markdown"
        aria-label="Convert from markdown">
          <img src={icon_delete} alt="Delete" className="mr-[6px]" />
          Delete 
      </button> */}
      {/* <ImageToolbar/> */}
    </div>
  );
};

export default ToolbarPlugin;
