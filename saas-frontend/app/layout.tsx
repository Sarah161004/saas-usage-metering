import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SaaS Usage Dashboard",
  description: "API keys, usage and billing demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-blue-50 via-white to-purple-50`}
      >
        {/* Header + nav */}
        <header className="px-6 pt-6 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-md">
                <span className="text-xs font-bold text-white">SB</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  SaaS Billing
                </p>
                <p className="text-xs text-gray-500">
                  Usage metering demo
                </p>
              </div>
            </div>
          </div>

          {/* Simple nav */}
          <nav className="flex gap-4 text-sm text-gray-700">
            <Link href="/" className="hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/usage" className="hover:text-blue-600">
              Usage &amp; Billing
            </Link>
            <Link href="/admin/users" className="hover:text-blue-600">
              Users &amp; Usage
            </Link>
          </nav>
        </header>

        <div className="p-4 md:p-8">
          {children}
        </div>
      </body>
    </html>
  );
}
