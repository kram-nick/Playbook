import { $createCodeNode, $isCodeNode } from "@lexical/code";
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
} from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createTextNode, $getRoot } from "lexical";
import * as React from "react";
import { useCallback } from "react";

import { PLAYGROUND_TRANSFORMERS } from "./MarkdownTranformers";

export default function ActionsPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();

  const handleMarkdownToggle = useCallback(() => {
    editor.update(() => {
      const root = $getRoot();
      const firstChild = root.getFirstChild();
      if ($isCodeNode(firstChild) && firstChild.getLanguage() === "markdown") {
        $convertFromMarkdownString(
          firstChild.getTextContent(),
          PLAYGROUND_TRANSFORMERS
        );
      } else {
        const markdown = $convertToMarkdownString(PLAYGROUND_TRANSFORMERS);
        root
          .clear()
          .append(
            $createCodeNode("markdown").append($createTextNode(markdown))
          );
      }
      root.selectEnd();
    });
  }, [editor]);

  return (
    <div className="actions flex flex-row justify-end px-[16px] pt-[18px] pb-[24px]">
      <button
        className="action-button py-[8px] px-[45px] bg-white rounded-[5px] text-home-title
        text-[16px] font-medium leading-[20px] shadow-free-trial border-solid border-[1px] mr-[16px]"
        onClick={handleMarkdownToggle}
        title="Convert From Markdown"
        aria-label="Convert from markdown">
        Cancel
        {/* <i className="markdown" /> */}
      </button>
      <button
        className="action-button py-[8px] px-[45px] bg-buttons-bg rounded-[5px] text-buttons-color 
          text-[16px] font-medium leading-[20px] shadow-free-trial "
        onClick={handleMarkdownToggle}
        title="Convert From Markdown"
        aria-label="Convert from markdown">
        Save
        {/* <i className="markdown" /> */}
      </button>
    </div>
  );
}
