import { useEffect, useState } from "react";
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
import { $generateHtmlFromNodes } from "@lexical/html";
import { $generateNodesFromDOM } from "@lexical/html";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $getSelection,
  $getTextContent,
  $isRangeSelection,
  $setSelection,
  LexicalEditor,
} from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { toast } from "react-toastify";
import * as Yup from "yup";

import ActionsPlugin from "../../core/plugins/ActionsPlugin";
import CodeHighlightPlugin from "../../core/plugins/CodeHighlightPlugin";
import prepopulatedText from "../../core/plugins/SampleText";
import exampleTheme from "../../core/constants/lexicalTheme";
import ImagePlugin from "../../core/plugins/ImagePlugin";
import { ImageNode } from "../../core/editor/nodes/ImageNode";
import { useNavigate, useParams } from "react-router-dom";
import { APIRoutes } from "../../core/http";
import useHttpGet from "../../core/hooks/useHttpGet";
import { useTranslation } from "react-i18next";
import PlaybookService from "../../core/services/playbook.service";
import { PrivateUIRoutes } from "../../core/router";
import { useAppDispatch, useAppSelector } from "../../core/hooks/useRedux";
import {
  setOpenedPages,
  setSelectedData,
} from "../../core/store/reducers/app/appDataSlice";
import { Data } from "../../core/models/data";
import { setReloadChecker } from "../../core/store/reducers/helpers/helpersDataSlice";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const Placeholder = () => {
  const { t } = useTranslation();

  return (
    <div className="editor-placeholder text-[20px]">
      <p>{t<string>("EDIT.DESCRIPTION")}</p>
    </div>
  );
};

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

const Editor = () => {
  const [savedData, setSavedData] = useState<Data.Page | any>();
  const [content, setContent] = useState<any>(null);
  const [element, setElement] = useState<string>("");
  const [update, setUpdate] = useState<boolean>(false);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { playbook_id, page_id } = useParams();

  const { openedPages, data } = useAppSelector((state) => state.app);

  const { reloadChecker } = useAppSelector((state) => state.helpers);

  useHttpGet<any>(`${APIRoutes.PAGES}/${page_id}`, {
    resolve: (response: any) => {
      if (response) {
        formikForm.setFieldValue("title", response?.data?.title);

        formikForm.setFieldValue(
          "editor_content",
          response?.data?.editor_content?.editor_state
        );
        setContent(response?.data?.editor_content?.editor_state);
        setElement(response?.data?.editor_content?.element);

        setSavedData(response?.data);
      }
    },
    condition: Boolean(page_id),
    dependencies: [page_id, update],
  });

  const valueFormValidationSchema = Yup.object().shape({
    title: Yup.string().required(t<string>("ERRORS.NAME_REQUIRED")),
    editor_content: Yup.string().required(t<string>("ERRORS.CONTENT_REQUIRED")),
  });

  const formikForm = useFormik<{
    playbook_id: string;
    editor_content: string;
    privacy: boolean;
    tags: string;
    title: string;
    url: string;
  }>({
    initialValues: {
      playbook_id: String(playbook_id),
      editor_content: "",
      privacy: true,
      tags: "",
      title: "",
      url: "",
    },
    validationSchema: valueFormValidationSchema,
    onSubmit: async (values: any) => {
      page_id ? updatePage(values) : addPage(values);
    },
  });

  console.log(formikForm.values);

  const addPage = async (values: any) => {
    try {
      values.privacy = values.privacy ? "private" : "public";
      const response = await PlaybookService.AddPage({
        ...values,
        editor_content: { editor_state: values.editor_content, element },
      });
      toast.success(t<string>("MAIN.UPDATE_SUCCESS"));
      dispatch(setReloadChecker(true));
      dispatch(setOpenedPages([response?.data?.data?.id]));
      navigate(`/${PrivateUIRoutes.Chapters}/${playbook_id}`);
    } catch (errors: any) {
      toast.error(errors?.response?.data?.errors);
    }
  };

  const updatePage = async (values: any) => {
    if (
      savedData.title === formikForm.values.title &&
      savedData.editor_content.editor_state === formikForm.values.editor_content
    ) {
      toast.warn("Nothing wasn't changed!");
      return;
    }

    try {
      values.privacy = values.privacy ? "private" : "public";

      delete values.playbook_id;

      await PlaybookService.UpdatePage(String(page_id), {
        ...values,
        editor_content: { editor_state: values.editor_content, element },
      });
      setUpdate(!update);

      dispatch(setReloadChecker(!reloadChecker));
      toast.success(t<string>("MAIN.UPDATE_SUCCESS"));
    } catch (errors: any) {
      toast.error(errors?.response?.data?.errors);
    }
  };

  function onChange(editorState: any) {
    const stringifiedEditorState = JSON.stringify(editorState.toJSON());
    formikForm.setFieldValue("editor_content", stringifiedEditorState);
  }

  return (
    <form
      className="flex flex-col gap-[30px]"
      onSubmit={formikForm.handleSubmit}
    >
      <div>
        <input
          className="outline-none pl-4 rounded-[8px] h-[40px] w-[100%] border-[1px] border-header-bottom text-[20px] font-medium font-poppins"
          placeholder={t<string>("EDIT.PAGE_NAME")}
          {...formikForm.getFieldProps("title")}
        />
        {formikForm.errors.title && formikForm.touched.title && !page_id && (
          <p className="block text-[14px] leading-[20px] mt-[6px] text-error-color pl-[10px]">
            {formikForm.errors.title}
          </p>
        )}
      </div>

      <div>
        <LexicalComposer initialConfig={editorConfig}>
          <div className="w-full rounded-[8px] border-[1px] border-header-bottom flex flex-col justify-between bg-white">
            <ToolbarPlugin content={content} setElement={setElement} />
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

            <div className="actions flex flex-row justify-end px-[16px] pt-[18px] pb-[24px]">
              <button
                className="action-button py-[8px] px-[45px] bg-white rounded-[5px] text-home-title
        text-[16px] font-medium leading-[20px] shadow-free-trial border-solid border-[1px] mr-[16px]"
                title={t<string>("BTNS.CANCEL")}
                aria-label={t<string>("BTNS.CANCEL")}
                type="button"
                onClick={() => {
                  const setData = {
                    ...data,
                    page_id: null,
                    page_title: "",
                    open: data?.open ? data?.open : true,
                    type: data?.type ? data?.type : "my",
                  };
                  dispatch(setSelectedData(setData));
                  localStorage.setItem(
                    "selected_page",
                    JSON.stringify(setData)
                  );
                  navigate(`/${PrivateUIRoutes.Chapters}/${playbook_id}`);
                }}
              >
                {t<string>("BTNS.CANCEL")}
              </button>
              <button
                className="action-button py-[8px] px-[45px] bg-buttons-bg rounded-[5px] text-buttons-color 
          text-[16px] font-medium leading-[20px] shadow-free-trial "
                title={t<string>("BTNS.SAVE")}
                aria-label={t<string>("BTNS.SAVE")}
                type="submit"
              >
                {t<string>("BTNS.SAVE")}
              </button>
            </div>
          </div>
        </LexicalComposer>
        {formikForm.errors.editor_content &&
          formikForm.touched.editor_content &&
          !page_id && (
            <p className="block text-[14px] leading-[20px] mt-[6px] text-error-color pl-[10px]">
              {formikForm.errors.editor_content}
            </p>
          )}
      </div>
    </form>
  );
};

export default Editor;
