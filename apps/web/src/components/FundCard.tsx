import Link from "next/link";
import {
  Fund,
  formatToman,
  fundTypeLabel,
} from "@/data/mock";

export function FundCard({ fund }: { fund: Fund }) {
  return (
    <Link href={`/fund/${fund.id}`} className="card block transition hover:border-baax-blue-200 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
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
          <h3 className="mt-2 font-bold text-baax-blue-900">{fund.name}</h3>
        </div>
        <div className="text-left">
          <p className="stat-label">دوره</p>
          <p className="text-sm font-semibold text-baax-purple-600">
            {fund.currentCycle} از {fund.totalCycles}
          </p>
        </div>
      </div>

      <p className="mb-4 text-sm text-baax-blue-600 line-clamp-2">{fund.description}</p>

      <div className="grid grid-cols-2 gap-3 border-t border-baax-blue-50 pt-3 sm:grid-cols-3">
        <div>
          <p className="stat-label">مبلغ ماهانه</p>
          <p className="stat-value text-sm">{formatToman(fund.monthlyAmount)}</p>
        </div>
        {fund.type === "rosca" && fund.potValue && (
          <div>
            <p className="stat-label">ارزش پات</p>
            <p className="stat-value text-sm">{formatToman(fund.potValue)}</p>
          </div>
        )}
        {fund.type === "savings_loan" && (
          <>
            <div>
              <p className="stat-label">سقف وام</p>
              <p className="stat-value text-sm">{formatToman(fund.loanCap ?? 0)}</p>
            </div>
            <div>
              <p className="stat-label">قسط ماهانه</p>
              <p className="stat-value text-sm">{formatToman(fund.installmentAmount ?? 0)}</p>
            </div>
          </>
        )}
        <div>
          <p className="stat-label">اعضا</p>
          <p className="stat-value text-sm">
            {fund.filledSeats}/{fund.memberCount}
          </p>
        </div>
      </div>
    </Link>
  );
}
