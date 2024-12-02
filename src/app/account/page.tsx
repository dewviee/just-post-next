"use client";
import { NavBar } from "@/components/NavBar";
import { useUser } from "@/hooks/useUser";
import { TUserProfile } from "@/types/user.type";
import { useEffect, useState } from "react";
import ChangePassword from "./components/ChangePassword";
import EditUsername from "./components/EditUsername";

export default function Account() {
  const [user, setUser] = useState<TUserProfile>({});
  const [isRefetch, setIsRefetch] = useState(true);

  const { getUserProfileFromAccessToken } = useUser();

  useEffect(() => {
    if (!isRefetch) return;

    const controller = new AbortController();
    getUserProfileFromAccessToken(
      (user) => {
        setUser(user);
        setIsRefetch(false);
      },
      () => {},
      controller,
    );

    return () => controller.abort();
  }, [getUserProfileFromAccessToken, isRefetch]);

  const handleRefetchUserProfile = () => {
    setIsRefetch(true);
  };

  return (
    <div className="grid grid-cols-[30%_40%_30%]">
      <NavBar active="none" />
      <div></div>
      <div className="border border-black border-opacity-10 p-6">
        <div className="font-bold">Your Account</div>
        <EditUsername
          user={user}
          onRefetchUserProfile={handleRefetchUserProfile}
        />

        <ChangePassword />
      </div>
    </div>
  );
}
