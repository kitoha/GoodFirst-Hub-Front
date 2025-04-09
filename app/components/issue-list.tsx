import { useEffect, useRef, useState } from "react";
import IssueCard from "./issue-card";

type Issue = {
  title: string;
  repo: string;
  url: string;
  labels?: { name: string; color: string }[];
  createdAt?: string;
};

const allDummyIssues = Array.from({ length: 50 }, (_, i) => ({
  title: `Issue ${i + 1}`,
  repo: "example/repo",
  url: "https://github.com/example/repo/issues/1",
  labels: [{ name: "good first issue", color: "3b82f6" }],
  createdAt: `${i + 1} days ago`,
}));

export default function IssueList() {
  const [page, setPage] = useState(1);
  const [issues, setIssues] = useState<Issue[]>([]);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    const newIssues = allDummyIssues.slice(0, page * ITEMS_PER_PAGE);
    setIssues(newIssues);
  }, [page]);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
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
}, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {issues.map((issue, idx) => (
          <IssueCard key={idx} {...issue} />
        ))}
      </div>
    </div>
  );
}
