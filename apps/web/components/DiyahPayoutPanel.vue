<template>
  <section class="card mt-6">
    <h2 class="section-title mb-4">صندوق دیه</h2>

    <div class="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <InfoRow label="سهم ماهانه" :value="formatToman(fund.monthlyAmount)" />
      <InfoRow label="موجودی صندوق" :value="formatToman(fund.poolBalance ?? 0)" highlight />
      <InfoRow label="اعضا" :value="`${fund.filledSeats}/${fund.memberCount}`" />
      <InfoRow
        v-if="fund.isFamily"
        label="نوع"
        value="خانوادگی"
        highlight
      />
      <InfoRow label="امین" :value="ameenLabel" />
      <InfoRow label="امان" :value="amanLabel" />
    </div>

    <FundCharterPanel :fund="fund" class="mb-6" />

    <!-- Trustee pending banner -->
    <div
      v-if="trusteeRole && pendingForTrustee.length"
      class="mb-4 rounded-xl border border-baax-purple-200 bg-baax-purple-500/5 p-4"
    >
      <p class="text-sm font-medium text-baax-purple-600">
        شما {{ trusteeRoleLabel(trusteeRole) }} این صندوق هستید — {{ pendingForTrustee.length }} درخواست در انتظار بررسی
      </p>
    </div>

    <!-- New payout request (members only) -->
    <div v-if="isMember" class="mb-6 rounded-xl border border-baax-blue-100 p-4">
      <h3 class="mb-3 text-sm font-semibold text-baax-blue-900">درخواست پرداخت</h3>
      <div class="space-y-3">
        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            class="rounded-xl border px-3 py-2 text-sm transition"
            :class="requestType === 'court_verdict'
              ? 'border-baax-purple-500 bg-baax-purple-500/5 text-baax-purple-600'
              : 'border-baax-blue-200 text-baax-blue-700'"
            @click="requestType = 'court_verdict'"
          >
            حکم دادگاه
          </button>
          <button
            type="button"
            class="rounded-xl border px-3 py-2 text-sm transition"
            :class="requestType === 'settlement'
              ? 'border-baax-purple-500 bg-baax-purple-500/5 text-baax-purple-600'
              : 'border-baax-blue-200 text-baax-blue-700'"
            @click="requestType = 'settlement'"
          >
            گرفتن رضایت
          </button>
        </div>
        <div class="grid gap-3 sm:grid-cols-2">
          <div>
            <label class="stat-label mb-1 block">مبلغ (تومان)</label>
            <input
              v-model.number="amount"
              type="number"
              min="100000"
              step="100000"
              class="w-full rounded-xl border border-baax-blue-200 px-3 py-2 text-sm focus:border-baax-purple-500 focus:outline-none focus:ring-1 focus:ring-baax-purple-500"
            />
          </div>
          <div v-if="requestType === 'court_verdict'">
            <label class="stat-label mb-1 block">نام فایل (نمایشی)</label>
            <input
              v-model="fileName"
              type="text"
              placeholder="hokm-dadgah.pdf"
              class="w-full rounded-xl border border-baax-blue-200 px-3 py-2 text-sm focus:border-baax-purple-500 focus:outline-none focus:ring-1 focus:ring-baax-purple-500"
            />
          </div>
        </div>
        <div>
          <label class="stat-label mb-1 block">توضیحات</label>
          <textarea
            v-model="note"
            rows="2"
            class="w-full rounded-xl border border-baax-blue-200 px-3 py-2 text-sm focus:border-baax-purple-500 focus:outline-none focus:ring-1 focus:ring-baax-purple-500"
            placeholder="خلاصه درخواست…"
          />
        </div>
        <p v-if="formError" class="text-xs text-red-600">{{ formError }}</p>
        <button type="button" class="btn-primary text-sm" @click="submitRequest">ثبت درخواست</button>
      </div>
    </div>

    <!-- Requests list -->
    <h3 class="mb-3 text-sm font-semibold text-baax-blue-900">درخواست‌ها</h3>

    <p v-if="!requests.length" class="text-sm text-baax-blue-500">درخواست پرداختی ثبت نشده.</p>

    <ul v-else class="space-y-4">
      <li
        v-for="req in sortedRequests"
        :key="req.id"
        class="rounded-xl border border-baax-blue-100 p-4"
      >
        <div class="flex flex-wrap items-start justify-between gap-2">
          <div>
            <span class="text-xs font-medium text-baax-purple-600">{{ payoutTypeLabel(req.type) }}</span>
            <p class="font-semibold text-baax-blue-900">{{ formatToman(req.amount) }}</p>
            <p class="mt-1 text-xs text-baax-blue-500">{{ req.note }}</p>
            <p v-if="req.fileName" class="text-xs text-baax-blue-400">فایل: {{ req.fileName }}</p>
          </div>
          <span
            class="rounded-full px-2 py-0.5 text-xs font-medium"
            :class="statusClass(req.status)"
          >
            {{ statusLabel(req.status) }}
          </span>
        </div>

        <template v-if="req.status === 'pending'">
          <!-- Trustee progress -->
          <div class="mt-3 text-xs text-baax-blue-600">
            <p>امین: {{ approvalLabel(req, 'ameen') }} · امان: {{ approvalLabel(req, 'aman') }}</p>
          </div>

          <!-- Member vote progress -->
          <div class="mt-2">
            <div class="flex items-center justify-between text-xs text-baax-blue-600">
              <span>رأی اعضا (حداقل {{ voteNeed }})</span>
              <span>{{ yesCount(req) }}/{{ voteNeed }}</span>
            </div>
            <div class="mt-1 h-1.5 overflow-hidden rounded-full bg-baax-blue-100">
              <div
                class="h-full rounded-full bg-baax-purple-500 transition-all"
                :style="{ width: `${voteProgress(req)}%` }"
              />
            </div>
          </div>

          <!-- Trustee actions -->
          <div v-if="trusteeRole && canTrusteeAct(req)" class="mt-3 flex gap-2">
            <button
              type="button"
              class="btn-primary text-xs"
              @click="onTrustee(req.id, true)"
            >
              تأیید
            </button>
            <button
              type="button"
              class="btn-secondary text-xs"
              @click="onTrustee(req.id, false)"
            >
              رد
            </button>
          </div>

          <!-- Member vote -->
          <div v-if="isMember && currentMember && !hasVoted(req, currentMember.id)" class="mt-3 flex gap-2">
            <button type="button" class="btn-primary text-xs" @click="onVote(req.id, true)">موافقم</button>
            <button type="button" class="btn-secondary text-xs" @click="onVote(req.id, false)">مخالفم</button>
          </div>
        </template>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { Fund, PayoutRequest, PayoutRequestStatus, TrusteeRole } from "~/data/mock";
