import { LedgerEntry } from "@/data/mock";
import { formatToman } from "@/data/mock";
import { cn } from "@/lib/utils";

export function LedgerTable({ entries }: { entries: LedgerEntry[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-baax-blue-100 text-right">
            <th className="pb-3 pr-2 font-medium text-baax-blue-600">تاریخ</th>
            <th className="pb-3 font-medium text-baax-blue-600">شرح</th>
            <th className="pb-3 pl-2 text-left font-medium text-baax-blue-600">مبلغ</th>
            <th className="pb-3 pl-2 text-left font-medium text-baax-blue-600">مانده</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-baax-blue-50">
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td className="py-3 pr-2 text-baax-blue-700">{entry.date}</td>
              <td className="py-3 text-baax-blue-900">{entry.label}</td>
              <td
                className={cn(
                  "py-3 pl-2 text-left font-medium",
                  entry.type === "credit" && "text-emerald-600",
                  entry.type === "debit" && "text-baax-blue-800",
                  entry.type === "fee" && "text-amber-600"
                )}
              >
                {entry.type === "debit" ? "−" : "+"}
                {formatToman(entry.amount)}
              </td>
              <td className="py-3 pl-2 text-left text-baax-blue-700">
                {formatToman(entry.balance)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
