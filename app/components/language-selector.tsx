import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function LanguageSelector() {
  const [languages, setLanguages] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/language");
        const data = await res.json();
        setLanguages(data);
      } catch (err) {
        console.error("Failed to fetch languages:", err);
      }
    };

    fetchLanguages();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-md shadow-sm px-4 py-3 flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={() => scroll("left")}>
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide hide-scrollbar scroll-smooth flex-1"
      >
        <Button
          key="All"
          variant={selected === "All" ? "default" : "outline"}
          className="rounded-full text-sm px-4 py-1 whitespace-nowrap"
          onClick={() => setSelected("All")}
        >
          All
        </Button>

        {languages.map((lang) => (
          <Button
            key={lang}
            variant={selected === lang ? "default" : "outline"}
            className="rounded-full text-sm px-4 py-1 whitespace-nowrap"
            onClick={() => setSelected(lang)}
          >
            {lang}
          </Button>
        ))}
      </div>

      <Button variant="ghost" size="icon" onClick={() => scroll("right")}>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
