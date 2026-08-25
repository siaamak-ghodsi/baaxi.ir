import type { Fund, FundType } from "~/data/mock";
import { seedFunds } from "~/data/mock";

export const FUNDS_KEY = "baax-funds";

export function loadFunds(): Fund[] {
  if (!import.meta.client) return [...seedFunds];
  try {
    const raw = localStorage.getItem(FUNDS_KEY);
    if (!raw) {
      localStorage.setItem(FUNDS_KEY, JSON.stringify(seedFunds));
      return [...seedFunds];
    }
    const parsed = JSON.parse(raw) as Fund[];
    return parsed.length ? parsed : [...seedFunds];
  } catch {
    return [...seedFunds];
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
}

export function buildNewFund(input: CreateFundInput, organizerName: string): Fund {
  const id = `fund-${Date.now()}`;
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
    platformFeePercent: input.type === "rosca" ? 2 : 1.5,
    organizerName,
    cycleStatus: "closed" as const,
    members: [],
    ledger: [],
    collateralType: "promissory_note" as const,
    collateralFaceValue: 500_000,
  };

  if (input.type === "rosca") {
    return {
      ...base,
      potValue: input.potValue ?? input.monthlyAmount * input.memberCount,
    };
  }

  return {
    ...base,
    loanCap: input.loanCap ?? 0,
    membershipFee: input.membershipFee ?? 0,
    installmentAmount: input.installmentAmount ?? input.monthlyAmount,
  };
}
