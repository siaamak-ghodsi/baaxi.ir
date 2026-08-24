import { FundMember } from "@/data/mock";
import { paymentStatusClasses, paymentStatusLabel } from "@/lib/utils";

export function MemberList({ members }: { members: FundMember[] }) {
  if (members.length === 0) {
    return (
      <p className="text-sm text-baax-blue-500">لیست اعضا در این دمو خالی است.</p>
    );
  }

  return (
    <ul className="divide-y divide-baax-blue-50">
      {members.map((member) => (
        <li key={member.id} className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-baax-blue-100 text-sm font-medium text-baax-blue-700">
              {member.seat}
            </span>
            <div>
              <p className="font-medium text-baax-blue-900">
                {member.name}
                {member.isWinner && (
                  <span className="mr-2 rounded bg-baax-purple-100 px-1.5 py-0.5 text-xs text-baax-purple-600">
                    برنده
                  </span>
                )}
              </p>
              {member.daysOverdue && member.daysOverdue > 10 && (
                <p className="text-xs text-red-600">
                  {member.daysOverdue} روز تأخیر — آماده جایگزینی از لیست انتظار
                </p>
              )}
              {member.daysOverdue && member.daysOverdue <= 10 && (
                <p className="text-xs text-amber-600">
                  {member.daysOverdue} روز تأخیر — در دوره اخطار
                </p>
              )}
            </div>
          </div>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${paymentStatusClasses(member.status)}`}
          >
            {paymentStatusLabel(member.status)}
          </span>
        </li>
      ))}
    </ul>
  );
}
