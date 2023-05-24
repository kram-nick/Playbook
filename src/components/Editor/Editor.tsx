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
import { useFormik } from "formik";
import { $getRoot, $getSelection, $getTextContent } from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { toast } from "react-toastify";

import ActionsPlugin from "../../core/plugins/ActionsPlugin";
import CodeHighlightPlugin from "../../core/plugins/CodeHighlightPlugin";
import prepopulatedText from "../../core/plugins/SampleText";
import exampleTheme from "../../core/constants/lexicalTheme";
import ImagePlugin from "../../core/plugins/ImagePlugin";
import { ImageNode } from "../../core/editor/nodes/ImageNode";
import { useParams } from "react-router-dom";
import { APIRoutes } from "../../core/http";
import useHttpGet from "../../core/hooks/useHttpGet";

function Placeholder() {
  const { id } = useParams();

  const { fetchedData: page } = useHttpGet<any>(`${APIRoutes.PAGES}/${id}`, {
    dependencies: [id],
  });

  return (
    <div className="editor-placeholder text-[20px]">
      <p className="mb-2">{page?.data?.title}</p>
      <p>{page?.data?.content}</p>
    </div>
  );
}

const editorConfig = {
  editorState: prepopulatedText,
  theme: exampleTheme,
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
    ImageNode,
  ],
};

function onChange(editorState: any) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    console.log(root.__cachedText);
  });
}

const Editor = () => {
  const formikForm = useFormik<{
    title: string;
    content: string;
  }>({
    initialValues: {
      title: "Section title",
      content: "",
    },
    // validationSchema: valueFormValidationSchema,
    onSubmit: async (values: any) => {},
  });

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="w-full rounded-[8px] border-[1px] border-header-bottom flex flex-col justify-between bg-white">
        <ToolbarPlugin />
        <div className="relative min-h-[50vh]">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="editor-input p-4 min-h-[50vh] max-h-[calc(100vh-280px)] overflow-y-auto outline-0" />
            }
            placeholder={<Placeholder />}
            ErrorBoundary={() => null}
          />
          <OnChangePlugin onChange={onChange} />
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
