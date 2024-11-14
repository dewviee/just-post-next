"use client";
import { NavBar } from "@/components/NavBar";
import { PostContainer } from "@/components/Post/PostContainer";

export default function Home() {
  return (
    <div className="grid grid-cols-[30%_40%_30%]">
      <NavBar active="home" />
      <div></div>
      <PostContainer />
    </div>
  );
}
