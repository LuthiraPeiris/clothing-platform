import type {
  ReactNode,
} from "react";

type BadgeVariant =
  | "neutral"
  | "blue"
  | "amber"
  | "purple"
  | "green"
  | "red";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const variantStyles: Record<
  BadgeVariant,
  string
> = {
  neutral:
    "bg-neutral-100 text-neutral-700",

  blue:
    "bg-blue-50 text-blue-700",

  amber:
    "bg-amber-50 text-amber-700",

  purple:
    "bg-purple-50 text-purple-700",

  green:
    "bg-green-50 text-green-700",

  red:
    "bg-red-50 text-red-700",
};

export function Badge({
  children,
  variant = "neutral",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center
        px-3 py-1
        text-xs font-medium
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}