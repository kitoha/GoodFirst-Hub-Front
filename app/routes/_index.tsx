import Header from "~/components/header";
import LanguageSelector from "~/components/language-selector";
import IssueList from "~/components/issue-list"; 

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="py-4 px-6">
        <LanguageSelector />
      </section>
      <div>
        <IssueList />
      </div>
    </div>
  );
}
