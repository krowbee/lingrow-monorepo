import type { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";

import { menuBarStateSelector } from "./menuBarState";
import { MenuBarState } from "./menuBarState";
import { ToolTip } from "./ToolTip";

export const MenuBar = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState<MenuBarState>({
    editor,
    selector: menuBarStateSelector,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group w-full">
      <div className="button-group flex flex-wrap justify-center gap-2">
        <ToolTip content={"Жирний текст"}>
          <button
            aria-label="Жирний текст"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editorState.canBold}
            className={editorState.isBold ? "is-active" : ""}
          >
            <b>B</b>
          </button>
        </ToolTip>

        <ToolTip content={"Курсив"}>
          <button
            aria-label="Курсив"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editorState.canItalic}
            className={editorState.isItalic ? "is-active" : ""}
          >
            <i className="font-medium">I</i>
          </button>
        </ToolTip>

        <ToolTip content={"Закреслений текст"}>
          <button
            aria-label="Закреслений текст"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editorState.canStrike}
            className={editorState.isStrike ? "is-active" : ""}
          >
            <s>S</s>
          </button>
        </ToolTip>

        <ToolTip content={"Вбудований код"}>
          <button
            aria-label="Вбудований код"
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editorState.canCode}
            className={editorState.isCode ? "is-active" : ""}
          >
            {"</>"}
          </button>
        </ToolTip>

        <ToolTip content={"Очистити форматування"}>
          <button
            aria-label="Очистити форматування"
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
          >
            ⨯
          </button>
        </ToolTip>

        <ToolTip content={"Очистити блоки"}>
          <button
            aria-label="Очистити блоки"
            onClick={() => editor.chain().focus().clearNodes().run()}
          >
            🧹
          </button>
        </ToolTip>

        <ToolTip content={"Параграф"}>
          <button
            aria-label="Параграф"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editorState.isParagraph ? "is-active" : ""}
          >
            ¶
          </button>
        </ToolTip>

        <ToolTip content={"Заголовок 1"}>
          <button
            aria-label="Заголовок 1"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={editorState.isHeading1 ? "is-active" : ""}
          >
            H1
          </button>
        </ToolTip>

        <ToolTip content={"Заголовок 2"}>
          <button
            aria-label="Заголовок 2"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={editorState.isHeading2 ? "is-active" : ""}
          >
            H2
          </button>
        </ToolTip>

        <ToolTip content={"Заголовок 3"}>
          <button
            aria-label="Заголовок 3"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={editorState.isHeading3 ? "is-active" : ""}
          >
            H3
          </button>
        </ToolTip>

        <ToolTip content={"Маркований список"}>
          <button
            aria-label="Маркований список"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editorState.isBulletList ? "is-active" : ""}
          >
            ••
          </button>
        </ToolTip>

        <ToolTip content={"Нумерований список"}>
          <button
            aria-label="Нумерований список"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editorState.isOrderedList ? "is-active" : ""}
          >
            1.
          </button>
        </ToolTip>

        <ToolTip content={"Блок коду"}>
          <button
            aria-label="Блок коду"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editorState.isCodeBlock ? "is-active" : ""}
          >
            [code]
          </button>
        </ToolTip>

        <ToolTip content={"Цитата"}>
          <button
            aria-label="Цитата"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editorState.isBlockquote ? "is-active" : ""}
          >
            ❝
          </button>
        </ToolTip>

        <ToolTip content={"Горизонтальна лінія"}>
          <button
            aria-label="Горизонтальна лінія"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            ―
          </button>
        </ToolTip>

        <ToolTip content={"Розрив рядка"}>
          <button
            aria-label="Розрив рядка"
            onClick={() => editor.chain().focus().setHardBreak().run()}
          >
            ↵
          </button>
        </ToolTip>

        <ToolTip content={"Скасувати"}>
          <button
            aria-label="Скасувати"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editorState.canUndo}
          >
            ↺
          </button>
        </ToolTip>

        <ToolTip content={"Повторити"}>
          <button
            aria-label="Повторити"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editorState.canRedo}
          >
            ↻
          </button>
        </ToolTip>
      </div>
    </div>
  );
};
