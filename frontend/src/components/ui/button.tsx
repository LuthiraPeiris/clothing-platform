import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost";

type ButtonSize =
  | "sm"
  | "md"
  | "lg";

type ButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
  };

const variantStyles: Record<
  ButtonVariant,
  string
> = {
  primary:
    "bg-[#a26b42] text-white hover:bg-[#8f5d39] hover:text-white",

  secondary:
    "border border-neutral-300 bg-white text-neutral-950 hover:border-[#a26b42] hover:bg-[#f8f3ef] hover:text-[#8f5d39]",

  danger:
    "bg-red-600 text-white hover:bg-red-700 hover:text-white",

  ghost:
    "bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950",
};

const sizeStyles: Record<
  ButtonSize,
  string
> = {
  sm:
    "h-9 px-3 text-xs",

  md:
    "h-11 px-4 text-sm",

  lg:
    "h-12 px-5 text-sm",
};

export function Button({
  children,
  variant = "primary",
  size = "lg",
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        font-medium
        transition
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#a26b42]
        focus-visible:ring-offset-2
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}