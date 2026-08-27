import type { FundCharter, FundType } from "~/data/mock";

export type { FundCharter };

export interface CharterParams {
  type: FundType;
  name: string;
  memberCount: number;
  monthlyAmount: number;
  totalCycles: number;
  isFamily?: boolean;
  ameenName?: string;
  amanName?: string;
  potValue?: number;
  loanCap?: number;
}

const DIYAH_RELEASE_RULES = `آزادسازی وجه (هر یک از مسیرهای زیر کافی است):
۱. تأیید هم‌زمان امین و امان پس از بررسی حکم دادگاه (یادداشت + نام فایل نمایشی)
۲. تأیید هم‌زمان امین و امان برای گرفتن رضایت (توافق با زیان‌دیده) بدون انتظار حکم
۳. رأی مثبت حداقل ۵۰٪ اعضای فعلی صندوق

رأی ۵۰٪ فقط برای آزادسازی وجه است و اساسنامه را تغییر نمی‌دهد.`;

function roscaCharter(p: CharterParams): string {
  return `اساسنامه صندوق «${p.name}» — نوع قرعه‌کشی

• ${p.memberCount} عضو، ${p.totalCycles} دوره
• مبلغ ماهانه: ${p.monthlyAmount.toLocaleString("fa-IR")} تومان
• ارزش پات: ${(p.potValue ?? p.monthlyAmount * p.memberCount).toLocaleString("fa-IR")} تومان

قوانین:
• اعضا موظف به پرداخت به‌موقع سهم ماهانه هستند.
• تأخیر بیش از ۱۰ روز برای اعضای واجد شرایط (پیش از برد و غیربرنده) می‌تواند منجر به جایگزینی شود.
• برندگان دوره قابل جایگزینی نیستند.
• وثیقه طبق شرایط صندوق (سفته یا چک) الزامی است.

این اساسنامه در زمان ایجاد صندوق ثبت شده و پس از آن قابل تغییر نیست.`;
}

function savingsLoanCharter(p: CharterParams): string {
  return `اساسنامه صندوق «${p.name}» — نوع پس‌انداز/وام

• ${p.memberCount} عضو، ${p.totalCycles} دوره
• پس‌انداز ماهانه: ${p.monthlyAmount.toLocaleString("fa-IR")} تومان
• سقف وام: ${(p.loanCap ?? 0).toLocaleString("fa-IR")} تومان

قوانین:
• اعضا موظف به پرداخت به‌موقع سهم و اقساط هستند.
• وام طبق سقف و شرایط صندوق و با رضایت اعضا پرداخت می‌شود.
• وثیقه (سفته) طبق شرایط صندوق الزامی است.

این اساسنامه در زمان ایجاد صندوق ثبت شده و پس از آن قابل تغییر نیست.`;
}

function diyahCharter(p: CharterParams): string {
  const familyLine = p.isFamily ? "• برچسب: خانوادگی\n" : "";
  return `اساسنامه صندوق «${p.name}» — نوع دیه${p.isFamily ? " (خانوادگی)" : ""}

${familyLine}• ${p.memberCount} عضو
• سهم ماهانه: ${p.monthlyAmount.toLocaleString("fa-IR")} تومان

ماهیت صندوق:
• صندوق مشترک برای دیه و تسویه خسارات ناشی از جرایم غیرعمد
• نه بانک است و نه بیمه
• باکس درباره غیرعمد یا عمد بودن یا مبلغ دیه حکم نمی‌دهد

امینان (ثابت و غیرقابل تعویض):
• امین: ${p.ameenName ?? "—"}
• امان: ${p.amanName ?? "—"}

${DIYAH_RELEASE_RULES}

این اساسنامه در زمان ایجاد صندوق ثبت شده و پس از آن — نه توسط صندوق‌دار، نه اعضا، نه رأی — قابل تغییر نیست.`;
}

export function generateCharter(params: CharterParams): FundCharter {
  let text: string;
  switch (params.type) {
    case "rosca":
      text = roscaCharter(params);
      break;
    case "savings_loan":
      text = savingsLoanCharter(params);
      break;
    case "diyah":
      text = diyahCharter(params);
      break;
  }
  return {
    text,
    createdAt: new Date().toISOString(),
  };
}

export function charterPreview(params: CharterParams): string {
  return generateCharter(params).text;
}
