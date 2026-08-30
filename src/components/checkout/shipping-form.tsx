"use client";

type ShippingFormProps = {
  values: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  onChange: (
    field: keyof ShippingFormProps["values"],
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
        <input
          value={values.firstName}
          onChange={(e) =>
            onChange("firstName", e.target.value)
          }
          placeholder="First name"
          className="h-12 border border-neutral-300 px-4 outline-none focus:border-neutral-950"
        />

        <input
          value={values.lastName}
          onChange={(e) =>
            onChange("lastName", e.target.value)
          }
          placeholder="Last name"
          className="h-12 border border-neutral-300 px-4 outline-none focus:border-neutral-950"
        />

        <input
          type="email"
          value={values.email}
          onChange={(e) =>
            onChange("email", e.target.value)
          }
          placeholder="Email"
          className="h-12 border border-neutral-300 px-4 outline-none focus:border-neutral-950 sm:col-span-2"
        />

        <input
          value={values.phone}
          onChange={(e) =>
            onChange("phone", e.target.value)
          }
          placeholder="Phone number"
          className="h-12 border border-neutral-300 px-4 outline-none focus:border-neutral-950 sm:col-span-2"
        />

        <input
          value={values.address}
          onChange={(e) =>
            onChange("address", e.target.value)
          }
          placeholder="Address"
          className="h-12 border border-neutral-300 px-4 outline-none focus:border-neutral-950 sm:col-span-2"
        />

        <input
          value={values.city}
          onChange={(e) =>
            onChange("city", e.target.value)
          }
          placeholder="City"
          className="h-12 border border-neutral-300 px-4 outline-none focus:border-neutral-950"
        />

        <input
          value={values.postalCode}
          onChange={(e) =>
            onChange("postalCode", e.target.value)
          }
          placeholder="Postal code"
          className="h-12 border border-neutral-300 px-4 outline-none focus:border-neutral-950"
        />
      </div>
    </div>
  );
}