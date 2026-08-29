<template>
  <div>
    <header class="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="page-title">{{ session?.name }}</h1>
        <p class="page-subtitle">صندوق‌دار</p>
      </div>
      <div class="flex items-center gap-3">
        <p class="text-sm tabular-nums text-baax-blue-500">{{ myFunds.length }} صندوق</p>
        <NuxtLink to="/organizer/create" class="btn-primary text-sm">ایجاد صندوق</NuxtLink>
      </div>
    </header>

    <section class="mb-5 grid gap-2.5 sm:grid-cols-3">
      <div class="stat-card">
        <p class="stat-label">پرداخت‌شده</p>
        <p class="stat-value-lg mt-1 text-emerald-600">{{ totalPaid }}</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">معوق</p>
        <p class="stat-value-lg mt-1 text-red-600">{{ totalLate }}</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">کارمزد</p>
        <p class="stat-value-lg mt-1">{{ formatToman(totalFees) }}</p>
      </div>
    </section>

    <section>
      <h2 class="section-title mb-3">صندوق‌ها</h2>
      <div v-if="myFunds.length" class="grid gap-3 md:grid-cols-2">
        <FundCard v-for="fund in myFunds" :key="fund.id" :fund="fund" variant="organizer" />
      </div>
      <div v-else class="card text-center">
        <p class="text-sm text-baax-blue-500">صندوقی ثبت نشده.</p>
        <NuxtLink to="/organizer/create" class="btn-primary mt-4 inline-flex text-sm">
          ایجاد صندوق
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  countLateThisCycle,
  countPaidThisCycle,
  formatToman,
  fundServiceFee,
} from "~/data/mock";

definePageMeta({ auth: "organizer" });

const { session } = useAuth();
const { organizerFunds } = useFunds();
const myFunds = computed(() => organizerFunds(session.value?.name ?? ""));
const totalPaid = computed(() => myFunds.value.reduce((s, f) => s + countPaidThisCycle(f), 0));
const totalLate = computed(() => myFunds.value.reduce((s, f) => s + countLateThisCycle(f), 0));
const totalFees = computed(() => myFunds.value.reduce((s, f) => s + fundServiceFee(f), 0));
</script>
