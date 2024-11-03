import { useGetPost } from "@/hooks/usePost";
import { TPost } from "@/types/post.type";
import { cn } from "@/utils/classname";
import { getScrollPercentage } from "@/utils/scroll";
import React, { useEffect, useState } from "react";
import { PostItem } from "./PostItems";

type PostContainerProps = React.HTMLAttributes<HTMLDivElement> & {};

export function PostContainer({ className, ...props }: PostContainerProps) {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [latestLoadID, setLatestLoadID] = useState<string | undefined>();

  const { getPost, getPostWhenBottom } = useGetPost();

  useEffect(() => {
    const controller = new AbortController();
    getPost({
      isFetching,
      setIsFetching,
      setPosts,
      latestLoadID,
      setLatestLoadID,
      controller,
    });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = getScrollPercentage();
      const getPostParams = {
        isFetching,
        setIsFetching,
        setPosts,
        latestLoadID,
        setLatestLoadID,
      };
      getPostWhenBottom(scrollPercentage, getPostParams);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetching]);

  return (
    <div {...props} className={cn("", className)}>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
