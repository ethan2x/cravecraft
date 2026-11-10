"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubscribeButton({
  plan,
}: {
  plan: "plus" | "ai";
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubscribe() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Unable to start checkout.");
      }

      window.location.assign(data.url);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleSubscribe}
        disabled={loading}
        className="mt-8 w-full rounded-full bg-ember px-6 py-3 text-sm font-semibold text-charcoal transition hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Opening Stripe..." : "Choose plan"}
      </button>
      {error && (
        <p role="alert" className="mt-2 text-center text-sm text-red-400">
          {error}
        </p>
      )}
    </>
  );
}
