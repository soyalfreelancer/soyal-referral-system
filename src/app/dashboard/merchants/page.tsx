import * as React from "react";
import { Store, Plus, Search, Filter, Building2, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function MerchantsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Partner Merchants
          </h2>
          <p className="text-sm text-slate-500">
            Manage participating local business partners, storefronts, and agreed commission structures.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button size="md" variant="primary">
            <Plus className="h-4 w-4" />
            <span>Add Merchant</span>
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search merchants by business name, email, or category..."
            className="pl-9"
            disabled
          />
        </div>
        <Button variant="outline" size="md" disabled className="gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </div>

      {/* Main Content: Professional Empty State */}
      <EmptyState
        icon={Store}
        title="No Merchants Registered Yet"
        description="Begin building your local business referral network. Once merchants are onboarded, their business profile, product offerings, verification PINs, and commission rates will appear here."
        actionLabel="Register First Merchant"
        actionHref="/dashboard/merchants"
        secondaryActionLabel="Learn Merchant Onboarding"
      />

      {/* Architecture Readiness Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#2563EB]" />
              <CardTitle className="text-sm">Merchant Profiles</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Supports multi-branch locations, business hours, and authorized staff credentials.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-slate-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#2563EB]" />
              <CardTitle className="text-sm">Commission Agreements</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Configurable per-merchant flat rates or percentage commissions for referral sales.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-slate-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#2563EB]" />
              <CardTitle className="text-sm">Portal Invites</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Automated onboarding invitations with QR scanner credentials for store managers.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
