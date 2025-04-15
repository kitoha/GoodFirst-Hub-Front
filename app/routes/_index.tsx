import TopHeader from "~/components/TopHeader";
import Header from "~/components/header";
import LanguageSelector from "~/components/language-selector";
import IssueList from "~/components/issue-list";
import RightSidebar from "~/components/right-sidebar";
import Footer from "~/components/footer";

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <TopHeader />
      <div className="flex justify-center mt-4 flex-1 px-4  mb-8">
        <div className="w-full max-w-[1800px] bg-white rounded-xl shadow border border-gray-200 px-6 py-8 flex flex-col flex-1">
          <Header />
          <section className="py-6">
            <LanguageSelector />
          </section>
          <main className="py-8 flex gap-6 flex-1">
            <div className="flex-1">
              <IssueList />
            </div>
            <aside className="w-full max-w-xs lg:max-w-sm xl:max-w-md space-y-6">
              <RightSidebar />
            </aside>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
