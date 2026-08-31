"use client";

import {
  Plus,
} from "lucide-react";

import {
  AddressCard,
} from "@/components/account/address-card";

export default function AddressesPage() {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            Shipping
          </p>

          <h2 className="font-display mt-2 text-3xl font-semibold">
            Saved addresses
          </h2>

          <p className="mt-2 text-sm leading-6 text-neutral-500">
            Manage the addresses you use
            during checkout.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-11 items-center justify-center gap-2 bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          <Plus size={17} />
          Add Address
        </button>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-2">
        <AddressCard
          title="Home"
          name="Luthira Peiris"
          address="123 Main Street"
          city="Colombo"
          postalCode="00100"
          phone="+94 77 123 4567"
          isDefault
        />

        <AddressCard
          title="Office"
          name="Luthira Peiris"
          address="45 Business Avenue"
          city="Negombo"
          postalCode="11500"
          phone="+94 77 123 4567"
        />
      </div>
    </div>
  );
}