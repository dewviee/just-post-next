import { TPost } from "@/types/post.type";
import { cn } from "@/utils/classname";
import React from "react";
import Spinner from "../Spinner";
import { PostItem } from "./PostItems";

type PostContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  posts: TPost[];
  isFetching?: boolean;
  isCooldown?: boolean;
  handleToggleLike?: (postId: string) => void;
};

export function PostContainer({
  className,
  posts,
  isFetching,
  isCooldown,
  handleToggleLike,
  ...props
}: PostContainerProps) {
  return (
    <div {...props} className={cn("pb-3", className)}>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          handleToggleLike={() => handleToggleLike?.(post.id)}
        />
      ))}

      {(isFetching || isCooldown || posts.length === 0) && (
        <Spinner className="p-2" />
      )}
    </div>
  );
}
