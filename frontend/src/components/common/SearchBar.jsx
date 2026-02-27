import { Search } from "lucide-react";

export default function SearchBar({ placeholder = "Search...", value, onChange }) {
  return (
    <div className="relative w-full sm:max-w-xs md:max-w-sm">
      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9D8E83] z-[2]"
        size={18}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value ?? ""}
        onChange={onChange}
        autoComplete="off"
        style={{ position: "relative", zIndex: 1 }}
        className="h-11 w-full rounded-full border border-[#E6DDD7] bg-white pl-11 pr-4 text-sm text-brown shadow-sm outline-none transition-shadow placeholder:text-[#A89B92] focus:border-[#D7C8BE] focus:shadow-[0_0_0_3px_rgba(59,23,13,0.08)]"
      />
    </div>
  );
}
