"use client";

import { useState } from "react";

export function ProfileForm() {
  const [form, setForm] = useState({
    firstName: "Luthira",
    lastName: "Peiris",
    email: "luthira@example.com",
    phone: "+94 77 123 4567",
  });

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-neutral-200 bg-white p-6 sm:p-8"
    >
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
          Personal Information
        </p>

        <h2 className="font-display mt-2 text-2xl font-semibold">
          Profile details
        </h2>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          Update your name, email address,
          and contact information.
        </p>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="mb-2 block text-sm font-medium"
          >
            First Name
          </label>

          <input
            id="firstName"
            value={form.firstName}
            onChange={(event) =>
              updateField(
                "firstName",
                event.target.value
              )
            }
            className="h-12 w-full border border-neutral-300 px-4 text-sm outline-none transition focus:border-neutral-950"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="mb-2 block text-sm font-medium"
          >
            Last Name
          </label>

          <input
            id="lastName"
            value={form.lastName}
            onChange={(event) =>
              updateField(
                "lastName",
                event.target.value
              )
            }
            className="h-12 w-full border border-neutral-300 px-4 text-sm outline-none transition focus:border-neutral-950"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(event) =>
              updateField(
                "email",
                event.target.value
              )
            }
            className="h-12 w-full border border-neutral-300 px-4 text-sm outline-none transition focus:border-neutral-950"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium"
          >
            Phone Number
          </label>

          <input
            id="phone"
            value={form.phone}
            onChange={(event) =>
              updateField(
                "phone",
                event.target.value
              )
            }
            className="h-12 w-full border border-neutral-300 px-4 text-sm outline-none transition focus:border-neutral-950"
          />
        </div>
      </div>

      <div className="mt-7 flex justify-end">
        <button
          type="submit"
          className="h-12 bg-neutral-950 px-7 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}