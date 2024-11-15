"use client";
import { NavBar } from "@/components/NavBar";
import { CreatePost } from "@/components/Post/CreatePost";
import { PostContainer } from "@/components/Post/PostContainer";
import { postConfig } from "@/config/post.config";
import { useCountdownCooldown } from "@/hooks/useCountdownCooldown";
import { useGetPost } from "@/hooks/usePost";
import { TPost } from "@/types/post.type";
import { getScrollPercentage } from "@/utils/scroll";
import { useEffect, useState } from "react";

export default function Home() {
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

  const handleAddNewPost = (post: TPost) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  };

  return (
    <div className="grid grid-cols-[30%_40%_30%]">
      <NavBar active="home" />
      <div></div>
      <div>
        <CreatePost handleAddNewUserPost={handleAddNewPost} />
        <PostContainer
          posts={posts}
          isFetching={isFetching}
          isCooldown={isCooldown}
        />
      </div>
    </div>
  );
}
