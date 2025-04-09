import SearchBox from "./search-box";
import LabelFilter from "./label-filter";
import BookmarkedList from "./bookmarked-list";

export default function RightSidebar() {
  return (
    <aside className="w-full lg:max-w-[570px] p-4 space-y-6">
      <SearchBox />
      <LabelFilter />
      <BookmarkedList />
    </aside>
  );
}
