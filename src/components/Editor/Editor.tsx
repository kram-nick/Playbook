import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import ToolbarPlugin from "../../core/plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

import ActionsPlugin from "../../core/plugins/ActionsPlugin";
import CodeHighlightPlugin from "../../core/plugins/CodeHighlightPlugin";
import prepopulatedText from "../../core/plugins/SampleText";
import exampleTheme from "../../core/constants/lexicalTheme";
import ImagePlugin from "../../core/plugins/ImagePlugin";
import { ImageNode } from "../../core/nodes/ImageNode";

function Placeholder() {
  return (
    <div className="editor-placeholder text-[20px]">
      <p className="mb-2">Section Name</p>
      <p>Description</p>
    </div>
  );
}

const editorConfig = {
  editorState: prepopulatedText,
  theme: {
    root: "p-4 border-slate-500 focus:outline-none focus-visible:border-black",
    link: "cursor-pointer",
    text: {
      bold: "font-semibold",
      underline: "underline decoration-wavy",
      italic: "italic",
      strikethrough: "line-through",
      underlineStrikethrough: "underlined-line-through",
    },
  },
  namespace: "editor",

  onError(error: any) {
    throw error;
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    ImageNode
  ],
};

const Editor = () => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="w-full rounded-[8px] border-[1px] border-header-bottom flex flex-col justify-between bg-white">
        <ToolbarPlugin />
        <div className="relative min-h-[250px]">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={() => null}
          />
          <AutoFocusPlugin />
          <ImagePlugin />
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <CodeHighlightPlugin />
        </div>
        <ActionsPlugin />
      </div>
    </LexicalComposer>
  );
};

export default Editor;


 
 
// import {ClearEditorPlugin} from '@lexical/react/LexicalClearEditorPlugin'; 
// import {HashtagPlugin} from '@lexical/react/LexicalHashtagPlugin';
// import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
// import {LinkPlugin} from '@lexical/react/LexicalLinkPlugin';
// import {ListPlugin} from '@lexical/react/LexicalListPlugin';
// import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
// import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin'; 
// import * as React from 'react';
// import {useRef} from 'react';

// // import {createWebsocketProvider} from './collaboration';
// import {useSettings} from './../../core/editor/context/SettingsContext';
// import {useSharedHistoryContext} from './../../core/editor/context/SharedHistoryContext';
// import ActionsPlugin from './../../core/plugins/ActionsPlugin';
// import AutocompletePlugin from './../../core/plugins/AutocompletePlugin';
// import AutoLinkPlugin from './../../core/plugins/AutoLinkPlugin';
// import ClickableLinkPlugin from './../../core/plugins/LinkPlugin';
// import CodeActionMenuPlugin from './../../core/plugins/CodeActionMenuPlugin';
// import CodeHighlightPlugin from './../../core/plugins/CodeHighlightPlugin'; 
// import ComponentPickerPlugin from './../../core/plugins/ComponentPickerPlugin';
// import EmojisPlugin from './../../core/plugins/EmojisPlugin';
// import EquationsPlugin from './../../core/plugins/EquationsPlugin';
// import ExcalidrawPlugin from './../../core/plugins/ExcalidrawPlugin';
// // import HorizontalRulePlugin from './../../core/plugins/';
// import ImagesPlugin from './../../core/plugins/ImagesPlugin';
// import KeywordsPlugin from './../../core/plugins/KeywordsPlugin'; 
// import MarkdownShortcutPlugin from './../../core/plugins/MarkdownShortcutPlugin';
// import {MaxLengthPlugin} from './../../core/plugins/MaxLengthPlugin';
// import MentionsPlugin from './../../core/plugins/MentionsPlugin';
// import PollPlugin from './../../core/plugins/PollPlugin';
// import SpeechToTextPlugin from './../../core/plugins/SpeechToTextPlugin'; 
// import TableOfContentsPlugin from './../../core/plugins/TableOfContentsPlugin';
// import TextFormatFloatingToolbarPlugin from './../../core/plugins/FloatingTextFormatToolbarPlugin/';
// import ToolbarPlugin from './../../core/plugins/ToolbarPlugin';
// import TreeViewPlugin from './../../core/plugins/TreeViewPlugin';
 
