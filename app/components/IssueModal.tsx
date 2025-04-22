import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";

type IssueDto = {
  id: string;
  title: string;
  url: string;
  issueNumber: number;
  createdAt: string;
};

type ApiResponse<T> = {
  content: T[];
  page: {
    number: number;
    totalPages: number;
  };
};

interface IssueModalProps {
  open: boolean;
  repositoryId: string; 
  repositoryName: string;
  onClose: () => void;
}

export default function IssueModal({
  open,
  repositoryId,
  repositoryName,
  onClose,
}: IssueModalProps) {
  const [issues, setIssues] = useState<IssueDto[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setPage(0);
  }, [open, repositoryId]);

  useEffect(() => {
    if (!open) return;
    setLoading(true);

    fetch(`/api/repositories/${repositoryId}/issues?page=${page}&size=5`)
      .then((res) => res.json())
      .then((data: ApiResponse<IssueDto>) => {
        setIssues(data.content);
        setTotalPages(data.page.totalPages);
      })
      .finally(() => setLoading(false));
  }, [open, repositoryId, page]);

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-xl w-full rounded-xl border bg-white shadow-xl px-6 py-5">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl font-semibold">
            Issues for {repositoryName}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Open-source issues from GitHub. Page {page + 1} of {totalPages}
          </DialogDescription>
        </DialogHeader>

        {/* ISSUE LIST */}
        <div className="space-y-4 mt-2">
          {loading ? (
            <p className="text-center text-gray-400">Loading...</p>
          ) : (
            issues.map((issue) => (
              <a
                key={issue.id}
                href={issue.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-50 hover:bg-gray-100 transition rounded-lg px-4 py-3"
              >
                <p className="text-sm font-medium text-gray-900 line-clamp-2">
                  {issue.title}
                </p>
                <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                  <span>#{issue.issueNumber}</span>
                  <span>•</span>
                  <span>
                    {new Date(issue.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </a>
            ))
          )}
        </div>

        {/* PAGINATION */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => canPrev && setPage((p) => p - 1)}
            disabled={!canPrev || loading}
          >
            Previous
          </Button>

          <div className="text-sm text-gray-600">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                className={`mx-1 px-2 py-0.5 rounded ${
                  page === idx ? "bg-gray-900 text-white" : "text-gray-500"
                }`}
                onClick={() => setPage(idx)}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => canNext && setPage((p) => p + 1)}
            disabled={!canNext || loading}
          >
            Next
          </Button>
        </div>

        <DialogClose asChild>
          <button className="mt-5 block w-full text-center text-sm text-gray-500 hover:text-black transition">
            Close
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
