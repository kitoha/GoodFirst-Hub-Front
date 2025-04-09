const labels = ["bug", "enhancement", "good first issue", "help wanted"];

export default function LabelFilter() {
  return (
    <div className="bg-white rounded-md shadow p-4">
      <h2 className="font-semibold text-lg mb-2">🏷️ Labels</h2>
      <div className="flex flex-wrap gap-2">
        {labels.map((label) => (
          <button
            key={label}
            className="bg-gray-100 hover:bg-gray-200 text-sm px-3 py-1 rounded-full"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
