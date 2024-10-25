import { cn } from "@/utils/classname";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button = ({ className, onClick, children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "rounded-full bg-primary px-4 py-1 text-white hover:border-gray-500 hover:bg-primaryActive",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
