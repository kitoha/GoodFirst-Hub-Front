import { useEffect, useState } from "react";

type LabelDto = {
  name: string;
  color: string;
};

export default function LabelFilter() {
  const [labels, setLabels] = useState<LabelDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/labels");
        const data = await res.json();
        setLabels(data);
      } catch (err) {
        console.error("Failed to fetch labels:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLabels();
  }, []);

  return (
    <div className="bg-white rounded-md shadow p-4">
      <h2 className="font-semibold text-lg mb-2">🏷️ Labels</h2>
      {loading ? (
        <div className="text-sm text-gray-500">Loading labels...</div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {labels.map((label) => (
            <button
              key={label.name}
              className="text-sm px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: label.color }}
            >
              {label.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
