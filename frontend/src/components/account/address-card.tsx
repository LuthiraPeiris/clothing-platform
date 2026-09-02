"use client";

import {
  MapPin,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Button,
} from "@/components/ui/button";

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
          <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#f5eee8] text-[#a26b42]">
            <MapPin
              size={18}
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-lg font-semibold">
                {title}
              </h3>

              {isDefault && (
                <Badge
                  variant="amber"
                  className="uppercase tracking-wider"
                >
                  Default
                </Badge>
              )}
            </div>

            <p className="mt-4 text-sm font-medium text-neutral-950">
              {name}
            </p>

            <p className="mt-1 text-sm leading-6 text-neutral-500">
              {address}

              <br />

              {city},{" "}
              {postalCode}

              <br />

              {phone}
            </p>
          </div>
        </div>

        <div className="flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-9 w-9 px-0 text-neutral-400"
            aria-label="Edit address"
          >
            <Pencil
              size={16}
            />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-9 w-9 px-0 text-neutral-400 hover:bg-red-50 hover:text-red-600"
            aria-label="Delete address"
          >
            <Trash2
              size={16}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}