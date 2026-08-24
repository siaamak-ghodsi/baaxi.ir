<template>
  <div>
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
            :class="
              fund.type === 'rosca'
                ? 'bg-baax-blue-100 text-baax-blue-700'
                : 'bg-emerald-50 text-emerald-700'
            "
          >
            {{ fundTypeLabel(fund.type) }}
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

    <section v-else class="card">
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

    <section class="card mt-6">
      <h2 class="section-title mb-4">اعضا</h2>
      <MemberList :members="fund.members" />
    </section>

    <div class="mt-6 flex flex-wrap gap-3">
      <NuxtLink :to="`/ledger?fund=${fund.id}`" class="btn-primary">دفترکل</NuxtLink>
      <NuxtLink v-if="fund.type === 'rosca'" to="/quick-buy" class="btn-secondary">خرید زودهنگام</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatToman, fundTypeLabel, getFund } from "~/data/mock";

definePageMeta({ auth: "member" });

const route = useRoute();
const fund = getFund(route.params.id as string);
if (!fund) throw createError({ statusCode: 404, statusMessage: "صفحه پیدا نشد" });
</script>
