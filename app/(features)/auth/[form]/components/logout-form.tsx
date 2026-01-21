"use client";
import { Button } from "../../../../../components/ui/button";
import {
  Card,
  CardDescription,
  CardTitle,
} from "../../../../../components/ui/card";

export function LogoutForm() {
  return (
    <div className="flex items-center w-full h-full justify-center">
      <Card className="rounded-xl max-w-[390px] h-min border-none bg-neutral-800 justify-center px-6">
        <CardTitle className="text-white font-heading">
          Вийти з облікового запису
        </CardTitle>
        <CardDescription>
          Ви впевнені що хочете вийти з цього облікового запису?
        </CardDescription>
        <div className="flex w-full justify-center gap-4">
          <Button className="bg-neutral-700 cursor-pointer">Так</Button>
          <Button className="cursor-pointer">Ні</Button>
        </div>
      </Card>
    </div>
  );
}
