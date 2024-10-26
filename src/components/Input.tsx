import { cn } from "@/utils/classname";
import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {};

const Input = ({ className, onChange, ...props }: InputProps) => {
  return (
    <input
      {...props}
      onChange={onChange}
      className={cn(
        "rounded-s border border-solid border-black bg-white px-1",
        className,
      )}
    />
  );
};

export default Input;
