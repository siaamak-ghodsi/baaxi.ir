<template>
  <DemoGate>
    <section class="mb-10 text-center sm:text-right">
      <p class="mb-2 text-sm font-medium text-baax-purple-600">
        ابزار مدیریت صندوق — نه بانک
      </p>
      <h1 class="text-3xl font-bold text-baax-blue-900 sm:text-4xl">
        صندوق‌های گروهی، شفاف و ساده
      </h1>
      <p class="mx-auto mt-4 max-w-2xl text-baax-blue-600 sm:mx-0">
        باکس به اعضای صندوق کمک می‌کند قرعه‌کشی و پس‌انداز/وام را با دفترکل
        جداگانه، وثیقهٔ الکترونیک و قوانین تأخیر شفاف مدیریت کنند.
      </p>
      <div class="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
        <NuxtLink to="/fund/rosca-12" class="btn-primary">
          مشاهدهٔ صندوق نمونه
        </NuxtLink>
        <NuxtLink to="/ledger" class="btn-secondary"> دفترکل </NuxtLink>
      </div>
    </section>

    <section class="mb-10 grid gap-4 sm:grid-cols-3">
      <div class="card">
        <h3 class="font-semibold text-baax-blue-900">قرعه‌کشی (ROSCA)</h3>
        <p class="mt-2 text-sm text-baax-blue-600">
          یک برنده در هر دورهٔ ماهانه. برندگان قابل جایگزینی نیستند.
        </p>
      </div>
      <div class="card">
        <h3 class="font-semibold text-baax-blue-900">پس‌انداز/وام</h3>
        <p class="mt-2 text-sm text-baax-blue-600">
          سقف وام، حق عضویت و قسط — هر کدام فیلد جدا در UI.
        </p>
      </div>
      <div class="card">
        <h3 class="font-semibold text-baax-blue-900">دفترکل per-fund</h3>
        <p class="mt-2 text-sm text-baax-blue-600">
          هر صندوق دفترکل مستقل. درآمد پلتفرم فقط کارمزد.
        </p>
      </div>
    </section>

    <section>
      <div class="mb-4 flex items-center justify-between">
        <h2 class="section-title">صندوق‌های فعال</h2>
        <span class="text-sm text-baax-blue-500">{{ funds.length }} صندوق</span>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <FundCard v-for="fund in funds" :key="fund.id" :fund="fund" />
      </div>
    </section>

    <section
      class="card mt-10 border-dashed border-baax-purple-200 bg-gradient-to-l from-baax-purple-500/5 to-transparent"
    >
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 class="font-bold text-baax-blue-900">خرید زودهنگام</h3>
          <p class="mt-1 text-sm text-baax-blue-600">
            پس از برد، ابتدا بدهی به Snapp Pay / دیجی‌کالا / Tara، سپس نقد
          </p>
        </div>
        <NuxtLink to="/quick-buy" class="btn-primary shrink-0"> مشاهدهٔ mock </NuxtLink>
      </div>
    </section>
  </DemoGate>
</template>

<script setup lang="ts">
import { funds } from "~/data/mock";
</script>
