export type FundType = "rosca" | "savings_loan";

export type PaymentStatus = "paid" | "pending" | "overdue" | "waiting";

export interface FundMember {
  id: string;
  name: string;
  seat: number;
  status: PaymentStatus;
  isWinner?: boolean;
  daysOverdue?: number;
}

export interface LedgerEntry {
  id: string;
  date: string;
  label: string;
  amount: number;
  type: "credit" | "debit" | "fee";
  balance: number;
}

export interface Fund {
  id: string;
  name: string;
  type: FundType;
  description: string;
  monthlyAmount: number;
  memberCount: number;
  filledSeats: number;
  waitlistCount: number;
  currentCycle: number;
  totalCycles: number;
  nextDrawDate: string;
  platformFeePercent: number;
  members: FundMember[];
  ledger: LedgerEntry[];
  potValue?: number;
  winnerThisCycle?: string;
  loanCap?: number;
  membershipFee?: number;
  installmentAmount?: number;
  collateralType?: "promissory_note" | "cheque";
  collateralFaceValue?: number;
}

export interface ShopPartner {
  id: string;
  name: string;
  logoColor: string;
  maxCredit: number;
}

export const funds: Fund[] = [
  {
    id: "rosca-12",
    name: "صندوق ۱۲ نفره — محله ولیعصر",
    type: "rosca",
    description:
      "قرعه‌کشی ماهانه؛ هر ماه یک نفر برنده کل پات می‌شود. سفته الکترونیک برای همه.",
    monthlyAmount: 5_000_000,
    memberCount: 12,
    filledSeats: 11,
    waitlistCount: 3,
    currentCycle: 4,
    totalCycles: 12,
    nextDrawDate: "۱۴۰۴/۰۶/۰۱",
    platformFeePercent: 2,
    potValue: 60_000_000,
    winnerThisCycle: "فاطمه ر.",
    collateralType: "promissory_note",
    collateralFaceValue: 500_000,
    members: [
      { id: "m1", name: "علی م.", seat: 1, status: "paid", isWinner: true },
      { id: "m2", name: "زهرا ک.", seat: 2, status: "paid" },
      { id: "m3", name: "رضا ن.", seat: 3, status: "overdue", daysOverdue: 12 },
      { id: "m4", name: "مریم ح.", seat: 4, status: "paid" },
      { id: "m5", name: "حسین ب.", seat: 5, status: "pending" },
      { id: "m6", name: "سارا د.", seat: 6, status: "paid" },
      { id: "m7", name: "امیر ت.", seat: 7, status: "paid" },
      { id: "m8", name: "نرگس ل.", seat: 8, status: "paid" },
      { id: "m9", name: "پویا ج.", seat: 9, status: "paid" },
      { id: "m10", name: "لیلا س.", seat: 10, status: "paid" },
      { id: "m11", name: "کامران و.", seat: 11, status: "waiting" },
    ],
    ledger: [
      {
        id: "l1",
        date: "۱۴۰۴/۰۵/۰۱",
        label: "واریز ماهانه — ۱۱ عضو",
        amount: 55_000_000,
        type: "credit",
        balance: 55_000_000,
      },
      {
        id: "l2",
        date: "۱۴۰۴/۰۵/۰۲",
        label: "کارمزد پلتفرم (۲٪)",
        amount: 1_100_000,
        type: "fee",
        balance: 53_900_000,
      },
      {
        id: "l3",
        date: "۱۴۰۴/۰۵/۰۳",
        label: "پرداخت به برنده — علی م.",
        amount: 53_900_000,
        type: "debit",
        balance: 0,
      },
      {
        id: "l4",
        date: "۱۴۰۴/۰۵/۱۵",
        label: "واریز ماهانه — دوره ۴",
        amount: 50_000_000,
        type: "credit",
        balance: 50_000_000,
      },
    ],
  },
  {
    id: "savings-loan-8",
    name: "پس‌انداز/وام — گروه همکاران",
    type: "savings_loan",
    description:
      "پس‌انداز گروهی با امکان وام تا سقف مشخص. حق عضویت و قسط جداگانه.",
    monthlyAmount: 3_000_000,
    memberCount: 8,
    filledSeats: 8,
    waitlistCount: 0,
    currentCycle: 6,
    totalCycles: 24,
    nextDrawDate: "۱۴۰۴/۰۶/۰۵",
    platformFeePercent: 1.5,
    loanCap: 40_000_000,
    membershipFee: 500_000,
    installmentAmount: 3_500_000,
    collateralType: "promissory_note",
    collateralFaceValue: 1_000_000,
    members: [
      { id: "s1", name: "محمد ع.", seat: 1, status: "paid" },
      { id: "s2", name: "نسرین ف.", seat: 2, status: "paid" },
      { id: "s3", name: "بهنام ق.", seat: 3, status: "paid" },
      { id: "s4", name: "الهام ر.", seat: 4, status: "overdue", daysOverdue: 5 },
      { id: "s5", name: "داوود ک.", seat: 5, status: "paid" },
      { id: "s6", name: "شیدا م.", seat: 6, status: "paid" },
      { id: "s7", name: "آرمان پ.", seat: 7, status: "paid" },
      { id: "s8", name: "گیتی ن.", seat: 8, status: "paid" },
    ],
    ledger: [
      {
        id: "sl1",
        date: "۱۴۰۴/۰۵/۰۱",
        label: "حق عضویت — ۲ عضو جدید",
        amount: 1_000_000,
        type: "credit",
        balance: 25_000_000,
      },
      {
        id: "sl2",
        date: "۱۴۰۴/۰۵/۰۵",
        label: "واریز قسط ماهانه",
        amount: 24_000_000,
        type: "credit",
        balance: 49_000_000,
      },
      {
        id: "sl3",
        date: "۱۴۰۴/۰۵/۰۶",
        label: "کارمزد پلتفرم (۱.۵٪)",
        amount: 735_000,
        type: "fee",
        balance: 48_265_000,
      },
      {
        id: "sl4",
        date: "۱۴۰۴/۰۵/۱۰",
        label: "پرداخت وام — محمد ع.",
        amount: 20_000_000,
        type: "debit",
        balance: 28_265_000,
      },
    ],
  },
  {
    id: "rosca-24-large",
    name: "صندوق ۲۴ نفره — پات بزرگ",
    type: "rosca",
    description: "قرعه‌کشی با پات بالا؛ علاوه بر سفته، چک وثیقه لازم است.",
    monthlyAmount: 10_000_000,
    memberCount: 24,
    filledSeats: 20,
    waitlistCount: 5,
    currentCycle: 2,
    totalCycles: 24,
    nextDrawDate: "۱۴۰۴/۰۶/۱۰",
    platformFeePercent: 2,
    potValue: 240_000_000,
    collateralType: "cheque",
    collateralFaceValue: 50_000_000,
    members: [],
    ledger: [
      {
        id: "rl1",
        date: "۱۴۰۴/۰۴/۰۱",
        label: "واریز ماهانه — ۲۰ عضو",
        amount: 200_000_000,
        type: "credit",
        balance: 200_000_000,
      },
      {
        id: "rl2",
        date: "۱۴۰۴/۰۴/۰۲",
        label: "کارمزد پلتفرم (۲٪)",
        amount: 4_000_000,
        type: "fee",
        balance: 196_000_000,
      },
    ],
  },
];

export const shopPartners: ShopPartner[] = [
  { id: "snapp", name: "Snapp Pay", logoColor: "#00d170", maxCredit: 30_000_000 },
  { id: "digikala", name: "دیجی‌کالا", logoColor: "#ef394e", maxCredit: 50_000_000 },
  { id: "tara", name: "Tara", logoColor: "#0066cc", maxCredit: 20_000_000 },
];

export function getFund(id: string): Fund | undefined {
  return funds.find((f) => f.id === id);
}

export function formatToman(amount: number): string {
  return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
}

export function fundTypeLabel(type: FundType): string {
  return type === "rosca" ? "قرعه‌کشی" : "پس‌انداز/وام";
}
