<template>
  <NuxtLink
    :to="linkFor(fund)"
    class="card block transition hover:border-baax-blue-200 hover:shadow-card-hover"
  >
    <div class="mb-2.5 flex items-start justify-between gap-3">
      <div class="min-w-0">
        <span
          class="badge"
          :class="fundTypeBadgeClass(fund.type)"
        >
          {{ fundTypeLabel(fund.type) }}
          <span v-if="fund.isFamily"> · خانوادگی</span>
        </span>
        <h3 class="mt-1.5 truncate font-display text-sm font-bold text-baax-blue-900">{{ fund.name }}</h3>
      </div>
      <div class="shrink-0 text-left">
        <p class="stat-label">دوره</p>
        <p class="text-sm font-semibold tabular-nums text-baax-purple-600">
          {{ fund.currentCycle }}/{{ fund.totalCycles }}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2.5 border-t border-baax-blue-50 pt-2.5 sm:grid-cols-3">
      <div>
        <p class="stat-label">مبلغ ماهانه</p>
        <p class="stat-value mt-0.5">{{ formatToman(fund.monthlyAmount) }}</p>
      </div>
      <div v-if="fund.type === 'rosca' && fund.potValue">
        <p class="stat-label">ارزش پات</p>
        <p class="stat-value mt-0.5">{{ formatToman(fund.potValue) }}</p>
      </div>
      <template v-if="fund.type === 'savings_loan'">
        <div>
          <p class="stat-label">سقف وام</p>
          <p class="stat-value mt-0.5">{{ formatToman(fund.loanCap ?? 0) }}</p>
        </div>
        <div>
          <p class="stat-label">قسط</p>
          <p class="stat-value mt-0.5">{{ formatToman(fund.installmentAmount ?? 0) }}</p>
        </div>
      </template>
      <template v-if="fund.type === 'diyah'">
        <div>
          <p class="stat-label">موجودی</p>
          <p class="stat-value mt-0.5">{{ formatToman(fund.poolBalance ?? 0) }}</p>
        </div>
      </template>
      <div>
        <p class="stat-label">اعضا</p>
        <p class="stat-value mt-0.5">{{ fund.filledSeats }}/{{ fund.memberCount }}</p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Fund } from "~/data/mock";
import { formatToman, fundTypeBadgeClass, fundTypeLabel } from "~/data/mock";

const props = withDefaults(
  defineProps<{ fund: Fund; variant?: "member" | "organizer" }>(),
  { variant: "member" }
);

function linkFor(fund: Fund) {
  return props.variant === "organizer"
    ? `/organizer/fund/${fund.id}`
    : `/fund/${fund.id}`;
}
</script>
