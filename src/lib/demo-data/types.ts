export type Currency = "USD" | "SLSH";

export type MerchantStatus = "Active" | "Pending" | "Suspended";

export interface DemoMerchant {
  id: string;
  name: string;
  category: "Electronics" | "Fashion" | "Restaurants" | "Supermarkets" | "Beauty and Cosmetics" | "Home Appliances";
  contactPerson: string;
  phone: string;
  email: string;
  location: string;
  registrationDate: string;
  status: MerchantStatus;
  productCount: number;
  customerCount: number;
  totalReferrals: number;
}

export type CommissionHierarchy = "PRODUCT" | "MERCHANT" | "GLOBAL";
export type CommissionType = "FIXED" | "PERCENTAGE";
export type ProductStatus = "Active" | "Draft" | "Archived";

export interface DemoProduct {
  id: string;
  name: string;
  merchantId: string;
  merchantName: string;
  category: string;
  sku: string;
  price: number;
  currency: Currency;
  commissionHierarchy: CommissionHierarchy;
  commissionType: CommissionType;
  commissionValue: number; // e.g. 10% or $5.00
  status: ProductStatus;
  createdAt: string;
}

export type CustomerStatus = "Active" | "Inactive" | "Flagged";

export interface DemoCustomer {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  merchantId: string;
  merchantName: string;
  registrationDate: string;
  referralCount: number;
  status: CustomerStatus;
}

export type DeliveryChannel = "WEBSITE QR" | "WhatsApp";
export type ReferralStatus = "Active" | "Used" | "Cancelled";

export interface DemoReferral {
  id: string;
  referralCode: string; // e.g. REF-ELC-7821 (Fictional mock code)
  customerId: string;
  customerName: string; // Referral owner
  merchantId: string;
  merchantName: string;
  productId: string;
  productName: string;
  deliveryChannel: DeliveryChannel;
  createdAt: string;
  status: ReferralStatus;
  scanCount: number;
}

export type CommissionStatus = "Pending" | "Approved" | "Paid" | "Cancelled";

export interface DemoCommission {
  id: string;
  referralId: string;
  referralOwnerId: string;
  referralOwnerName: string;
  merchantId: string;
  merchantName: string;
  productId: string;
  productName: string;
  purchaseReference: string; // e.g. PUR-9021
  purchaseAmount: number;
  currency: Currency;
  commissionHierarchy: CommissionHierarchy;
  commissionType: CommissionType;
  commissionRate: number; // e.g., 10% or fixed 5.00
  commissionAmount: number;
  status: CommissionStatus;
  createdAt: string;
  payoutDate?: string;
}

export type TransactionType = "Merchant Fee" | "Referral Owner Payout";
export type PaymentStatus = "Pending" | "Verified" | "Failed";
export type PaymentMethod = "Cash Deposit" | "Mobile Money" | "Bank Transfer";

export interface DemoTransaction {
  id: string;
  transactionReference: string; // e.g. TX-2025-0101
  merchantId: string;
  merchantName: string;
  purchaseReference: string; // e.g. PUR-9021
  transactionType: TransactionType;
  amount: number;
  currency: Currency;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  transactionDate: string;
  allocationNotes?: string; // e.g. "Fee split: $0.30 Referrer / $0.20 SOYALHUB"
}

export interface DemoQRVerificationResult {
  referralReference: string;
  merchantName: string;
  productName: string;
  referralOwner: string;
  scanTimestamp: string;
  verificationStatus: "VALID" | "ALREADY_USED" | "INVALID_CODE";
  purchaseStatus: "QUALIFYING_PURCHASE_CONFIRMED" | "PURCHASE_PENDING" | "PURCHASE_BELOW_MINIMUM";
  purchaseAmount?: number;
  currency?: Currency;
  notes?: string;
}
