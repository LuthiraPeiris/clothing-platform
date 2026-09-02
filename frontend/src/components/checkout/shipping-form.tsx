"use client";

import {
  Input,
} from "@/components/ui/input";

type ShippingValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
};

type ShippingFormProps = {
  values: ShippingValues;

  onChange: (
    field: keyof ShippingValues,
    value: string
  ) => void;
};

export function ShippingForm({
  values,
  onChange,
}: ShippingFormProps) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold">
        Shipping Details
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Input
          required
          value={
            values.firstName
          }
          onChange={(
            event
          ) =>
            onChange(
              "firstName",
              event.target.value
            )
          }
          placeholder="First name"
          autoComplete="given-name"
        />

        <Input
          required
          value={
            values.lastName
          }
          onChange={(
            event
          ) =>
            onChange(
              "lastName",
              event.target.value
            )
          }
          placeholder="Last name"
          autoComplete="family-name"
        />

        <Input
          required
          type="email"
          value={
            values.email
          }
          onChange={(
            event
          ) =>
            onChange(
              "email",
              event.target.value
            )
          }
          placeholder="Email"
          autoComplete="email"
          className="sm:col-span-2"
        />

        <Input
          required
          type="tel"
          value={
            values.phone
          }
          onChange={(
            event
          ) =>
            onChange(
              "phone",
              event.target.value
            )
          }
          placeholder="Phone number"
          autoComplete="tel"
          className="sm:col-span-2"
        />

        <Input
          required
          value={
            values.address
          }
          onChange={(
            event
          ) =>
            onChange(
              "address",
              event.target.value
            )
          }
          placeholder="Address"
          autoComplete="street-address"
          className="sm:col-span-2"
        />

        <Input
          required
          value={
            values.city
          }
          onChange={(
            event
          ) =>
            onChange(
              "city",
              event.target.value
            )
          }
          placeholder="City"
          autoComplete="address-level2"
        />

        <Input
          value={
            values.postalCode
          }
          onChange={(
            event
          ) =>
            onChange(
              "postalCode",
              event.target.value
            )
          }
          placeholder="Postal code"
          autoComplete="postal-code"
        />
      </div>
    </div>
  );
}