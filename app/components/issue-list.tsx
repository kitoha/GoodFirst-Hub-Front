import { useEffect, useRef, useState } from "react";
import IssueCard from "./issue-card";
import { useFilter } from "~/components/context/FilterContext";

type Repository = {
  id: string;
  name: string;
  owner: string;
  address: string;
  primaryLanguage: string;
  startCount: number;
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

  useEffect(() => {
    if (!hasMore || loading || repos.length === 0) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setPage((p) => p + 1);
      },
      { rootMargin: "200px", threshold: 0.1 }
    );
    loaderRef.current && obs.observe(loaderRef.current);
    return () => obs.disconnect();
  }, [hasMore, loading, repos.length]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((r) => (
          <IssueCard
            key={r.id}
            title={`⭐ ${r.name}`}
            repo={`${r.owner}/${r.name}`}
            url={r.address}
            labels={[
              { name: r.primaryLanguage, color: "3b82f6" },
            ]}
            createdAt={`★ ${r.issueCount} issues`}
          />
        ))}
      </div>
      {hasMore && repos.length > 0 && (
        <div ref={loaderRef} className="h-10" />
      )}
    </div>
  );
}