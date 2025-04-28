import { useEffect, useRef, useState } from "react";
import IssueCard from "./issue-card";
import IssueModal from "./IssueModal";
import { useFilter } from "~/components/context/FilterContext";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";

type Repository = {
  id: string;
  name: string;
  owner: string;
  address: string;
  primaryLanguage: string;
  issueCount: number;
};

type RepositoryResponse = {
  content: Repository[];
  last: boolean;
};

async function fetchRepositories(
  page: number,
  languages: string[],
  labels: string[]
): Promise<RepositoryResponse> {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("size", "10");
  languages.forEach((l) => params.append("language", l));
  labels.forEach((l) => params.append("label", l));

  const res = await fetch(`/api/repositories?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch repositories");
  return res.json();
}

export default function IssueList() {
  const { selectedLangs, selectedLabels } = useFilter();
  const [page, setPage] = useState(0);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRepoId, setSelectedRepoId] = useState<string>("");
  const [selectedRepoName, setSelectedRepoName] = useState("");

  useEffect(() => {
    setPage(0);
    setRepos([]);
    setHasMore(true);
  }, [selectedLangs, selectedLabels]);

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    fetchRepositories(page, selectedLangs, selectedLabels)
      .then((data) => {
        if (!ignore) {
          setRepos((prev) =>
            page === 0 ? data.content : [...prev, ...data.content]
          );
          setHasMore(!data.last);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    return () => {
      ignore = true;
    };
  }, [page, selectedLangs, selectedLabels]);

  useIntersectionObserver({
    target: loaderRef,
    onIntersect: () => {
      if (!loading && hasMore) setPage((p) => p + 1);
    },
    enabled: !loading && hasMore && repos.length > 0,
    rootMargin: "200px",
  });

  const handleCardClick = (id: string, name: string) => {
    setSelectedRepoId(id);
    setSelectedRepoName(name);
    setModalOpen(true);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((r) => (
            <IssueCard
              key={r.id}
              title={`⭐ ${r.name}`}
              repo={`${r.owner}/${r.name}`}
              labels={[{ name: r.primaryLanguage, color: "3b82f6" }]}
              createdAt={`★ ${r.issueCount} issues`}
              onClick={() => handleCardClick(r.id, `${r.owner}/${r.name}`)}
            />
          ))}
        </div>

        {hasMore && repos.length > 0 && (
          <div ref={loaderRef} className="h-10" />
        )}

        {loading && (
          <p className="text-center text-sm text-muted-foreground">
            로딩 중…
          </p>
        )}
      </div>
      <IssueModal
         open={modalOpen}
         repositoryId={selectedRepoId}
         repositoryName={selectedRepoName}
         onClose={() => setModalOpen(false)}
       />
    </>
  );
}
