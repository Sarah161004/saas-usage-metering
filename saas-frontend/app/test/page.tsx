"use client";

import { useState } from "react";

export default function TestSecuredApiPage() {
  const [apiUrl, setApiUrl] = useState("http://localhost:3001/secure/test");
  const [apiKey, setApiKey] = useState("");
  const [method, setMethod] = useState<"GET" | "POST">("GET");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [responseBody, setResponseBody] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCall = async () => {
    setLoading(true);
    setStatus(null);
    setResponseBody(null);
    setError(null);

    try {
      const res = await fetch(apiUrl, {
        method,
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      });

      const text = await res.text();
      setStatus(`HTTP ${res.status} ${res.ok ? "OK" : "Error"}`);
      setResponseBody(text || "(empty body)");

      if (!res.ok) {
        setError(`Request failed with status ${res.status}`);
      }
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Test Secured API
          </h1>
          <p className="text-gray-600">
            Call a protected endpoint with an API key and verify authentication
            and metering.
          </p>
        </div>

        {/* Request form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Send test request
          </h2>

          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Endpoint URL
              </label>
              <input
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Example: http://localhost:3001/secure/test
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Method
                </label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value as "GET" | "POST")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key (x-api-key)
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter raw API key"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleCall}
            disabled={loading || !apiKey || !apiUrl}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
          >
            {loading ? "Sending request..." : "Call secured endpoint"}
          </button>
        </div>

        {/* Status / error */}
        {status && (
          <div className="bg-white rounded-xl shadow-md p-4 mb-4 border-l-4 border-blue-500">
            <p className="text-sm font-medium text-gray-700">Status</p>
            <p className="text-sm text-gray-900 mt-1">{status}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <p className="text-sm font-semibold text-red-800">Error</p>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        )}

        {/* Response body */}
        {responseBody && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Response body
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                {responseBody}
              </pre>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
