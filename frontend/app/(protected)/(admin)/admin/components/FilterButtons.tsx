import { StatusType } from "@/types/filterType";

export function FilterButtons({
  filter,
  setFilter,
}: {
  filter: StatusType | null;
  setFilter: (filter: StatusType | null) => void;
}) {
  return (
    <div className="hide-scrollbar flex w-full flex-row overflow-x-auto p-2">
      <div className="filter-button flex gap-2">
        <button
          className={
            filter === null
              ? "shrink-0 cursor-pointer rounded-xl border bg-purple-500 px-4 py-2 text-white"
              : "shrink-0 cursor-pointer rounded-xl border px-4 py-2"
          }
          onClick={() => setFilter(null)}
        >
          Всі
        </button>
        <button
          className={
            filter === "PUBLISHED"
              ? "shrink-0 cursor-pointer rounded-xl border bg-purple-500 px-4 py-2 text-white"
              : "shrink-0 cursor-pointer rounded-xl border px-4 py-2"
          }
          onClick={() => setFilter("PUBLISHED")}
        >
          Опубліковані
        </button>
        <button
          className={
            filter === "DRAFT"
              ? "shrink-0 cursor-pointer rounded-xl border bg-purple-500 px-4 py-2 text-white"
              : "shrink-0 cursor-pointer rounded-xl border px-4 py-2"
          }
          onClick={() => setFilter("DRAFT")}
        >
          Чернетки
        </button>
        <button
          className={
            filter === "ARCHIVED"
              ? "shrink-0 cursor-pointer rounded-xl border bg-purple-500 px-4 py-2 text-white"
              : "shrink-0 cursor-pointer rounded-xl border px-4 py-2"
          }
          onClick={() => setFilter("ARCHIVED")}
        >
          Архівовані
        </button>
      </div>
    </div>
  );
}
