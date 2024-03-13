"use client";
import "@blocknote/core/style.css";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";

interface IEditor {
 onChange: (value: string) => void;
 initialContent?: string;
 editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: IEditor) => {
 const { resolvedTheme } = useTheme();
 const editor: BlockNoteEditor = useCreateBlockNote({
  editable,
  initialContent: initialContent
   ? (JSON.parse(initialContent) as PartialBlock[])
   : undefined,
  useEditorChange: (editor) => {
   onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
  },
 });
 return (
  <div>
   <BlockNoteView
    editor={editor}
    theme={resolvedTheme === "dark" ? "dark" : "light"}
   />
  </div>
 );
};

export default Editor;
