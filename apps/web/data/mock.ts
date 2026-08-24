export type FundType = "rosca" | "savings_loan";
export type PaymentStatus = "paid" | "pending" | "overdue" | "waiting";
export type CycleStatus = "open" | "closed";

export interface FundMember {
  id: string;
  name: string;
  seat: number;
  status: PaymentStatus;
  isWinner?: boolean;
  daysOverdue?: number;
  preWin?: boolean;
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
  monthlyAmount: number;
  memberCount: number;
  filledSeats: number;
  waitlistCount: number;
  currentCycle: number;
  totalCycles: number;
  nextDrawDate: string;
  platformFeePercent: number;
  organizerName: string;
  cycleStatus: CycleStatus;
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

export interface PlatformFlag {
  id: string;
  fundId: string;
  fundName: string;
  member: string;
  type: "late" | "dispute";
  status: "open" | "review" | "closed";
}

export interface OrganizerSummary {
  id: string;
  name: string;
  fundCount: number;
  memberCount: number;
}

export const memberFundIds = ["rosca-12", "savings-loan-8"];

export const memberProfile = {
  name: "علی م.",
  nextPaymentDate: "۱۴۰۴/۰۶/۰۱",
  nextPaymentAmount: 5_000_000,
  nextPaymentFundId: "rosca-12",
  status: "pending" as PaymentStatus,
};

export const funds: Fund[] = [
  {
    id: "rosca-12",
    name: "صندوق ۱۲ نفره — محله ولیعصر",
    type: "rosca",
    monthlyAmount: 5_000_000,
    memberCount: 12,
    filledSeats: 11,
    waitlistCount: 3,
    currentCycle: 4,
    totalCycles: 12,
    nextDrawDate: "۱۴۰۴/۰۶/۰۱",
    platformFeePercent: 2,
    organizerName: "سیاامک غ.",
    cycleStatus: "open",
    potValue: 60_000_000,
    winnerThisCycle: "فاطمه ر.",
    collateralType: "promissory_note",
    collateralFaceValue: 500_000,
    members: [
      { id: "m1", name: "علی م.", seat: 1, status: "paid", isWinner: true, preWin: false },
      { id: "m2", name: "زهرا ک.", seat: 2, status: "paid", preWin: false },
      { id: "m3", name: "رضا ن.", seat: 3, status: "overdue", daysOverdue: 12, preWin: true },
      { id: "m4", name: "مریم ح.", seat: 4, status: "paid", preWin: true },
      { id: "m5", name: "حسین ب.", seat: 5, status: "pending", preWin: true },
      { id: "m6", name: "سارا د.", seat: 6, status: "paid", preWin: true },
      { id: "m7", name: "امیر ت.", seat: 7, status: "paid", preWin: true },
      { id: "m8", name: "نرگس ل.", seat: 8, status: "paid", preWin: true },
      { id: "m9", name: "پویا ج.", seat: 9, status: "paid", preWin: true },
      { id: "m10", name: "لیلا س.", seat: 10, status: "paid", preWin: true },
      { id: "m11", name: "کامران و.", seat: 11, status: "waiting", preWin: true },
    ],
    ledger: [
      { id: "l1", date: "۱۴۰۴/۰۵/۰۱", label: "واریز ماهانه", amount: 55_000_000, type: "credit", balance: 55_000_000 },
      { id: "l2", date: "۱۴۰۴/۰۵/۰۲", label: "کارمزد", amount: 1_100_000, type: "fee", balance: 53_900_000 },
      { id: "l3", date: "۱۴۰۴/۰۵/۰۳", label: "پرداخت برنده", amount: 53_900_000, type: "debit", balance: 0 },
      { id: "l4", date: "۱۴۰۴/۰۵/۱۵", label: "واریز دوره ۴", amount: 50_000_000, type: "credit", balance: 50_000_000 },
    ],
  },
  {
    id: "savings-loan-8",
    name: "پس‌انداز/وام — گروه همکاران",
    type: "savings_loan",
    monthlyAmount: 3_000_000,
    memberCount: 8,
    filledSeats: 8,
    waitlistCount: 0,
    currentCycle: 6,
    totalCycles: 24,
    nextDrawDate: "۱۴۰۴/۰۶/۰۵",
    platformFeePercent: 1.5,
    organizerName: "سیاامک غ.",
    cycleStatus: "open",
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
      { id: "sl1", date: "۱۴۰۴/۰۵/۰۱", label: "حق عضویت", amount: 1_000_000, type: "credit", balance: 25_000_000 },
      { id: "sl2", date: "۱۴۰۴/۰۵/۰۵", label: "قسط ماهانه", amount: 24_000_000, type: "credit", balance: 49_000_000 },
      { id: "sl3", date: "۱۴۰۴/۰۵/۰۶", label: "کارمزد", amount: 735_000, type: "fee", balance: 48_265_000 },
      { id: "sl4", date: "۱۴۰۴/۰۵/۱۰", label: "پرداخت وام", amount: 20_000_000, type: "debit", balance: 28_265_000 },
    ],
  },
  {
    id: "rosca-24-large",
    name: "صندوق ۲۴ نفره — پات بزرگ",
    type: "rosca",
    monthlyAmount: 10_000_000,
    memberCount: 24,
    filledSeats: 20,
    waitlistCount: 5,
    currentCycle: 2,
    totalCycles: 24,
    nextDrawDate: "۱۴۰۴/۰۶/۱۰",
    platformFeePercent: 2,
    organizerName: "مریم ح.",
    cycleStatus: "closed",
    potValue: 240_000_000,
    collateralType: "cheque",
    collateralFaceValue: 50_000_000,
    members: [],
    ledger: [
      { id: "rl1", date: "۱۴۰۴/۰۴/۰۱", label: "واریز ماهانه", amount: 200_000_000, type: "credit", balance: 200_000_000 },
      { id: "rl2", date: "۱۴۰۴/۰۴/۰۲", label: "کارمزد", amount: 4_000_000, type: "fee", balance: 196_000_000 },
    ],
  },
];

