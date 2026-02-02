"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-950 text-white flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-semibold">
          Welcome to your usage dashboard
        </h1>
        <p className="text-sm md:text-base text-slate-200">
          Sign in to track API calls and billing in one place.
        </p>

        <div className="pt-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-full bg-white text-slate-900 px-6 py-2 text-sm font-medium shadow hover:bg-slate-100 transition"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
