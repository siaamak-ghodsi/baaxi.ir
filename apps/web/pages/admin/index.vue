<template>
  <div v-if="!unlocked" class="mx-auto flex min-h-[50vh] max-w-sm items-center py-10">
    <form class="card w-full space-y-4" @submit.prevent="tryUnlock">
      <h1 class="page-title">ادمین</h1>
      <input
        v-model="code"
        type="password"
        placeholder="کد"
        class="input"
      />
      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
      <button type="submit" class="btn-primary w-full">ورود</button>
    </form>
  </div>

  <div v-else>
    <header class="mb-5 flex items-center justify-between">
      <h1 class="page-title">ادمین</h1>
      <button type="button" class="btn-ghost" @click="unlocked = false">قفل</button>
    </header>

    <section class="mb-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
      <div class="stat-card">
        <p class="stat-label">صندوق‌ها</p>
        <p class="stat-value-lg mt-1">{{ platformStats.totalFunds }}</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">اعضا</p>
        <p class="stat-value-lg mt-1">{{ platformStats.totalMembers }}</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">صندوق‌داران</p>
        <p class="stat-value-lg mt-1">{{ platformStats.totalOrganizers }}</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">کارمزد ماه</p>
        <p class="stat-value-lg mt-1 text-baax-purple-600">
          {{ formatToman(platformStats.serviceFeesMonth) }}
        </p>
      </div>
    </section>

    <section class="card mb-5 !p-0 overflow-hidden">
      <h2 class="section-title px-4 pt-4">صندوق‌ها</h2>
      <div class="overflow-x-auto px-4 pb-3 pt-2">
        <table class="w-full">
          <thead>
            <tr class="table-head">
              <th class="table-th">نام</th>
              <th class="table-th">نوع</th>
              <th class="table-th">صندوق‌دار</th>
              <th class="table-th pl-2 text-left">کارمزد</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="fund in allFunds" :key="fund.id" class="table-row">
              <td class="table-td font-medium text-baax-blue-900">{{ fund.name.split('—')[0].trim() }}</td>
              <td class="table-td text-baax-blue-700">{{ fundTypeLabel(fund.type) }}</td>
              <td class="table-td text-baax-blue-700">{{ fund.organizerName }}</td>
              <td class="table-td pl-2 text-left tabular-nums">{{ formatToman(fundServiceFee(fund)) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="mb-5 grid gap-3 md:grid-cols-2">
      <div class="card">
        <h2 class="section-title mb-3">صندوق‌داران</h2>
        <ul class="divide-y divide-baax-blue-50">
          <li v-for="org in organizers" :key="org.id" class="flex justify-between py-2.5">
            <span class="text-sm font-medium text-baax-blue-900">{{ org.name }}</span>
            <span class="text-sm tabular-nums text-baax-blue-500">{{ org.fundCount }} صندوق</span>
          </li>
        </ul>
      </div>
      <div class="card">
        <h2 class="section-title mb-3">پرچم‌ها</h2>
        <ul class="divide-y divide-baax-blue-50">
          <li v-for="flag in platformFlags" :key="flag.id" class="flex justify-between py-2.5">
            <div>
              <p class="text-sm font-medium text-baax-blue-900">{{ flag.member }}</p>
              <p class="text-2xs text-baax-blue-500">{{ flag.fundName }}</p>
            </div>
            <span
              class="badge"
              :class="flag.type === 'late' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'"
            >
              {{ flag.type === 'late' ? 'تأخیر' : 'اختلاف' }}
            </span>
          </li>
        </ul>
      </div>
    </section>

    <section class="card border-dashed border-baax-blue-200 bg-baax-blue-50/30">
      <h2 class="section-title mb-0.5">احراز هویت</h2>
      <p class="text-sm text-baax-blue-500">به‌زودی</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  formatToman,
  fundServiceFee,
  fundTypeLabel,
  organizers,
  platformFlags,
  platformStats,
} from "~/data/mock";

definePageMeta({ layout: "default" });

const { funds: allFunds } = useFunds();

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
