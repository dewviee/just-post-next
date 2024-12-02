import { cn } from "@/utils/classname";
import React from "react";
import Button from "../Button";

type ModalActionProps = React.HTMLAttributes<HTMLDivElement> & {
  onClose: () => void; // Function to call when the modal close button is clicked
  onSuccess?: () => void; // Function to call when the modal success button is clicked
  closeBtnText?: string; // Text for the close button, defaults to "Cancel"
  successBtnText?: string; // Text for the success button, defaults to "Save"
  disableBtnSuccess?: boolean;
};

/**
 * ModalAction component renders the action buttons for the modal (e.g., "Cancel" and "Save").
 *
 * @param {object} props - The props passed to the ModalAction component.
 * @param {() => void} onClose - Callback function triggered when the close button is clicked.
 * @param {() => void} onSuccess - Optional callback function triggered when the success button is clicked.
 * @param {string} [closeBtnText="Cancel"] - Optional text for the close button. Defaults to "Cancel".
 * @param {string} [successBtnText="Save"] - Optional text for the success button. Defaults to "Save".
 *
 * @returns {JSX.Element} The ModalAction component, containing two action buttons with
 *                        the specified text and associated callback functions.
 */
export default function ModalAction({
  className,
  onClose,
  onSuccess,
  closeBtnText = "Cancel",
  successBtnText = "Save",
  disableBtnSuccess,
  ...props
}: ModalActionProps): JSX.Element {
  return (
    <div {...props} className={cn("flex flex-row justify-between", className)}>
      <Button className="flex w-24" onClick={onClose}>
        {closeBtnText}
      </Button>
      <Button
        className="flex w-24"
        type="submit"
        disabled={disableBtnSuccess}
        onClick={onSuccess}
      >
        {successBtnText}
      </Button>
    </div>
  );
}
