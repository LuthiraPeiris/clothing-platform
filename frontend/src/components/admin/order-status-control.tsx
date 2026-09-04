"use client";

import {
  useRouter,
} from "next/navigation";

import {
  useState,
} from "react";

import {
  Button,
} from "@/components/ui/button";

import {
  Select,
} from "@/components/ui/select";

import {
  getAccessToken,
} from "@/services/auth-service";

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
      setError(
        null
      );

      setSaving(
        true
      );

      /*
       * Get current ADMIN token.
       */
      const accessToken =
        await getAccessToken();

      /*
       * Spring Boot will independently
       * verify ROLE_ADMIN.
       */
      await updateOrderStatus(
        orderId,
        status,
        accessToken
      );

      router.refresh();

    } catch (error) {

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update status."
      );

    } finally {

      setSaving(
        false
      );
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <Select
          value={
            status
          }
          onChange={(
            event
          ) =>
            setStatus(
              event.target
                .value as OrderStatus
            )
          }
          className="h-11 w-auto min-w-40 font-medium"
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
        </Select>

        <Button
          type="button"
          size="md"
          onClick={
            handleUpdate
          }
          disabled={
            saving ||
            status ===
              initialStatus
          }
          className="bg-[#a26b42] text-white hover:bg-[#8d5c39]"
        >
          {saving
            ? "Updating..."
            : "Update Status"}
        </Button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}