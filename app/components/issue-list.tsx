import { useEffect, useRef, useState } from "react";
import IssueCard from "./issue-card";

type RepositoryResponse = {
  content: Repository[];
  totalPages: number;
  number: number;
  last: boolean; 
};

type Repository = {
  id: string;
  name: string;
  owner: string;
  address: string;
  primaryLanguage: string;
  startCount: number;
  issueCount: number;
};

async function fetchRepositories(page: number): Promise<RepositoryResponse> {
  const res = await fetch(`http://localhost:8080/api/repositories?page=${page}&size=10`);
  if (!res.ok) {
    throw new Error("Failed to fetch repositories");
  }
  return res.json();
}

export default function IssueList() {
  const [page, setPage] = useState(0);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        const res = await fetchRepositories(page);
        if (!ignore) {
          setRepositories((prev) => [...prev, ...res.content]);
          setHasMore(!res.last); // 응답에 last: true가 오면 끝
        }
      } catch (err) {
        console.error(err);
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    const target = loaderRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasMore]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {repositories.map((repo) => (
          <IssueCard
            key={repo.id}
            title={`⭐ ${repo.name}`}
            repo={`${repo.owner}/${repo.name}`}
            url={repo.address}
            labels={[
              {
                name: repo.primaryLanguage ?? "unknown",
                color: "3b82f6",
              },
            ]}
            createdAt={`★ ${repo.issueCount} issues`}
          />
        ))}
      </div>
      {hasMore && (
        <div ref={loaderRef} className="h-10" />
      )}
    </div>
  );
}
