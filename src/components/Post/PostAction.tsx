import { cn } from "@/utils/classname";
import { HTMLAttributes, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type PostActionProps = HTMLAttributes<HTMLDivElement> & {
  isLike?: boolean;
  like?: number;
  handleToggleLike: () => void;
};

export default function PostAction({
  className,
  like,
  isLike,
  handleToggleLike,
  ...props
}: PostActionProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (!isLike) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500); // Duration of the bounce animation
    }
    handleToggleLike();
  };

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <button
        className="flex items-center gap-1 text-gray-500 transition-colors duration-100 ease-linear hover:text-red-500"
        onClick={handleClick}
      >
        {isLike ? (
          <FaHeart
            className={cn(
              "text-red-500 transition-transform duration-500 ease-in-out",
              isAnimating && "animate-bounce",
            )}
          />
        ) : (
          <FaRegHeart className="transition-transform duration-500 ease-in-out" />
        )}
        <span>{like}</span>
      </button>
    </div>
  );
}
