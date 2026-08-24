<template>
  <DemoGate>
    <header class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-baax-blue-900">صندوق‌دار</h1>
        <p class="text-sm text-baax-blue-500">سیاامک غ.</p>
      </div>
      <p class="text-sm text-baax-blue-600">{{ myFunds.length }} صندوق</p>
    </header>

    <section class="mb-6 grid gap-4 sm:grid-cols-3">
      <div class="card">
        <p class="stat-label">پرداخت‌شده این دوره</p>
        <p class="mt-1 text-lg font-bold text-emerald-600">{{ totalPaid }}</p>
      </div>
      <div class="card">
        <p class="stat-label">معوق</p>
        <p class="mt-1 text-lg font-bold text-red-600">{{ totalLate }}</p>
      </div>
      <div class="card">
        <p class="stat-label">کارمزد دوره</p>
        <p class="mt-1 text-lg font-bold text-baax-blue-900">{{ formatToman(totalFees) }}</p>
      </div>
    </section>

    <section>
      <h2 class="section-title mb-4">صندوق‌های من</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <FundCard v-for="fund in myFunds" :key="fund.id" :fund="fund" variant="organizer" />
      </div>
    </section>
  </DemoGate>
</template>

<script setup lang="ts">
import {
  countLateThisCycle,
  countPaidThisCycle,
  formatToman,
  fundServiceFee,
  getOrganizerFunds,
} from "~/data/mock";

const myFunds = getOrganizerFunds();
const totalPaid = computed(() =>
  myFunds.reduce((sum, f) => sum + countPaidThisCycle(f), 0)
);
const totalLate = computed(() =>
  myFunds.reduce((sum, f) => sum + countLateThisCycle(f), 0)
);
const totalFees = computed(() =>
  myFunds.reduce((sum, f) => sum + fundServiceFee(f), 0)
);
</script>
