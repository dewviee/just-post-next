import { cn } from "@/utils/classname";
import { HTMLAttributes } from "react";

type TSpinnerProps = HTMLAttributes<HTMLDivElement> & {};

/**
 *
 * @props className  you can change color of spinner by text-color Ex. className="text-red-600"
 */
export default function Spinner({ className }: TSpinnerProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center p-2 text-primary",
        className,
      )}
    >
      <div
        className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}
