import Header from "~/components/header";
import LanguageSelector from "~/components/language-selector";
import IssueList from "~/components/issue-list";
import RightSidebar from "~/components/right-sidebar";

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="sticky top-0 z-10 bg-white border-b shadow-sm w-full">
        <LanguageSelector />
      </section>
      <main className="flex-1 px-6 py-8 overflow-y-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <IssueList />
          </div>
          <RightSidebar />
        </div>
      </main>
    </div>
  );
}
