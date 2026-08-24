<template>
  <DemoGate>
    <nav class="mb-4 text-sm text-baax-blue-500">
      <NuxtLink to="/" class="hover:text-baax-blue-700">خانه</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-baax-blue-800">دفترکل</span>
    </nav>

    <header class="mb-6">
      <h1 class="text-2xl font-bold text-baax-blue-900">دفترکل صندوق</h1>
      <p class="mt-2 text-sm text-baax-blue-600">
        هر صندوق دفترکل جدا دارد. درآمد پلتفرم فقط از کارمزد ثبت می‌شود.
      </p>
    </header>

    <div class="mb-6 flex flex-wrap gap-2">
      <NuxtLink
        v-for="item in funds"
        :key="item.id"
        :to="`/ledger?fund=${item.id}`"
        class="rounded-full px-4 py-2 text-sm transition"
        :class="
          selectedFund?.id === item.id
            ? 'bg-baax-purple-600 text-white'
            : 'border border-baax-blue-200 bg-white text-baax-blue-700 hover:bg-baax-blue-50'
        "
      >
        {{ fundTypeLabel(item.type) }} — {{ item.name.split('—')[0].trim() }}
      </NuxtLink>
    </div>

    <template v-if="selectedFund">
      <div class="card mb-6">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 class="font-bold text-baax-blue-900">{{ selectedFund.name }}</h2>
            <p class="text-sm text-baax-blue-500">
              {{ fundTypeLabel(selectedFund.type) }} · دوره {{ selectedFund.currentCycle }}
            </p>
          </div>
          <div class="text-left">
            <p class="stat-label">ماندهٔ فعلی</p>
            <p class="text-xl font-bold text-baax-blue-900">
              {{
                formatToman(
                  selectedFund.ledger[selectedFund.ledger.length - 1]?.balance ?? 0
                )
              }}
            </p>
          </div>
        </div>
      </div>

      <section class="card">
        <h3 class="section-title mb-4">تراکنش‌ها</h3>
        <LedgerTable :entries="selectedFund.ledger" />
      </section>

      <div class="mt-6">
        <NuxtLink
          :to="`/fund/${selectedFund.id}`"
          class="text-sm text-baax-purple-600 hover:underline"
        >
          ← بازگشت به جزئیات صندوق
        </NuxtLink>
      </div>
    </template>
  </DemoGate>
</template>

<script setup lang="ts">
import { funds, formatToman, fundTypeLabel, getFund } from "~/data/mock";

const route = useRoute();
const fundId = computed(() => route.query.fund as string | undefined);
const selectedFund = computed(() =>
  fundId.value ? getFund(fundId.value) ?? funds[0] : funds[0]
);
</script>
