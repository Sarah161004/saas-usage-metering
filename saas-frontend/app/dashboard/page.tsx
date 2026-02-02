export default function DashboardPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="max-w-4xl w-full space-y-4">
        <h1 className="text-3xl font-semibold text-gray-900">
          SaaS usage dashboard
        </h1>
        <p className="text-sm text-gray-600">
          Jump to any section to manage keys, monitor usage, and review users.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <a
            href="/apikeys"
            className="rounded-2xl bg-white shadow-md p-4 border-b-4 border-b-purple-400 hover:shadow-lg hover:border-b-purple-500 transition"
          >
            <h2 className="font-semibold mb-1 text-sm">API keys</h2>
            <p className="text-xs text-gray-600">
              Create, view, and revoke keys.
            </p>
          </a>

          <a
            href="/usage"
            className="rounded-2xl bg-white shadow-md p-4 border-b-4 border-b-purple-400 hover:shadow-lg hover:border-b-purple-500 transition"
          >
            <h2 className="font-semibold mb-1 text-sm">Usage & billing</h2>
            <p className="text-xs text-gray-600">
              See monthly calls and charges.
            </p>
          </a>

          <a
            href="/admin/users"
            className="rounded-2xl bg-white shadow-md p-4 border-b-4 border-b-purple-400 hover:shadow-lg hover:border-b-purple-500 transition"
          >
            <h2 className="font-semibold mb-1 text-sm">Users & limits</h2>
            <p className="text-xs text-gray-600">
              Check plans, limits, and status.
            </p>
          </a>
        </div>
      </div>
    </main>
  );
}
