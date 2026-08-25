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

    <section v-if="myFunds.length" class="mb-6 grid gap-4 sm:grid-cols-3">
      <div class="card">
        <p class="stat-label">قسط بعدی</p>
        <p v-if="nextPayment" class="mt-1 text-lg font-bold text-baax-blue-900">
          {{ formatToman(nextPayment.amount) }}
        </p>
        <p v-else class="mt-1 text-lg font-bold text-baax-blue-400">—</p>
        <p v-if="nextPayment" class="mt-1 text-xs text-baax-blue-500">{{ nextPayment.date }}</p>
      </div>
      <div class="card">
        <p class="stat-label">وضعیت</p>
        <p v-if="nextPayment" class="mt-2">
          <span
            class="rounded-full border px-2.5 py-0.5 text-xs font-medium"
            :class="paymentStatusClasses(nextPayment.status)"
          >
            {{ paymentStatusLabel(nextPayment.status) }}
          </span>
        </p>
        <p v-else class="mt-2 text-sm text-baax-blue-400">—</p>
      </div>
      <div class="card">
        <p class="stat-label">صندوق‌های من</p>
        <p class="mt-1 text-lg font-bold text-baax-purple-600">{{ myFunds.length }}</p>
      </div>
    </section>

    <section v-else class="mb-6 card text-center">
      <p class="text-sm text-baax-blue-500">عضو هیچ صندوقی نیستید.</p>
      <NuxtLink to="/member/browse" class="btn-primary mt-4 inline-block text-sm">پیوستن به صندوق</NuxtLink>
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
        هنوز عضو صندوقی نشده‌اید.
        <NuxtLink to="/member/browse" class="text-baax-purple-600 hover:underline">پیوستن</NuxtLink>
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
