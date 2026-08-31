"use client";

import {
  MapPin,
  Pencil,
  Trash2,
} from "lucide-react";

type AddressCardProps = {
  title: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  isDefault?: boolean;
};

export function AddressCard({
  title,
  name,
  address,
  city,
  postalCode,
  phone,
  isDefault = false,
}: AddressCardProps) {
  return (
    <div className="border border-neutral-200 bg-white p-6">
      <div className="flex items-start justify-between gap-5">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-neutral-100">
            <MapPin size={18} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-lg font-semibold">
                {title}
              </h3>

              {isDefault && (
                <span className="bg-neutral-950 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
                  Default
                </span>
              )}
            </div>

            <p className="mt-4 text-sm font-medium text-neutral-950">
              {name}
            </p>

            <p className="mt-1 text-sm leading-6 text-neutral-500">
              {address}
              <br />
              {city}, {postalCode}
              <br />
              {phone}
            </p>
          </div>
        </div>

        <div className="flex gap-1">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-950"
            aria-label="Edit address"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center text-neutral-400 transition hover:bg-red-50 hover:text-red-600"
            aria-label="Delete address"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}