import type {
  Fund,
  FundMember,
  PaymentStatus,
  PayoutRequest,
  PayoutRequestType,
  TrusteeRole,
} from "~/data/mock";
import {
  bothTrusteesApproved,
  countYesVotes,
  getFundFromList,
  getMemberFundsForUser,
  getOrganizerFunds,
  getBrowsableFunds,
  isUserTrustee,
  shouldRejectPayout,
  voteThreshold,
} from "~/data/mock";
import { findUserByPhone, loadUsers, updateUser } from "~/utils/auth-storage";
import {
  buildNewFund,
  loadFunds,
  saveFunds,
  type CreateFundInput,
} from "~/utils/fund-storage";

function todayFa(): string {
  return new Intl.DateTimeFormat("fa-IR").format(new Date());
}

function bindTrusteeOnJoin(fund: Fund, userName: string, userPhone: string): Fund {
  if (fund.type !== "diyah" || !fund.trustees) return fund;
  const trustees = fund.trustees.map((seat) => {
    if (seat.phone) return seat;
    if (seat.name === userName) return { ...seat, phone: userPhone };
    return seat;
  });
  return { ...fund, trustees };
}

function tryReleasePayout(fund: Fund, request: PayoutRequest): { fund: Fund; request: PayoutRequest } {
  if (request.status !== "pending") return { fund, request };

  const trusteeRelease = bothTrusteesApproved(request);
  const yesVotes = countYesVotes(request);
  const threshold = voteThreshold(fund.members.length);
  const voteRelease = yesVotes >= threshold;

  if (trusteeRelease || voteRelease) {
    const lastBalance = fund.ledger.at(-1)?.balance ?? fund.poolBalance ?? 0;
    const newBalance = Math.max(0, lastBalance - request.amount);
    const label =
      request.type === "court_verdict"
        ? `پرداخت دیه — حکم دادگاه`
        : `پرداخت دیه — گرفتن رضایت`;

    const ledgerEntry = {
      id: `l-${Date.now()}`,
      date: todayFa(),
      label,
      amount: request.amount,
      type: "debit" as const,
      balance: newBalance,
    };

    const released: PayoutRequest = {
      ...request,
      status: "released",
      releasedAt: new Date().toISOString(),
    };

    return {
      fund: {
        ...fund,
        poolBalance: newBalance,
        ledger: [...fund.ledger, ledgerEntry],
      },
      request: released,
    };
  }

  if (shouldRejectPayout(fund, request)) {
    return { fund, request: { ...request, status: "rejected" } };
  }

  return { fund, request };
}

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
    userPhone: string,
    acceptedRules: boolean
  ): { ok: true } | { ok: false; error: string } {
    if (!acceptedRules) {
      return { ok: false, error: "پذیرش اساسنامه الزامی است" };
    }

    const user = findUserByPhone(userPhone);
    if (!user) return { ok: false, error: "کاربر یافت نشد" };
    if (user.joinedFundIds.includes(fundId)) {
      return { ok: false, error: "قبلاً عضو این صندوق هستید" };
    }

    const idx = funds.value.findIndex((f) => f.id === fundId);
    if (idx < 0) return { ok: false, error: "صندوق یافت نشد" };

    let fund = funds.value[idx];
    if (fund.filledSeats >= fund.memberCount) {
      return { ok: false, error: "ظرفیت صندوق تکمیل است" };
    }

    fund = bindTrusteeOnJoin(fund, userName, userPhone);

    const member: FundMember = {
      id: `m-${Date.now()}`,
      name: userName,
      seat: fund.filledSeats + 1,
      status: "pending",
      preWin: fund.type === "rosca",
      rulesAcceptedAt: new Date().toISOString(),
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

  function updateFundAt(fundId: string, updater: (fund: Fund) => Fund) {
    const idx = funds.value.findIndex((f) => f.id === fundId);
    if (idx < 0) return;
    const next = [...funds.value];
    next[idx] = updater(next[idx]);
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

  function createPayoutRequest(
    fundId: string,
    input: {
      type: PayoutRequestType;
      amount: number;
      note: string;
      fileName?: string;
      requestedBy: string;
    }
  ): { ok: true; request: PayoutRequest } | { ok: false; error: string } {
    const fund = getFund(fundId);
    if (!fund || fund.type !== "diyah") {
      return { ok: false, error: "صندوق دیه یافت نشد" };
    }
    if (!input.note.trim()) {
      return { ok: false, error: "توضیحات را وارد کنید" };
    }
    if (input.amount <= 0) {
      return { ok: false, error: "مبلغ نامعتبر است" };
    }

    const request: PayoutRequest = {
      id: `pr-${Date.now()}`,
      type: input.type,
      amount: input.amount,
      note: input.note.trim(),
      fileName: input.fileName?.trim() || undefined,
      requestedBy: input.requestedBy,
      requestedAt: new Date().toISOString(),
      status: "pending",
      trusteeApprovals: [],
      memberVotes: [],
    };

    updateFundAt(fundId, (f) => ({
      ...f,
      payoutRequests: [...(f.payoutRequests ?? []), request],
    }));

    return { ok: true, request };
  }

  function trusteeDecision(
    fundId: string,
    requestId: string,
    role: TrusteeRole,
    approved: boolean,
    byName: string
  ): { ok: true } | { ok: false; error: string } {
    const fund = getFund(fundId);
    if (!fund || fund.type !== "diyah") {
      return { ok: false, error: "صندوق یافت نشد" };
    }

    const requests = fund.payoutRequests ?? [];
    const reqIdx = requests.findIndex((r) => r.id === requestId);
    if (reqIdx < 0) return { ok: false, error: "درخواست یافت نشد" };

    const request = requests[reqIdx];
    if (request.status !== "pending") {
      return { ok: false, error: "این درخواست دیگر باز نیست" };
    }

    const filtered = request.trusteeApprovals.filter((a) => a.role !== role);
    const updatedRequest: PayoutRequest = {
      ...request,
      trusteeApprovals: [
        ...filtered,
        { role, approved, at: new Date().toISOString(), byName },
      ],
    };

    const { fund: nextFund, request: finalRequest } = tryReleasePayout(fund, updatedRequest);
    const nextRequests = [...(nextFund.payoutRequests ?? [])];
    nextRequests[reqIdx] = finalRequest;

    updateFundAt(fundId, () => ({
      ...nextFund,
      payoutRequests: nextRequests,
    }));

    return { ok: true };
  }

  function memberVoteOnPayout(
    fundId: string,
    requestId: string,
    memberId: string,
    memberName: string,
    yes: boolean
  ): { ok: true } | { ok: false; error: string } {
    const fund = getFund(fundId);
    if (!fund || fund.type !== "diyah") {
      return { ok: false, error: "صندوق یافت نشد" };
    }

    const requests = fund.payoutRequests ?? [];
    const reqIdx = requests.findIndex((r) => r.id === requestId);
    if (reqIdx < 0) return { ok: false, error: "درخواست یافت نشد" };

    const request = requests[reqIdx];
    if (request.status !== "pending") {
      return { ok: false, error: "این درخواست دیگر باز نیست" };
    }

    const filtered = request.memberVotes.filter((v) => v.memberId !== memberId);
    const updatedRequest: PayoutRequest = {
      ...request,
      memberVotes: [
        ...filtered,
        { memberId, memberName, yes, at: new Date().toISOString() },
      ],
    };

    const { fund: nextFund, request: finalRequest } = tryReleasePayout(fund, updatedRequest);
    const nextRequests = [...(nextFund.payoutRequests ?? [])];
    nextRequests[reqIdx] = finalRequest;

    updateFundAt(fundId, () => ({
      ...nextFund,
      payoutRequests: nextRequests,
    }));

    return { ok: true };
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

  function existingUserNames(): string[] {
    return loadUsers().map((u) => u.name);
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
    createPayoutRequest,
    trusteeDecision,
    memberVoteOnPayout,
    isUserTrustee,
    existingUserNames,
  };
}
