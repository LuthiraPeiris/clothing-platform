"use client";

type PaymentSectionProps = {
  paymentMethod: string;
  onChange: (value: string) => void;
};

export function PaymentSection({
  paymentMethod,
  onChange,
}: PaymentSectionProps) {
  return (
    <div className="border-t border-neutral-200 pt-8">
      <h2 className="font-display text-2xl font-semibold">
        Payment Method
      </h2>

      <div className="mt-5 space-y-3">
        <label className="flex cursor-pointer items-center gap-3 border border-neutral-300 p-4">
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={paymentMethod === "card"}
            onChange={(e) =>
              onChange(e.target.value)
            }
          />

          <span className="text-sm font-medium">
            Credit / Debit Card
          </span>
        </label>

        <label className="flex cursor-pointer items-center gap-3 border border-neutral-300 p-4">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={(e) =>
              onChange(e.target.value)
            }
          />

          <span className="text-sm font-medium">
            Cash on Delivery
          </span>
        </label>
      </div>

      {paymentMethod === "card" && (
        <div className="mt-5 grid gap-4">
          <input
            placeholder="Card number"
            className="h-12 border border-neutral-300 px-4 outline-none focus:border-neutral-950"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="MM / YY"
              className="h-12 border border-neutral-300 px-4 outline-none focus:border-neutral-950"
            />

            <input
              placeholder="CVC"
              className="h-12 border border-neutral-300 px-4 outline-none focus:border-neutral-950"
            />
          </div>
        </div>
      )}
    </div>
  );
}