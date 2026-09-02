type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeStyles = {
  sm:
    "h-4 w-4 border-2",

  md:
    "h-6 w-6 border-2",

  lg:
    "h-8 w-8 border-[3px]",
};

export function Spinner({
  size = "md",
  className = "",
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={`
        inline-block
        animate-spin
        rounded-full
        border-neutral-300
        border-t-neutral-950
        ${sizeStyles[size]}
        ${className}
      `}
    />
  );
}