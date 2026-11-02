import * as React from "react";
import { Users, UserPlus, Search, Filter, Shield, UserCheck, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Referred Customers & Users
          </h2>
          <p className="text-sm text-slate-500">
            View customer engagements, referral purchases, and customer verification histories.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button size="md" variant="primary">
            <UserPlus className="h-4 w-4" />
            <span>Invite Customer</span>
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search customers by name, email, or referral code..."
            className="pl-9"
            disabled
          />
        </div>
        <Button variant="outline" size="md" disabled className="gap-2">
          <Filter className="h-4 w-4" />
          <span>Status</span>
        </Button>
      </div>

      {/* Empty State */}
      <EmptyState
        icon={Users}
        title="No Customer Records Found"
        description="When customers accept referral links, claim discounts, or present verified QR codes at merchant stores, their profiles and transaction histories will automatically appear here."
        actionLabel="View Referral Links"
        actionHref="/dashboard/referrals"
        secondaryActionLabel="Export Directory"
      />

      {/* Architecture Readiness */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#2563EB]" />
              <CardTitle className="text-sm">Fraud Prevention</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Detect duplicate accounts, self-referrals, and abnormal redemption patterns.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-slate-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-[#2563EB]" />
              <CardTitle className="text-sm">Attribution History</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Direct tracking linking every customer back to their original social media referrer.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-slate-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <HeartHandshake className="h-4 w-4 text-[#2563EB]" />
              <CardTitle className="text-sm">Loyalty & Retention</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Tracks repeat purchases at partner businesses with lifetime customer value metrics.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
