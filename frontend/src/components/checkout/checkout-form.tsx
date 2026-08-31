"use client";

import {
  useRouter,
} from "next/navigation";

import {
  useState,
} from "react";

import {
  useCart,
} from "@/hooks/use-cart";

import {
  createOrder,
} from "@/services/order-service";

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
  const router =
    useRouter();

  const {
    items,
    subtotal,
    clearCart,
  } = useCart();

  const [
    shippingDetails,
    setShippingDetails,
  ] = useState({
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

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState<
    string | null
  >(null);

  function updateShippingField(
    field: keyof typeof shippingDetails,
    value: string
  ) {
    setShippingDetails(
      (current) => ({
        ...current,
        [field]: value,
      })
    );
  }

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    if (
      items.length === 0
    ) {
      setError(
        "Your cart is empty."
      );

      return;
    }

    const customerName =
      `${shippingDetails.firstName.trim()} ${shippingDetails.lastName.trim()}`
        .trim();

    if (
      !customerName ||
      !shippingDetails.email.trim() ||
      !shippingDetails.phone.trim() ||
      !shippingDetails.address.trim() ||
      !shippingDetails.city.trim()
    ) {
      setError(
        "Please complete all required shipping details."
      );

      return;
    }

    /*
     * We currently support COD in the UI.
     * Online payment processing will be
     * integrated later.
     */
    if (
      paymentMethod !== "cod"
    ) {
      setError(
        "Online card payments are not connected yet. Please select Cash on Delivery."
      );

      return;
    }

    try {
      setError(null);
      setIsSubmitting(true);

      const order =
        await createOrder({
          customerName,

          email:
            shippingDetails.email.trim(),

          phone:
            shippingDetails.phone.trim(),

          shippingAddress:
            shippingDetails.address.trim(),

          city:
            shippingDetails.city.trim(),

          postalCode:
            shippingDetails.postalCode.trim() ||
            undefined,

          items:
            items.map(
              (item) => ({
                productId:
                  Number(
                    item.product.id
                  ),

                quantity:
                  item.quantity,

                selectedSize:
                  item.selectedSize,

                selectedColor:
                  item.selectedColor,
              })
            ),
        });

      clearCart();

      router.push(
        `/order-success?orderNumber=${encodeURIComponent(
          order.orderNumber
        )}`
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to place your order."
      );
    } finally {
      setIsSubmitting(
        false
      );
    }
  }

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="grid gap-10 lg:grid-cols-[1fr_400px] lg:items-start"
    >
      <div className="space-y-8">
        <ShippingForm
          values={
            shippingDetails
          }
          onChange={
            updateShippingField
          }
        />

        <PaymentSection
          paymentMethod={
            paymentMethod
          }
          onChange={
            setPaymentMethod
          }
        />

        {error && (
          <div className="border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={
            isSubmitting ||
            items.length === 0
          }
          className="flex h-14 w-full items-center justify-center bg-neutral-950 px-6 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? "Placing Order..."
            : "Place Order"}
        </button>
      </div>

      <div className="lg:sticky lg:top-28">
        <OrderSummary
          items={items}
          subtotal={
            subtotal
          }
        />
      </div>
    </form>
  );
}