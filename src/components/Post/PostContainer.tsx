import { postConfig } from "@/config/post.config";
import { useCountdownCooldown } from "@/hooks/useCountdownCooldown";
import { useGetPost } from "@/hooks/usePost";
import { TPost } from "@/types/post.type";
import { cn } from "@/utils/classname";
import { getScrollPercentage } from "@/utils/scroll";
import React, { useEffect, useState } from "react";
import Spinner from "../Spinner";
import { PostItem } from "./PostItems";

type PostContainerProps = React.HTMLAttributes<HTMLDivElement> & {};

export function PostContainer({ className, ...props }: PostContainerProps) {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [latestLoadID, setLatestLoadID] = useState<string | undefined>();

  const { getPost, getPostWhenBottom } = useGetPost();
  const { startCooldown, isCooldown } = useCountdownCooldown({
    cooldownTime: postConfig.fetchCooldown,
    autoStart: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    getPost({
      isFetching,
      setIsFetching,
      setPosts,
      latestLoadID,
      setLatestLoadID,
      controller,
      isCooldown,
      startCooldown,
    });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        isCooldown,
        startCooldown,
      };
      getPostWhenBottom(scrollPercentage, getPostParams);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetching, isCooldown, getPostWhenBottom, latestLoadID, startCooldown]);

  return (
    <div {...props} className={cn("pb-3", className)}>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}

      {(isFetching || isCooldown) && <Spinner className="p-2" />}
    </div>
  );
}
