import { cn } from "@/utils/classname";
import { useEffect, useLayoutEffect, useRef } from "react";

type TextareaAutoExpandedProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    initRows?: number;
  };

export function TextareaAutoExpanded({
  className,
  initRows = 3,
  placeholder = "Tell other about your story...",
  ...props
}: TextareaAutoExpandedProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const minHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.max(minHeight, textareaRef.current.scrollHeight)}px`;
    }
  }, [props.value]);

  return (
    <textarea
      {...props}
      ref={textareaRef}
      rows={initRows}
      className={cn(
        "text-area w-full resize-none overflow-hidden p-4 focus:outline-none",
        className,
      )}
      placeholder={placeholder}
    />
  );
}
