import * as React from "react";
import { BarChart3, Download, Calendar, TrendingUp, PieChart, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Analytics & Business Reports
          </h2>
          <p className="text-sm text-slate-500">
            Comprehensive business intelligence, merchant performance, and referral conversion funnels.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button size="md" variant="outline" disabled className="gap-2">
            <Calendar className="h-4 w-4" />
            <span>Last 30 Days</span>
          </Button>
          <Button size="md" variant="outline" disabled className="gap-2">
            <Download className="h-4 w-4" />
            <span>Generate PDF Report</span>
          </Button>
        </div>
      </div>

      {/* Main Empty State */}
      <EmptyState
        icon={BarChart3}
        title="Insufficient Data For Reports"
        description="Analytics require active merchant partnerships, customer referral links, and verified QR redemptions. Once transactions begin flowing through the system, rich interactive charts and conversion funnels will render here automatically."
        actionLabel="Explore Overview Dashboard"
        actionHref="/dashboard"
        secondaryActionLabel="Export Schedule"
      />

      {/* Report Module Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#2563EB]" />
              <CardTitle className="text-sm">Conversion Rate Analysis</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Link clicks vs customer QR claims vs verified physical merchant redemptions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/50 text-xs text-slate-400">
              Awaiting conversion stream
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <PieChart className="h-4 w-4 text-[#2563EB]" />
              <CardTitle className="text-sm">Top Performing Merchants</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Merchant ranking by referral order volume, redemption velocity, and repeat visits.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/50 text-xs text-slate-400">
              Awaiting merchant activity
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <LineChart className="h-4 w-4 text-[#2563EB]" />
              <CardTitle className="text-sm">Commission Growth Trend</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Monthly breakdown of referrer earnings, platform fees, and gross merchandise volume.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/50 text-xs text-slate-400">
              Awaiting revenue stream
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
