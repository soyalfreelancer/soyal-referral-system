export * from "./types";
export * from "./merchants";
export * from "./products";
export * from "./customers";
export * from "./referrals";
export * from "./commissions";
export * from "./transactions";

import { DEMO_REFERRALS } from "./referrals";
import { DemoQRVerificationResult } from "./types";

/**
 * QR Verification Demonstration helper.
 * Simulates verification for a given referral code without making any real API or DB calls.
 * Note: Scan never creates a commission.
 */
export function simulateQRVerification(code: string): DemoQRVerificationResult {
  const cleanCode = code.trim().toUpperCase();
  const match = DEMO_REFERRALS.find(
    (r) => r.referralCode.toUpperCase() === cleanCode
  );

  if (!match) {
    return {
      referralReference: cleanCode || "UNKNOWN",
      merchantName: "Unrecognized Merchant",
      productName: "Unrecognized Item",
      referralOwner: "Unknown Referrer",
      scanTimestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      verificationStatus: "INVALID_CODE",
      purchaseStatus: "PURCHASE_PENDING",
      notes: "The scanned referral voucher code does not exist in the platform registry.",
    };
  }

  if (match.status === "Used") {
    return {
      referralReference: match.referralCode,
      merchantName: match.merchantName,
      productName: match.productName,
      referralOwner: match.customerName,
      scanTimestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      verificationStatus: "ALREADY_USED",
      purchaseStatus: "QUALIFYING_PURCHASE_CONFIRMED",
      notes: "This referral voucher was previously presented and verified. Cannot be redeemed again.",
    };
  }

  if (match.status === "Cancelled") {
    return {
      referralReference: match.referralCode,
      merchantName: match.merchantName,
      productName: match.productName,
      referralOwner: match.customerName,
      scanTimestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      verificationStatus: "INVALID_CODE",
      purchaseStatus: "PURCHASE_PENDING",
      notes: "This referral code was cancelled or invalidated by the platform administrator.",
    };
  }

  return {
    referralReference: match.referralCode,
    merchantName: match.merchantName,
    productName: match.productName,
    referralOwner: match.customerName,
    scanTimestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
    verificationStatus: "VALID",
    purchaseStatus: "QUALIFYING_PURCHASE_CONFIRMED",
    notes: "Voucher successfully matched! Qualifying purchase criteria met (minimum $3.00).",
  };
}
