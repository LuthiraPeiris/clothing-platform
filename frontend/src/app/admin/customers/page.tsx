"use client";

import {
  ShoppingBag,
  UserCheck,
  Users,
  WalletCards,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  CustomersTable,
} from "@/components/admin/customers-table";

import {
  Spinner,
} from "@/components/ui/spinner";

import {
  formatCurrency,
} from "@/lib/formatters";

import {
  getAccessToken,
} from "@/services/auth-service";

import {
  getCustomers,
} from "@/services/customer-service";

import type {
  CustomerResponse,
} from "@/services/customer-service";

export default function AdminCustomersPage() {
  const [
    customers,
    setCustomers,
  ] = useState<
    CustomerResponse[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(
    true
  );

  const [
    error,
    setError,
  ] = useState<
    string | null
  >(null);

  useEffect(() => {
    let active =
      true;

    async function loadCustomers() {
      try {
        setLoading(
          true
        );

        setError(
          null
        );

        const accessToken =
          await getAccessToken();

        const data =
          await getCustomers(
            accessToken
          );

        if (
          active
        ) {
          setCustomers(
            data
          );
        }
      } catch (error) {
        if (
          active
        ) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to load customers."
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

    loadCustomers();

    return () => {
      active =
        false;
    };
  }, []);

  if (
    loading
  ) {
    return (
      <div className="flex min-h-[450px] items-center justify-center">
        <div className="flex flex-col items-center">
          <Spinner
            size="lg"
          />

          <p className="mt-4 text-sm text-neutral-500">
            Loading customers...
          </p>
        </div>
      </div>
    );
  }

  const totalCustomers =
    customers.length;

  const activeCustomers =
    customers.filter(
      (customer) =>
        customer.status ===
        "ACTIVE"
    ).length;

  const totalOrders =
    customers.reduce(
      (
        total,
        customer
      ) =>
        total +
        customer.orders,
      0
    );

  const totalRevenue =
    customers.reduce(
      (
        total,
        customer
      ) =>
        total +
        customer.totalSpent,
      0
    );

  const stats = [
    {
      label:
        "Total Customers",

      value:
        totalCustomers.toString(),

      icon:
        Users,
    },
    {
      label:
        "Active Customers",

      value:
        activeCustomers.toString(),

      icon:
        UserCheck,
    },
    {
      label:
        "Customer Orders",

      value:
        totalOrders.toString(),

      icon:
        ShoppingBag,
    },
    {
      label:
        "Customer Revenue",

      value:
        formatCurrency(
          totalRevenue
        ),

      icon:
        WalletCards,
    },
  ];

  return (
    <div>
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
          Customer Management
        </p>

        <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Customers
        </h1>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          Review customer accounts,
          order activity, and
          purchasing history.
        </p>
      </div>

      {error && (
        <div className="mt-8 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!error && (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(
              (stat) => {
                const Icon =
                  stat.icon;

                return (
                  <div
                    key={
                      stat.label
                    }
                    className="border border-neutral-200 bg-white p-5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center bg-[#f8f3ef] text-[#a26b42]">
                      <Icon
                        size={19}
                      />
                    </div>

                    <p className="mt-5 text-sm text-neutral-500">
                      {
                        stat.label
                      }
                    </p>

                    <p className="font-display mt-2 text-2xl font-semibold">
                      {
                        stat.value
                      }
                    </p>
                  </div>
                );
              }
            )}
          </div>

          <div className="mt-6">
            <CustomersTable
              initialCustomers={
                customers
              }
            />
          </div>
        </>
      )}
    </div>
  );
}