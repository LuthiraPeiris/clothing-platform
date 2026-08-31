"use client";

import {
  useRouter,
} from "next/navigation";

import {
  useState,
} from "react";

import {
  updateOrderStatus,
} from "@/services/order-service";

import type {
  OrderStatus,
} from "@/services/order-service";

type OrderStatusControlProps = {
  orderId: number;
  initialStatus: OrderStatus;
};

export function OrderStatusControl({
  orderId,
  initialStatus,
}: OrderStatusControlProps) {
  const router =
    useRouter();

  const [
    status,
    setStatus,
  ] =
    useState<OrderStatus>(
      initialStatus
    );

  const [
    saving,
    setSaving,
  ] =
    useState(false);

  const [
    error,
    setError,
  ] = useState<
    string | null
  >(null);

  async function handleUpdate() {
    try {
      setError(null);
      setSaving(true);

      await updateOrderStatus(
        orderId,
        status
      );

      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update status."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <select
          value={status}
          onChange={(
            event
          ) =>
            setStatus(
              event.target
                .value as OrderStatus
            )
          }
          className="h-11 border border-neutral-300 bg-white px-4 text-sm font-medium outline-none focus:border-neutral-950"
        >
          <option value="PENDING">
            Pending
          </option>

          <option value="CONFIRMED">
            Confirmed
          </option>

          <option value="PROCESSING">
            Processing
          </option>

          <option value="SHIPPED">
            Shipped
          </option>

          <option value="DELIVERED">
            Delivered
          </option>

          <option value="CANCELLED">
            Cancelled
          </option>
        </select>

        <button
          type="button"
          onClick={
            handleUpdate
          }
          disabled={
            saving ||
            status ===
              initialStatus
          }
          className="h-11 bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Updating..."
            : "Update Status"}
        </button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}