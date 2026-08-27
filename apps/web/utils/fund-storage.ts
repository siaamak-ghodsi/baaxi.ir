import type { Fund, FundType, TrusteeSeat } from "~/data/mock";
import { seedFunds } from "~/data/mock";
import { generateCharter } from "~/utils/charter";

export const FUNDS_KEY = "baax-funds";

function ensureCharter(fund: Fund): Fund {
  if (fund.charter?.text) return fund;
  const charter = generateCharter({
    type: fund.type,
    name: fund.name,
    memberCount: fund.memberCount,
    monthlyAmount: fund.monthlyAmount,
    totalCycles: fund.totalCycles,
    isFamily: fund.isFamily,
    ameenName: fund.trustees?.find((t) => t.role === "ameen")?.name,
    amanName: fund.trustees?.find((t) => t.role === "aman")?.name,
    potValue: fund.potValue,
    loanCap: fund.loanCap,
  });
  return { ...fund, charter };
}

function normalizeFunds(funds: Fund[]): Fund[] {
  return funds.map(ensureCharter);
}

export function loadFunds(): Fund[] {
  if (!import.meta.client) return normalizeFunds([...seedFunds]);
  try {
    const raw = localStorage.getItem(FUNDS_KEY);
    if (!raw) {
      const seeded = normalizeFunds([...seedFunds]);
      localStorage.setItem(FUNDS_KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw) as Fund[];
    const funds = parsed.length ? normalizeFunds(parsed) : normalizeFunds([...seedFunds]);
    return funds;
  } catch {
    return normalizeFunds([...seedFunds]);
  }
}

export function saveFunds(funds: Fund[]) {
  if (!import.meta.client) return;
  localStorage.setItem(FUNDS_KEY, JSON.stringify(funds));
}

export interface CreateFundInput {
  name: string;
  type: FundType;
  monthlyAmount: number;
  memberCount: number;
  totalCycles: number;
  potValue?: number;
  loanCap?: number;
  membershipFee?: number;
  installmentAmount?: number;
  isFamily?: boolean;
  ameenName?: string;
  amanName?: string;
  ameenPhone?: string;
  amanPhone?: string;
}

function buildTrustees(input: CreateFundInput): TrusteeSeat[] | undefined {
  if (input.type !== "diyah") return undefined;
  return [
    {
      role: "ameen",
      name: input.ameenName!.trim(),
      phone: input.ameenPhone,
    },
    {
      role: "aman",
      name: input.amanName!.trim(),
      phone: input.amanPhone,
    },
  ];
}

export function buildNewFund(input: CreateFundInput, organizerName: string): Fund {
  const id = `fund-${Date.now()}`;
  const trustees = buildTrustees(input);
  const charter = generateCharter({
    type: input.type,
    name: input.name.trim(),
    memberCount: input.memberCount,
    monthlyAmount: input.monthlyAmount,
    totalCycles: input.totalCycles,
    isFamily: input.isFamily,
    ameenName: input.ameenName,
    amanName: input.amanName,
    potValue: input.potValue,
    loanCap: input.loanCap,
  });

  const base = {
    id,
    name: input.name.trim(),
    type: input.type,
    monthlyAmount: input.monthlyAmount,
    memberCount: input.memberCount,
    filledSeats: 0,
    waitlistCount: 0,
    currentCycle: 1,
    totalCycles: input.totalCycles,
    nextDrawDate: "۱۴۰۴/۰۷/۰۱",
    platformFeePercent: input.type === "rosca" ? 2 : input.type === "diyah" ? 1 : 1.5,
    organizerName,
    cycleStatus: "closed" as const,
    members: [],
    ledger: [],
    charter,
    collateralType: "promissory_note" as const,
    collateralFaceValue: 500_000,
  };

  if (input.type === "rosca") {
    return {
      ...base,
      potValue: input.potValue ?? input.monthlyAmount * input.memberCount,
    };
  }

  if (input.type === "diyah") {
    return {
      ...base,
      isFamily: input.isFamily ?? false,
      trustees,
      payoutRequests: [],
      poolBalance: 0,
    };
  }

  return {
    ...base,
    loanCap: input.loanCap ?? 0,
    membershipFee: input.membershipFee ?? 0,
    installmentAmount: input.installmentAmount ?? input.monthlyAmount,
  };
}
