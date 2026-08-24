import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { MemberList } from "@/components/MemberList";
import { DemoGate } from "@/components/DemoProvider";
import {
  Fund,
  formatToman,
  fundTypeLabel,
  getFund,
} from "@/data/mock";

export function generateStaticParams() {
  return [{ id: "rosca-12" }, { id: "savings-loan-8" }, { id: "rosca-24-large" }];
}

export default async function FundDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const fund = getFund(id);
  if (!fund) notFound();

  return (
    <PageShell>
      <DemoGate>
        <FundDetailContent fund={fund} />
      </DemoGate>
    </PageShell>
  );
}

function FundDetailContent({ fund }: { fund: Fund }) {
  return (
    <>
      <nav className="mb-4 text-sm text-baax-blue-500">
        <Link href="/" className="hover:text-baax-blue-700">
          خانه
        </Link>
        <span className="mx-2">/</span>
        <span className="text-baax-blue-800">{fund.name}</span>
      </nav>

      <header className="card mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span
              className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                fund.type === "rosca"
                  ? "bg-baax-blue-100 text-baax-blue-700"
                  : "bg-emerald-50 text-emerald-700"
              }`}
            >
              {fundTypeLabel(fund.type)}
            </span>
            <h1 className="mt-2 text-2xl font-bold text-baax-blue-900">{fund.name}</h1>
            <p className="mt-2 text-sm text-baax-blue-600">{fund.description}</p>
          </div>
          <div className="text-left">
            <p className="stat-label">دورهٔ جاری</p>
            <p className="text-2xl font-bold text-baax-purple-600">
              {fund.currentCycle}
              <span className="text-base font-normal text-baax-blue-500">
                {" "}
                / {fund.totalCycles}
              </span>
            </p>
          </div>
        </div>
      </header>

      {fund.type === "rosca" ? (
        <RoscaFields fund={fund} />
      ) : (
        <SavingsLoanFields fund={fund} />
      )}

      <section className="card mt-6">
        <h2 className="section-title mb-4">وثیقه</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoRow
            label="نوع وثیقه"
            value={
              fund.collateralType === "cheque"
                ? "چک (پات بزرگ)"
                : "سفته الکترونیک"
            }
          />
          <InfoRow
            label="مبلغ اسمی"
            value={formatToman(fund.collateralFaceValue ?? 0)}
          />
        </div>
      </section>

      <section className="card mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="section-title">اعضا و وضعیت پرداخت</h2>
          {fund.waitlistCount > 0 && (
            <span className="rounded-full bg-baax-blue-100 px-2.5 py-0.5 text-xs text-baax-blue-700">
              {fund.waitlistCount} نفر در لیست انتظار
            </span>
          )}
        </div>
        <MemberList members={fund.members} />
        <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
          قانون تأخیر: ۱۰ روز اخطار، سپس جایگزینی صندلی‌های پیش از برد از لیست
          انتظار. جایگزین بدهی معوق را می‌پردازد. برندگان جایگزین نمی‌شوند.
        </p>
      </section>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={`/ledger?fund=${fund.id}`} className="btn-primary">
          مشاهدهٔ دفترکل
        </Link>
        {fund.type === "rosca" && (
          <Link href="/quick-buy" className="btn-secondary">
            خرید زودهنگام
          </Link>
        )}
      </div>
    </>
  );
}

function RoscaFields({ fund }: { fund: Fund }) {
  return (
    <section className="card">
      <h2 className="section-title mb-4">اطلاعات قرعه‌کشی</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InfoRow label="مبلغ ماهانه" value={formatToman(fund.monthlyAmount)} />
        <InfoRow label="ارزش پات" value={formatToman(fund.potValue ?? 0)} />
        <InfoRow
          label="تعداد اعضا"
          value={`${fund.filledSeats} / ${fund.memberCount}`}
        />
        <InfoRow label="تاریخ قرعه بعدی" value={fund.nextDrawDate} />
        <InfoRow
          label="برندهٔ دوره"
          value={fund.winnerThisCycle ?? "—"}
          highlight
        />
        <InfoRow label="کارمزد پلتفرم" value={`${fund.platformFeePercent}٪`} />
      </div>
    </section>
  );
}

function SavingsLoanFields({ fund }: { fund: Fund }) {
  return (
    <section className="card">
      <h2 className="section-title mb-4">اطلاعات پس‌انداز/وام</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InfoRow label="سقف وام" value={formatToman(fund.loanCap ?? 0)} highlight />
        <InfoRow
          label="حق عضویت"
          value={formatToman(fund.membershipFee ?? 0)}
        />
        <InfoRow
          label="قسط ماهانه"
          value={formatToman(fund.installmentAmount ?? 0)}
        />
        <InfoRow label="مبلغ پس‌انداز ماهانه" value={formatToman(fund.monthlyAmount)} />
        <InfoRow
          label="تعداد اعضا"
          value={`${fund.filledSeats} / ${fund.memberCount}`}
        />
        <InfoRow label="کارمزد پلتفرم" value={`${fund.platformFeePercent}٪`} />
      </div>
    </section>
  );
}

function InfoRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-xl bg-baax-blue-50 p-3">
      <p className="stat-label">{label}</p>
      <p
        className={`mt-1 font-semibold ${
          highlight ? "text-baax-purple-600" : "text-baax-blue-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
