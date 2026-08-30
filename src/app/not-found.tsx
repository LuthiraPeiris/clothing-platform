import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
          404 Error
        </p>

        <h1 className="font-display text-4xl font-semibold md:text-6xl">
          Page not found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-[var(--muted)]">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-md bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}