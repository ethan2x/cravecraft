"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase/client";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  async function signOut() {
    setBusy(true);
    setError("");

    try {
      const { error } = await getSupabase().auth.signOut();
      if (error) throw error;

      setOpen(false);
      router.replace("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to log out.");
      setBusy(false);
    }
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-ember/40 bg-ember/10 text-ember transition hover:bg-ember/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-12 z-[100] w-52 rounded-2xl border border-white/10 bg-charcoal-light p-2 shadow-2xl"
        >
          <Link
            role="menuitem"
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-4 py-3 text-sm text-cream hover:bg-white/10"
          >
            My Profile
          </Link>

          <Link
            role="menuitem"
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-4 py-3 text-sm text-cream hover:bg-white/10"
          >
            Dashboard
          </Link>

          <Link
            role="menuitem"
            href="/#pricing"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-4 py-3 text-sm text-cream hover:bg-white/10"
          >
            My Plan
          </Link>

          <div className="my-1 border-t border-white/10" />

          <button
            type="button"
            role="menuitem"
            disabled={busy}
            onClick={signOut}
            className="w-full rounded-lg px-4 py-3 text-left text-sm text-ember hover:bg-white/10 disabled:opacity-50"
          >
            {busy ? "Logging out..." : "Log Out"}
          </button>

          {error && (
            <p role="alert" className="px-4 py-2 text-xs text-red-400">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
