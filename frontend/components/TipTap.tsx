"use client";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { TextStyleKit } from "@tiptap/extension-text-style";
import { MenuBar } from "./MenuBar";
export const Tiptap = ({
  editable,
  content,
  setText,
}: {
  editable: boolean;
  content?: JSONContent;
  setText?: (text: JSONContent) => void;
}) => {
  const extensions = [StarterKit, TextStyleKit];
  const editor = useEditor({
    extensions: extensions,
    content:
      content ||
      `<h1>Hi guys! it's my first english lesson! I really wanna teach you something interesting!</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur temporibus dignissimos mollitia necessitatibus quis laborum laboriosam! Qui, fugiat dignissimos delectus aliquid voluptate a earum iure nobis illum nulla corporis consequatur.</p>`,
    editable: editable,
    immediatelyRender: false,
    onUpdate({ editor }) {
      setText?.(editor.getJSON());
    },
  });
  if (!editor) return;
  return (
    <div
      className={`flex w-full flex-col gap-4 ${!editable && "cursor-default"}`}
    >
      {editable && <MenuBar editor={editor}></MenuBar>}
      <EditorContent
        editor={editor}
        className="font-body [&_h1]:font-heading min-h-35 max-w-none rounded-xl leading-7 text-neutral-900 text-white focus:outline-none dark:text-neutral-100 [&_blockquote]:border-l-4 [&_blockquote]:border-indigo-500 [&_blockquote]:pl-4 [&_blockquote]:text-neutral-500 [&_code]:rounded [&_code]:bg-neutral-800 [&_code]:p-2 [&_h1]:mt-0 [&_h1]:mb-1 [&_h1]:text-lg [&_h1]:font-bold md:[&_h1]:text-xl [&_h2]:mt-0 [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:mt-0 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-semibold [&_hr]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:m-0 [&_p]:leading-7 [&_ul]:list-disc [&_ul]:pl-6"
      />
    </div>
  );
};
