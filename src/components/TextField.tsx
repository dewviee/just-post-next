import Input from "./Input";

type TextFieldProps = React.HTMLAttributes<HTMLDivElement> & {
  label?: string;
  className?: string;
  value: string;
  type?: "text" | "password";
  handleSetValue: (value: string) => void;
};

const TextField = ({
  label,
  className,
  value,
  type = "text",
  handleSetValue,
  ...props
}: TextFieldProps) => {
  return (
    <div {...props} className={`flex w-60 flex-col rounded-sm ${className}`}>
      {label && <div>{label}</div>}
      <Input type={type} value={value} handleSetValue={handleSetValue} />
    </div>
  );
};

export default TextField;
