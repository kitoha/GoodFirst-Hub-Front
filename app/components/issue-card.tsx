import { Bookmark, BookmarkCheck } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";
import { useState } from "react";

type Label = {
  name: string;
  color: string;
};

type IssueCardProps = {
  title: string;
  repo: string;
  url: string;
  labels?: Label[];
  createdAt?: string;
};

export default function IssueCard({
  title,
  repo,
  url,
  labels = [],
  createdAt,
}: IssueCardProps) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <Card className="relative hover:shadow-md transition-shadow">
      {/* 찜 버튼 */}
      <button
        className="absolute top-3 right-3 text-muted-foreground"
        onClick={() => setBookmarked(!bookmarked)}
      >
        {bookmarked ? (
          <BookmarkCheck className="w-5 h-5 text-yellow-500" />
        ) : (
          <Bookmark className="w-5 h-5" />
        )}
      </button>

      <a href={url} target="_blank" rel="noopener noreferrer">
        <CardContent className="space-y-2 p-4">
          <h2 className="font-semibold text-lg">{title}</h2>
          <p className="text-sm text-muted-foreground">{repo}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {labels.map((label) => (
              <Badge
                key={label.name}
                style={{ backgroundColor: `#${label.color}` }}
                className="text-white"
              >
                {label.name}
              </Badge>
            ))}
          </div>

          {createdAt && (
            <p className="text-xs text-right text-muted-foreground">
              {createdAt}
            </p>
          )}
        </CardContent>
      </a>
    </Card>
  );
}
