"use client";

import * as React from "react";
import {
  QrCode,
  ScanLine,
  ShieldCheck,
  Camera,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { DemoBadge } from "@/components/dashboard/demo-badge";
import {
  simulateQRVerification,
  DEMO_REFERRALS,
  DemoQRVerificationResult,
} from "@/lib/demo-data";

export default function QRVerificationPage() {
  const [inputCode, setInputCode] = React.useState("REF-ELC-7821");
  const [verificationResult, setVerificationResult] =
    React.useState<DemoQRVerificationResult | null>(() =>
      simulateQRVerification("REF-ELC-7821")
    );

  const handleVerify = (codeToVerify?: string) => {
    const targetCode = codeToVerify || inputCode;
    const result = simulateQRVerification(targetCode);
    setVerificationResult(result);
  };

  // Quick preset codes for interactive testing
  const sampleCodes = [
    { code: "REF-ELC-7823", label: "Active Code (Valid)" },
    { code: "REF-ELC-7821", label: "Used Voucher (Redeemed)" },
    { code: "REF-OAS-1201", label: "Cancelled Code" },
    { code: "REF-INVALID-9999", label: "Unregistered Code" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Merchant QR Verification Hub
            </h2>
            <DemoBadge />
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Interactive frontend demonstration of customer referral QR code verification at merchant checkout.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default" className="gap-1.5 py-1 px-3">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Frontend Simulation Mode</span>
          </Badge>
        </div>
      </div>

      {/* Prominent Architectural Simulation Disclaimer */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-xs text-blue-900 flex items-start gap-3">
        <Info className="h-4 w-4 text-[#2563EB] flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Frontend Simulation Only:</span> Real cryptographic QR token generation, merchant scanning APIs, and database persistence are deferred to Phase 2. This interface demonstrates the clerk scanning experience and validation logic entirely within browser memory. <strong>Scanning a QR code does not create a commission</strong>—commissions are only triggered upon confirmed qualifying purchases.
        </div>
      </div>

      {/* Scanner Simulation & Result Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Verification Terminal Simulation Shell */}
        <Card className="lg:col-span-1 border-blue-200 shadow-xs">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Camera className="h-4 w-4 text-[#2563EB]" />
              <span>Merchant Scanner Terminal</span>
            </CardTitle>
            <CardDescription>
              Test referral voucher codes to simulate cashier validation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] mb-2">
                <ScanLine className="h-6 w-6 animate-pulse" />
              </div>
              <p className="text-xs font-semibold text-slate-700">Simulated Scanner Ready</p>
              <p className="text-[11px] text-slate-400 mt-1 max-w-[220px]">
                Hardware optical scanner simulated below via code input.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">
                Enter Referral Voucher Code
              </label>
              <div className="flex gap-2">
                <Input
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="e.g. REF-ELC-7821"
                  className="font-mono text-xs uppercase"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleVerify();
                  }}
                />
                <Button variant="primary" size="md" onClick={() => handleVerify()}>
                  Verify
                </Button>
              </div>
            </div>

            {/* Quick Test Presets */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-medium text-slate-500">Quick Test Samples:</span>
              <div className="flex flex-col gap-1.5">
                {sampleCodes.map((sample) => (
                  <button
                    key={sample.code}
                    onClick={() => {
                      setInputCode(sample.code);
                      handleVerify(sample.code);
                    }}
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/60 px-2.5 py-1.5 text-left text-xs transition-colors hover:bg-blue-50 hover:border-blue-200"
                  >
                    <span className="font-mono font-medium text-slate-700">{sample.code}</span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      {sample.label}
                      <ArrowRight className="h-3 w-3 text-slate-400" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Outcome Card */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#2563EB]" />
                    <span>Simulated Verification Outcome</span>
                  </CardTitle>
                  <CardDescription>
                    Live outcome payload generated by local mock verification rules
                  </CardDescription>
                </div>
                {verificationResult && (
                  <Badge
                    variant={
                      verificationResult.verificationStatus === "VALID"
                        ? "success"
                        : verificationResult.verificationStatus === "ALREADY_USED"
                        ? "warning"
                        : "secondary"
                    }
                    className="py-1 px-2.5 text-xs font-semibold"
                  >
                    {verificationResult.verificationStatus === "VALID" && "VALID VOUCHER"}
                    {verificationResult.verificationStatus === "ALREADY_USED" && "ALREADY USED"}
                    {verificationResult.verificationStatus === "INVALID_CODE" && "INVALID CODE"}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {verificationResult ? (
                <div className="space-y-4">
                  {/* Result Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                    <div>
                      <span className="text-[11px] font-semibold uppercase text-slate-400">
                        Referral Reference
                      </span>
                      <div className="mt-0.5 font-mono text-sm font-bold text-slate-900">
                        {verificationResult.referralReference}
                      </div>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold uppercase text-slate-400">
                        Referral Owner (Customer)
                      </span>
                      <div className="mt-0.5 text-sm font-medium text-slate-900">
                        {verificationResult.referralOwner}
                      </div>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold uppercase text-slate-400">
                        Merchant
                      </span>
                      <div className="mt-0.5 text-sm font-medium text-slate-900">
                        {verificationResult.merchantName}
                      </div>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold uppercase text-slate-400">
                        Product / Offer
                      </span>
                      <div className="mt-0.5 text-sm font-medium text-slate-900">
                        {verificationResult.productName}
                      </div>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold uppercase text-slate-400">
                        Scan Timestamp
                      </span>
                      <div className="mt-0.5 font-mono text-xs text-slate-600">
                        {verificationResult.scanTimestamp}
                      </div>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold uppercase text-slate-400">
                        Purchase Status Rule
                      </span>
                      <div className="mt-0.5 text-xs font-semibold text-slate-800">
                        {verificationResult.purchaseStatus === "QUALIFYING_PURCHASE_CONFIRMED"
                          ? "Qualifying Purchase (≥ $3.00)"
                          : "Awaiting Confirmation"}
                      </div>
                    </div>
                  </div>

                  {/* Notes / Simulation Feedback */}
                  <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-600 flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-800">Simulation Note: </span>
                      {verificationResult.notes}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400">
                  <QrCode className="h-10 w-10 text-slate-300 mb-2" />
                  <p className="text-sm font-medium">Enter a code and click Verify to inspect details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Verification History Table (Simulated from existing referrals) */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Recent Verification Queue Logs</CardTitle>
              <CardDescription>
                Simulated logs of customer voucher presentations across merchant storefronts
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleVerify("REF-ELC-7821")}
              className="gap-1.5 text-xs"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reset Queue</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Voucher Code</TableHead>
                  <TableHead>Referral Owner</TableHead>
                  <TableHead>Merchant</TableHead>
                  <TableHead>Associated Product</TableHead>
                  <TableHead>Channel</TableHead>
                  <TableHead className="text-center">Total Scans</TableHead>
                  <TableHead>Redemption Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DEMO_REFERRALS.slice(0, 7).map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <span className="font-mono text-xs font-semibold text-blue-600">
                        {item.referralCode}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-slate-800">
                      {item.customerName}
                    </TableCell>
                    <TableCell className="text-xs text-slate-700">
                      {item.merchantName}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-xs text-slate-600">
                      {item.productName}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[11px]">
                        {item.deliveryChannel}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center font-semibold text-slate-700">
                      {item.scanCount}
                    </TableCell>
                    <TableCell>
                      {item.status === "Used" ? (
                        <Badge variant="success">Verified Purchase</Badge>
                      ) : (
                        <Badge variant="info">Active Voucher</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setInputCode(item.referralCode);
                          handleVerify(item.referralCode);
                        }}
                        className="text-xs text-blue-600 hover:text-blue-700"
                      >
                        Inspect
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
