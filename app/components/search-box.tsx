export default function SearchBox() {
    return (
      <div className="bg-white rounded-md shadow p-4 space-y-2">
        <h2 className="font-semibold text-lg">🔍 Search</h2>
        <input
          type="text"
          placeholder="Search issues..."
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring"
        />
      </div>
    );
  }
  