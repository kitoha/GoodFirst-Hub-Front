import { useEffect, useState } from "react";
import { FileText, Bug, Search } from "lucide-react";

type SearchResultItem = {
  type: "REPOSITORY" | "ISSUE";
  repoId: string;
  repoName: string;
  matchedText: string;
};

export default function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    if (!keyword.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const id = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/repositories/search?keyword=${encodeURIComponent(keyword)}`,
          { signal: controller.signal }
        );
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (err: any) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(id);
      controller.abort();
    };
  }, [keyword]);

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색어를 입력하세요"
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {focused && keyword.trim() && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-auto text-sm">
          {loading && (
            <li className="p-3 text-gray-500">Loading...</li>
          )}

          {!loading && results.length === 0 && (
            <li className="p-3 text-gray-500">검색 결과가 없습니다.</li>
          )}

          {!loading &&
            results.map((item, idx) => (
              <li
                key={idx}
                className="flex gap-3 items-start px-4 py-3 hover:bg-gray-50 transition cursor-pointer"
                onClick={() =>
                  (window.location.href = `/repositories/${item.repoId}`)
                }
              >
                <div className="pt-0.5 text-gray-400">
                  {item.type === "REPOSITORY" ? (
                    <FileText className="w-4 h-4" />
                  ) : (
                    <Bug className="w-4 h-4" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-800 font-medium">
                    {item.repoName}
                  </span>
                  <div
                    className="text-gray-600 text-xs mt-1 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: item.matchedText }}
                  />
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
