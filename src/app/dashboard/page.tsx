import * as React from "react";
import Link from "next/link";
import {
  Store,
  Share2,
  Percent,
  QrCode,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 sm:p-8 text-white shadow-md">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-xs mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>SOYAL Referral Platform • Phase 1 Ready</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome to SOYAL Referral System
          </h2>
          <p className="mt-2 text-sm sm:text-base text-blue-100 leading-relaxed">
            Manage your partner businesses, social referral links, unique customer QR codes, and automated commission calculations in one unified dashboard.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/dashboard/merchants">
              <Button size="md" className="bg-white text-blue-700 hover:bg-blue-50 border-0 font-semibold">
                <Store className="h-4 w-4" />
                <span>Onboard Merchant</span>
              </Button>
            </Link>
            <Link href="/dashboard/qr-verification">
              <Button size="md" variant="outline" className="border-white/30 text-white bg-white/10 hover:bg-white/20">
                <QrCode className="h-4 w-4" />
                <span>Verify Purchase QR</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Metrics Empty State Overview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-slate-900">
            Real-Time Platform Performance
          </h3>
          <span className="text-xs text-slate-400">
            Awaiting live merchant activity
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Merchants"
            value="0"
            subtitle="Partner businesses on platform"
            icon={Store}
            badgeText="Ready to onboard"
            badgeVariant="neutral"
          />
          <StatCard
            title="Total Referrals Generated"
            value="0"
            subtitle="Social referral links tracked"
            icon={Share2}
            badgeText="0 this month"
            badgeVariant="neutral"
          />
          <StatCard
            title="Verified Purchases"
            value="0"
            subtitle="Merchant QR code redemptions"
            icon={QrCode}
            badgeText="0 pending"
            badgeVariant="neutral"
          />
          <StatCard
            title="Commissions Calculated"
            value="$0.00"
            subtitle="Total calculated commissions"
            icon={Percent}
            badgeText="$0.00 paid"
            badgeVariant="neutral"
          />
        </div>
      </div>

      {/* Getting Started Guide & Architecture Status */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Step-by-Step Launch Checklist */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Platform Launch Guide</CardTitle>
                <CardDescription>
                  Follow these steps to set up your referral marketing engine
                </CardDescription>
              </div>
              <Badge variant="default">Phase 1 Architecture</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-[#2563EB] font-bold text-xs mt-0.5">
                1
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-900">
                    Add Partner Merchants
                  </h4>
                  <Link
                    href="/dashboard/merchants"
                    className="text-xs font-medium text-[#2563EB] hover:underline inline-flex items-center gap-1"
                  >
                    Go to Merchants <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Register local businesses offering referral rewards and define their commission agreements.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-[#2563EB] font-bold text-xs mt-0.5">
                2
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-900">
                    Publish Eligible Products & Offers
                  </h4>
                  <Link
                    href="/dashboard/products"
                    className="text-xs font-medium text-[#2563EB] hover:underline inline-flex items-center gap-1"
                  >
                    Go to Products <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  List items with transparent referral rewards and purchase terms for referrers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-[#2563EB] font-bold text-xs mt-0.5">
                3
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-900">
                    Generate Links & QR Verification
                  </h4>
                  <Link
                    href="/dashboard/qr-verification"
                    className="text-xs font-medium text-[#2563EB] hover:underline inline-flex items-center gap-1"
                  >
                    QR Scanner <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Track referrals on social media, issue customer QR codes, and allow merchant staff to verify in-store redemptions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-[#2563EB] font-bold text-xs mt-0.5">
                4
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-900">
                    Automate Commission Calculations
                  </h4>
                  <Link
                    href="/dashboard/commissions"
                    className="text-xs font-medium text-[#2563EB] hover:underline inline-flex items-center gap-1"
                  >
                    View Commissions <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Platform auto-computes affiliate payouts upon merchant QR scan verification.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Readiness Status */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>System Readiness</CardTitle>
            <CardDescription>
              Phase 1 architecture status & next phase preparation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-white">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-medium text-slate-700">UI / UX System</span>
              </div>
              <Badge variant="success">Operational</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-white">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-medium text-slate-700">All 10 Admin Routes</span>
              </div>
              <Badge variant="success">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-white">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-medium text-slate-700">Public Product Catalog</span>
              </div>
              <Badge variant="success">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-white">
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-xs font-medium text-slate-700">Supabase Integration</span>
              </div>
              <Badge variant="warning">Phase 2</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-white">
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-xs font-medium text-slate-700">Live Camera QR Scanner</span>
              </div>
              <Badge variant="warning">Phase 2</Badge>
            </div>
          </CardContent>

          <div className="p-4 border-t border-slate-100 bg-slate-50/50 rounded-b-xl">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 text-[#2563EB]" />
              <span>Strictly zero mock/fake business data mode.</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
