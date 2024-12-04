"use client";
import api from "@/api/instance";
import { pathJustPostV1 } from "@/api/path";
import { NavBar } from "@/components/NavBar";
import { CreatePost } from "@/components/Post/CreatePost";
import { PostContainer } from "@/components/Post/PostContainer";
import { postConfig } from "@/config/post.config";
import { CONST_ERROR_LIKE_POST } from "@/constants/message";
import { useCountdownCooldown } from "@/hooks/useCountdownCooldown";
import { useGetPost } from "@/hooks/usePost";
import { TPost } from "@/types/post.type";
import { handleApiRequest } from "@/utils/api";
import { getScrollPercentage } from "@/utils/scroll";
import { getUserAccessToken } from "@/utils/user";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

  const handleToggleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLike: !post.isLike,
              like: post.isLike ? post.like - 1 : post.like + 1,
            }
          : post,
      ),
    );

    const post = posts.find((post) => post.id === postId);
    if (post) {
      handleLikePost(postId, !post.isLike);
    }
  };

  /**
   * Handles the like/unlike action for a post.
   * Sends a POST request to like or a DELETE request to unlike based on `isLikePost`.
   *
   * @param postId - The ID of the post to like or unlike.
   * @param isLikePost - `true` to like the post, `false` to unlike it.
   */
  const handleLikePost = async (postId: string, isLikePost: boolean) => {
    const accessToken = getUserAccessToken();
    const request = api.request({
      method: isLikePost ? "post" : "delete",
      url: `${pathJustPostV1.post.likePost}/${postId}`,
      headers: {
        Authorization: accessToken,
      },
    });

    console.log(isLikePost ? "post" : "delete");
    const { error } = await handleApiRequest(request);

    if (error) {
      toast.error(CONST_ERROR_LIKE_POST);
    }
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
          handleToggleLike={handleToggleLike}
        />
      </div>
    </div>
  );
}