export const shopPartners: ShopPartner[] = [
  { id: "snapp", name: "Snapp Pay", logoColor: "#00d170", maxCredit: 30_000_000 },
  { id: "digikala", name: "دیجی‌کالا", logoColor: "#ef394e", maxCredit: 50_000_000 },
  { id: "tara", name: "Tara", logoColor: "#0066cc", maxCredit: 20_000_000 },
];

export const platformStats = {
  totalFunds: funds.length,
  totalMembers: 39,
  totalOrganizers: 2,
  serviceFeesMonth: 5_835_000,
};

export const organizers: OrganizerSummary[] = [
  { id: "o1", name: "سیاامک غ.", fundCount: 2, memberCount: 19 },
  { id: "o2", name: "مریم ح.", fundCount: 1, memberCount: 20 },
];

export const platformFlags: PlatformFlag[] = [
  { id: "f1", fundId: "rosca-12", fundName: "صندوق ۱۲ نفره", member: "رضا ن.", type: "late", status: "open" },
  { id: "f2", fundId: "savings-loan-8", fundName: "پس‌انداز/وام", member: "الهام ر.", type: "dispute", status: "review" },
];

export function getFund(id: string): Fund | undefined {
  return funds.find((f) => f.id === id);
}

export function getMemberFunds(): Fund[] {
  return funds.filter((f) => memberFundIds.includes(f.id));
}

export function getOrganizerFunds(name = "سیاامک غ."): Fund[] {
  return funds.filter((f) => f.organizerName === name);
}

export function formatToman(amount: number): string {
  return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
}

export function fundTypeLabel(type: FundType): string {
  return type === "rosca" ? "قرعه‌کشی" : "پس‌انداز/وام";
}

export function cycleStatusLabel(status: CycleStatus): string {
  return status === "open" ? "باز" : "بسته";
}

export function countPaidThisCycle(fund: Fund): number {
  return fund.members.filter((m) => m.status === "paid").length;
}

export function countLateThisCycle(fund: Fund): number {
  return fund.members.filter((m) => m.status === "overdue").length;
}

export function replaceableMembers(fund: Fund): FundMember[] {
  return fund.members.filter(
    (m) => m.status === "overdue" && (m.daysOverdue ?? 0) > 10 && m.preWin && !m.isWinner
  );
}

export function fundServiceFee(fund: Fund): number {
  const last = fund.ledger.filter((e) => e.type === "fee").at(-1);
  return last?.amount ?? 0;
}