// import ContentEditable from './../../core/editor/ui/ContentEditable';
// import Placeholder from './../../core/editor/ui/Placeholder';

// const skipCollaborationInit =
//   // @ts-ignore
//   window.parent != null && window.parent.frames.right === window;

//   // function Placeholder() {
//   //   return (
//   //     <div className="editor-placeholder text-[20px]">
//   //       <p className="mb-2">Section Name</p>
//   //       <p>Description</p>
//   //     </div>
//   //   );
//   // }

// export default function Editor(): JSX.Element {
//   const {historyState} = useSharedHistoryContext();
//   const {
//     settings: {
//       isCollab,
//       isAutocomplete,
//       isMaxLength,
//       isCharLimit,
//       isCharLimitUtf8,
//       isRichText,
//       showTreeView,
//       showTableOfContents,
//     },
//   } = useSettings();
//   const text = isCollab
//     ? 'Enter some collaborative rich text...'
//     : isRichText
//     ? 'Enter some rich text...'
//     : 'Enter some plain text...';
//   const placeholder = <Placeholder>{text}</Placeholder>;
//   const scrollRef = useRef(null);

//   return (
//     <>
//       {isRichText && <ToolbarPlugin />}
//       <div
//         className={`editor-container ${showTreeView ? 'tree-view' : ''} ${
//           !isRichText ? 'plain-text' : ''
//         }`}
//         ref={scrollRef}>
//         {isMaxLength && <MaxLengthPlugin maxLength={30} />}
    
//         <ClearEditorPlugin />
//         <ComponentPickerPlugin />
//         <MentionsPlugin />
//         <EmojisPlugin />
//         <HashtagPlugin />
//         <KeywordsPlugin />
//         <SpeechToTextPlugin />
//         <AutoLinkPlugin /> 
//         {/* <CommentPlugin
//           providerFactory={isCollab ? createWebsocketProvider : undefined}
//         /> */}
//         {isRichText ? (
//           <>
//             {/* {isCollab ? (
//               <CollaborationPlugin
//                 id="main"
//                 providerFactory={createWebsocketProvider}
//                 shouldBootstrap={!skipCollaborationInit}
//               />
//             ) : (
//               <HistoryPlugin externalHistoryState={historyState} />
//             )} */}
//             <RichTextPlugin
//               contentEditable={<ContentEditable />}
//               placeholder={placeholder} 
//               ErrorBoundary={() => null}
//             />
//             <MarkdownShortcutPlugin />
//             <CodeActionMenuPlugin />
//             <CodeHighlightPlugin />
//             <ListPlugin />
//             {/* <CheckListPlugin /> */} 
//             {/* <TablePlugin /> */}
//             {/* <TableCellActionMenuPlugin /> */}
//             {/* <TableCellResizer /> */}
//             <ImagesPlugin />
//             <LinkPlugin />
//             <PollPlugin /> 
//             <ClickableLinkPlugin /> 
//             <TextFormatFloatingToolbarPlugin />
//             <EquationsPlugin />
//             <ExcalidrawPlugin />
//             {/* <TabFocusPlugin /> */}
//           </>
//         ) : (
//           <>
//             <PlainTextPlugin
//               contentEditable={<ContentEditable className="editor-input" />}
//               placeholder={placeholder} 
//               ErrorBoundary={() => null}
//             />
//             <HistoryPlugin externalHistoryState={historyState} />
//           </>
//         )}
 
//         {isAutocomplete && <AutocompletePlugin />}
//         <ActionsPlugin  />
//         <div className="toc">
//           {showTableOfContents && <TableOfContentsPlugin />}
//         </div>
//       </div>
//       {showTreeView && <TreeViewPlugin />}
//     </>
//   );
// }