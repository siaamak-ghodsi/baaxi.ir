<template>
  <div>
    <header class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-baax-blue-900">{{ session?.name }}</h1>
        <p class="text-sm text-baax-blue-500">صندوق‌های من</p>
      </div>
      <NuxtLink to="/quick-buy" class="text-sm text-baax-blue-500 hover:text-baax-purple-600">
        خرید زودهنگام
      </NuxtLink>
    </header>

    <section class="mb-6 grid gap-4 sm:grid-cols-3">
      <div class="card">
        <p class="stat-label">قسط بعدی</p>
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
        <p class="stat-label">صندوق‌های من</p>
        <p class="mt-1 text-lg font-bold text-baax-purple-600">{{ myFunds.length }}</p>
      </div>
    </section>

    <section class="mb-8">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="section-title">صندوق‌های من</h2>
        <NuxtLink to="/member/browse" class="text-sm text-baax-purple-600 hover:underline">
          مشاهده همه
        </NuxtLink>
      </div>
      <div v-if="myFunds.length" class="grid gap-4 md:grid-cols-2">
        <FundCard v-for="fund in myFunds" :key="fund.id" :fund="fund" />
      </div>
      <p v-else class="text-sm text-baax-blue-500">
        عضو هیچ صندوقی نیستید.
        <NuxtLink to="/member/browse" class="text-baax-purple-600 hover:underline">پیوستن</NuxtLink>
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  formatToman,
  getMemberFundsForUser,
  memberProfile,
} from "~/data/mock";
import { paymentStatusClasses, paymentStatusLabel } from "~/utils";

definePageMeta({ auth: "member" });

const { session, currentUser } = useAuth();
const user = computed(() => currentUser());
const myFunds = computed(() =>
  getMemberFundsForUser(user.value?.joinedFundIds ?? [])
);
</script>
