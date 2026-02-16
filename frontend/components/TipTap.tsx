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
      className={`w-full gap-4 flex-col flex ${!editable && "cursor-default"}`}
    >
      {editable && <MenuBar editor={editor}></MenuBar>}
      <EditorContent
        editor={editor}
        className="text-white rounded-xl p-4 focus:outline-none font-body
    max-w-none leading-7 text-neutral-900 dark:text-neutral-100 min-h-35

    [&_p]:m-0
    [&_p]:leading-7
    
    [&_h1]:text-lg md:[&_h1]:text-xl [&_h1]:font-heading [&_h1]:font-bold [&_h1]:mt-0 [&_h1]:mb-1
    [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-0 [&_h2]:mb-2
    [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-0 [&_h3]:mb-2

    [&_ul]:list-disc [&_ul]:pl-6
    [&_ol]:list-decimal [&_ol]:pl-6

    [&_blockquote]:border-l-4 [&_blockquote]:border-indigo-500
    [&_blockquote]:pl-4 [&_blockquote]:text-neutral-500

    [&_code]:bg-neutral-800 [&_code]:p-2 [&_code]:rounded
    [&_hr]:my-2
  "
      />
    </div>
  );
};
