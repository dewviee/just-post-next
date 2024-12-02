import React from "react";
import Button from "../Button";

type AccountFieldProps = React.HTMLAttributes<HTMLButtonElement> & {
  title: string;
};

/**
 * AccountField component for rendering a clickable field with a title and optional description.
 * Typically used to represent account-related settings or information.
 *
 * @param {AccountFieldProps} props - The props for the AccountField component.
 * @param {string} title - The main label or title for the field.
 * @param {React.ReactNode} [children] - Optional additional content, typically displayed as a description.
 * @param {object} [props] - Additional HTML attributes for the button container.
 *
 * @returns {JSX.Element} A button-like component with a title and optional description.
 *
 * @example
 * <AccountField title="Email">
 *   example@example.com
 * </AccountField>
 */
export default function AccountField({
  title,
  children,
  ...props
}: AccountFieldProps): JSX.Element {
  return (
    <Button
      className="flex w-full flex-col items-start gap-0 rounded-none bg-transparent text-black hover:bg-gray-100"
      {...props}
    >
      <div>{title}</div>
      <span className="text-gray-500">{children}</span>
    </Button>
  );
}
