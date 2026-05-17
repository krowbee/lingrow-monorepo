"use client";
import { Tiptap } from "@/components/TipTap";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
        <h1 className="font-heading text-start text-3xl">{lessonName}</h1>
        <hr className="bg-primary"></hr>
      </CardHeader>
      <CardDescription className="p-0">
        <Tiptap editable={false} content={theory} />
      </CardDescription>
    </Card>
  );
}

export function TheoryBlockSkeleton() {
  return (
    <Card className="w-full px-8 py-4">
      <CardHeader className="p-0">
        <Skeleton className="h-10 w-1/2" />
        <hr className="bg-primary"></hr>
      </CardHeader>
      <CardDescription className="flex flex-col gap-4 p-0">
        {new Array(10).fill(0).map((_, index) => (
          <Skeleton key={index} className="h-4 w-full" />
        ))}
      </CardDescription>
    </Card>
  );
}
