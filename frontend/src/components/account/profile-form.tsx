"use client";

import {
  useState,
} from "react";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

export function ProfileForm() {
  const [
    form,
    setForm,
  ] = useState({
    firstName: "Luthira",
    lastName: "Peiris",
    email: "luthira@example.com",
    phone: "+94 77 123 4567",
  });

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    setForm(
      (current) => ({
        ...current,
        [field]: value,
      })
    );
  }

  function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();
  }

  return (
    <form
      onSubmit={
        handleSubmit
      }
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

          <Input
            id="firstName"
            value={
              form.firstName
            }
            onChange={(
              event
            ) =>
              updateField(
                "firstName",
                event.target.value
              )
            }
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="mb-2 block text-sm font-medium"
          >
            Last Name
          </label>

          <Input
            id="lastName"
            value={
              form.lastName
            }
            onChange={(
              event
            ) =>
              updateField(
                "lastName",
                event.target.value
              )
            }
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium"
          >
            Email
          </label>

          <Input
            id="email"
            type="email"
            value={
              form.email
            }
            onChange={(
              event
            ) =>
              updateField(
                "email",
                event.target.value
              )
            }
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium"
          >
            Phone Number
          </label>

          <Input
            id="phone"
            type="tel"
            value={
              form.phone
            }
            onChange={(
              event
            ) =>
              updateField(
                "phone",
                event.target.value
              )
            }
          />
        </div>
      </div>

      <div className="mt-7 flex justify-end">
        <Button
          type="submit"
          size="lg"
          className="px-7"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}