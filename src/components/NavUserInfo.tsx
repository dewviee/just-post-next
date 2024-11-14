import { cn } from "@/utils/classname";
import React, { useState } from "react";
import { FaEllipsis } from "react-icons/fa6";
import { NavUserMenu } from "./NavUserMenu";
import Spinner from "./Spinner";

type NavUserInfoProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  displayName: string | undefined;
  fetching?: boolean;
};

export function NavUserInfo({
  className,
  displayName,
  fetching,
  onClick,
  ...props
}: NavUserInfoProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        {...props}
        className={cn(
          "flex w-24 flex-row items-center justify-between rounded-full px-4 py-1 hover:bg-gray-200",
          className,
        )}
        onClick={(e) => {
          setIsOpen(true);
          onClick?.(e);
        }}
      >
        <div className="font-bold">
          {fetching ? <Spinner /> : (displayName ?? <Spinner />)}
        </div>
        <FaEllipsis />
      </button>

      <NavUserMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
