import { useEffect, useState } from "react";
import { useFilter } from "~/components/context/FilterContext";

type LabelDto = { name: string; color: string };

export default function LabelFilter() {
  const { selectedLabels, setSelectedLabels } = useFilter();
  const [labels, setLabels] = useState<LabelDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/labels")
      .then((res) => res.json())
      .then((data: LabelDto[]) => setLabels(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-sm text-gray-500">Loading labels...</div>;
  }

  const toggleLabel = (name: string) => {
    setSelectedLabels(
      selectedLabels.includes(name)
        ? selectedLabels.filter((l) => l !== name)
        : [...selectedLabels, name]
    );
  };

  return (
    <div className="bg-white rounded-md shadow p-4">
      <h2 className="font-semibold text-lg mb-2">🏷️ Labels</h2>
      <div className="flex flex-wrap gap-2">
        <button
          className={`text-sm px-3 py-1 rounded-full ${
            selectedLabels.length === 0
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setSelectedLabels([])}
        >
          All
        </button>
        {labels.map((label) => (
          <button
            key={label.name}
            className={`text-sm px-3 py-1 rounded-full ${
              selectedLabels.includes(label.name)
                ? "text-white"
                : "text-gray-700"
            }`}
            style={{
              backgroundColor: selectedLabels.includes(label.name)
                ? `#${label.color}`
                : "#e5e7eb",
            }}
            onClick={() => toggleLabel(label.name)}
          >
            {label.name}
          </button>
        ))}
      </div>
    </div>
  );
}