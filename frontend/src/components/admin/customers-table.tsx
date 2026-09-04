"use client";

import {
  Check,
  Mail,
  MoreHorizontal,
  Search,
  UserX,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Button,
} from "@/components/ui/button";

import {
  EmptyState,
} from "@/components/ui/empty-state";

import {
  Input,
} from "@/components/ui/input";

import {
  Select,
} from "@/components/ui/select";

import {
  formatCurrency,
} from "@/lib/formatters";

import {
  getAccessToken,
} from "@/services/auth-service";

import {
  updateCustomerStatus,
} from "@/services/customer-service";

import type {
  CustomerResponse,
  CustomerStatus,
} from "@/services/customer-service";

type CustomersTableProps = {
  initialCustomers:
    CustomerResponse[];
};

export function CustomersTable({
  initialCustomers,
}: CustomersTableProps) {
  const [
    customers,
    setCustomers,
  ] = useState(
    initialCustomers
  );

  const [
    query,
    setQuery,
  ] = useState("");

  const [
    status,
    setStatus,
  ] = useState<
    "ALL" | CustomerStatus
  >("ALL");

  const [
    openMenuId,
    setOpenMenuId,
  ] = useState<
    number | null
  >(null);

  const [
    updatingId,
    setUpdatingId,
  ] = useState<
    number | null
  >(null);

  const [
    error,
    setError,
  ] = useState<
    string | null
  >(null);

  const filteredCustomers =
    useMemo(
      () => {
        const normalizedQuery =
          query
            .trim()
            .toLowerCase();

        return customers.filter(
          (customer) => {
            const matchesQuery =
              !normalizedQuery ||
              customer.name
                .toLowerCase()
                .includes(
                  normalizedQuery
                ) ||
              customer.email
                .toLowerCase()
                .includes(
                  normalizedQuery
                ) ||
              customer.phone
                .toLowerCase()
                .includes(
                  normalizedQuery
                );

            const matchesStatus =
              status ===
                "ALL" ||
              customer.status ===
                status;

            return (
              matchesQuery &&
              matchesStatus
            );
          }
        );
      },
      [
        customers,
        query,
        status,
      ]
    );

  async function handleStatusChange(
    customer: CustomerResponse
  ) {
    const newStatus:
      CustomerStatus =
        customer.status ===
        "ACTIVE"
          ? "INACTIVE"
          : "ACTIVE";

    try {
      setError(
        null
      );

      setUpdatingId(
        customer.id
      );

      setOpenMenuId(
        null
      );

      const accessToken =
        await getAccessToken();

      const updatedCustomer =
        await updateCustomerStatus(
          customer.id,
          newStatus,
          accessToken
        );

      setCustomers(
        (current) =>
          current.map(
            (item) =>
              item.id ===
              updatedCustomer.id
                ? updatedCustomer
                : item
          )
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update customer status."
      );
    } finally {
      setUpdatingId(
        null
      );
    }
  }

  return (
    <div className="border border-neutral-200 bg-white">
      <div className="flex flex-col gap-4 border-b border-neutral-200 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold">
            Customers
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            View customer activity
            and purchase history.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-neutral-400"
            />

            <Input
              type="search"
              value={
                query
              }
              onChange={(
                event
              ) =>
                setQuery(
                  event.target.value
                )
              }
              placeholder="Search customers..."
              className="h-10 pl-9 sm:w-64"
            />
          </div>

          <Select
            value={
              status
            }
            onChange={(
              event
            ) =>
              setStatus(
                event.target.value as
                  | "ALL"
                  | CustomerStatus
              )
            }
            className="h-10 sm:w-44"
          >
            <option value="ALL">
              All customers
            </option>

            <option value="ACTIVE">
              Active
            </option>

            <option value="INACTIVE">
              Inactive
            </option>
          </Select>
        </div>
      </div>

      {error && (
        <div className="border-b border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px] text-left">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-5 py-3 font-medium">
                Customer
              </th>

              <th className="px-5 py-3 font-medium">
                Phone
              </th>

              <th className="px-5 py-3 font-medium">
                Orders
              </th>

              <th className="px-5 py-3 font-medium">
                Total Spent
              </th>

              <th className="px-5 py-3 font-medium">
                Joined
              </th>

              <th className="px-5 py-3 font-medium">
                Status
              </th>

              <th className="px-5 py-3 text-right font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-100">
            {filteredCustomers.map(
              (customer) => {
                const isUpdating =
                  updatingId ===
                  customer.id;

                const isMenuOpen =
                  openMenuId ===
                  customer.id;

                const initials =
                  customer.name
                    .split(" ")
                    .filter(
                      Boolean
                    )
                    .map(
                      (part) =>
                        part[0]
                    )
                    .join("")
                    .slice(
                      0,
                      2
                    )
                    .toUpperCase();

                return (
                  <tr
                    key={
                      customer.id
                    }
                    className="text-sm"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f8f3ef] text-sm font-semibold text-[#a26b42]">
                          {
                            initials
                          }
                        </div>

                        <div>
                          <p className="font-medium text-neutral-950">
                            {
                              customer.name
                            }
                          </p>

                          <div className="mt-1 flex items-center gap-1.5 text-xs text-neutral-500">
                            <Mail
                              size={12}
                            />

                            {
                              customer.email
                            }
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-neutral-500">
                      {
                        customer.phone
                      }
                    </td>

                    <td className="px-5 py-4">
                      {
                        customer.orders
                      }
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {formatCurrency(
                        customer.totalSpent
                      )}
                    </td>

                    <td className="px-5 py-4 text-neutral-500">
                      {formatJoinedDate(
                        customer.joinedAt
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <Badge
                        variant={
                          customer.status ===
                          "ACTIVE"
                            ? "green"
                            : "neutral"
                        }
                        className="capitalize"
                      >
                        {customer.status.toLowerCase()}
                      </Badge>
                    </td>

                    <td className="relative px-5 py-4">
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          disabled={
                            isUpdating
                          }
                          onClick={() =>
                            setOpenMenuId(
                              isMenuOpen
                                ? null
                                : customer.id
                            )
                          }
                          className="h-9 w-9 px-0 text-neutral-400 hover:text-[#a26b42]"
                          aria-label="Customer actions"
                        >
                          <MoreHorizontal
                            size={17}
                          />
                        </Button>
                      </div>

                      {isMenuOpen && (
                        <div className="absolute right-5 top-12 z-20 w-48 border border-neutral-200 bg-white p-1 shadow-lg">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            fullWidth
                            onClick={() =>
                              handleStatusChange(
                                customer
                              )
                            }
                            className="h-auto justify-start px-3 py-2.5"
                          >
                            {customer.status ===
                            "ACTIVE" ? (
                              <>
                                <UserX
                                  size={16}
                                  className="text-neutral-500"
                                />

                                <span>
                                  Mark as Inactive
                                </span>
                              </>
                            ) : (
                              <>
                                <Check
                                  size={16}
                                  className="text-green-600"
                                />

                                <span>
                                  Mark as Active
                                </span>
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>

        {filteredCustomers.length ===
          0 && (
          <EmptyState
            title="No customers found"
            description="Try another search or filter."
            className="min-h-[260px] border-0"
          />
        )}
      </div>
    </div>
  );
}

function formatJoinedDate(
  date: string
) {
  return new Intl.DateTimeFormat(
    "en-LK",
    {
      year:
        "numeric",

      month:
        "short",

      day:
        "numeric",
    }
  ).format(
    new Date(
      date
    )
  );
}