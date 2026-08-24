<template>
  <div>
    <header class="mb-6">
      <NuxtLink to="/member" class="mb-2 inline-block text-sm text-baax-blue-500 hover:text-baax-blue-700">
        ← خانه
      </NuxtLink>
      <h1 class="text-2xl font-bold text-baax-blue-900">خرید زودهنگام</h1>
    </header>

    <section class="card mb-6">
      <div class="space-y-3 text-sm">
        <FlowRow label="مبلغ برد" :value="formatToman(MOCK_WIN_AMOUNT)" />
        <FlowRow label="بدهی شریک" :value="`− ${formatToman(MOCK_PARTNER_DEBT)}`" variant="debt" />
        <div class="border-t border-baax-blue-100 pt-3">
          <FlowRow label="نقد" :value="formatToman(cashAfterDebt)" highlight />
        </div>
      </div>
    </section>

    <section class="card mb-6">
      <h2 class="section-title mb-4">شریک</h2>
      <div class="grid gap-3 sm:grid-cols-3">
        <button
          v-for="p in shopPartners"
          :key="p.id"
          type="button"
          class="rounded-xl border p-4 text-right transition"
          :class="
            selectedPartner === p.id
              ? 'border-baax-purple-500 bg-baax-purple-500/5 ring-2 ring-baax-purple-500'
              : 'border-baax-blue-100 hover:border-baax-blue-200'
          "
          @click="selectedPartner = p.id"
        >
          <div class="mb-2 h-2 w-8 rounded-full" :style="{ backgroundColor: p.logoColor }" />
          <p class="font-semibold text-baax-blue-900">{{ p.name }}</p>
          <p class="mt-1 text-xs text-baax-blue-500">{{ formatToman(p.maxCredit) }}</p>
        </button>
      </div>
    </section>

    <section class="card mb-6">
      <h2 class="section-title mb-4">مبلغ</h2>
      <input
        v-model.number="purchaseAmount"
        type="range"
        :min="1_000_000"
        :max="Math.min(partner.maxCredit, cashAfterDebt)"
        :step="500_000"
        class="w-full accent-baax-purple-600"
      />
      <p class="mt-2 text-center text-lg font-bold text-baax-blue-900">
        {{ formatToman(purchaseAmount) }}
      </p>
    </section>

    <section class="card">
      <FlowRow label="باقی‌مانده نقد" :value="formatToman(Math.max(remainingCash, 0))" highlight />
      <button type="button" class="btn-primary mt-6 w-full" disabled>تأیید</button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { formatToman, shopPartners } from "~/data/mock";

definePageMeta({ auth: "member" });

const MOCK_WIN_AMOUNT = 53_900_000;
const MOCK_PARTNER_DEBT = 12_000_000;

const selectedPartner = ref(shopPartners[0].id);
const purchaseAmount = ref(8_000_000);

const partner = computed(() => shopPartners.find((p) => p.id === selectedPartner.value)!);
const cashAfterDebt = computed(() => Math.max(MOCK_WIN_AMOUNT - MOCK_PARTNER_DEBT, 0));
const remainingCash = computed(() => cashAfterDebt.value - purchaseAmount.value);
</script>
