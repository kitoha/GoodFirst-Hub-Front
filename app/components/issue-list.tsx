import { useEffect, useState } from "react";
import IssueCard from "./issue-card";
import IssueModal from "./IssueModal";
import { useFilter } from "~/components/context/FilterContext";

type Repository = {
  id: string;
  name: string;
  owner: string;
  address: string;
  primaryLanguage: string;
  issueCount: number;
};

type PageInfo = {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
};

type RepositoryResponse = {
  content: Repository[];
  page: PageInfo;
};

async function fetchRepositories(
  page: number,
  languages: string[],
  labels: string[]
): Promise<RepositoryResponse> {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("size", "27");
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
  const [totalPages, setTotalPages] = useState(0);

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
          setRepos(data.content);
          setHasMore(data.page.number < data.page.totalPages - 1);
          setTotalPages(data.page.totalPages);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    return () => {
      ignore = true;
    };
  }, [page, selectedLangs, selectedLabels]);

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

        {loading && (
          <p className="text-center text-sm text-muted-foreground">
            로딩 중…
          </p>
        )}

        {!loading && totalPages > 1 && (
          <div className="flex justify-center mt-16 items-center gap-3 flex-wrap">
            <button
              disabled={page === 0}
              onClick={() => setPage(0)}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-sm flex items-center justify-center"
            >
              {"<<"}
            </button>

            <button
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-sm flex items-center justify-center"
            >
              {"<"}
            </button>

            {Array.from({ length: totalPages }, (_, idx) => {
              if (
                idx === 0 ||
                idx === totalPages - 1 ||
                (idx >= page - 1 && idx <= page + 1)
              ) {
                return (
                  <button
                    key={idx}
                    onClick={() => setPage(idx)}
                    className={`w-8 h-8 rounded-full text-sm flex items-center justify-center transition ${page === idx
                      ? "bg-blue-500 text-white font-bold"
                      : "bg-gray-100 hover:bg-gray-200"
                      }`}
                  >
                    {idx + 1}
                  </button>
                );
              } else if (idx === page - 2 || idx === page + 2) {
                return (
                  <span
                    key={idx}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm"
                  >
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              disabled={page === totalPages - 1}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-sm flex items-center justify-center"
            >
              {">"}
            </button>

            {/* >> 끝 */}
            <button
              disabled={page === totalPages - 1}
              onClick={() => setPage(totalPages - 1)}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-sm flex items-center justify-center"
            >
              {">>"}
            </button>
          </div>
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
