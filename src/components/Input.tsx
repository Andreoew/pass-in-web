import { ComponentProps } from "react";

interface InputProps extends ComponentProps<'input'> {}

export function Input(props: InputProps) {
  return (
    <input {...props} className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm"  />
  );
}
