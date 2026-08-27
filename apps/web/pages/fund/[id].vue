<template>
  <div v-if="fund">
    <nav class="mb-4 text-sm text-baax-blue-500">
      <NuxtLink to="/member" class="hover:text-baax-blue-700">خانه</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-baax-blue-800">{{ fund.name }}</span>
    </nav>

    <header class="card mb-6">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span
            class="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
            :class="fundTypeBadgeClass(fund.type)"
          >
            {{ fundTypeLabel(fund.type) }}
            <span v-if="fund.isFamily" class="mr-1">· خانوادگی</span>
          </span>
          <h1 class="mt-2 text-2xl font-bold text-baax-blue-900">{{ fund.name }}</h1>
        </div>
        <div class="text-left">
          <p class="stat-label">دوره</p>
          <p class="text-2xl font-bold text-baax-purple-600">
            {{ fund.currentCycle }}<span class="text-base font-normal text-baax-blue-500">/{{ fund.totalCycles }}</span>
          </p>
        </div>
      </div>
    </header>

    <section v-if="fund.type === 'rosca'" class="card">
      <h2 class="section-title mb-4">قرعه‌کشی</h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InfoRow label="مبلغ ماهانه" :value="formatToman(fund.monthlyAmount)" />
        <InfoRow label="ارزش پات" :value="formatToman(fund.potValue ?? 0)" />
        <InfoRow label="اعضا" :value="`${fund.filledSeats}/${fund.memberCount}`" />
        <InfoRow label="قرعه بعدی" :value="fund.nextDrawDate" />
        <InfoRow label="برنده دوره" :value="fund.winnerThisCycle ?? '—'" highlight />
        <InfoRow label="وثیقه" :value="fund.collateralType === 'cheque' ? 'چک' : 'سفته'" />
      </div>
    </section>

    <section v-else-if="fund.type === 'savings_loan'" class="card">
      <h2 class="section-title mb-4">پس‌انداز/وام</h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InfoRow label="سقف وام" :value="formatToman(fund.loanCap ?? 0)" highlight />
        <InfoRow label="حق عضویت" :value="formatToman(fund.membershipFee ?? 0)" />
        <InfoRow label="قسط" :value="formatToman(fund.installmentAmount ?? 0)" />
        <InfoRow label="پس‌انداز ماهانه" :value="formatToman(fund.monthlyAmount)" />
        <InfoRow label="اعضا" :value="`${fund.filledSeats}/${fund.memberCount}`" />
        <InfoRow label="وثیقه" :value="formatToman(fund.collateralFaceValue ?? 0)" />
      </div>
    </section>

    <DiyahPayoutPanel
      v-if="fund.type === 'diyah' && (isMember || trusteeRole)"
      :fund="fund"
      :is-member="isMember"
      :user-name="session?.name ?? ''"
      :user-phone="session?.phone ?? ''"
    />

    <section v-if="fund.type !== 'diyah' && fund.charter" class="card mt-6">
      <FundCharterPanel :fund="fund" />
    </section>

    <section class="card mt-6">
      <h2 class="section-title mb-4">اعضا</h2>
      <MemberList :members="fund.members" />
    </section>

    <div class="mt-6 flex flex-wrap gap-3">
      <button
        v-if="canJoin"
        type="button"
        class="btn-primary"
        @click="showJoinDialog = true"
      >
        پیوستن
      </button>
      <NuxtLink v-if="isMember" :to="`/ledger?fund=${fund.id}`" class="btn-primary">دفترکل</NuxtLink>
      <NuxtLink v-if="isMember && fund.type === 'rosca'" to="/quick-buy" class="btn-secondary">
        خرید زودهنگام
      </NuxtLink>
    </div>

    <JoinFundDialog
      v-if="fund"
      :fund="fund"
      :open="showJoinDialog"
      @close="showJoinDialog = false"
      @joined="onJoined"
    />
  </div>
</template>

<script setup lang="ts">
import { formatToman, fundTypeBadgeClass, fundTypeLabel } from "~/data/mock";

definePageMeta({ auth: "member" });

const route = useRoute();
const router = useRouter();
const { session, currentUser } = useAuth();
const { getFund, funds, isUserTrustee } = useFunds();

const fundId = computed(() => route.params.id as string);
const fund = computed(() => getFund(fundId.value));
const user = computed(() => currentUser());
const showJoinDialog = ref(false);

watchEffect(() => {
  if (import.meta.client && funds.value.length && !fund.value) {
    throw createError({ statusCode: 404, statusMessage: "صفحه پیدا نشد" });
  }
});

const isMember = computed(() =>
  user.value?.joinedFundIds.includes(fundId.value) ?? false
);

const canJoin = computed(() => {
  if (!fund.value || isMember.value) return false;
  return fund.value.filledSeats < fund.value.memberCount;
});

const trusteeRole = computed(() => {
  if (!fund.value || !session.value) return null;
  return isUserTrustee(fund.value, session.value.name, session.value.phone);
});

async function onJoined() {
  showJoinDialog.value = false;
  await router.push("/member");
}
</script>
