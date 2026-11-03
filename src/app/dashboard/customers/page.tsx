"use client";

import * as React from "react";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  TrendingUp,
  Store,
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
import { DEMO_CUSTOMERS, DemoCustomer } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";

export default function CustomersPage() {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [merchantFilter, setMerchantFilter] = React.useState<string>("all");

  const merchants = React.useMemo(() => {
    return Array.from(new Set(DEMO_CUSTOMERS.map((c) => c.merchantName)));
  }, []);

  const filteredCustomers = React.useMemo(() => {
    return DEMO_CUSTOMERS.filter((customer) => {
      const matchesSearch =
        customer.fullName.toLowerCase().includes(search.toLowerCase()) ||
        customer.phone.toLowerCase().includes(search.toLowerCase()) ||
        (customer.email && customer.email.toLowerCase().includes(search.toLowerCase())) ||
        customer.merchantName.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || customer.status === statusFilter;

      const matchesMerchant =
        merchantFilter === "all" || customer.merchantName === merchantFilter;

      return matchesSearch && matchesStatus && matchesMerchant;
    });
  }, [search, statusFilter, merchantFilter]);

  const activeCustomers = DEMO_CUSTOMERS.filter((c) => c.status === "Active").length;
  const totalReferrals = DEMO_CUSTOMERS.reduce((acc, c) => acc + c.referralCount, 0);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setMerchantFilter("all");
  };

  const getStatusBadge = (status: DemoCustomer["status"]) => {
    switch (status) {
      case "Active":
        return <Badge variant="success">Active</Badge>;
      case "Inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "Flagged":
        return <Badge variant="warning">Flagged</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Referred Customers & Users
            </h2>
            <DemoBadge />
          </div>
          <p className="mt-1 text-sm text-slate-500">
            View customer engagements, merchant-specific customer identity, and referral performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button size="md" variant="primary">
            <UserPlus className="h-4 w-4" />
            <span>Invite Customer</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Customers"
          value={DEMO_CUSTOMERS.length}
          subtitle="Registered customer base"
          icon={Users}
          badgeText={`${activeCustomers} Active`}
          badgeVariant="positive"
        />
        <StatCard
          title="Active Referrers"
          value={activeCustomers}
          subtitle="Eligible to earn bounty"
          icon={TrendingUp}
          badgeText="Verified accounts"
          badgeVariant="positive"
        />
        <StatCard
          title="Referral Activity"
          value={totalReferrals}
          subtitle="Customer referral records"
          icon={Users}
          badgeText="Active tracking"
          badgeVariant="neutral"
        />
        <StatCard
          title="Customer Attribution"
          value="Merchant-Specific"
          subtitle="Strict store association"
          icon={Store}
          badgeText="No Cross-Identity"
          badgeVariant="positive"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers by name, phone, email, or merchant..."
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
            <option value="Inactive">Inactive</option>
            <option value="Flagged">Flagged</option>
          </select>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Merchant:</span>
          </div>
          <select
            value={merchantFilter}
            onChange={(e) => setMerchantFilter(e.target.value)}
            className="h-9 rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-xs focus:border-blue-500 focus:outline-hidden"
          >
            <option value="all">All Merchants</option>
            {merchants.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          {(search || statusFilter !== "all" || merchantFilter !== "all") && (
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
      {filteredCustomers.length > 0 ? (
        <div className="space-y-3">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer Full Name</TableHead>
                  <TableHead>Phone Contact</TableHead>
                  <TableHead>Email Address</TableHead>
                  <TableHead>Associated Merchant</TableHead>
                  <TableHead className="text-center">Referrals Logged</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((cust) => (
                  <TableRow key={cust.id}>
                    <TableCell>
                      <div className="font-semibold text-slate-900">{cust.fullName}</div>
                      <div className="text-xs text-slate-400">ID: {cust.id}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                        <span>{cust.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {cust.email ? (
                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <Mail className="h-3 w-3 text-slate-400" />
                          <span>{cust.email}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">Not provided</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Store className="h-3.5 w-3.5 text-blue-600" />
                        <span className="text-sm font-medium text-slate-800">{cust.merchantName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                        {cust.referralCount}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">
                      {formatDate(cust.registrationDate)}
                    </TableCell>
                    <TableCell>{getStatusBadge(cust.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Showing {filteredCustomers.length} of {DEMO_CUSTOMERS.length} demonstration customers
            </span>
            <span>Customer identity is merchant-scoped</span>
          </div>
        </div>
      ) : (
        <EmptyState
          icon={Users}
          title="No Customers Matched"
          description="None of the demonstration customers matched your search or filters. Clear the filters to view the full directory."
          actionLabel="Clear Filters"
          onAction={resetFilters}
        />
      )}
    </div>
  );
}
