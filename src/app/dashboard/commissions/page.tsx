"use client";

import * as React from "react";
import {
  Percent,
  DollarSign,
  Clock,
  CheckCircle2,
  Search,
  Filter,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { DemoBadge } from "@/components/dashboard/demo-badge";
import { DEMO_COMMISSIONS, DemoCommission } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";

export default function CommissionsPage() {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [currencyFilter, setCurrencyFilter] = React.useState<string>("all");
  const [hierarchyFilter, setHierarchyFilter] = React.useState<string>("all");

  const filteredCommissions = React.useMemo(() => {
    return DEMO_COMMISSIONS.filter((comm) => {
      const matchesSearch =
        comm.referralOwnerName.toLowerCase().includes(search.toLowerCase()) ||
        comm.merchantName.toLowerCase().includes(search.toLowerCase()) ||
        comm.productName.toLowerCase().includes(search.toLowerCase()) ||
        comm.purchaseReference.toLowerCase().includes(search.toLowerCase()) ||
        comm.id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || comm.status === statusFilter;

      const matchesCurrency =
        currencyFilter === "all" || comm.currency === currencyFilter;

      const matchesHierarchy =
        hierarchyFilter === "all" || comm.commissionHierarchy === hierarchyFilter;

      return matchesSearch && matchesStatus && matchesCurrency && matchesHierarchy;
    });
  }, [search, statusFilter, currencyFilter, hierarchyFilter]);

  // Aggregate stats separated by currency (Never convert USD and SLSH)
  const usdCommissions = DEMO_COMMISSIONS.filter((c) => c.currency === "USD" && c.status !== "Cancelled");
  const totalUsdAccrued = usdCommissions.reduce((sum, c) => sum + c.commissionAmount, 0);

  const pendingCount = DEMO_COMMISSIONS.filter((c) => c.status === "Pending").length;
  const approvedCount = DEMO_COMMISSIONS.filter((c) => c.status === "Approved").length;
  const paidCount = DEMO_COMMISSIONS.filter((c) => c.status === "Paid").length;

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setCurrencyFilter("all");
    setHierarchyFilter("all");
  };

  const formatAmount = (amount: number, currency: "USD" | "SLSH") => {
    if (currency === "USD") return `$${amount.toFixed(2)}`;
    return `${amount.toLocaleString()} SLSH`;
  };

  const getStatusBadge = (status: DemoCommission["status"]) => {
    switch (status) {
      case "Pending":
        return <Badge variant="warning">Pending</Badge>;
      case "Approved":
        return <Badge variant="info">Approved</Badge>;
      case "Paid":
        return <Badge variant="success">Paid</Badge>;
      case "Cancelled":
        return <Badge variant="secondary">Cancelled</Badge>;
    }
  };

  const getHierarchyBadge = (hierarchy: DemoCommission["commissionHierarchy"]) => {
    switch (hierarchy) {
      case "PRODUCT":
        return <Badge variant="info">PRODUCT</Badge>;
      case "MERCHANT":
        return <Badge variant="default">MERCHANT</Badge>;
      case "GLOBAL":
        return <Badge variant="secondary">GLOBAL</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Commission Calculation & Payouts
            </h2>
            <DemoBadge />
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Review referral commissions calculated per qualifying purchase. Respects PRODUCT &gt; MERCHANT &gt; GLOBAL priority.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="USD Accrued Commissions"
          value={`$${totalUsdAccrued.toFixed(2)}`}
          subtitle="Non-cancelled USD records"
          icon={DollarSign}
          badgeText="USD Separated"
          badgeVariant="positive"
        />
        <StatCard
          title="Pending Approval"
          value={pendingCount}
          subtitle="Awaiting purchase verification"
          icon={Clock}
          badgeText="Review queue"
          badgeVariant="neutral"
        />
        <StatCard
          title="Approved For Payout"
          value={approvedCount}
          subtitle="Ready for manual admin payout"
          icon={CheckCircle2}
          badgeText={`${paidCount} already paid`}
          badgeVariant="positive"
        />
        <StatCard
          title="Hierarchy Model"
          value="PRODUCT > MERCH"
          subtitle="Strict commission precedence"
          icon={Percent}
          badgeText="No hidden surcharge"
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
            placeholder="Search by referral owner, merchant, product, or purchase ref..."
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
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Paid">Paid</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Currency:</span>
          </div>
          <select
            value={currencyFilter}
            onChange={(e) => setCurrencyFilter(e.target.value)}
            className="h-9 rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-xs focus:border-blue-500 focus:outline-hidden"
          >
            <option value="all">All Currencies</option>
            <option value="USD">USD</option>
            <option value="SLSH">SLSH</option>
          </select>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Hierarchy:</span>
          </div>
          <select
            value={hierarchyFilter}
            onChange={(e) => setHierarchyFilter(e.target.value)}
            className="h-9 rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-xs focus:border-blue-500 focus:outline-hidden"
          >
            <option value="all">All Levels</option>
            <option value="PRODUCT">PRODUCT</option>
            <option value="MERCHANT">MERCHANT</option>
            <option value="GLOBAL">GLOBAL</option>
          </select>

          {(search || statusFilter !== "all" || currencyFilter !== "all" || hierarchyFilter !== "all") && (
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

      {/* Table or Empty State */}
      {filteredCommissions.length > 0 ? (
        <div className="space-y-3">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Commission ID</TableHead>
                  <TableHead>Referral Owner</TableHead>
                  <TableHead>Merchant</TableHead>
                  <TableHead>Product / Sale</TableHead>
                  <TableHead>Purchase Ref</TableHead>
                  <TableHead>Hierarchy Priority</TableHead>
                  <TableHead className="text-right">Commission Rate</TableHead>
                  <TableHead className="text-right">Commission Due</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCommissions.map((comm) => (
                  <TableRow key={comm.id}>
                    <TableCell>
                      <span className="font-mono text-xs font-semibold text-slate-900">
                        {comm.id}
                      </span>
                      <div className="text-[11px] text-slate-400 font-mono">{comm.referralId}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-slate-900">{comm.referralOwnerName}</div>
                      <div className="text-xs text-slate-400">{comm.referralOwnerId}</div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium text-slate-700">{comm.merchantName}</span>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[180px] truncate text-xs font-medium text-slate-800">
                        {comm.productName}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Order: {formatAmount(comm.purchaseAmount, comm.currency)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-xs text-slate-600">{comm.purchaseReference}</span>
                    </TableCell>
                    <TableCell>{getHierarchyBadge(comm.commissionHierarchy)}</TableCell>
                    <TableCell className="text-right text-xs font-medium text-slate-700">
                      {comm.commissionType === "PERCENTAGE"
                        ? `${comm.commissionRate}%`
                        : formatAmount(comm.commissionRate, comm.currency)}
                    </TableCell>
                    <TableCell className="text-right font-bold text-slate-900">
                      {formatAmount(comm.commissionAmount, comm.currency)}
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">
                      {formatDate(comm.createdAt)}
                    </TableCell>
                    <TableCell>{getStatusBadge(comm.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Showing {filteredCommissions.length} of {DEMO_COMMISSIONS.length} demonstration commission records
            </span>
            <span>Commissions separate from $0.50 transaction fee &middot; No platform surcharge</span>
          </div>
        </div>
      ) : (
        <EmptyState
          icon={Percent}
          title="No Commission Records Matched"
          description="None of the demonstration commission entries matched your active filters. Try clearing your filters to see all records."
          actionLabel="Clear Filters"
          onAction={resetFilters}
        />
      )}
    </div>
  );
}