import {
  countYesVotes,
  formatToman,
  getTrusteeSeat,
  payoutTypeLabel,
  trusteeRoleLabel,
  voteThreshold,
} from "~/data/mock";

const props = defineProps<{
  fund: Fund;
  isMember: boolean;
  userName: string;
  userPhone: string;
}>();

const { createPayoutRequest, trusteeDecision, memberVoteOnPayout, isUserTrustee } = useFunds();

const requestType = ref<"court_verdict" | "settlement">("court_verdict");
const amount = ref(1_000_000);
const note = ref("");
const fileName = ref("");
const formError = ref("");

const requests = computed(() => props.fund.payoutRequests ?? []);
const sortedRequests = computed(() =>
  [...requests.value].sort(
    (a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime()
  )
);

const trusteeRole = computed(() =>
  isUserTrustee(props.fund, props.userName, props.userPhone)
);

const pendingForTrustee = computed(() =>
  requests.value.filter((r) => r.status === "pending" && canTrusteeAct(r))
);

const currentMember = computed(() =>
  props.fund.members.find((m) => m.name === props.userName)
);

const voteNeed = computed(() => voteThreshold(props.fund.members.length));

const ameenLabel = computed(() => {
  const seat = getTrusteeSeat(props.fund, "ameen");
  if (!seat) return "—";
  return seat.phone ? seat.name : `${seat.name} (در انتظار پیوستن)`;
});

const amanLabel = computed(() => {
  const seat = getTrusteeSeat(props.fund, "aman");
  if (!seat) return "—";
  return seat.phone ? seat.name : `${seat.name} (در انتظار پیوستن)`;
});

function canTrusteeAct(req: PayoutRequest): boolean {
  if (!trusteeRole.value || req.status !== "pending") return false;
  const existing = req.trusteeApprovals.find((a) => a.role === trusteeRole.value);
  return !existing;
}

function approvalLabel(req: PayoutRequest, role: TrusteeRole): string {
  const a = req.trusteeApprovals.find((x) => x.role === role);
  if (!a) return "در انتظار";
  return a.approved ? "تأیید" : "رد";
}

function yesCount(req: PayoutRequest): number {
  return countYesVotes(req);
}

function voteProgress(req: PayoutRequest): number {
  const need = voteNeed.value;
  if (!need) return 0;
  return Math.min(100, (yesCount(req) / need) * 100);
}

function hasVoted(req: PayoutRequest, memberId: string): boolean {
  return req.memberVotes.some((v) => v.memberId === memberId);
}

function statusLabel(status: PayoutRequestStatus): string {
  if (status === "pending") return "در انتظار";
  if (status === "released") return "پرداخت شد";
  return "رد شد";
}

function statusClass(status: PayoutRequestStatus): string {
  if (status === "pending") return "bg-amber-50 text-amber-700";
  if (status === "released") return "bg-emerald-50 text-emerald-700";
  return "bg-red-50 text-red-700";
}

function submitRequest() {
  formError.value = "";
  const result = createPayoutRequest(props.fund.id, {
    type: requestType.value,
    amount: amount.value,
    note: note.value,
    fileName: requestType.value === "court_verdict" ? fileName.value : undefined,
    requestedBy: props.userName,
  });
  if (!result.ok) {
    formError.value = result.error;
    return;
  }
  note.value = "";
  fileName.value = "";
}

function onTrustee(requestId: string, approved: boolean) {
  if (!trusteeRole.value) return;
  trusteeDecision(props.fund.id, requestId, trusteeRole.value, approved, props.userName);
}

function onVote(requestId: string, yes: boolean) {
  if (!currentMember.value) return;
  memberVoteOnPayout(
    props.fund.id,
    requestId,
    currentMember.value.id,
    props.userName,
    yes
  );
}
</script>
