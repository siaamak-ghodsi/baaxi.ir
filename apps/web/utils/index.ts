export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function paymentStatusLabel(status: string): string {
  switch (status) {
    case "paid":
      return "پرداخت‌شده";
    case "pending":
      return "در انتظار";
    case "overdue":
      return "معوق";
    case "waiting":
      return "لیست انتظار";
    default:
      return status;
  }
}

export function paymentStatusClasses(status: string): string {
  switch (status) {
    case "paid":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "overdue":
      return "bg-red-50 text-red-700 border-red-200";
    case "waiting":
      return "bg-slate-100 text-slate-600 border-slate-200";
    default:
      return "bg-slate-100 text-slate-600";
  }
}
