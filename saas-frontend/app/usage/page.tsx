"use client";

import {useEffect, useState } from "react";
import UsageCharts from '../components/UsageCharts';

type BillingResponse = {
  userId: string;
  month: string;
  count: number;
  pricePerCall: number;
  amount: number;
  planName: string | null;
  requestsPerMonth: number;
  softLimitPercent: number;
  softLimit: number;
  isOverSoftLimit: boolean;
  isOverHardLimit: boolean;
};

export default function UsagePage() {
  const [userId, setUserId] = useState("");
  const [month, setMonth] = useState("2026-01");
  const [apiKey, setApiKey] = useState("");
  const [usage, setUsage] = useState<BillingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get current user - you'll replace this with actual auth
  useEffect(() => {
    // For now, get the first user or use a test user
    // In production, this would come from your auth system
    fetch('http://localhost:3001/users')
      .then(r => r.json())
      .then(users => {
        if (users && users.length > 0) {
          setUserId(users[0].id);
        }
      })
      .catch(() => {
        // Fallback test user if users endpoint not ready
        setUserId('demo-user-id');
      });
  }, []);

  const handleFetch = async () => {
    setLoading(true);
    setUsage(null);
    setError(null);

    try {
      const res = await fetch(
        `http://localhost:3001/usage/billing/${userId}/${month}`,
        {
          method: "GET",
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${await res.text()}`);
      }

      const data: BillingResponse = await res.json();
      setUsage(data);
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch when userId and month ready
  useEffect(() => {
    if (userId && month && apiKey) {
      handleFetch();
    }
  }, [userId, month, apiKey]);

  // Demo plan limit for progress bar
  const planLimit = usage?.requestsPerMonth ?? 0;
  const used = usage?.count ?? 0;

  const pct =
    planLimit > 0 ? Math.min(100, Math.round((used / planLimit) * 100)) : 0;

  const state =
    !usage
      ? "No data"
      : planLimit === 0
      ? "No plan"
      : usage.isOverHardLimit
      ? "Over limit"
      : usage.isOverSoftLimit
      ? "Near limit"
      : "Safe";

  return (
    <main className="min-h-[calc(100vh-80px)] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
            Usage &amp; billing
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Monitor your API usage and estimated monthly charges.
          </p>
        </div>

        {/* Query Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Query usage data
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User ID
              </label>
              <input
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter user ID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Month
              </label>
              <input
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API key (optional for demo)
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter API key"
              />
            </div>
          </div>

          <button
            onClick={handleFetch}
            disabled={loading || !userId || !month}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </span>
            ) : (
              "Fetch usage & bill"
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-red-600 mt-0.5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="text-sm font-semibold text-red-800">Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* When usage is loaded */}
        {usage && (
          <div className="space-y-6">
            {/* Plan card + plan vs usage */}
            <section className="rounded-2xl bg-white shadow p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-purple-700 uppercase">
                    Current plan
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {(usage.planName ?? "Unknown plan")} ·{" "}
                    {planLimit.toLocaleString()} calls / month
                  </p>
                  <p className="text-xs text-gray-500">
                    Soft limit: {usage.softLimitPercent}% ({usage.softLimit} calls)
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
                  {state}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium text-gray-600">
                  <span>Monthly usage</span>
                  <span>
                    {used.toLocaleString()} / {planLimit.toLocaleString()} calls (
                    {pct}%)
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-purple-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      pct < 70
                        ? "bg-green-500"
                        : pct < 100
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">Status: {state}</p>
              </div>
            </section>

            {/* Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">User ID</p>
                    <p className="text-lg font-bold text-gray-900 truncate">
                      {usage.userId}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Period</p>
                    <p className="text-lg font-bold text-gray-900">{usage.month}</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Total API calls</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {usage.count.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Billing card */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Estimated monthly bill</p>
                    <p className="text-3xl font-bold text-gray-900">
                      ${usage.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Price per call: ${usage.pricePerCall.toFixed(4)}
                    </p>
                  </div>
                  <div className="bg-amber-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 10v2m8-10a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            {userId && month && <UsageCharts userId={userId} month={month} />}
          </div>
        )}
      </div>
    </main>
  );
}
