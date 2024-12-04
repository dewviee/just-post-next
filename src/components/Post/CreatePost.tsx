import api from "@/api/instance";
import { pathJustPostV1 } from "@/api/path";
import { TPost, TPostPostRequest, TPostPostResponse } from "@/types/post.type";
import { handleApiRequest } from "@/utils/api";
import { cn } from "@/utils/classname";
import { convertDate } from "@/utils/date";
import { getUserAccessToken } from "@/utils/user";
import React, { useState } from "react";
import Button from "../Button";
import { TextareaAutoExpanded } from "../TextAreaAutoExpanded";

type CreatePostProps = React.HTMLAttributes<HTMLDivElement> & {
  handleAddNewUserPost?: (post: TPost) => void;
};

export function CreatePost({
  className,
  handleAddNewUserPost,
}: CreatePostProps) {
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handleReduceOpacityWhenContentEmpty = () => {
    return content ? "" : "opacity-60";
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleCreatePost = async () => {
    const payload = { content: content } as TPostPostRequest;

    const { result, error } = await handleApiRequest(
      api.post(pathJustPostV1.post.createPost, payload, {
        headers: { Authorization: getUserAccessToken() },
      }),
      setIsPosting,
    );

    if (error) return;

    if (result) {
      const post = (result.data as TPostPostResponse).data;
      const formattedPost: TPost = {
        id: post.id,
        content: post.content,
        createdAt: convertDate(post.createdAt),
        updatedAt: convertDate(post.updatedAt),
        user: post.user,
        like: post.like ?? 0,
        isLike: post.isLike ?? false,
      };

      handleAddNewUserPost?.(formattedPost);
      handleResetContent();
      document.body.style.cursor = "";
    }
  };

  const handleResetContent = () => {
    setContent("");
  };

  return (
    <div className={cn("border border-black border-opacity-5", className)}>
      <TextareaAutoExpanded
        value={content}
        onChange={handleChangeContent}
        disabled={isPosting}
      />

      <div className="flex w-full flex-row-reverse px-3 pb-2">
        <Button
          className={cn(
            "",
            handleReduceOpacityWhenContentEmpty(),
            isPosting ? "hover:cursor-wait" : "",
          )}
          disabled={!content || isPosting}
          onClick={handleCreatePost}
        >
          Post
        </Button>
      </div>
    </div>
  );
}
