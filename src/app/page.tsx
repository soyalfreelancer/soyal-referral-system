import * as React from "react";
import Link from "next/link";
import {
  Share2,
  QrCode,
  Percent,
  Store,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PublicHeader, PublicFooter } from "@/components/public/layout-shell";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/70 px-3.5 py-1 text-xs font-semibold text-[#2563EB] mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Modern SaaS Referral & Commission Architecture</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.15]">
                Turn Social Referrals Into Verified In-Store Sales
              </h1>

              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Partner with local businesses, promote their products with trackable social links, issue unique customer QR codes, and automate physical purchase verification and commission calculations.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href="/dashboard">
                  <Button size="lg" variant="primary" className="gap-2 shadow-md">
                    <span>Open Admin Dashboard</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/products">
                  <Button size="lg" variant="outline">
                    <span>Browse Product Catalog</span>
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#2563EB]" />
                  <span>No Fake Business Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#2563EB]" />
                  <span>Merchant QR Code Verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#2563EB]" />
                  <span>Automated Commission Calculation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid / Core Workflow */}
        <section id="how-it-works" className="py-20 bg-slate-50/60 border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="default" className="mb-3">
                End-To-End Referral Lifecycle
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                How SOYAL Referral Platform Works
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-500">
                Designed to bridge digital social sharing with verified in-person merchant transactions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] mb-4">
                    <Store className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-base">1. Merchant Onboarding</CardTitle>
                  <CardDescription className="text-xs leading-relaxed">
                    Local stores list their offerings and establish agreed referral bounty rates or percentage margins.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] mb-4">
                    <Share2 className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-base">2. Social Referrals</CardTitle>
                  <CardDescription className="text-xs leading-relaxed">
                    Referrers distribute customized affiliate links across social media channels, chat apps, and blogs.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] mb-4">
                    <QrCode className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-base">3. Unique Customer QR</CardTitle>
                  <CardDescription className="text-xs leading-relaxed">
                    Referred customers generate a unique, cryptographically signed QR code pass on their mobile device.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] mb-4">
                    <Percent className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-base">4. Scan & Commission</CardTitle>
                  <CardDescription className="text-xs leading-relaxed">
                    Merchant scans customer QR code upon purchase. Platform validates and auto-calculates referral payout.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-[#2563EB] p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
              <div className="max-w-xl">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Ready to explore the dashboard?
                </h3>
                <p className="mt-2 text-sm text-blue-100">
                  Experience the full administrative suite, all 10 navigation sections, and scalable architecture.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold border-0">
                    Launch Dashboard
                  </Button>
                </Link>
                <Link href="/products">
                  <Button size="lg" variant="outline" className="border-white/30 text-white bg-white/10 hover:bg-white/20">
                    View Catalog
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
