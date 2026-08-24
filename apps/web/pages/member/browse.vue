<template>
  <div>
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-baax-blue-900">صندوق‌ها</h1>
    </header>

    <section v-if="myFunds.length" class="mb-8">
      <h2 class="section-title mb-4">عضویت من</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <FundCard v-for="fund in myFunds" :key="fund.id" :fund="fund" />
      </div>
    </section>

    <section>
      <h2 class="section-title mb-4">پیوستن</h2>
      <div v-if="browseFunds.length" class="grid gap-4 md:grid-cols-2">
        <div v-for="fund in browseFunds" :key="fund.id">
          <FundCard :fund="fund" />
          <button type="button" class="btn-secondary mt-2 w-full text-sm" disabled>
            درخواست عضویت
          </button>
        </div>
      </div>
      <p v-else class="text-sm text-baax-blue-500">صندوق باز جدیدی نیست.</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { getBrowsableFunds, getMemberFundsForUser } from "~/data/mock";

definePageMeta({ auth: "member" });

const { currentUser } = useAuth();
const user = computed(() => currentUser());
const myFunds = computed(() =>
  getMemberFundsForUser(user.value?.joinedFundIds ?? [])
);
const browseFunds = computed(() =>
  getBrowsableFunds(user.value?.joinedFundIds ?? [])
);
</script>
