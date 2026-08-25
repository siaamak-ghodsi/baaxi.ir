import type { Fund, FundMember, PaymentStatus } from "~/data/mock";
import {
  getBrowsableFunds,
  getFundFromList,
  getMemberFundsForUser,
  getOrganizerFunds,
} from "~/data/mock";
import { findUserByPhone, updateUser } from "~/utils/auth-storage";
import {
  buildNewFund,
  loadFunds,
  saveFunds,
  type CreateFundInput,
} from "~/utils/fund-storage";

export function useFunds() {
  const funds = useState<Fund[]>("funds", () => []);
  const hydrated = useState("funds-hydrated", () => false);

  function hydrate() {
    funds.value = loadFunds();
    hydrated.value = true;
  }

  function persist(next: Fund[]) {
    funds.value = next;
    saveFunds(next);
  }

  function getFund(id: string): Fund | undefined {
    return getFundFromList(funds.value, id);
  }

  function memberFunds(joinedFundIds: string[]) {
    return getMemberFundsForUser(funds.value, joinedFundIds);
  }

  function browsableFunds(joinedFundIds: string[]) {
    return getBrowsableFunds(funds.value, joinedFundIds);
  }

  function organizerFunds(name: string) {
    return getOrganizerFunds(funds.value, name);
  }

  function createFund(input: CreateFundInput, organizerName: string): Fund {
    const fund = buildNewFund(input, organizerName);
    persist([...funds.value, fund]);
    return fund;
  }

  function joinFund(
    fundId: string,
    userName: string,
    userPhone: string
  ): { ok: true } | { ok: false; error: string } {
    const user = findUserByPhone(userPhone);
    if (!user) return { ok: false, error: "کاربر یافت نشد" };
    if (user.joinedFundIds.includes(fundId)) {
      return { ok: false, error: "قبلاً عضو این صندوق هستید" };
    }

    const idx = funds.value.findIndex((f) => f.id === fundId);
    if (idx < 0) return { ok: false, error: "صندوق یافت نشد" };

    const fund = funds.value[idx];
    if (fund.filledSeats >= fund.memberCount) {
      return { ok: false, error: "ظرفیت صندوق تکمیل است" };
    }

    const member: FundMember = {
      id: `m-${Date.now()}`,
      name: userName,
      seat: fund.filledSeats + 1,
      status: "pending",
      preWin: fund.type === "rosca",
    };

    const updated: Fund = {
      ...fund,
      filledSeats: fund.filledSeats + 1,
      members: [...fund.members, member],
    };

    const next = [...funds.value];
    next[idx] = updated;
    persist(next);

    updateUser(userPhone, {
      joinedFundIds: [...user.joinedFundIds, fundId],
    });

    const { refreshUser } = useAuth();
    refreshUser();

    return { ok: true };
  }

  function updateFund(fundId: string, patch: Partial<Fund>) {
    const idx = funds.value.findIndex((f) => f.id === fundId);
    if (idx < 0) return;
    const next = [...funds.value];
    next[idx] = { ...next[idx], ...patch };
    persist(next);
  }

  function startCycle(fundId: string) {
    updateFund(fundId, { cycleStatus: "open" });
  }

  function closeCycle(fundId: string) {
    const fund = getFund(fundId);
    if (!fund) return;
    updateFund(fundId, {
      cycleStatus: "closed",
      currentCycle: Math.min(fund.currentCycle + 1, fund.totalCycles),
    });
  }

  function replaceMember(fundId: string, memberId: string) {
    const fund = getFund(fundId);
    if (!fund) return;

    const members = fund.members.filter((m) => m.id !== memberId);
    const waitlistCount = Math.max(0, fund.waitlistCount - 1);

    let filledSeats = members.length;
    if (waitlistCount > 0 || fund.waitlistCount > 0) {
      members.push({
        id: `w-${Date.now()}`,
        name: "عضو جایگزین",
        seat: filledSeats + 1,
        status: "waiting",
        preWin: fund.type === "rosca",
      });
      filledSeats = members.length;
    } else {
      filledSeats = members.length;
    }

    updateFund(fundId, {
      members,
      filledSeats,
      waitlistCount,
    });
  }

  function nextPaymentForUser(userName: string, joinedFundIds: string[]) {
    const joined = memberFunds(joinedFundIds);
    if (!joined.length) return null;

    for (const fund of joined) {
      const member = fund.members.find((m) => m.name === userName);
      if (member && member.status !== "paid") {
        return {
          amount:
            fund.type === "rosca"
              ? fund.monthlyAmount
              : (fund.installmentAmount ?? fund.monthlyAmount),
          date: fund.nextDrawDate,
          status: member.status as PaymentStatus,
          fundId: fund.id,
        };
      }
    }

    const fund = joined[0];
    return {
      amount:
        fund.type === "rosca"
          ? fund.monthlyAmount
          : (fund.installmentAmount ?? fund.monthlyAmount),
      date: fund.nextDrawDate,
      status: "pending" as PaymentStatus,
      fundId: fund.id,
    };
  }

  return {
    funds,
    hydrated,
    hydrate,
    getFund,
    memberFunds,
    browsableFunds,
    organizerFunds,
    createFund,
    joinFund,
    startCycle,
    closeCycle,
    replaceMember,
    nextPaymentForUser,
  };
}
