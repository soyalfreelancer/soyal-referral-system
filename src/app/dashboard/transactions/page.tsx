"use client";

import * as React from "react";
import {
  Receipt,
  Search,
  Filter,
  DollarSign,
  ShieldCheck,
  RotateCcw,
  Info,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { DemoBadge } from "@/components/dashboard/demo-badge";
import { DEMO_TRANSACTIONS, DemoTransaction } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";

export default function TransactionsPage() {
  const [search, setSearch] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState<string>("all");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [currencyFilter, setCurrencyFilter] = React.useState<string>("all");

  const filteredTransactions = React.useMemo(() => {
    return DEMO_TRANSACTIONS.filter((tx) => {
      const matchesSearch =
        tx.transactionReference.toLowerCase().includes(search.toLowerCase()) ||
        tx.merchantName.toLowerCase().includes(search.toLowerCase()) ||
        tx.purchaseReference.toLowerCase().includes(search.toLowerCase()) ||
        tx.id.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        typeFilter === "all" || tx.transactionType === typeFilter;

      const matchesStatus =
        statusFilter === "all" || tx.paymentStatus === statusFilter;

      const matchesCurrency =
        currencyFilter === "all" || tx.currency === currencyFilter;

      return matchesSearch && matchesType && matchesStatus && matchesCurrency;
    });
  }, [search, typeFilter, statusFilter, currencyFilter]);

  const verifiedCount = DEMO_TRANSACTIONS.filter((t) => t.paymentStatus === "Verified").length;
  const pendingCount = DEMO_TRANSACTIONS.filter((t) => t.paymentStatus === "Pending").length;

  const resetFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setStatusFilter("all");
    setCurrencyFilter("all");
  };

  const formatAmount = (amount: number, currency: "USD" | "SLSH") => {
    if (currency === "USD") return `$${amount.toFixed(2)}`;
    return `${amount.toLocaleString()} SLSH`;
  };

  const getStatusBadge = (status: DemoTransaction["paymentStatus"]) => {
    switch (status) {
      case "Verified":
        return <Badge variant="success">Verified (Admin)</Badge>;
      case "Pending":
        return <Badge variant="warning">Pending Verification</Badge>;
      case "Failed":
        return <Badge variant="secondary">Failed</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Financial Transactions & Ledger
            </h2>
            <DemoBadge />
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Immutable audit log of verified merchant transaction fees and referral owner payouts.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Ledger Entries"
          value={DEMO_TRANSACTIONS.length}
          subtitle="Audit transaction records"
          icon={Receipt}
          badgeText="Verified Model"
          badgeVariant="neutral"
        />
        <StatCard
          title="SUPER_ADMIN Verified"
          value={verifiedCount}
          subtitle="Manually confirmed settlements"
          icon={ShieldCheck}
          badgeText="Manual Audit"
          badgeVariant="positive"
        />
        <StatCard
          title="Pending Settlements"
          value={pendingCount}
          subtitle="Awaiting admin reconciliation"
          icon={Clock}
          badgeText="Not auto-paid"
          badgeVariant="neutral"
        />
        <StatCard
          title="Approved Fee Split"
          value="$0.50 Total"
          subtitle="$0.30 Referrer | $0.20 SOYALHUB"
          icon={DollarSign}
          badgeText="Fee Model Active"
          badgeVariant="positive"
        />
      </div>

      {/* Approved Financial Model Rule Card */}
      <Card className="border-blue-200 bg-blue-50/40">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-blue-950 flex items-center gap-2">
              <Info className="h-4 w-4 text-[#2563EB]" />
              <span>Approved SOYALHUB Transaction Fee Structure</span>
            </CardTitle>
            <Badge variant="default" className="text-[11px]">Core Architecture</Badge>
          </div>
          <CardDescription className="text-xs text-blue-900/80">
            Every qualifying purchase (minimum $3.00 inclusive) incurs a single <strong>$0.50 merchant transaction fee</strong>.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-lg bg-white p-3 border border-blue-100">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Total Merchant Fee</span>
              <div className="text-base font-bold text-slate-900 mt-0.5">$0.50 total</div>
              <p className="text-[11px] text-slate-500 mt-1">Separate from product sale proceeds. Never deducted from merchant sale price.</p>
            </div>
            <div className="rounded-lg bg-white p-3 border border-blue-100">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Referral Owner Allocation</span>
              <div className="text-base font-bold text-emerald-700 mt-0.5">$0.30</div>
              <p className="text-[11px] text-slate-500 mt-1">Allocated to customer referral owner. Manually verified before payout.</p>
            </div>
            <div className="rounded-lg bg-white p-3 border border-blue-100">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">SOYALHUB Platform Allocation</span>
              <div className="text-base font-bold text-blue-700 mt-0.5">$0.20</div>
              <p className="text-[11px] text-slate-500 mt-1">Retained by platform for network verification and infrastructure.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by transaction reference, merchant, or purchase ID..."
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="h-3.5 w-3.5" />
            <span>Type:</span>
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="h-9 rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-xs focus:border-blue-500 focus:outline-hidden"
          >
            <option value="all">All Types</option>
            <option value="Merchant Fee">Merchant Fee ($0.50)</option>
            <option value="Referral Owner Payout">Referral Owner Payout ($0.30)</option>
          </select>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Status:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-xs focus:border-blue-500 focus:outline-hidden"
          >
            <option value="all">All Statuses</option>
            <option value="Verified">Verified (Admin)</option>
            <option value="Pending">Pending</option>
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

          {(search || typeFilter !== "all" || statusFilter !== "all" || currencyFilter !== "all") && (
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
      {filteredTransactions.length > 0 ? (
        <div className="space-y-3">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction Ref</TableHead>
                  <TableHead>Merchant</TableHead>
                  <TableHead>Purchase Ref</TableHead>
                  <TableHead>Transaction Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Audit & Allocation Notes</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Settlement Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>
                      <div className="font-mono text-xs font-semibold text-slate-900">
                        {tx.transactionReference}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">ID: {tx.id}</div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium text-slate-800">{tx.merchantName}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-xs text-slate-600">{tx.purchaseReference}</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={tx.transactionType === "Merchant Fee" ? "default" : "info"}
                        className="gap-1 text-[11px]"
                      >
                        {tx.transactionType === "Merchant Fee" ? (
                          <ArrowDownLeft className="h-3 w-3" />
                        ) : (
                          <ArrowUpRight className="h-3 w-3" />
                        )}
                        <span>{tx.transactionType}</span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-slate-900">
                      {formatAmount(tx.amount, tx.currency)}
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-slate-600">{tx.paymentMethod}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-slate-500 max-w-[240px] truncate block">
                        {tx.allocationNotes}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">
                      {formatDate(tx.transactionDate)}
                    </TableCell>
                    <TableCell>{getStatusBadge(tx.paymentStatus)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Showing {filteredTransactions.length} of {DEMO_TRANSACTIONS.length} demonstration transactions
            </span>
            <span>Payments manually verified by SUPER_ADMIN &middot; Purchase confirmation != automatic payment</span>
          </div>
        </div>
      ) : (
        <EmptyState
          icon={Receipt}
          title="No Transactions Found"
          description="None of the demonstration transactions matched your active filters. Try clearing your search parameters."
          actionLabel="Clear Filters"
          onAction={resetFilters}
        />
      )}
    </div>
  );
}
