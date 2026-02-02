"use client";

import { useEffect, useState } from "react";

type UserSummary = {
  userId: string;
  email: string;
  planName: string | null;
  requestsPerMonth: number;
  count: number;
  isOverSoftLimit: boolean;
  isOverHardLimit: boolean;
};

export default function AdminUsersPage() {
  const [month, setMonth] = useState("2025-12");
  const [rows, setRows] = useState<UserSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `http://localhost:3001/usage/admin/summary/${month}`,
      );

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${await res.text()}`);
      }

      const data = (await res.json()) as UserSummary[];
      setRows(data);
    } catch (e: any) {
      setError(e.message ?? "Failed to fetch");
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users &amp; Monthly Usage</h1>

      <div className="flex items-center gap-3 mb-4">
        <label className="text-sm">
          Month (YYYY-MM):{" "}
          <input
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          />
        </label>
        <button
          onClick={fetchSummary}
          disabled={loading}
          className="px-3 py-1 rounded bg-blue-600 text-white text-sm disabled:opacity-50"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600 mb-3">{error}</p>
      )}

      <div className="overflow-x-auto border rounded-lg bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left">User</th>
              <th className="px-3 py-2 text-left">Plan</th>
              <th className="px-3 py-2 text-right">Limit</th>
              <th className="px-3 py-2 text-right">Used</th>
              <th className="px-3 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => {
              const status = u.isOverHardLimit
                ? "Over limit"
                : u.isOverSoftLimit
                ? "Near limit"
                : "Safe";

              const statusColor = u.isOverHardLimit
                ? "text-red-600"
                : u.isOverSoftLimit
                ? "text-amber-600"
                : "text-green-600";

              return (
                <tr key={u.userId} className="border-t">
                  <td className="px-3 py-2">
                    <div className="font-medium">{u.email}</div>
                    <div className="text-xs text-gray-500">{u.userId}</div>
                  </td>
                  <td className="px-3 py-2">
                    {u.planName ?? "No plan"}
                  </td>
                  <td className="px-3 py-2 text-right">
                    {u.requestsPerMonth
                      ? u.requestsPerMonth.toLocaleString()
                      : "-"}
                  </td>
                  <td className="px-3 py-2 text-right">
                    {u.count.toLocaleString()}
                  </td>
                  <td className={`px-3 py-2 ${statusColor}`}>{status}</td>
                </tr>
              );
            })}

            {rows.length === 0 && !loading && (
              <tr>
                <td
                  className="px-3 py-4 text-center text-gray-500"
                  colSpan={5}
                >
                  No users found for this month.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
