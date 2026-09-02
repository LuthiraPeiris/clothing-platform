import type {
  SelectHTMLAttributes,
} from "react";

type SelectProps =
  SelectHTMLAttributes<HTMLSelectElement> & {
    error?: boolean;
  };

export function Select({
  className = "",
  error = false,
  children,
  ...props
}: SelectProps) {
  return (
    <select
      className={`
        h-12 w-full
        border
        bg-white
        px-4
        text-sm
        text-neutral-950
        outline-none
        transition
        focus:border-neutral-950
        focus:ring-1
        focus:ring-neutral-950
        disabled:cursor-not-allowed
        disabled:bg-neutral-100
        disabled:text-neutral-500
        ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
            : "border-neutral-300"
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </select>
  );
}