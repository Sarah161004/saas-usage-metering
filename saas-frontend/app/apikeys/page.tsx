"use client";

import { useState } from "react";
import Link from "next/link";

export default function ApiKeysPage() {
  const [userId, setUserId] = useState("");
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    setLoading(true);
    setError(null);
    setApiKey(null);

    try {
      const res = await fetch("http://localhost:3001/apikeys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${await res.text()}`);
      }

      const data = await res.json(); // { id, userId, createdAt, revoked, apiKey }
      setApiKey(data.apiKey);
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
            API keys
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Generate API keys for your users to access secured endpoints.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Create API key
            </h2>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              User ID
            </label>
            <input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              placeholder="Paste user ID (from /user/test)"
            />

            <button
              onClick={handleCreate}
              disabled={loading || !userId}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              {loading ? "Creating..." : "Create API key"}
            </button>
          </div>

          {error && (
            <div className="mt-2 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {apiKey && (
            <div className="mt-2 bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-green-800 mb-1">
                API key (copy now, shown once):
              </p>
              <code className="block text-xs break-all text-green-900 bg-white rounded px-3 py-2">
                {apiKey}
              </code>
            </div>
          )}

          {/* New bottom button to go to Usage & Billing */}
          <div className="pt-4">
            <Link
              href="/usage"
              className="block w-full text-center rounded-full bg-purple-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-purple-700 transition"
            >
              View usage &amp; billing
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
