import { Bookmark, BookmarkCheck } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";
import { MouseEvent, useState } from "react";

type Label = {
  name: string;
  color: string;
};

type IssueCardProps = {
  title: string;
  repo: string;
  labels?: Label[];
  createdAt?: string;
  onClick?: () => void;
};

export default function IssueCard({
  title,
  repo,
  labels = [],
  createdAt,
  onClick,
}: IssueCardProps) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <Card
      onClick={onClick}
      className="relative hover:shadow-md transition-shadow cursor-pointer"
    >
      <button
        className="absolute top-3 right-3 text-muted-foreground"
        onClick={(e: MouseEvent) => {
          e.stopPropagation();
          setBookmarked((b) => !b);
        }}
      >
        {bookmarked ? (
          <BookmarkCheck className="w-5 h-5 text-yellow-500" />
        ) : (
          <Bookmark className="w-5 h-5" />
        )}
      </button>

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
    </Card>
  );
}
