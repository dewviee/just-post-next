"use client";
import { PostContainer } from "@/components/Post/PostContainer";

export default function Home() {
  return (
    <div className="grid grid-cols-[30%_40%_30%]">
      <PostContainer />
    </div>
  );
}
