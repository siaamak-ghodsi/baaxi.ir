<template>
  <DemoGate>
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-baax-blue-900">دفترکل</h1>
    </header>

    <div class="mb-6 flex flex-wrap gap-2">
      <NuxtLink
        v-for="item in myFunds"
        :key="item.id"
        :to="`/ledger?fund=${item.id}`"
        class="rounded-full px-4 py-2 text-sm transition"
        :class="
          selectedFund?.id === item.id
            ? 'bg-baax-purple-600 text-white'
            : 'border border-baax-blue-200 bg-white text-baax-blue-700 hover:bg-baax-blue-50'
        "
      >
        {{ item.name.split('—')[0].trim() }}
      </NuxtLink>
    </div>

    <template v-if="selectedFund">
      <div class="card mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="font-bold text-baax-blue-900">{{ selectedFund.name }}</h2>
          <p class="text-sm text-baax-blue-500">
            {{ fundTypeLabel(selectedFund.type) }} · دوره {{ selectedFund.currentCycle }}
          </p>
        </div>
        <div class="text-left">
          <p class="stat-label">مانده</p>
          <p class="text-xl font-bold text-baax-blue-900">
            {{ formatToman(selectedFund.ledger.at(-1)?.balance ?? 0) }}
          </p>
        </div>
      </div>

      <section class="card">
        <LedgerTable :entries="selectedFund.ledger" />
      </section>
    </template>
  </DemoGate>
</template>

<script setup lang="ts">
import { formatToman, fundTypeLabel, getFund, getMemberFunds } from "~/data/mock";

const route = useRoute();
const myFunds = getMemberFunds();
const fundId = computed(() => route.query.fund as string | undefined);
const selectedFund = computed(() =>
  fundId.value ? getFund(fundId.value) ?? myFunds[0] : myFunds[0]
);
</script>
