import * as React from "react";
import { Package, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import { PublicHeader, PublicFooter } from "@/components/public/layout-shell";

export default function PublicProductsCatalogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900">
      <PublicHeader />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Partner Products & Referral Offers
            </h1>
            <p className="mt-2 text-base text-slate-500">
              Discover eligible products from participating local merchants, claim referral discounts, or generate referral codes to earn commissions.
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search products by merchant or category..."
                className="pl-9"
                disabled
              />
            </div>
            <Button variant="outline" size="md" disabled className="gap-2">
              <Filter className="h-4 w-4" />
              <span>All Merchants</span>
            </Button>
          </div>

          {/* Professional Empty State (No fake products) */}
          <EmptyState
            icon={Package}
            title="Catalog Is Awaiting Partner Products"
            description="No merchant products have been published to the public catalog yet. Once partner merchants configure their promotional items in the admin dashboard, customers can view items, access referral links, and generate redemption QR vouchers."
            actionLabel="Go to Dashboard Products"
            actionHref="/dashboard/products"
            secondaryActionLabel="Return Home"
          />
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
