import { LucideIcon } from "lucide-react";
import * as React from "react";

export function IconWithText({
  icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  const Icon = icon;
  return (
    <div className="flex w-sm sm:w-3xs flex-row gap-2">
      <div className="flex h-min items-center justify-center rounded-xl bg-purple-500/20 p-2">
        <Icon />
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg text-white">{title}</h3>
        <p className="text-gray-500">{text}</p>
      </div>
    </div>
  );
}
