<template>
  <NuxtLink
    :to="linkFor(fund)"
    class="card block transition hover:border-baax-blue-200 hover:shadow-md"
  >
    <div class="mb-3 flex items-start justify-between gap-3">
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
        <h3 class="mt-2 font-bold text-baax-blue-900">{{ fund.name }}</h3>
      </div>
      <div class="text-left">
        <p class="stat-label">دوره</p>
        <p class="text-sm font-semibold text-baax-purple-600">
          {{ fund.currentCycle }}/{{ fund.totalCycles }}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-3 border-t border-baax-blue-50 pt-3 sm:grid-cols-3">
      <div>
        <p class="stat-label">مبلغ ماهانه</p>
        <p class="stat-value text-sm">{{ formatToman(fund.monthlyAmount) }}</p>
      </div>
      <div v-if="fund.type === 'rosca' && fund.potValue">
        <p class="stat-label">ارزش پات</p>
        <p class="stat-value text-sm">{{ formatToman(fund.potValue) }}</p>
      </div>
      <template v-if="fund.type === 'savings_loan'">
        <div>
          <p class="stat-label">سقف وام</p>
          <p class="stat-value text-sm">{{ formatToman(fund.loanCap ?? 0) }}</p>
        </div>
        <div>
          <p class="stat-label">قسط</p>
          <p class="stat-value text-sm">{{ formatToman(fund.installmentAmount ?? 0) }}</p>
        </div>
      </template>
      <div>
        <p class="stat-label">اعضا</p>
        <p class="stat-value text-sm">{{ fund.filledSeats }}/{{ fund.memberCount }}</p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Fund } from "~/data/mock";
import { formatToman, fundTypeLabel } from "~/data/mock";

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
