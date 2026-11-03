"use client";

import * as React from "react";
import {
  Package,
  Plus,
  Search,
  Filter,
  DollarSign,
  Tag,
  Layers,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { DemoBadge } from "@/components/dashboard/demo-badge";
import { DEMO_PRODUCTS, DemoProduct } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";

export default function ProductsPage() {
  const [search, setSearch] = React.useState("");
  const [currencyFilter, setCurrencyFilter] = React.useState<string>("all");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");

  const categories = React.useMemo(() => {
    return Array.from(new Set(DEMO_PRODUCTS.map((p) => p.category)));
  }, []);

  const filteredProducts = React.useMemo(() => {
    return DEMO_PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.merchantName.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase());

      const matchesCurrency =
        currencyFilter === "all" || product.currency === currencyFilter;

      const matchesStatus =
        statusFilter === "all" || product.status === statusFilter;

      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;

      return matchesSearch && matchesCurrency && matchesStatus && matchesCategory;
    });
  }, [search, currencyFilter, statusFilter, categoryFilter]);

  const activeProducts = DEMO_PRODUCTS.filter((p) => p.status === "Active").length;
  const usdProducts = DEMO_PRODUCTS.filter((p) => p.currency === "USD").length;
  const slshProducts = DEMO_PRODUCTS.filter((p) => p.currency === "SLSH").length;

  const resetFilters = () => {
    setSearch("");
    setCurrencyFilter("all");
    setStatusFilter("all");
    setCategoryFilter("all");
  };

  const formatPrice = (price: number, currency: "USD" | "SLSH") => {
    if (currency === "USD") {
      return `$${price.toFixed(2)}`;
    }
    return `${price.toLocaleString()} SLSH`;
  };

  const getHierarchyBadge = (hierarchy: DemoProduct["commissionHierarchy"]) => {
    switch (hierarchy) {
      case "PRODUCT":
        return <Badge variant="info">PRODUCT</Badge>;
      case "MERCHANT":
        return <Badge variant="default">MERCHANT</Badge>;
      case "GLOBAL":
        return <Badge variant="secondary">GLOBAL</Badge>;
    }
  };

  const getStatusBadge = (status: DemoProduct["status"]) => {
    switch (status) {
      case "Active":
        return <Badge variant="success">Active</Badge>;
      case "Draft":
        return <Badge variant="warning">Draft</Badge>;
      case "Archived":
        return <Badge variant="outline">Archived</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Product Catalog & Offers
            </h2>
            <DemoBadge />
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Configure partner products, services, and referral commission rules across USD and SLSH currencies.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button size="md" variant="primary">
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Catalog Items"
          value={DEMO_PRODUCTS.length}
          subtitle="Products configured"
          icon={Package}
          badgeText={`${activeProducts} Published`}
          badgeVariant="positive"
        />
        <StatCard
          title="USD Offerings"
          value={usdProducts}
          subtitle="USD currency items"
          icon={DollarSign}
          badgeText="Separate currency"
          badgeVariant="neutral"
        />
        <StatCard
          title="SLSH Offerings"
          value={slshProducts}
          subtitle="Somaliland Shilling items"
          icon={Tag}
          badgeText="Separate currency"
          badgeVariant="neutral"
        />
        <StatCard
          title="Commission Rule Hierarchy"
          value="PRODUCT > MERCH > GLOB"
          subtitle="Priority resolution model"
          icon={Layers}
          badgeText="Hierarchy active"
          badgeVariant="positive"
        />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by title, SKU, or partner merchant..."
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="h-3.5 w-3.5" />
            <span>Currency:</span>
          </div>
          <select
            value={currencyFilter}
            onChange={(e) => setCurrencyFilter(e.target.value)}
            className="h-9 rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-xs focus:border-blue-500 focus:outline-hidden"
          >
            <option value="all">All Currencies</option>
            <option value="USD">USD ($)</option>
            <option value="SLSH">SLSH</option>
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
            <option value="Draft">Draft</option>
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
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {(search || currencyFilter !== "all" || statusFilter !== "all" || categoryFilter !== "all") && (
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

      {/* Main Table or Empty State */}
      {filteredProducts.length > 0 ? (
        <div className="space-y-3">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Merchant</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead>Hierarchy Priority</TableHead>
                  <TableHead>Commission Rate</TableHead>
                  <TableHead>Added Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="font-semibold text-slate-900">{product.name}</div>
                      <div className="text-xs text-slate-400">ID: {product.id}</div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium text-slate-700">{product.merchantName}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-xs text-slate-600">{product.sku}</span>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-slate-900">
                      {formatPrice(product.price, product.currency)}
                    </TableCell>
                    <TableCell>
                      {getHierarchyBadge(product.commissionHierarchy)}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-800">
                        {product.commissionType === "PERCENTAGE"
                          ? `${product.commissionValue}%`
                          : formatPrice(product.commissionValue, product.currency)}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">
                      {formatDate(product.createdAt)}
                    </TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Showing {filteredProducts.length} of {DEMO_PRODUCTS.length} demonstration products
            </span>
            <span>Zero currency conversion (USD / SLSH separated)</span>
          </div>
        </div>
      ) : (
        <EmptyState
          icon={Package}
          title="No Products Matched"
          description="None of the demonstration products match your active search filters. Try clearing filters to see all available products."
          actionLabel="Clear Filters"
          onAction={resetFilters}
        />
      )}
    </div>
  );
}
