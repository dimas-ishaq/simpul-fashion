/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  useEditor,
  EditorContent,
  useEditorState,
  Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Minus,
  Redo,
  RemoveFormatting,
  Strikethrough,
  TextQuote,
  Undo,
} from "lucide-react";

function MenuBar({ editor }: { editor: Editor }) {
  // Read the current editor's state, and re-render the component when it changes

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor?.isActive("bold") ?? false,
        canBold: ctx.editor?.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor?.isActive("italic") ?? false,
        canItalic: ctx.editor?.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor?.isActive("strike") ?? false,
        canStrike: ctx.editor?.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor?.isActive("code") ?? false,
        canCode: ctx.editor?.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor?.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor?.isActive("paragraph") ?? false,
        isHeading1: ctx.editor?.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor?.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor?.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor?.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor?.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor?.isActive("heading", { level: 6 }) ?? false,
        isBulletList: ctx.editor?.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor?.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor?.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor?.isActive("blockquote") ?? false,
        canUndo: ctx.editor?.can().chain().undo().run() ?? false,
        canRedo: ctx.editor?.can().chain().redo().run() ?? false,
      };
    },
  });

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        type="button"
        size={"icon"}
        variant={editorState.isBold ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editorState.canBold}
      >
        <Bold />
      </Button>
      <Button
        type="button"
        size={"icon"}
        variant={editorState.isItalic ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editorState.canItalic}
      >
        <Italic />
      </Button>
      <Button
        type="button"
        size={"icon"}
        variant={editorState.isStrike ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editorState.canStrike}
      >
        <Strikethrough />
      </Button>
      <Button
        type="button"
        size={"icon"}
        variant={"ghost"}
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        <RemoveFormatting />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editorState.isParagraph ? "is-active" : ""}
      >
        Paragraph
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        size={"icon"}
        variant={editorState.isHeading1 ? "default" : "ghost"}
      >
        <Heading1 />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        size={"icon"}
        variant={editorState.isHeading2 ? "default" : "ghost"}
      >
        <Heading2 />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        size={"icon"}
        variant={editorState.isHeading3 ? "default" : "ghost"}
      >
        <Heading3 />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        size={"icon"}
        variant={editorState.isHeading4 ? "default" : "ghost"}
      >
        <Heading4 />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        size={"icon"}
        variant={editorState.isHeading5 ? "default" : "ghost"}
      >
        <Heading5 />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        size={"icon"}
        variant={editorState.isHeading6 ? "default" : "ghost"}
      >
        <Heading6 />
      </Button>
      <Button
        type="button"
        size={"sm"}
        variant={editorState.isBulletList ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List />
      </Button>
      <Button
        type="button"
        size={"sm"}
        variant={editorState.isOrderedList ? "default" : "ghost"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        variant={editorState.isBlockquote ? "default" : "ghost"}
        size={"icon"}
      >
        <TextQuote />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        size={"icon"}
        variant={"ghost"}
      >
        <Minus />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().setHardBreak().run()}
        size={"icon"}
        variant={"ghost"}
      >
        Br
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editorState.canUndo}
      >
        <Undo />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editorState.canRedo}
      >
        <Redo />
      </Button>
    </div>
  );
}

export default function TipTapEditor({
  onChange,
  defaultValue,
}: {
  onChange: (htmlContent: string) => void;
  defaultValue?: string;
}) {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl dark:text-neutral-50 focus:outline-none min-h-[100px] border p-2 rounded-sm  break-words break-all whitespace-pre-wrap max-w-full",
      },
    },
    extensions: [StarterKit],
    content: defaultValue || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  useEffect(() => {
    if (editor && defaultValue) {
      editor.commands.setContent(defaultValue);
      onChange(defaultValue); // 🔹 update field form langsung
    }
  }, [editor, defaultValue]);

  return (
    <div className="space-y-4 flex flex-col w-full">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
