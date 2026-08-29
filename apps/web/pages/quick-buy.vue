<template>
  <div>
    <header class="mb-5">
      <NuxtLink to="/member" class="breadcrumb-link mb-2 inline-block text-sm">← خانه</NuxtLink>
      <h1 class="page-title">خرید زودهنگام</h1>
    </header>

    <section class="card mb-4">
      <div class="space-y-2.5 text-sm">
        <FlowRow label="مبلغ برد" :value="formatToman(MOCK_WIN_AMOUNT)" />
        <FlowRow label="بدهی شریک" :value="`− ${formatToman(MOCK_PARTNER_DEBT)}`" variant="debt" />
        <div class="border-t border-baax-blue-100 pt-2.5">
          <FlowRow label="نقد" :value="formatToman(cashAfterDebt)" highlight />
        </div>
      </div>
    </section>

    <section class="card mb-4">
      <h2 class="section-title mb-3">شریک</h2>
      <div class="grid gap-2 sm:grid-cols-3">
        <button
          v-for="p in shopPartners"
          :key="p.id"
          type="button"
          class="rounded-lg border p-3 text-right transition"
          :class="
            selectedPartner === p.id
              ? 'choice-btn-active border-baax-purple-500 ring-2 ring-baax-purple-500/20'
              : 'border-baax-blue-100 hover:border-baax-blue-200'
          "
          @click="selectedPartner = p.id"
        >
          <div class="mb-1.5 h-1.5 w-7 rounded-full" :style="{ backgroundColor: p.logoColor }" />
          <p class="text-sm font-semibold text-baax-blue-900">{{ p.name }}</p>
          <p class="mt-0.5 text-2xs tabular-nums text-baax-blue-500">{{ formatToman(p.maxCredit) }}</p>
        </button>
      </div>
    </section>

    <section class="card mb-4">
      <h2 class="section-title mb-3">مبلغ</h2>
      <input
        v-model.number="purchaseAmount"
        type="range"
        :min="1_000_000"
        :max="Math.min(partner.maxCredit, cashAfterDebt)"
        :step="500_000"
        class="w-full accent-baax-purple-600"
      />
      <p class="stat-value-lg mt-2 text-center">
        {{ formatToman(purchaseAmount) }}
      </p>
    </section>

    <section class="card">
      <FlowRow label="باقی‌مانده نقد" :value="formatToman(Math.max(remainingCash, 0))" highlight />
      <button type="button" class="btn-primary mt-5 w-full" disabled>تأیید</button>
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
