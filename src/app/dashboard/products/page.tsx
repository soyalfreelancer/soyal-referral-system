import * as React from "react";
import { Package, Plus, Search, Filter, Tag, Layers, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Product Catalog & Offers
          </h2>
          <p className="text-sm text-slate-500">
            Configure partner products, services, and special promotional referral incentives.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button size="md" variant="primary">
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search products by title, merchant, or SKU..."
            className="pl-9"
            disabled
          />
        </div>
        <Button variant="outline" size="md" disabled className="gap-2">
          <Filter className="h-4 w-4" />
          <span>All Categories</span>
        </Button>
      </div>

      {/* Empty State */}
      <EmptyState
        icon={Package}
        title="No Products In Catalog"
        description="Add products or services from partner merchants. Each product can have custom referral commission rules, marketing materials, and unique QR code generation for referrers."
        actionLabel="Create First Product"
        actionHref="/dashboard/products"
        secondaryActionLabel="Import Product CSV"
      />

      {/* Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-[#2563EB]" />
              <CardTitle className="text-sm">Flexible Commission Types</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Supports fixed dollar amounts or percentage payouts per verified product sale.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-slate-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <QrCode className="h-4 w-4 text-[#2563EB]" />
              <CardTitle className="text-sm">Dynamic QR Badging</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Automatically creates branded QR codes embedding product ID and referrer identifier.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-slate-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#2563EB]" />
              <CardTitle className="text-sm">Public Discovery</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Instantly surfaces published items on the customer storefront for referral sharing.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
