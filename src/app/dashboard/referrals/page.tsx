"use client";

import * as React from "react";
import {
  Share2,
  Plus,
  Search,
  Filter,
  QrCode,
  MessageSquare,
  Sparkles,
  RotateCcw,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { DemoBadge } from "@/components/dashboard/demo-badge";
import { DEMO_REFERRALS, DemoReferral } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";

export default function ReferralsPage() {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [channelFilter, setChannelFilter] = React.useState<string>("all");

  const filteredReferrals = React.useMemo(() => {
    return DEMO_REFERRALS.filter((ref) => {
      const matchesSearch =
        ref.referralCode.toLowerCase().includes(search.toLowerCase()) ||
        ref.customerName.toLowerCase().includes(search.toLowerCase()) ||
        ref.merchantName.toLowerCase().includes(search.toLowerCase()) ||
        ref.productName.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || ref.status === statusFilter;

      const matchesChannel =
        channelFilter === "all" || ref.deliveryChannel === channelFilter;

      return matchesSearch && matchesStatus && matchesChannel;
    });
  }, [search, statusFilter, channelFilter]);

  const activeCount = DEMO_REFERRALS.filter((r) => r.status === "Active").length;
  const usedCount = DEMO_REFERRALS.filter((r) => r.status === "Used").length;
  const totalScans = DEMO_REFERRALS.reduce((acc, r) => acc + r.scanCount, 0);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setChannelFilter("all");
  };

  const getStatusBadge = (status: DemoReferral["status"]) => {
    switch (status) {
      case "Active":
        return <Badge variant="success">Active (Unredeemed)</Badge>;
      case "Used":
        return <Badge variant="default">Used (Verified)</Badge>;
      case "Cancelled":
        return <Badge variant="secondary">Cancelled</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Referral Tracking & Links
            </h2>
            <DemoBadge />
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Create, distribute, and track unique referral campaign links and QR pass redemptions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button size="md" variant="primary">
            <Plus className="h-4 w-4" />
            <span>New Referral Link</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Referrals"
          value={DEMO_REFERRALS.length}
          subtitle="Generated referral passes"
          icon={Share2}
          badgeText="Active registry"
          badgeVariant="neutral"
        />
        <StatCard
          title="Active (Unused)"
          value={activeCount}
          subtitle="No expiration policy"
          icon={Sparkles}
          badgeText="Available to present"
          badgeVariant="positive"
        />
        <StatCard
          title="Redeemed & Verified"
          value={usedCount}
          subtitle="Qualifying purchase verified"
          icon={QrCode}
          badgeText="Converted sales"
          badgeVariant="positive"
        />
        <StatCard
          title="Total Voucher Scans"
          value={totalScans}
          subtitle="Merchant check-ins logged"
          icon={MessageSquare}
          badgeText="Scan != Commission"
          badgeVariant="neutral"
        />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by code (e.g. REF-ELC-7821), referrer, merchant, or product..."
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="h-3.5 w-3.5" />
            <span>Channel:</span>
          </div>
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="h-9 rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-xs focus:border-blue-500 focus:outline-hidden"
          >
            <option value="all">All Channels</option>
            <option value="WEBSITE QR">WEBSITE QR</option>
            <option value="WhatsApp">WhatsApp</option>
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
            <option value="Active">Active</option>
            <option value="Used">Used</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {(search || channelFilter !== "all" || statusFilter !== "all") && (
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
      {filteredReferrals.length > 0 ? (
        <div className="space-y-3">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Referral Code</TableHead>
                  <TableHead>Referral Owner</TableHead>
                  <TableHead>Target Merchant</TableHead>
                  <TableHead>Linked Product</TableHead>
                  <TableHead>Delivery Channel</TableHead>
                  <TableHead className="text-center">Scans</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReferrals.map((ref) => (
                  <TableRow key={ref.id}>
                    <TableCell>
                      <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-blue-600">
                        <QrCode className="h-3.5 w-3.5 text-blue-500" />
                        <span>{ref.referralCode}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">ID: {ref.id}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-slate-900">{ref.customerName}</div>
                      <div className="text-xs text-slate-400">{ref.customerId}</div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium text-slate-800">{ref.merchantName}</span>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate text-xs text-slate-700 font-medium">
                        {ref.productName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={ref.deliveryChannel === "WhatsApp" ? "success" : "info"}
                        className="gap-1"
                      >
                        {ref.deliveryChannel === "WhatsApp" ? (
                          <MessageSquare className="h-3 w-3" />
                        ) : (
                          <ExternalLink className="h-3 w-3" />
                        )}
                        <span>{ref.deliveryChannel}</span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center font-semibold text-slate-700">
                      {ref.scanCount}
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">
                      {formatDate(ref.createdAt)}
                    </TableCell>
                    <TableCell>{getStatusBadge(ref.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Showing {filteredReferrals.length} of {DEMO_REFERRALS.length} demonstration referrals
            </span>
            <span>Referrals never auto-expire &middot; Scan alone does not create commission</span>
          </div>
        </div>
      ) : (
        <EmptyState
          icon={Share2}
          title="No Referral Records Found"
          description="None of the demonstration referral links matched your filter criteria. Clear filters to see all generated referral passes."
          actionLabel="Clear Filters"
          onAction={resetFilters}
        />
      )}
    </div>
  );
}
