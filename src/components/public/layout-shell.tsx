import * as React from "react";
import Link from "next/link";
import { ShieldCheck, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/95 backdrop-blur-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB] text-white shadow-xs">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-slate-900 leading-none">
              SOYAL
            </span>
            <span className="text-[10px] font-semibold text-[#2563EB] tracking-wider uppercase mt-0.5">
              Referral System
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="transition-colors hover:text-[#2563EB]">
            Home
          </Link>
          <Link href="/products" className="transition-colors hover:text-[#2563EB]">
            Explore Products
          </Link>
          <a href="#how-it-works" className="transition-colors hover:text-[#2563EB]">
            How It Works
          </a>
          <a href="#for-merchants" className="transition-colors hover:text-[#2563EB]">
            For Merchants
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button size="md" variant="primary" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span>Admin Dashboard</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50 py-12 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#2563EB] text-white">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="font-bold text-slate-900">SOYAL REFERRAL SYSTEM</span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm">
              Empowering local businesses with high-converting social referral links, unique customer QR verification, and automated commission tracking.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <Link href="/products" className="hover:text-slate-900">
                  Product Catalog
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-slate-900">
                  Dashboard Login
                </Link>
              </li>
              <li>
                <Link href="/dashboard/qr-verification" className="hover:text-slate-900">
                  Merchant QR Scanner
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Phase 1 Status
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Phase 1 Foundation operational. Database and authentication ready for Phase 2 Supabase deployment.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} SOYAL REFERRAL SYSTEM. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-600 cursor-pointer">Merchant Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
