"use client";

import { Tiptap } from "@/components/TipTap";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { JSONContent } from "@tiptap/react";

export function TheoryBlock({
  lessonName,
  theory,
}: {
  lessonName: string;
  theory: JSONContent;
}) {
  const [name, setName] = useState<string>(lessonName);
  const [text, setText] = useState<JSONContent>(theory);

  const [lastSavedText, setLastSavedText] = useState(theory);
  const [lastSavedName, setLastSavedName] = useState(lessonName);

  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (
        name != lastSavedName ||
        JSON.stringify(lastSavedText) !== JSON.stringify(text)
      ) {
        console.log("Зберігаємо зміни");
        setLastSavedName(name);
        setLastSavedText(text);
      }
    }, 1000);
    return () => clearTimeout(delayDebounce);
  }, [lessonName, name, text, theory, lastSavedName, lastSavedText]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nameRef.current?.blur();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain").replace(/\n|\r/g, "");
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(text));
    selection.collapseToEnd();
  };

  const handleNameInput = () => {
    if (nameRef.current) {
      setName(nameRef.current.innerText);
    }
  };

  return (
    <Card className="w-full px-8 py-4">
      {text && <p>{JSON.stringify(text)}</p>}
      <CardHeader>
        <h1
          className="font-heading text-2xl text-center"
          ref={nameRef}
          onInput={() => handleNameInput()}
          onKeyDown={(e) => handleKeyDown(e)}
          onPaste={(e) => handlePaste(e)}
          contentEditable
          suppressContentEditableWarning
        >
          {lessonName}
        </h1>
      </CardHeader>
      <hr className="bg-primary"></hr>
      <CardDescription>
        <Tiptap editable={true} content={theory} setText={setText} />
      </CardDescription>
    </Card>
  );
}
