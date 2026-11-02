import * as React from "react";
import { QrCode, ScanLine, ShieldCheck, CheckCircle2, AlertCircle, Camera, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function QRVerificationPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Merchant QR Verification Hub
          </h2>
          <p className="text-sm text-slate-500">
            Verify customer referral QR codes at merchant checkout and trigger commission validation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default" className="gap-1.5 py-1 px-3">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Cryptographic Validation Mode</span>
          </Badge>
        </div>
      </div>

      {/* Verification Terminal Simulation Shell */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 border-blue-200 shadow-xs">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Camera className="h-4 w-4 text-[#2563EB]" />
              <span>Merchant Scanner Terminal</span>
            </CardTitle>
            <CardDescription>
              Scan customer mobile voucher or enter referral redemption code manually.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] mb-3">
                <ScanLine className="h-7 w-7 animate-pulse" />
              </div>
              <p className="text-xs font-medium text-slate-700">Camera Scanner Ready</p>
              <p className="text-[11px] text-slate-400 mt-1 max-w-[200px]">
                Hardware camera access will activate upon merchant staff login in Phase 2.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">
                Manual Code Entry
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. REF-SOYAL-8921"
                  className="font-mono text-xs"
                  disabled
                />
                <Button variant="primary" size="md" disabled>
                  Verify
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Logs / Empty Queue */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Recent Verification Queue</CardTitle>
                  <CardDescription>
                    Real-time log of customer purchase verifications across all merchant locations
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="gap-1 text-xs" disabled>
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Refresh Queue</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              <EmptyState
                icon={QrCode}
                title="No QR Redemptions Recorded"
                description="Merchant staff have not submitted any customer QR codes for verification. When a customer presents their QR voucher and the merchant completes the verification, details including purchase amount, referrer, and commission calculation will appear here."
                actionLabel="Learn QR Scanner Flow"
                secondaryActionLabel="Test Scanner Mock"
                className="border-0 bg-transparent py-8"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Safety & Protocol Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <CardTitle className="text-sm">One-Time Voucher Use</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Every customer QR code is single-use and invalidates immediately upon merchant scanning.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-slate-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <CardTitle className="text-sm">Merchant PIN Authorization</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Prevents unauthorized redemptions by requiring cashier PIN or authenticated staff token.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-slate-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#2563EB]" />
              <CardTitle className="text-sm">Instant Commission Calculation</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Applies product commission rules right after order total is entered by merchant staff.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
