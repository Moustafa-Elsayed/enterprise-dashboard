import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Enterprise Dashboard",
  description: "Monitor system health and recent activities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://api.dicebear.com" />
      </head>
      <body className={`${inter.variable} antialiased font-sans`}>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
