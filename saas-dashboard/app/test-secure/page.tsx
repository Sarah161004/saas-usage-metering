"use client";

import { useState } from "react";

export default function TestSecurePage() {
  const [apiKey, setApiKey] = useState("");
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCall = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("http://localhost:3001/secure/test", {
        headers: {
          "x-api-key": apiKey,
        },
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${await res.text()}`);
      }

      const data = await res.json(); // { ok: true, message: "..." }
      setResult(data);
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-4 bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Test secured API
        </h1>
        <p className="text-sm text-gray-600">
          Call the protected endpoint using an API key you generated.
        </p>

        <input
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Paste API key here"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <button
          onClick={handleCall}
          disabled={loading || !apiKey}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
        >
          {loading ? "Calling..." : "Call secured endpoint"}
        </button>

        {error && (
          <div className="mt-2 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Put the pretty success UI HERE */}
        {result && (
          <div className="mt-4 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
                ✓
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-green-900">
                  {result.message}
                </p>
                <p className="text-xs text-green-800">
                  The API key is valid and the protected route responded successfully.
                </p>
                
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
