"use client";

import { useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { DemoGate } from "@/components/DemoProvider";
import { formatToman, shopPartners } from "@/data/mock";

const MOCK_WIN_AMOUNT = 53_900_000;
const MOCK_PARTNER_DEBT = 12_000_000;

export default function QuickBuyPage() {
  const [selectedPartner, setSelectedPartner] = useState(shopPartners[0].id);
  const [purchaseAmount, setPurchaseAmount] = useState(8_000_000);

  const partner = shopPartners.find((p) => p.id === selectedPartner)!;
  const cashAfterDebt = Math.max(MOCK_WIN_AMOUNT - MOCK_PARTNER_DEBT, 0);
  const remainingCash = cashAfterDebt - purchaseAmount;

  return (
    <PageShell>
      <DemoGate>
        <nav className="mb-4 text-sm text-baax-blue-500">
          <Link href="/" className="hover:text-baax-blue-700">
            خانه
          </Link>
          <span className="mx-2">/</span>
          <span className="text-baax-blue-800">خرید زودهنگام</span>
        </nav>

        <header className="mb-6">
          <span className="rounded-full bg-baax-purple-100 px-2.5 py-0.5 text-xs font-medium text-baax-purple-600">
            Mock — بدون پرداخت واقعی
          </span>
          <h1 className="mt-2 text-2xl font-bold text-baax-blue-900">
            خرید زودهنگام پس از برد
          </h1>
          <p className="mt-2 text-sm text-baax-blue-600">
            ابتدا بدهی به شریک فروشگاه تسویه می‌شود، سپس مبلغ نقد به عضو
            می‌رسد.
          </p>
        </header>

        <section className="card mb-6">
          <h2 className="section-title mb-4">سناریوی برد</h2>
          <div className="space-y-3 text-sm">
            <FlowRow label="مبلغ برد قرعه‌کشی" value={formatToman(MOCK_WIN_AMOUNT)} />
            <FlowRow
              label="بدهی به شریک (اولویت اول)"
              value={`− ${formatToman(MOCK_PARTNER_DEBT)}`}
              variant="debt"
            />
            <div className="border-t border-baax-blue-100 pt-3">
              <FlowRow
                label="نقد قابل استفاده"
                value={formatToman(cashAfterDebt)}
                highlight
              />
            </div>
          </div>
        </section>

        <section className="card mb-6">
          <h2 className="section-title mb-4">انتخاب شریک</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {shopPartners.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPartner(p.id)}
                className={`rounded-xl border p-4 text-right transition ${
                  selectedPartner === p.id
                    ? "border-baax-purple-500 bg-baax-purple-500/5 ring-2 ring-baax-purple-500"
                    : "border-baax-blue-100 hover:border-baax-blue-200"
                }`}
              >
                <div
                  className="mb-2 h-2 w-8 rounded-full"
                  style={{ backgroundColor: p.logoColor }}
                />
                <p className="font-semibold text-baax-blue-900">{p.name}</p>
                <p className="mt-1 text-xs text-baax-blue-500">
                  سقف اعتبار: {formatToman(p.maxCredit)}
                </p>
              </button>
            ))}
          </div>
        </section>

        <section className="card mb-6">
          <h2 className="section-title mb-4">مبلغ خرید از {partner.name}</h2>
          <input
            type="range"
            min={1_000_000}
            max={Math.min(partner.maxCredit, cashAfterDebt)}
            step={500_000}
            value={purchaseAmount}
            onChange={(e) => setPurchaseAmount(Number(e.target.value))}
            className="w-full accent-baax-purple-600"
          />
          <p className="mt-2 text-center text-lg font-bold text-baax-blue-900">
            {formatToman(purchaseAmount)}
          </p>
        </section>

        <section className="card border-dashed">
          <h2 className="section-title mb-4">نتیجه</h2>
          <div className="space-y-2 text-sm">
            <FlowRow label="خرید از شریک" value={formatToman(purchaseAmount)} />
            <FlowRow
              label="نقد باقی‌مانده برای عضو"
              value={formatToman(Math.max(remainingCash, 0))}
              highlight
            />
          </div>
          <button type="button" className="btn-primary mt-6 w-full" disabled>
            تأیید خرید (mock — غیرفعال)
          </button>
        </section>
      </DemoGate>
    </PageShell>
  );
}

function FlowRow({
  label,
  value,
  variant,
  highlight,
}: {
  label: string;
  value: string;
  variant?: "debt";
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-baax-blue-600">{label}</span>
      <span
        className={`font-semibold ${
          variant === "debt"
            ? "text-red-600"
            : highlight
              ? "text-baax-purple-600"
              : "text-baax-blue-900"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
