import { Search } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SearchField() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(initialSearch);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search.trim()) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-md font-body flex h-min flex-row items-center gap-2 rounded-xl border border-white/10 bg-purple-500/10 p-2"
    >
      <Search className="size-6 rounded-l-xl text-purple-500" />
      <input
        type="text"
        placeholder="Пошук..."
        className="w-full bg-transparent text-sm outline-none placeholder:text-white/50"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
}
