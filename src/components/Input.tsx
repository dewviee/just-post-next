import { cn } from "@/utils/classname";
import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  handleSetValue: (value: string) => void;
};

const Input = ({ className, handleSetValue, ...props }: InputProps) => {
  return (
    <input
      {...props}
      onChange={(event) => handleSetValue(event.target.value)}
      className={cn(
        "rounded-s border border-solid border-black bg-white px-1",
        className,
      )}
    />
  );
};

export default Input;
