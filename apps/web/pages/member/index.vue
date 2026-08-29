<template>
  <div>
    <header class="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="page-title">{{ session?.name }}</h1>
        <p class="page-subtitle">صندوق‌های من</p>
      </div>
      <NuxtLink to="/quick-buy" class="btn-ghost text-baax-blue-500">
        خرید زودهنگام
      </NuxtLink>
    </header>

    <section v-if="myFunds.length" class="mb-5 grid gap-2.5 sm:grid-cols-3">
      <div class="stat-card">
        <p class="stat-label">قسط بعدی</p>
        <p v-if="nextPayment" class="stat-value-lg mt-1">
          {{ formatToman(nextPayment.amount) }}
        </p>
        <p v-else class="stat-value-lg mt-1 text-baax-blue-300">—</p>
        <p v-if="nextPayment" class="mt-0.5 text-2xs text-baax-blue-400">{{ nextPayment.date }}</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">وضعیت</p>
        <p v-if="nextPayment" class="mt-1.5">
          <span
            class="badge"
            :class="paymentStatusClasses(nextPayment.status)"
          >
            {{ paymentStatusLabel(nextPayment.status) }}
          </span>
        </p>
        <p v-else class="mt-1.5 text-sm text-baax-blue-300">—</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">صندوق‌های من</p>
        <p class="stat-value-lg mt-1 text-baax-purple-600">{{ myFunds.length }}</p>
      </div>
    </section>

    <section v-else class="mb-5 card text-center">
      <p class="text-sm text-baax-blue-500">عضو هیچ صندوقی نیستید.</p>
      <NuxtLink to="/member/browse" class="btn-primary mt-4 inline-flex text-sm">پیوستن به صندوق</NuxtLink>
    </section>

    <section>
      <div class="mb-3 flex items-center justify-between">
        <h2 class="section-title">صندوق‌های من</h2>
        <NuxtLink to="/member/browse" class="text-sm font-medium text-baax-purple-600 hover:underline">
          مشاهده همه
        </NuxtLink>
      </div>
      <div v-if="myFunds.length" class="grid gap-3 md:grid-cols-2">
        <FundCard v-for="fund in myFunds" :key="fund.id" :fund="fund" />
      </div>
      <p v-else class="text-sm text-baax-blue-500">
        هنوز عضو صندوقی نشده‌اید.
        <NuxtLink to="/member/browse" class="font-medium text-baax-purple-600 hover:underline">پیوستن</NuxtLink>
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { formatToman } from "~/data/mock";
import { paymentStatusClasses, paymentStatusLabel } from "~/utils";

definePageMeta({ auth: "member" });

const { session, currentUser } = useAuth();
const { memberFunds, nextPaymentForUser } = useFunds();

const user = computed(() => currentUser());
const myFunds = computed(() => memberFunds(user.value?.joinedFundIds ?? []));
const nextPayment = computed(() =>
  session.value
    ? nextPaymentForUser(session.value.name, user.value?.joinedFundIds ?? [])
    : null
);
</script>
