import { Badge } from "@/components/ui/badge";
import { BadgeCheck, BadgeX } from "lucide-react";

interface PublicationStatusBadgeProps {
  isPublished: boolean;
}

export function PublicationStatusBadge({
  isPublished,
}: PublicationStatusBadgeProps) {
  return (
    <Badge
      variant={"secondary"}
      className={
        isPublished
          ? `bg-blue-500 text-white dark:bg-blue-600`
          : "bg-amber-500 text-white dark:bg-amber-600"
      }
    >
      {isPublished ? (
        <>
          <BadgeCheck className="w-4 h-4 mr-1" />
          <span>Published</span>
        </>
      ) : (
        <>
          <BadgeX className="w-4 h-4 mr-1" />
          <span>Draft</span>
        </>
      )}
    </Badge>
  );
}
