import * as React from "react";
import { Share2, Plus, Copy, ExternalLink, QrCode, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ReferralsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Referral Tracking & Links
          </h2>
          <p className="text-sm text-slate-500">
            Create, distribute, and track unique referral campaign links and social media attribution.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button size="md" variant="primary">
            <Plus className="h-4 w-4" />
            <span>New Referral Link</span>
          </Button>
        </div>
      </div>

      {/* Quick Generator Preview Card */}
      <Card className="border-blue-100 bg-blue-50/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#2563EB]" />
              <CardTitle className="text-base text-slate-900">
                Referral Link Generator Engine
              </CardTitle>
            </div>
            <Badge variant="default">Phase 1 Interface</Badge>
          </div>
          <CardDescription>
            Referrers will share custom links. When opened by prospective customers, a unique QR code is generated.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Input
                readOnly
                value="https://soyal.local/ref/sample-merchant/invite-code"
                className="bg-white text-slate-500 font-mono text-xs"
              />
            </div>
            <Button variant="outline" size="md" className="gap-2">
              <Copy className="h-4 w-4" />
              <span>Copy Template</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      <EmptyState
        icon={Share2}
        title="No Referral Activity Logged"
        description="There are currently no active referral campaigns or tracked link clicks. When referrers share links across social media and customers generate QR passes, tracking data will stream here in real time."
        actionLabel="Create Referral Campaign"
        actionHref="/dashboard/referrals"
        secondaryActionLabel="View QR Verification"
      />

      {/* Technical Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#2563EB]" />
              <CardTitle className="text-sm">Click Attribution</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Monitors referrer source URLs (Instagram, TikTok, WhatsApp, Facebook) with conversion metrics.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-slate-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <QrCode className="h-4 w-4 text-[#2563EB]" />
              <CardTitle className="text-sm">Dynamic QR Binding</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Every customer referral click generates an authenticated cryptographic QR code.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-slate-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-[#2563EB]" />
              <CardTitle className="text-sm">Automated Settlement</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Successful merchant physical QR scans trigger instant commission credit to the referrer.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
