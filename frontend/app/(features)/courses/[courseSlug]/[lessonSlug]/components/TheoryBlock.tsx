"use client";
import { Tiptap } from "@/components/TipTap";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { JSONContent } from "@tiptap/react";

export function TheoryBlock({
  lessonName,
  theory,
}: {
  lessonName: string;
  theory: JSONContent;
}) {
  return (
    <Card className="w-full px-8 py-4">
      <CardHeader className="p-0">
        <h1 className="font-heading text-3xl text-start">{lessonName}</h1>
        <hr className="bg-primary"></hr>
      </CardHeader>
      <CardDescription className="p-0">
        <Tiptap editable={false} content={theory} />
      </CardDescription>
    </Card>
  );
}
