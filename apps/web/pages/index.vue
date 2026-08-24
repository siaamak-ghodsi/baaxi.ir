<template>
  <DemoGate>
    <header class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-baax-blue-900">{{ memberProfile.name }}</h1>
        <p class="text-sm text-baax-blue-500">صندوق‌های من</p>
      </div>
      <NuxtLink to="/quick-buy" class="text-sm text-baax-blue-600 hover:text-baax-purple-600">
        خرید زودهنگام
      </NuxtLink>
    </header>

    <section class="mb-6 grid gap-4 sm:grid-cols-3">
      <div class="card">
        <p class="stat-label">پرداخت بعدی</p>
        <p class="mt-1 text-lg font-bold text-baax-blue-900">
          {{ formatToman(memberProfile.nextPaymentAmount) }}
        </p>
        <p class="mt-1 text-xs text-baax-blue-500">{{ memberProfile.nextPaymentDate }}</p>
      </div>
      <div class="card">
        <p class="stat-label">وضعیت</p>
        <p class="mt-2">
          <span
            class="rounded-full border px-2.5 py-0.5 text-xs font-medium"
            :class="paymentStatusClasses(memberProfile.status)"
          >
            {{ paymentStatusLabel(memberProfile.status) }}
          </span>
        </p>
      </div>
      <div class="card">
        <p class="stat-label">صندوق‌های فعال</p>
        <p class="mt-1 text-lg font-bold text-baax-purple-600">{{ myFunds.length }}</p>
      </div>
    </section>

    <section>
      <h2 class="section-title mb-4">صندوق‌ها</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <FundCard v-for="fund in myFunds" :key="fund.id" :fund="fund" />
      </div>
    </section>
  </DemoGate>
</template>

<script setup lang="ts">
import { formatToman, getMemberFunds, memberProfile } from "~/data/mock";
import { paymentStatusClasses, paymentStatusLabel } from "~/utils";

const myFunds = getMemberFunds();
</script>
