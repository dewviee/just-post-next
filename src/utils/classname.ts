import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to combine and merge class names

 * `cn` is a shorthand function that combines class names conditionally and resolves
 * any conflicts in Tailwind CSS classes.

 * @param {...ClassValue[]} classes - Any number of class name values, including conditional expressions
 * @returns {string} - A single string of merged and resolved class names, optimized for Tailwind
 */

export const cn = (...classes: ClassValue[]) => {
  return twMerge(clsx(...classes));
};
