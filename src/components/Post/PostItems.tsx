import { TPost } from "@/types/post.type";
import { cn } from "@/utils/classname";
import { formatDate } from "@/utils/date";
import React, { useMemo } from "react";
import PostAction from "./PostAction";

type PostItemProps = React.HTMLAttributes<HTMLDivElement> & {
  post: TPost;
  handleToggleLike: () => void;
};

export function PostItem({ className, handleToggleLike, post }: PostItemProps) {
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
        <span className="font-bold">{post.user.username}</span>
        <span className="text-gray-400">·</span>
        <span className="text-gray-400">{formattedDate}</span>
      </div>
      <span className="whitespace-pre-wrap break-words">{post.content}</span>
      <PostAction
        className="mt-1"
        handleToggleLike={handleToggleLike}
        isLike={post.isLike}
        like={post.like}
      />
    </div>
  );
}
