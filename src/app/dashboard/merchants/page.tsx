"use client";

import * as React from "react";
import {
  Store,
  Plus,
  Search,
  Filter,
  Users,
  Package,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { DemoBadge } from "@/components/dashboard/demo-badge";
import { DEMO_MERCHANTS, DemoMerchant } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";

export default function MerchantsPage() {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");

  const categories = React.useMemo(() => {
    return Array.from(new Set(DEMO_MERCHANTS.map((m) => m.category)));
  }, []);

  const filteredMerchants = React.useMemo(() => {
    return DEMO_MERCHANTS.filter((merchant) => {
      const matchesSearch =
        merchant.name.toLowerCase().includes(search.toLowerCase()) ||
        merchant.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
        merchant.email.toLowerCase().includes(search.toLowerCase()) ||
        merchant.location.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || merchant.status === statusFilter;

      const matchesCategory =
        categoryFilter === "all" || merchant.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [search, statusFilter, categoryFilter]);

  const activeMerchantsCount = DEMO_MERCHANTS.filter((m) => m.status === "Active").length;
  const totalProductsCount = DEMO_MERCHANTS.reduce((sum, m) => sum + m.productCount, 0);
  const totalReferralsCount = DEMO_MERCHANTS.reduce((sum, m) => sum + m.totalReferrals, 0);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setCategoryFilter("all");
  };

  const getStatusBadge = (status: DemoMerchant["status"]) => {
    switch (status) {
      case "Active":
        return <Badge variant="success">Active</Badge>;
      case "Pending":
        return <Badge variant="warning">Pending</Badge>;
      case "Suspended":
        return <Badge variant="secondary">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Partner Merchants
            </h2>
            <DemoBadge />
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Manage participating local business partners, storefront locations, and referral performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button size="md" variant="primary">
            <Plus className="h-4 w-4" />
            <span>Add Merchant</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Merchants"
          value={DEMO_MERCHANTS.length}
          subtitle="Onboarded businesses"
          icon={Store}
          badgeText={`${activeMerchantsCount} Active`}
          badgeVariant="positive"
        />
        <StatCard
          title="Active Partners"
          value={activeMerchantsCount}
          subtitle="Ready for referral validation"
          icon={TrendingUp}
          badgeText="Verified status"
          badgeVariant="positive"
        />
        <StatCard
          title="Catalog Items"
          value={totalProductsCount}
          subtitle="Products across merchants"
          icon={Package}
          badgeText="Multi-category"
          badgeVariant="neutral"
        />
        <StatCard
          title="Referral Volume"
          value={totalReferralsCount}
          subtitle="Cumulative referral links"
          icon={Users}
          badgeText="All-time mock activity"
          badgeVariant="neutral"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search merchants by business name, contact, email, or city..."
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="h-3.5 w-3.5" />
            <span>Status:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-xs focus:border-blue-500 focus:outline-hidden"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
          </select>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Category:</span>
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-9 rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-xs focus:border-blue-500 focus:outline-hidden"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {(search || statusFilter !== "all" || categoryFilter !== "all") && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="gap-1 text-xs text-slate-600"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </Button>
          )}
        </div>
      </div>

      {/* Main Content: Data Table or Filtered Empty State */}
      {filteredMerchants.length > 0 ? (
        <div className="space-y-3">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Merchant / Business</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-center">Products</TableHead>
                  <TableHead className="text-center">Customers</TableHead>
                  <TableHead className="text-center">Referrals</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMerchants.map((merchant) => (
                  <TableRow key={merchant.id}>
                    <TableCell>
                      <div>
                        <div className="font-semibold text-slate-900">{merchant.name}</div>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Mail className="h-3 w-3" />
                          <span>{merchant.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {merchant.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium text-slate-800">{merchant.contactPerson}</div>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Phone className="h-3 w-3" />
                        <span>{merchant.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs text-slate-600">
                        <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
                        <span>{merchant.location}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-medium text-slate-700">
                      {merchant.productCount}
                    </TableCell>
                    <TableCell className="text-center font-medium text-slate-700">
                      {merchant.customerCount}
                    </TableCell>
                    <TableCell className="text-center font-medium text-slate-700">
                      {merchant.totalReferrals}
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">
                      {formatDate(merchant.registrationDate)}
                    </TableCell>
                    <TableCell>{getStatusBadge(merchant.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Showing {filteredMerchants.length} of {DEMO_MERCHANTS.length} demonstration merchants
            </span>
            <span>Stable mock dataset</span>
          </div>
        </div>
      ) : (
        <EmptyState
          icon={Store}
          title="No Matching Merchants Found"
          description="None of the demonstration merchants matched your current search and filter criteria. Clear your filters to view all partner merchants."
          actionLabel="Clear Filters"
          onAction={resetFilters}
        />
      )}
    </div>
  );
}
