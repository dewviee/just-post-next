import { cn } from "@/utils/classname";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button = ({
  className,
  disabled,
  onClick,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        "flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-1 text-white hover:border-gray-500 hover:bg-primaryActive",
        disabled ? "opacity-70" : "",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
