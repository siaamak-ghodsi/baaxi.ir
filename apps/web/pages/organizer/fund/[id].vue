<template>
  <div v-if="fund">
    <nav class="breadcrumb">
      <NuxtLink to="/organizer" class="breadcrumb-link">صندوق‌ها</NuxtLink>
      <span>/</span>
      <span class="breadcrumb-current">{{ fund.name }}</span>
    </nav>

    <header class="card mb-4">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span
            class="badge"
            :class="fundTypeBadgeClass(fund.type)"
          >
            {{ fundTypeLabel(fund.type) }}
            <span v-if="fund.isFamily"> · خانوادگی</span>
          </span>
          <h1 class="page-title mt-1.5">{{ fund.name }}</h1>
        </div>
        <div class="flex flex-col items-end gap-1.5">
          <span
            class="badge"
            :class="
              fund.cycleStatus === 'open'
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-slate-100 text-slate-600'
            "
          >
            دوره {{ cycleStatusLabel(fund.cycleStatus) }}
          </span>
          <p class="text-sm tabular-nums text-baax-blue-500">{{ fund.currentCycle }}/{{ fund.totalCycles }}</p>
        </div>
      </div>
    </header>

    <section class="mb-4 grid gap-2.5 sm:grid-cols-4">
      <div class="stat-card">
        <p class="stat-label">پرداخت‌شده</p>
        <p class="stat-value-lg mt-1 text-emerald-600">{{ paidCount }}</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">معوق</p>
        <p class="stat-value-lg mt-1 text-red-600">{{ lateCount }}</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">انتظار</p>
        <p class="stat-value-lg mt-1">{{ fund.waitlistCount }}</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">کارمزد</p>
        <p class="stat-value-lg mt-1">{{ formatToman(fundServiceFee(fund)) }}</p>
      </div>
    </section>

    <section v-if="fund.type === 'rosca'" class="card mb-6">
      <h2 class="section-title mb-4">قرعه‌کشی</h2>
      <div class="grid gap-4 sm:grid-cols-3">
        <InfoRow label="مبلغ ماهانه" :value="formatToman(fund.monthlyAmount)" />
        <InfoRow label="ارزش پات" :value="formatToman(fund.potValue ?? 0)" />
        <InfoRow label="قرعه بعدی" :value="fund.nextDrawDate" />
      </div>
    </section>

    <section v-else-if="fund.type === 'savings_loan'" class="card mb-6">
      <h2 class="section-title mb-4">پس‌انداز/وام</h2>
      <div class="grid gap-4 sm:grid-cols-3">
        <InfoRow label="سقف وام" :value="formatToman(fund.loanCap ?? 0)" highlight />
        <InfoRow label="حق عضویت" :value="formatToman(fund.membershipFee ?? 0)" />
        <InfoRow label="قسط" :value="formatToman(fund.installmentAmount ?? 0)" />
      </div>
    </section>

    <section v-else-if="fund.type === 'diyah'" class="card mb-6">
      <h2 class="section-title mb-4">دیه</h2>
      <div class="grid gap-4 sm:grid-cols-3">
        <InfoRow label="سهم ماهانه" :value="formatToman(fund.monthlyAmount)" />
        <InfoRow label="موجودی" :value="formatToman(fund.poolBalance ?? 0)" highlight />
        <InfoRow label="امین" :value="fund.trustees?.find(t => t.role === 'ameen')?.name ?? '—'" />
        <InfoRow label="امان" :value="fund.trustees?.find(t => t.role === 'aman')?.name ?? '—'" />
      </div>
      <FundCharterPanel v-if="fund.charter" :fund="fund" class="mt-4" />
    </section>

    <section class="card mb-6">
      <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 class="section-title">
          اعضا · {{ fund.members.length }}/{{ fund.memberCount }} · دوره {{ fund.currentCycle }}
        </h2>
        <div class="flex gap-2">
          <button
            v-if="fund.cycleStatus === 'open'"
            type="button"
            class="btn-secondary text-xs"
            @click="closeCycle(fund.id)"
          >
            بستن دوره
          </button>
          <button
            v-if="fund.cycleStatus === 'closed'"
            type="button"
            class="btn-primary text-xs"
            @click="startCycle(fund.id)"
          >
            شروع دوره
          </button>
        </div>
      </div>
      <MemberList :members="fund.members" />
    </section>

    <section v-if="replaceable.length" class="card">
      <h2 class="section-title mb-4">جایگزینی</h2>
      <ul class="space-y-3">
        <li
          v-for="member in replaceable"
          :key="member.id"
          class="flex items-center justify-between rounded-xl bg-red-50 px-4 py-3"
        >
          <div>
            <p class="font-medium text-baax-blue-900">{{ member.name }} · {{ member.seat }}</p>
            <p class="text-xs text-red-600">{{ member.daysOverdue }} روز · پیش از برد</p>
          </div>
          <button
            type="button"
            class="btn-secondary text-xs"
            @click="replaceMember(fund.id, member.id)"
          >
            جایگزین
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  countLateThisCycle,
  countPaidThisCycle,
  cycleStatusLabel,
  formatToman,
  fundServiceFee,
  fundTypeBadgeClass,
  fundTypeLabel,
  replaceableMembers,
} from "~/data/mock";

definePageMeta({ auth: "organizer" });

const route = useRoute();
const { getFund, startCycle, closeCycle, replaceMember, funds } = useFunds();

const fundId = computed(() => route.params.id as string);
const fund = computed(() => getFund(fundId.value));

watchEffect(() => {
  if (import.meta.client && funds.value.length && !fund.value) {
    throw createError({ statusCode: 404, statusMessage: "صفحه پیدا نشد" });
  }
});

const paidCount = computed(() => (fund.value ? countPaidThisCycle(fund.value) : 0));
const lateCount = computed(() => (fund.value ? countLateThisCycle(fund.value) : 0));
const replaceable = computed(() => (fund.value ? replaceableMembers(fund.value) : []));
</script>
