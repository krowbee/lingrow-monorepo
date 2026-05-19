"use client";
import { useState } from "react";
import { FilterButtons } from "./FilterButtons";
import { StatusType } from "@/types/filterType";
import { CoursesTable } from "./CoursesTable";

export function CoursesBlock({
  search,
}: {
  search: string | null | undefined;
}) {
  const [filter, setFilter] = useState<StatusType | null>(null);
  return (
    <section className="w-full overflow-hidden rounded-xl border border-white/10 text-zinc-100">
      <div className="flex w-full flex-col gap-4 border-b border-white/10 p-4 lg:flex-row lg:items-center">
        <div className="scrollbar-x-hidden flex w-full overflow-x-auto">
          <div className="flex min-w-max gap-3">
            <FilterButtons filter={filter} setFilter={setFilter} />
          </div>
        </div>
      </div>
      <CoursesTable />
    </section>
  );
}
