import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import Input from "./Input";

type TextFieldProps = React.HTMLAttributes<HTMLDivElement> & {
  inputName: string;
  onInputChange?: ChangeEventHandler<HTMLInputElement>;
  label?: string;
  className?: string;
  inputValue: string | number;
  inputType?: HTMLInputTypeAttribute;
  type?: "text" | "password";
};

const TextField = ({
  inputName,
  onInputChange,
  label,
  className,
  inputValue,
  inputType = "text",
  ...props
}: TextFieldProps) => {
  return (
    <div {...props} className={`flex w-60 flex-col rounded-sm ${className}`}>
      {label && <div>{label}</div>}
      <Input
        name={inputName}
        onChange={onInputChange}
        type={inputType}
        value={inputValue}
      />
    </div>
  );
};

export default TextField;
