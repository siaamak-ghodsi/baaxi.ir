<template>
  <div>
    <header class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-baax-blue-900">{{ session?.name }}</h1>
        <p class="text-sm text-baax-blue-500">صندوق‌دار</p>
      </div>
      <div class="flex items-center gap-3">
        <p class="text-sm text-baax-blue-600">{{ myFunds.length }} صندوق</p>
        <NuxtLink to="/organizer/create" class="btn-primary text-sm">ایجاد صندوق</NuxtLink>
      </div>
    </header>

    <section class="mb-6 grid gap-4 sm:grid-cols-3">
      <div class="card">
        <p class="stat-label">پرداخت‌شده</p>
        <p class="mt-1 text-lg font-bold text-emerald-600">{{ totalPaid }}</p>
      </div>
      <div class="card">
        <p class="stat-label">معوق</p>
        <p class="mt-1 text-lg font-bold text-red-600">{{ totalLate }}</p>
      </div>
      <div class="card">
        <p class="stat-label">کارمزد</p>
        <p class="mt-1 text-lg font-bold text-baax-blue-900">{{ formatToman(totalFees) }}</p>
      </div>
    </section>

    <section>
      <h2 class="section-title mb-4">صندوق‌ها</h2>
      <div v-if="myFunds.length" class="grid gap-4 md:grid-cols-2">
        <FundCard v-for="fund in myFunds" :key="fund.id" :fund="fund" variant="organizer" />
      </div>
      <div v-else class="card text-center">
        <p class="text-sm text-baax-blue-500">صندوقی ثبت نشده.</p>
        <NuxtLink to="/organizer/create" class="btn-primary mt-4 inline-block text-sm">
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
