"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  useCart,
} from "@/hooks/use-cart";

import {
  OrderSummary,
} from "./order-summary";

import {
  PaymentSection,
} from "./payment-section";

import {
  ShippingForm,
} from "./shipping-form";

export function CheckoutForm() {
  const router = useRouter();

  const {
    items,
    subtotal,
    clearCart,
  } = useCart();

  const [shippingDetails, setShippingDetails] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    });

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState("cod");

  function updateShippingField(
    field: keyof typeof shippingDetails,
    value: string
  ) {
    setShippingDetails((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    if (items.length === 0) {
      return;
    }

    clearCart();

    router.push("/order-success");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-10 lg:grid-cols-[1fr_400px] lg:items-start"
    >
      <div className="space-y-8">
        <ShippingForm
          values={shippingDetails}
          onChange={updateShippingField}
        />

        <PaymentSection
          paymentMethod={paymentMethod}
          onChange={setPaymentMethod}
        />

        <button
          type="submit"
          className="flex h-14 w-full items-center justify-center bg-neutral-950 px-6 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          Place Order
        </button>
      </div>

      <div className="lg:sticky lg:top-28">
        <OrderSummary
          items={items}
          subtotal={subtotal}
        />
      </div>
    </form>
  );
}