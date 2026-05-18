"use client";
import { useState } from "react";
import { FilterButtons } from "./FilterButtons";
import { StatusType } from "@/types/filterType";

export function CoursesBlock() {
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

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-left text-sm text-white/50">
              <th className="px-4 py-3 font-normal">
                <p>Назва курсу</p>
              </th>

              <th className="px-4 py-3 font-normal">
                <p>Уроків</p>
              </th>

              <th className="px-4 py-3 font-normal">
                <p>Статус</p>
              </th>

              <th className="px-4 py-3 text-right font-normal">
                <p>Дії</p>
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="border-b border-white/10">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    <div className="h-11 w-11 shrink-0 rounded-lg bg-white/10" />

                    <div className="min-w-0 space-y-2">
                      <div className="h-3 w-40 rounded bg-white/15" />
                      <div className="h-3 w-52 rounded bg-white/10" />
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <div className="h-3 w-8 rounded bg-white/10" />
                </td>

                <td className="px-4 py-3">
                  <div className="h-7 w-24 rounded-lg" />
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button className="h-9 w-9 rounded-lg border border-white/10" />
                    <button className="h-9 w-9 rounded-lg border border-white/10" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
