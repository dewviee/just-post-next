import { cn } from "@/utils/classname";
import React from "react";

type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  handleClickOutside?: () => void;
};

/**
 * Modal component for displaying a centered overlay with content.
 *
 * @param {ModalProps} props - The props for the Modal component.
 * @param {boolean} isOpen - Controls whether the modal is visible (true) or hidden (false).
 * @param {string} [className] - Optional additional class names for the modal container.
 * @param {() => void} [handleClickOutside] - Optional callback triggered when the overlay (outside modal content) is clicked.
 * @param {React.ReactNode} children - The content to display inside the modal.
 * @param {object} [props] - Additional HTML attributes for the modal container.
 *
 * @returns {JSX.Element | null} The rendered modal if `isOpen` is true, otherwise null.
 *
 * @example
 * <Modal
 *   isOpen={true}
 *   handleClickOutside={() => console.log("Outside clicked!")}
 * >
 *   <div>Modal Content</div>
 * </Modal>
 */
export default function Modal({
  isOpen,
  className,
  handleClickOutside,
  children,
  ...props
}: ModalProps): JSX.Element | null {
  return isOpen ? (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-20"
        onClick={handleClickOutside}
      />
      <div
        className={cn(
          "relative z-[1000] flex w-96 flex-col gap-1 border border-black border-opacity-20 bg-white p-8 md:h-[80vh] md:w-[600px]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  ) : null;
}
