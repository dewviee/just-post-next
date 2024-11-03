import { TPost } from "@/types/post.type";
import { cn } from "@/utils/classname";
import { formatDate } from "@/utils/date";
import React, { useMemo } from "react";

type PostItemProps = React.HTMLAttributes<HTMLDivElement> & {
  post: TPost;
};

export function PostItem({ className, post }: PostItemProps) {
  const formattedDate = useMemo(
    () => formatDate(post.createdAt),
    [post.createdAt],
  );

  return (
    <div className={cn("flex flex-col p-4", className)}>
      <div className="space-x-1">
        <span className="font-bold">{post.user.username}</span>
        <span>·</span>
        <span>{formattedDate}</span>
      </div>
      <span className="whitespace-normal break-words">{post.content}</span>
    </div>
  );
}
