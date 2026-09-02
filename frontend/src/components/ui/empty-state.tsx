import type {
  ReactNode,
} from "react";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`
        flex min-h-[320px]
        flex-col
        items-center
        justify-center
        border border-neutral-200
        bg-white
        px-6 py-12
        text-center
        ${className}
      `}
    >
      {icon && (
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
          {icon}
        </div>
      )}

      <h3 className="font-display mt-5 text-2xl font-semibold text-neutral-950">
        {title}
      </h3>

      {description && (
        <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}