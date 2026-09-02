import {
  Check,
} from "lucide-react";

import type {
  OrderStatus,
} from "@/services/order-service";

type OrderTrackerProps = {
  status: OrderStatus;
};

const steps = [
  {
    key: "PENDING",
    label: "Pending",
  },
  {
    key: "CONFIRMED",
    label: "Confirmed",
  },
  {
    key: "PROCESSING",
    label: "Processing",
  },
  {
    key: "SHIPPED",
    label: "Shipped",
  },
  {
    key: "DELIVERED",
    label: "Delivered",
  },
] as const;

export function OrderTracker({
  status,
}: OrderTrackerProps) {
  if (
    status === "CANCELLED"
  ) {
    return (
      <div className="border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        This order has been
        cancelled.
      </div>
    );
  }

  const currentStep =
    steps.findIndex(
      (step) =>
        step.key === status
    );

  return (
    <div className="grid grid-cols-5 gap-2">
      {steps.map(
        (
          step,
          index
        ) => {
          const completed =
            index <=
            currentStep;

          return (
            <div
              key={
                step.key
              }
              className="relative text-center"
            >
              {index <
                steps.length -
                  1 && (
                <div
                  className={`absolute left-1/2 top-5 h-px w-full ${
                    index <
                    currentStep
                      ? "bg-neutral-950"
                      : "bg-neutral-200"
                  }`}
                />
              )}

              <div
                className={`relative z-10 mx-auto flex h-10 w-10 items-center justify-center rounded-full border ${
                  completed
                    ? "border-neutral-950 bg-neutral-950 text-white"
                    : "border-neutral-300 bg-white text-neutral-400"
                }`}
              >
                {completed ? (
                  <Check
                    size={16}
                  />
                ) : (
                  <span className="text-xs">
                    {index + 1}
                  </span>
                )}
              </div>

              <p
                className={`mt-3 text-xs font-medium ${
                  completed
                    ? "text-neutral-950"
                    : "text-neutral-400"
                }`}
              >
                {step.label}
              </p>
            </div>
          );
        }
      )}
    </div>
  );
}