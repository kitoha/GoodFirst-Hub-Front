// app/components/language-selector.tsx
import { useState, useRef } from "react";
import { Button } from "~/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const languages = ["JavaScript", "TypeScript", "Python", "Java", "C#", "PHP", "Ruby", "Go", "Rust", "Kotlin"];

export default function LanguageSelector() {
  const [selected, setSelected] = useState("JavaScript");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -150 : 150,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex items-center justify-center w-full px-4 py-3 overflow-x-auto scrollbar-hide gap-2">
      <Button variant="ghost" size="icon" onClick={() => scroll("left")}>
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide"
      >
        {languages.map((lang) => (
          <Button
            key={lang}
            variant={selected === lang ? "default" : "outline"}
            className="rounded-full text-sm whitespace-nowrap px-4"
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
