import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { LedgerTable } from "@/components/LedgerTable";
import { DemoGate } from "@/components/DemoProvider";
import { funds, formatToman, fundTypeLabel, getFund } from "@/data/mock";

export default async function LedgerPage({
  searchParams,
}: {
  searchParams: Promise<{ fund?: string }>;
}) {
  const { fund: fundId } = await searchParams;
  const selectedFund = fundId ? getFund(fundId) : funds[0];

  return (
    <PageShell>
      <DemoGate>
        <nav className="mb-4 text-sm text-baax-blue-500">
          <Link href="/" className="hover:text-baax-blue-700">
            خانه
          </Link>
          <span className="mx-2">/</span>
          <span className="text-baax-blue-800">دفترکل</span>
        </nav>

        <header className="mb-6">
          <h1 className="text-2xl font-bold text-baax-blue-900">دفترکل صندوق</h1>
          <p className="mt-2 text-sm text-baax-blue-600">
            هر صندوق دفترکل جدا دارد. درآمد پلتفرم فقط از کارمزد ثبت می‌شود.
          </p>
        </header>

        <div className="mb-6 flex flex-wrap gap-2">
          {funds.map((fund) => (
            <Link
              key={fund.id}
              href={`/ledger?fund=${fund.id}`}
              className={`rounded-full px-4 py-2 text-sm transition ${
                selectedFund?.id === fund.id
                  ? "bg-baax-purple-600 text-white"
                  : "bg-white border border-baax-blue-200 text-baax-blue-700 hover:bg-baax-blue-50"
              }`}
            >
              {fundTypeLabel(fund.type)} — {fund.name.split("—")[0].trim()}
            </Link>
          ))}
        </div>

        {selectedFund && (
          <>
            <div className="card mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-bold text-baax-blue-900">{selectedFund.name}</h2>
                  <p className="text-sm text-baax-blue-500">
                    {fundTypeLabel(selectedFund.type)} · دوره {selectedFund.currentCycle}
                  </p>
                </div>
                <div className="text-left">
                  <p className="stat-label">ماندهٔ فعلی</p>
                  <p className="text-xl font-bold text-baax-blue-900">
                    {formatToman(
                      selectedFund.ledger[selectedFund.ledger.length - 1]?.balance ?? 0
                    )}
                  </p>
                </div>
              </div>
            </div>

            <section className="card">
              <h3 className="section-title mb-4">تراکنش‌ها</h3>
              <LedgerTable entries={selectedFund.ledger} />
            </section>

            <div className="mt-6">
              <Link
                href={`/fund/${selectedFund.id}`}
                className="text-sm text-baax-purple-600 hover:underline"
              >
                ← بازگشت به جزئیات صندوق
              </Link>
            </div>
          </>
        )}
      </DemoGate>
    </PageShell>
  );
}
