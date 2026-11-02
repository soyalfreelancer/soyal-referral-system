/**
 * Domain Models & Types for SOYAL Referral System
 * Architected for Phase 2 Supabase & Backend Integration
 */

export type Role = "platform_admin" | "merchant" | "referrer" | "customer";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  avatarUrl?: string;
  createdAt: string;
}

export type MerchantStatus = "active" | "pending" | "inactive" | "suspended";

export interface Merchant {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  address?: string;
  category: string;
  status: MerchantStatus;
  commissionRate: number; // e.g. 0.10 for 10%
  totalReferrals: number;
  totalRevenue: number;
  createdAt: string;
}

export type ProductStatus = "active" | "draft" | "archived";

export interface Product {
  id: string;
  merchantId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  commissionType: "percentage" | "fixed";
  commissionValue: number;
  status: ProductStatus;
  category: string;
  imageUrl?: string;
  terms?: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  referralCodeUsed?: string;
  totalPurchases: number;
  totalSpent: number;
  createdAt: string;
}

export type ReferralStatus = "pending" | "verified" | "completed" | "expired" | "rejected";

export interface Referral {
  id: string;
  referrerId: string;
  referrerName: string;
  customerId?: string;
  customerName?: string;
  productId: string;
  productName: string;
  merchantId: string;
  merchantName: string;
  referralCode: string;
  qrCodeUrl?: string;
  status: ReferralStatus;
  orderValue?: number;
  commissionAmount?: number;
  createdAt: string;
  verifiedAt?: string;
}

export type VerificationStatus = "pending" | "verified" | "rejected";

export interface QRCodeData {
  referralId: string;
  referralCode: string;
  productId: string;
  merchantId: string;
  timestamp: number;
  signature?: string;
}

export interface VerificationRecord {
  id: string;
  referralCode: string;
  merchantId: string;
  merchantName: string;
  customerIdentifier: string;
  purchaseAmount: number;
  commissionCalculated: number;
  verifiedBy: string;
  status: VerificationStatus;
  verifiedAt: string;
  notes?: string;
}

export type CommissionStatus = "pending" | "approved" | "paid" | "rejected";

export interface Commission {
  id: string;
  referralId: string;
  referrerId: string;
  referrerName: string;
  merchantId: string;
  merchantName: string;
  amount: number;
  status: CommissionStatus;
  payoutDate?: string;
  createdAt: string;
}

export type TransactionType = "commission_payout" | "merchant_fee" | "adjustment";
export type TransactionStatus = "completed" | "pending" | "failed";

export interface Transaction {
  id: string;
  referenceId: string;
  type: TransactionType;
  partyName: string;
  amount: number;
  status: TransactionStatus;
  date: string;
  paymentMethod?: string;
}

export interface PlatformMetric {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  description?: string;
}

export interface SystemSetting {
  id: string;
  key: string;
  label: string;
  value: string;
  description: string;
  category: "general" | "commissions" | "referrals" | "notifications";
}
