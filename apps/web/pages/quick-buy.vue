<template>
  <DemoGate>
    <nav class="mb-4 text-sm text-baax-blue-500">
      <NuxtLink to="/" class="hover:text-baax-blue-700">خانه</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-baax-blue-800">خرید زودهنگام</span>
    </nav>

    <header class="mb-6">
      <span
        class="rounded-full bg-baax-purple-100 px-2.5 py-0.5 text-xs font-medium text-baax-purple-600"
      >
        Mock — بدون پرداخت واقعی
      </span>
      <h1 class="mt-2 text-2xl font-bold text-baax-blue-900">
        خرید زودهنگام پس از برد
      </h1>
      <p class="mt-2 text-sm text-baax-blue-600">
        ابتدا بدهی به شریک فروشگاه تسویه می‌شود، سپس مبلغ نقد به عضو می‌رسد.
      </p>
    </header>

    <section class="card mb-6">
      <h2 class="section-title mb-4">سناریوی برد</h2>
      <div class="space-y-3 text-sm">
        <FlowRow label="مبلغ برد قرعه‌کشی" :value="formatToman(MOCK_WIN_AMOUNT)" />
        <FlowRow
          label="بدهی به شریک (اولویت اول)"
          :value="`− ${formatToman(MOCK_PARTNER_DEBT)}`"
          variant="debt"
        />
        <div class="border-t border-baax-blue-100 pt-3">
          <FlowRow
            label="نقد قابل استفاده"
            :value="formatToman(cashAfterDebt)"
            highlight
          />
        </div>
      </div>
    </section>

    <section class="card mb-6">
      <h2 class="section-title mb-4">انتخاب شریک</h2>
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
          <p class="mt-1 text-xs text-baax-blue-500">
            سقف اعتبار: {{ formatToman(p.maxCredit) }}
          </p>
        </button>
      </div>
    </section>

    <section class="card mb-6">
      <h2 class="section-title mb-4">مبلغ خرید از {{ partner.name }}</h2>
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

    <section class="card border-dashed">
      <h2 class="section-title mb-4">نتیجه</h2>
      <div class="space-y-2 text-sm">
        <FlowRow label="خرید از شریک" :value="formatToman(purchaseAmount)" />
        <FlowRow
          label="نقد باقی‌مانده برای عضو"
          :value="formatToman(Math.max(remainingCash, 0))"
          highlight
        />
      </div>
      <button type="button" class="btn-primary mt-6 w-full" disabled>
        تأیید خرید (mock — غیرفعال)
      </button>
    </section>
  </DemoGate>
</template>

<script setup lang="ts">
import { formatToman, shopPartners } from "~/data/mock";

const MOCK_WIN_AMOUNT = 53_900_000;
const MOCK_PARTNER_DEBT = 12_000_000;

const selectedPartner = ref(shopPartners[0].id);
const purchaseAmount = ref(8_000_000);

const partner = computed(
  () => shopPartners.find((p) => p.id === selectedPartner.value)!
);
const cashAfterDebt = computed(() =>
  Math.max(MOCK_WIN_AMOUNT - MOCK_PARTNER_DEBT, 0)
);
const remainingCash = computed(() => cashAfterDebt.value - purchaseAmount.value);
</script>
