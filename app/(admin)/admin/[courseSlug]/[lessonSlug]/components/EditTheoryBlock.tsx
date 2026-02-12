"use client";
import DOMPurify from "dompurify";
import { Tiptap } from "@/components/TipTap";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

export function TheoryBlock({
  lessonName,
  theory,
}: {
  lessonName: string;
  theory: string;
}) {
  const cleanedTheory = DOMPurify.sanitize(theory);
  return (
    <Card className="w-full px-8 py-4">
      <CardHeader>
        <h1 className="font-heading text-2xl text-center">{lessonName}</h1>
      </CardHeader>
      <hr className="bg-primary"></hr>
      <CardDescription>
        <Tiptap editable={true} content={cleanedTheory} />
      </CardDescription>
    </Card>
  );
}
