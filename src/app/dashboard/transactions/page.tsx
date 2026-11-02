import * as React from "react";
import { Receipt, Download, Filter, Search, ArrowDownRight, CreditCard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Financial Transactions & Ledger
          </h2>
          <p className="text-sm text-slate-500">
            Immutable audit log of all referral commission payouts, merchant settlements, and system adjustments.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button size="md" variant="outline" disabled className="gap-2">
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search transactions by reference ID, merchant, or beneficiary..."
            className="pl-9"
            disabled
          />
        </div>
        <Button variant="outline" size="md" disabled className="gap-2">
          <Filter className="h-4 w-4" />
          <span>All Types</span>
        </Button>
      </div>

      {/* Empty State */}
      <EmptyState
        icon={Receipt}
        title="No Financial Transactions Logged"
        description="The ledger is currently clear. When commissions are disbursed or merchant fees are collected in future phases, every settlement will be permanently audited and cataloged here."
        actionLabel="Go to Commissions"
        actionHref="/dashboard/commissions"
        secondaryActionLabel="Ledger Settings"
      />

      {/* Capabilities Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#2563EB]" />
              <CardTitle className="text-sm">Audit-Proof Ledger</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Every payout references a validated QR verification event and merchant receipt ID.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-slate-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-[#2563EB]" />
              <CardTitle className="text-sm">Disbursement Tracking</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Designed for seamless bank ACH, Stripe Connect, or PayPal batch payouts in future releases.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-slate-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ArrowDownRight className="h-4 w-4 text-[#2563EB]" />
              <CardTitle className="text-sm">Fee Transparency</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Itemized breakdowns of gross merchant volume, referral bonus, and platform margins.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
