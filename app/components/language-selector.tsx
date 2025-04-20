import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFilter } from "~/components/context/FilterContext";

export default function LanguageSelector() {
  const { selectedLangs, setSelectedLangs } = useFilter();
  const [languages, setLanguages] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/language")
      .then((res) => res.json())
      .then(setLanguages)
      .catch(console.error);
  }, []);

  const toggleLang = (lang: string) => {
    if (lang === "All") {
      setSelectedLangs([]);
    } else {
      setSelectedLangs(
        selectedLangs.includes(lang)
          ? selectedLangs.filter((l) => l !== lang)
          : [...selectedLangs, lang]
      );
    }
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full bg-white border rounded-md shadow-sm px-4 py-3 flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={() => scroll("left")}>
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto hide-scrollbar scroll-smooth flex-1"
      >
        <Button
          variant={selectedLangs.length === 0 ? "default" : "outline"}
          className="rounded-full text-sm px-4 py-1 whitespace-nowrap"
          onClick={() => toggleLang("All")}
        >
          All
        </Button>

        {languages.map((lang) => (
          <Button
            key={lang}
            variant={selectedLangs.includes(lang) ? "default" : "outline"}
            className="rounded-full text-sm px-4 py-1 whitespace-nowrap"
            onClick={() => toggleLang(lang)}
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