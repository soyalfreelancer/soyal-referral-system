export const APP_CONFIG = {
  name: "SOYAL REFERRAL SYSTEM",
  tagline: "Local Business Referral Marketing & Commission SaaS",
  description:
    "Partner with local businesses, promote their products with social referral links, generate unique customer QR codes, and automate verification and commission calculations.",
  primaryColor: "#2563EB",
  version: "1.0.0-phase1",
} as const;

export const DASHBOARD_NAV_ITEMS = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: "LayoutDashboard",
    description: "Platform performance and activity overview",
  },
  {
    title: "Merchants",
    href: "/dashboard/merchants",
    icon: "Store",
    description: "Partner businesses and merchant onboarding",
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: "Package",
    description: "Catalog of eligible products and referral terms",
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: "Users",
    description: "Customer accounts and referral interactions",
  },
  {
    title: "Referrals",
    href: "/dashboard/referrals",
    icon: "Share2",
    description: "Referral links, campaigns, and attribution tracking",
  },
  {
    title: "QR Verification",
    href: "/dashboard/qr-verification",
    icon: "QrCode",
    description: "Merchant QR code scanner and verification queue",
  },
  {
    title: "Commissions",
    href: "/dashboard/commissions",
    icon: "Percent",
    description: "Referral earnings, rates, and payout distribution",
  },
  {
    title: "Transactions",
    href: "/dashboard/transactions",
    icon: "Receipt",
    description: "Settlements and commission transaction audit logs",
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: "BarChart3",
    description: "Analytics, merchant performance, and export center",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: "Settings",
    description: "Platform parameters, commission rules, and defaults",
  },
] as const;
