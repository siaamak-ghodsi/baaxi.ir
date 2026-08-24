<template>
  <div v-if="!unlocked" class="mx-auto flex min-h-[50vh] max-w-sm items-center py-12">
    <form class="card w-full space-y-4" @submit.prevent="tryUnlock">
      <h1 class="text-xl font-bold text-baax-blue-900">ادمین</h1>
      <input
        v-model="code"
        type="password"
        placeholder="کد"
        class="w-full rounded-xl border border-baax-blue-200 px-4 py-2.5 focus:border-baax-purple-500 focus:outline-none"
      />
      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
      <button type="submit" class="btn-primary w-full">ورود</button>
    </form>
  </div>

  <div v-else>
    <header class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-baax-blue-900">ادمین</h1>
      <button type="button" class="text-sm text-baax-blue-500" @click="unlocked = false">قفل</button>
    </header>

    <section class="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="card">
        <p class="stat-label">صندوق‌ها</p>
        <p class="mt-1 text-2xl font-bold text-baax-blue-900">{{ platformStats.totalFunds }}</p>
      </div>
      <div class="card">
        <p class="stat-label">اعضا</p>
        <p class="mt-1 text-2xl font-bold text-baax-blue-900">{{ platformStats.totalMembers }}</p>
      </div>
      <div class="card">
        <p class="stat-label">صندوق‌داران</p>
        <p class="mt-1 text-2xl font-bold text-baax-blue-900">{{ platformStats.totalOrganizers }}</p>
      </div>
      <div class="card">
        <p class="stat-label">کارمزد ماه</p>
        <p class="mt-1 text-lg font-bold text-baax-purple-600">
          {{ formatToman(platformStats.serviceFeesMonth) }}
        </p>
      </div>
    </section>

    <section class="card mb-6">
      <h2 class="section-title mb-4">صندوق‌ها</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-baax-blue-100 text-right">
              <th class="pb-3 font-medium text-baax-blue-600">نام</th>
              <th class="pb-3 font-medium text-baax-blue-600">نوع</th>
              <th class="pb-3 font-medium text-baax-blue-600">صندوق‌دار</th>
              <th class="pb-3 pl-2 text-left font-medium text-baax-blue-600">کارمزد</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-baax-blue-50">
            <tr v-for="fund in funds" :key="fund.id">
              <td class="py-3 font-medium text-baax-blue-900">{{ fund.name.split('—')[0].trim() }}</td>
              <td class="py-3 text-baax-blue-700">{{ fundTypeLabel(fund.type) }}</td>
              <td class="py-3 text-baax-blue-700">{{ fund.organizerName }}</td>
              <td class="py-3 pl-2 text-left">{{ formatToman(fundServiceFee(fund)) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="mb-6 grid gap-4 md:grid-cols-2">
      <div class="card">
        <h2 class="section-title mb-4">صندوق‌داران</h2>
        <ul class="divide-y divide-baax-blue-50">
          <li v-for="org in organizers" :key="org.id" class="flex justify-between py-3">
            <span class="font-medium text-baax-blue-900">{{ org.name }}</span>
            <span class="text-sm text-baax-blue-500">{{ org.fundCount }} صندوق</span>
          </li>
        </ul>
      </div>
      <div class="card">
        <h2 class="section-title mb-4">پرچم‌ها</h2>
        <ul class="divide-y divide-baax-blue-50">
          <li v-for="flag in platformFlags" :key="flag.id" class="flex justify-between py-3">
            <div>
              <p class="font-medium text-baax-blue-900">{{ flag.member }}</p>
              <p class="text-xs text-baax-blue-500">{{ flag.fundName }}</p>
            </div>
            <span
              class="rounded-full px-2.5 py-0.5 text-xs"
              :class="flag.type === 'late' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'"
            >
              {{ flag.type === 'late' ? 'تأخیر' : 'اختلاف' }}
            </span>
          </li>
        </ul>
      </div>
    </section>

    <section class="card border-dashed">
      <h2 class="section-title mb-1">احراز هویت</h2>
      <p class="text-sm text-baax-blue-500">به‌زودی</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  formatToman,
  fundServiceFee,
  fundTypeLabel,
  funds,
  organizers,
  platformFlags,
  platformStats,
} from "~/data/mock";

definePageMeta({ layout: "default" });

const ADMIN_CODE = "baax-admin";
const unlocked = ref(false);
const code = ref("");
const error = ref("");

function tryUnlock() {
  if (code.value === ADMIN_CODE) {
    unlocked.value = true;
    error.value = "";
  } else {
    error.value = "کد نادرست";
  }
}
</script>
