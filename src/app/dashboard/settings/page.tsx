import * as React from "react";
import { Save, Shield, Percent, Sliders, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Platform Settings & Rules
          </h2>
          <p className="text-sm text-slate-500">
            Configure system-wide referral parameters, commission defaults, and platform branding.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button size="md" variant="primary" className="gap-2">
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Core Parameters */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Platform Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-[#2563EB]" />
                <CardTitle className="text-base">General Platform Configuration</CardTitle>
              </div>
              <CardDescription>
                Basic platform identity and support parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Platform Name
                </label>
                <Input defaultValue="SOYAL REFERRAL SYSTEM" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Support Email
                  </label>
                  <Input defaultValue="support@soyal.local" type="email" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Primary Currency
                  </label>
                  <Input defaultValue="USD ($)" disabled />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commission Calculation Rules */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Percent className="h-4 w-4 text-[#2563EB]" />
                  <CardTitle className="text-base">Commission Calculation Defaults</CardTitle>
                </div>
                <Badge variant="default">Phase 1 Configured</Badge>
              </div>
              <CardDescription>
                Applied to new partner merchants when no custom tier is specified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Default Referral Commission Rate (%)
                  </label>
                  <Input defaultValue="10" type="number" />
                  <p className="text-[11px] text-slate-400">
                    Portion of sale granted to referrer upon QR verification.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Default Platform Service Margin (%)
                  </label>
                  <Input defaultValue="3" type="number" />
                  <p className="text-[11px] text-slate-400">
                    Retained by SOYAL SaaS platform operator.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-slate-700">
                  QR Voucher Validity Window
                </label>
                <Input defaultValue="7 Days" />
                <p className="text-[11px] text-slate-400">
                  Time customer has to redeem the generated QR code in-store before expiration.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Security & Integrations */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#2563EB]" />
                <CardTitle className="text-base">Phase 2 Integration Standby</CardTitle>
              </div>
              <CardDescription>
                Backend service slots prepared for subsequent phase
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50">
                <span className="text-xs font-medium text-slate-700">Supabase Auth & DB</span>
                <Badge variant="warning">Awaiting Phase 2</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50">
                <span className="text-xs font-medium text-slate-700">Automated Payout Gateway</span>
                <Badge variant="warning">Awaiting Phase 2</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50">
                <span className="text-xs font-medium text-slate-700">Merchant SMS/Email Alerts</span>
                <Badge variant="warning">Awaiting Phase 2</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <KeyRound className="h-4 w-4 text-[#2563EB]" />
                <CardTitle className="text-base">Environment Compliance</CardTitle>
              </div>
              <CardDescription>
                Security and environment verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500 leading-relaxed">
                No secrets or production API keys are stored in the client bundle. All credentials remain protected in accordance with strict SaaS security practices.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
