import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import publicApi from "../../api/publicApi";

export default function NavbarSearch({ onNavigate }) {
  const [query, setQuery] = useState("");
  const [coffees, setCoffees] = useState([]);
  const [machines, setMachines] = useState([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    publicApi.getCoffees().then(setCoffees).catch(() => {});
    publicApi.getMachines().then(setMachines).catch(() => {});
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setQuery("");
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const trimmed = query.trim().toLowerCase();

  const matchedCoffees = useMemo(() => {
    if (trimmed.length < 2) return [];
    return coffees
      .filter((coffee) =>
        [coffee.name, coffee.origin, coffee.title].some((field) =>
          String(field || "").toLowerCase().includes(trimmed),
        ),
      )
      .slice(0, 5);
  }, [coffees, trimmed]);

  const matchedMachines = useMemo(() => {
    if (trimmed.length < 2) return [];
    return machines
      .filter((machine) =>
        [machine.name, machine.brand, machine.title].some((field) =>
          String(field || "").toLowerCase().includes(trimmed),
        ),
      )
      .slice(0, 5);
  }, [machines, trimmed]);

  const hasResults = matchedCoffees.length > 0 || matchedMachines.length > 0;
  const showDropdown = open && trimmed.length >= 2;

  const handleResultClick = () => {
    setQuery("");
    setOpen(false);
    onNavigate?.();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!trimmed) return;

    const destination = location.pathname.startsWith("/machine") ? "/machines" : "/coffees";
    navigate(`${destination}?q=${encodeURIComponent(trimmed)}`);
    setQuery("");
    setOpen(false);
    onNavigate?.();
  };

  return (
    <div ref={containerRef} className="relative w-full md:w-auto">
      <form onSubmit={handleSubmit} className="relative">
        <Search
          size={15}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9D8E83]"
        />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search coffees & machines..."
          autoComplete="off"
          className="h-9 w-full md:w-[220px] font-instrument-sans text-sm text-brown placeholder:text-[#A89B92] bg-[#FAF5F0] border border-[#E6DDD7] rounded-full outline-none transition-all focus:border-[#C4A882] focus:shadow-[0_0_0_3px_rgba(196,168,130,0.15)] pl-9 pr-8"
        />

        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#9D8E83]"
          >
            <X size={14} />
          </button>
        ) : null}
      </form>

      {showDropdown ? (
        <div className="absolute top-[calc(100%+8px)] left-0 z-[9999] w-full md:w-[320px] max-h-[70vh] overflow-y-auto bg-white rounded-2xl shadow-[0_8px_32px_rgba(59,23,13,0.13)] border border-[#F0E6DF]">
          {!hasResults ? (
            <div className="font-instrument-sans text-sm text-[#A89B92] px-4 py-4">
              No results for "{query}"
            </div>
          ) : (
            <>
              {matchedCoffees.length > 0 ? (
                <section>
                  <div className="font-instrument-sans font-semibold text-xs uppercase tracking-widest text-[#A89B92] px-4 pt-3 pb-1.5">
                    Coffees
                  </div>
                  {matchedCoffees.map((coffee) => (
                    <Link
                      key={coffee._id}
                      to={`/coffees/${coffee._id}`}
                      onClick={handleResultClick}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-[#FAF5F0]"
                    >
                      <img
                        src={coffee.images?.[0] || "/assets/coffee-beans.jpg"}
                        alt={coffee.name}
                        className="w-9 h-9 rounded object-cover shrink-0 bg-[#F0E6DF]"
                      />
                      <div className="min-w-0">
                        <p className="font-instrument-sans font-semibold text-sm text-brown truncate">
                          {coffee.name}
                        </p>
                        <p className="font-instrument-sans text-xs text-[#A89B92]">
                          {coffee.origin ? `${coffee.origin} · ` : ""}${Number(coffee.price || 0).toFixed(2)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </section>
              ) : null}

              {matchedMachines.length > 0 ? (
                <section className={matchedCoffees.length > 0 ? "border-t border-[#F0E6DF]" : ""}>
                  <div className="font-instrument-sans font-semibold text-xs uppercase tracking-widest text-[#A89B92] px-4 pt-3 pb-1.5">
                    Machines
                  </div>
                  {matchedMachines.map((machine) => (
                    <Link
                      key={machine._id}
                      to={`/machine/${machine._id}`}
                      onClick={handleResultClick}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-[#FAF5F0]"
                    >
                      <img
                        src={machine.images?.[0] || "/assets/columbianbrewcoffee.jpg"}
                        alt={machine.name}
                        className="w-9 h-9 rounded object-cover shrink-0 bg-[#F0E6DF]"
                      />
                      <div className="min-w-0">
                        <p className="font-instrument-sans font-semibold text-sm text-brown truncate">
                          {machine.name}
                        </p>
                        <p className="font-instrument-sans text-xs text-[#A89B92]">
                          {machine.brand ? `${machine.brand} · ` : ""}${Number(machine.price || 0).toFixed(2)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </section>
              ) : null}

              <div className="border-t border-[#F0E6DF] px-4 py-2.5 flex flex-wrap gap-3">
                <Link
                  to="/coffees"
                  onClick={handleResultClick}
                  className="font-instrument-sans text-xs text-brown hover:underline"
                >
                  All coffees →
                </Link>
                <Link
                  to="/machines"
                  onClick={handleResultClick}
                  className="font-instrument-sans text-xs text-brown hover:underline"
                >
                  All machines →
                </Link>
              </div>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
