"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  getAccessToken,
} from "@/services/auth-service";

import {
  getMyCustomerProfile,
  syncMyCustomerProfile,
  updateMyCustomerProfile,
} from "@/services/customer-service";

export function ProfileForm() {
  const [
    form,
    setForm,
  ] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [
    loading,
    setLoading,
  ] = useState(
    true
  );

  const [
    saving,
    setSaving,
  ] = useState(
    false
  );

  const [
    error,
    setError,
  ] = useState<
    string | null
  >(null);

  const [
    success,
    setSuccess,
  ] = useState<
    string | null
  >(null);

  useEffect(() => {
    let active =
      true;

    async function loadProfile() {
      try {
        setLoading(
          true
        );

        setError(
          null
        );

        const accessToken =
          await getAccessToken();

        await syncMyCustomerProfile(
          accessToken
        );

        const customer =
          await getMyCustomerProfile(
            accessToken
          );

        if (
          !active
        ) {
          return;
        }

        setForm({
          name:
            customer.name,

          email:
            customer.email,

          phone:
            customer.phone,
        });
      } catch (
        error
      ) {
        if (
          active
        ) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to load your profile."
          );
        }
      } finally {
        if (
          active
        ) {
          setLoading(
            false
          );
        }
      }
    }

    loadProfile();

    return () => {
      active =
        false;
    };
  }, []);

  function updateField(
    field:
      | "name"
      | "phone",
    value: string
  ) {
    setForm(
      (
        current
      ) => ({
        ...current,
        [field]:
          value,
      })
    );

    setSuccess(
      null
    );
  }

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setError(
      null
    );

    setSuccess(
      null
    );

    if (
      !form.name.trim()
    ) {
      setError(
        "Name is required."
      );

      return;
    }

    if (
      !form.phone.trim()
    ) {
      setError(
        "Phone number is required."
      );

      return;
    }

    try {
      setSaving(
        true
      );

      const accessToken =
        await getAccessToken();

      const updatedCustomer =
        await updateMyCustomerProfile(
          {
            name:
              form.name.trim(),

            phone:
              form.phone.trim(),
          },
          accessToken
        );

      setForm({
        name:
          updatedCustomer.name,

        email:
          updatedCustomer.email,

        phone:
          updatedCustomer.phone,
      });

      setSuccess(
        "Profile updated successfully."
      );
    } catch (
      error
    ) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update your profile."
      );
    } finally {
      setSaving(
        false
      );
    }
  }

  if (
    loading
  ) {
    return (
      <div className="border border-neutral-200 bg-white p-6 sm:p-8">
        <p className="text-sm text-neutral-500">
          Loading profile...
        </p>
      </div>
    );
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
          Update your name and contact
          information.
        </p>
      </div>

      {error && (
        <div className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-6 border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      <div className="mt-7 grid gap-5">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium"
          >
            Full Name
          </label>

          <Input
            id="name"
            value={
              form.name
            }
            onChange={(
              event
            ) =>
              updateField(
                "name",
                event.target.value
              )
            }
          />
        </div>

        <div>
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
            readOnly
            className="cursor-not-allowed bg-neutral-50 text-neutral-500"
          />

          <p className="mt-2 text-xs leading-5 text-neutral-500">
            Your email is managed by
            your account login and
            cannot be changed here.
          </p>
        </div>

        <div>
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
          disabled={
            saving
          }
          className="bg-[#a26b42] px-7 text-white transition hover:bg-[#8d5c39] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}