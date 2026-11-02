import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Tag, QrCode, Share2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PublicHeader, PublicFooter } from "@/components/public/layout-shell";

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900">
      <PublicHeader />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Back link */}
          <div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Product Catalog</span>
            </Link>
          </div>

          {/* Product Detail Shell / Dynamic Slug Context */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Visual Placeholder */}
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 p-12 text-center min-h-[380px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB] mb-4">
                <Tag className="h-8 w-8" />
              </div>
              <h3 className="text-base font-semibold text-slate-800">
                Product Media Preview
              </h3>
              <p className="mt-1 text-xs text-slate-400 max-w-xs">
                Item slug: <code className="font-mono text-blue-600 bg-blue-50 px-1 py-0.5 rounded">{decodedSlug}</code>
              </p>
              <p className="mt-4 text-xs text-slate-500 max-w-xs leading-relaxed">
                Real product imagery, gallery, and store specifications will load from the database in Phase 2.
              </p>
            </div>

            {/* Product Details & Referral Purchase Intent */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default">Verified Partner Product</Badge>
                  <Badge variant="secondary">Slug: {decodedSlug}</Badge>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 capitalize">
                  {decodedSlug.replace(/-/g, " ")}
                </h1>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  Referral purchase intent template. In Phase 2, this route connects to Supabase database to fetch merchant details, pricing, referral commission rules, and live QR code generation.
                </p>
              </div>

              {/* Referral Action Card */}
              <Card className="border-blue-100 bg-blue-50/30">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <QrCode className="h-4 w-4 text-[#2563EB]" />
                    <CardTitle className="text-base">Claim Referral QR Voucher</CardTitle>
                  </div>
                  <CardDescription className="text-xs">
                    Customers who receive a referral link generate a voucher to redeem at the merchant store.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button size="lg" variant="primary" className="w-full gap-2">
                    <QrCode className="h-4 w-4" />
                    <span>Generate Customer QR Code</span>
                  </Button>
                  <Button size="md" variant="outline" className="w-full gap-2">
                    <Share2 className="h-4 w-4" />
                    <span>Share Referral Link</span>
                  </Button>
                </CardContent>
              </Card>

              {/* Merchant Verification Guarantee */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Verified by participating local merchant on checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Automatic commission settlement for referrer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
