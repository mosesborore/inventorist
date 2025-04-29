import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { cn } from "./lib/utils";
import Navbar from "./components/ui/Navbar";
import { Toaster } from "react-hot-toast";
import Provider from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Inventorist",
  description: "Inventory Tracking System",
};

// import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={cn(
          "antialiased",
          inter.variable,
          "bg-base-200 min-h-screen",
        )}
      >
        <Navbar />
        <div className="container mx-auto">
          <Toaster position="top-right" />
          <Provider>{children}</Provider>
        </div>
      </body>
    </html>
  );
}
