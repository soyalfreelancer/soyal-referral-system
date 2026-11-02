import * as React from "react";
import { Percent, DollarSign, Calculator, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CommissionsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Commission Calculation & Payouts
          </h2>
          <p className="text-sm text-slate-500">
            Review automatically calculated referral commissions, pending approvals, and scheduled payouts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button size="md" variant="outline" disabled className="gap-2">
            <Calculator className="h-4 w-4" />
            <span>Recalculate Batch</span>
          </Button>
          <Button size="md" variant="primary" disabled>
            <span>Process Payouts</span>
          </Button>
        </div>
      </div>

      {/* Summary KPI Cards (Zero values, no fake metrics) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Accrued"
          value="$0.00"
          subtitle="Commissions earned to date"
          icon={DollarSign}
          badgeText="0 pending"
          badgeVariant="neutral"
        />
        <StatCard
          title="Pending Approval"
          value="$0.00"
          subtitle="Awaiting purchase verification"
          icon={Clock}
          badgeText="Requires verification"
          badgeVariant="neutral"
        />
        <StatCard
          title="Ready For Payout"
          value="$0.00"
          subtitle="Approved referral commissions"
          icon={CheckCircle2}
          badgeText="0 payouts ready"
          badgeVariant="neutral"
        />
        <StatCard
          title="Platform Take Rate"
          value="10.0%"
          subtitle="Default platform processing fee"
          icon={Percent}
          badgeText="Standard rule"
          badgeVariant="neutral"
        />
      </div>

      {/* Empty State Table */}
      <EmptyState
        icon={Percent}
        title="No Commission Records Generated"
        description="Referral commissions are calculated automatically once merchants scan and verify customer QR vouchers at checkout. As redemptions occur, itemized referral commission entries will appear here for payout management."
        actionLabel="Review Commission Rules"
        actionHref="/dashboard/settings"
        secondaryActionLabel="View Verified QR Codes"
      />

      {/* Commission Rules Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Commission Calculation Architecture</CardTitle>
          <CardDescription>
            Configured logic applied automatically upon merchant verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50">
              <span className="font-medium text-slate-800">Rule 1: Percentage of Order Total</span>
              <Badge variant="default">e.g. 10% - 20% by Merchant</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50">
              <span className="font-medium text-slate-800">Rule 2: Flat Bounty per Verified Sale</span>
              <Badge variant="secondary">e.g. $15.00 per customer</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50">
              <span className="font-medium text-slate-800">Rule 3: Multi-Tiered Referral Bonuses</span>
              <Badge variant="outline">Optional add-on</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
