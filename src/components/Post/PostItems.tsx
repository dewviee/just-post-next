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
    <div
      className={cn(
        "flex flex-col border border-black border-opacity-5 p-4 hover:bg-gray-50",
        className,
      )}
    >
      <div className="space-x-1">
        <span className="align-bottom font-bold">{post.user.username}</span>
        <span className="align-bottom text-gray-400">·</span>
        <span className="inline-block align-bottom text-sm text-gray-400">
          {formattedDate}
        </span>
      </div>
      <span className="whitespace-normal break-words">{post.content}</span>
    </div>
  );
}
