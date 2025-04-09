export default function BookmarkedList() {
    // 더미 데이터
    const bookmarks = [
      { title: "Fix login bug", repo: "openai/chatgpt" },
      { title: "Improve docs", repo: "vercel/next.js" },
    ];
  
    return (
      <div className="bg-white rounded-md shadow p-4">
        <h2 className="font-semibold text-lg mb-2">⭐ Bookmarked</h2>
        <ul className="space-y-2 text-sm">
          {bookmarks.map((issue, idx) => (
            <li key={idx} className="border p-2 rounded">
              <p className="font-medium">{issue.title}</p>
              <p className="text-muted-foreground text-xs">{issue.repo}</p>
            </li>
          ))}
          <button className="text-blue-500 mt-2 text-sm hover:underline">
            더보기 →
          </button>
        </ul>
      </div>
    );
  }
  