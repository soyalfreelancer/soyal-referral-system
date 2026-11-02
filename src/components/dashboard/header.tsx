"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Bell, User, ExternalLink } from "lucide-react";
import { Sidebar } from "./sidebar";
import { DASHBOARD_NAV_ITEMS } from "@/lib/constants";

export function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  const currentItem = DASHBOARD_NAV_ITEMS.find((item) =>
    item.href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(item.href)
  );

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 sm:px-6 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 lg:hidden cursor-pointer"
            aria-label="Open mobile menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Breadcrumb / Title Context */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Link href="/dashboard" className="hover:text-slate-600">
                Dashboard
              </Link>
              {currentItem && currentItem.href !== "/dashboard" && (
                <>
                  <span>/</span>
                  <span className="font-medium text-slate-700">
                    {currentItem.title}
                  </span>
                </>
              )}
            </div>
            <h1 className="text-base font-semibold text-slate-900 leading-tight">
              {currentItem?.title || "Dashboard"}
            </h1>
          </div>
        </div>

        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-[#2563EB] px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-blue-200 transition-colors"
          >
            <span>Live Storefront</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-600"></span>
          </button>

          {/* User Profile Summary */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB] border border-blue-100">
              <User className="h-4 w-4" />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-900 leading-none">
                Platform Admin
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">
                admin@soyal.local
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-50 flex flex-col w-72 bg-white shadow-xl h-full animate-in slide-in-from-left duration-200">
            <div className="absolute top-4 right-4 z-10">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <Sidebar onNavClick={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
