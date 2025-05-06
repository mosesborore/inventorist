"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";

function Navbar() {
  const path = usePathname();

  const siteRoutes = [
    { label: "Products", href: "/products" },
    { label: "Summary", href: "/products/summary" },
    { label: "Search", href: "/products/search" },
    { label: "Invoices", href: "/invoices" },
  ];
  return (
    <div className="container mx-auto">
      <nav className="bg-base-100 flex items-center justify-between px-2 py-5">
        <Link href="/" className="text-xl font-bold tracking-wide">
          Inventorist
        </Link>
        <div>
          <ul className="flex gap-4 text-sm font-bold">
            {siteRoutes.map((siteRoute) => {
              return (
                <li
                  key={siteRoute.label}
                  className={cn(
                    path.includes(siteRoute.href)
                      ? "border-b-1 text-gray-400 transition duration-200"
                      : "",
                  )}
                >
                  <Link href={siteRoute.href}>{siteRoute.label}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
