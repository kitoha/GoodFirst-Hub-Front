import Header from "~/components/header";
import LanguageSelector from "~/components/language-selector";
import IssueList from "~/components/issue-list";
import RightSidebar from "~/components/right-sidebar";

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex justify-center">
      <div className="w-full max-w-[1800px] border-x border-gray-300 px-6">
        <Header />
        <section className="py-4 ">
          <LanguageSelector />
        </section>
        <main className="py-8 flex gap-6">
          <div className="flex-1">
            <IssueList />
          </div>
          <aside className="w-full max-w-xs lg:max-w-sm xl:max-w-md space-y-6">
            <RightSidebar />
          </aside>
        </main>
      </div>
    </div>
  );
}

