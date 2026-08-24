<template>
  <DemoGate>
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-baax-blue-900">ادمین</h1>
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
              <th class="pb-3 font-medium text-baax-blue-600">دوره</th>
              <th class="pb-3 pl-2 text-left font-medium text-baax-blue-600">کارمزد</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-baax-blue-50">
            <tr v-for="fund in funds" :key="fund.id">
              <td class="py-3 font-medium text-baax-blue-900">{{ fund.name.split('—')[0].trim() }}</td>
              <td class="py-3 text-baax-blue-700">{{ fundTypeLabel(fund.type) }}</td>
              <td class="py-3 text-baax-blue-700">{{ fund.organizerName }}</td>
              <td class="py-3 text-baax-blue-700">{{ fund.currentCycle }}/{{ fund.totalCycles }}</td>
              <td class="py-3 pl-2 text-left text-baax-blue-900">{{ formatToman(fundServiceFee(fund)) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="mb-6 grid gap-4 md:grid-cols-2">
      <div class="card">
        <h2 class="section-title mb-4">صندوق‌داران</h2>
        <ul class="divide-y divide-baax-blue-50">
          <li
            v-for="org in organizers"
            :key="org.id"
            class="flex items-center justify-between py-3"
          >
            <span class="font-medium text-baax-blue-900">{{ org.name }}</span>
            <span class="text-sm text-baax-blue-500">
              {{ org.fundCount }} صندوق · {{ org.memberCount }} عضو
            </span>
          </li>
        </ul>
      </div>

      <div class="card">
        <h2 class="section-title mb-4">پرچم‌ها</h2>
        <ul class="divide-y divide-baax-blue-50">
          <li
            v-for="flag in platformFlags"
            :key="flag.id"
            class="flex items-center justify-between py-3"
          >
            <div>
              <p class="font-medium text-baax-blue-900">{{ flag.member }}</p>
              <p class="text-xs text-baax-blue-500">{{ flag.fundName }}</p>
            </div>
            <span
              class="rounded-full px-2.5 py-0.5 text-xs font-medium"
              :class="
                flag.type === 'late'
                  ? 'bg-red-50 text-red-700'
                  : 'bg-amber-50 text-amber-700'
              "
            >
              {{ flag.type === 'late' ? 'تأخیر' : 'اختلاف' }}
            </span>
          </li>
        </ul>
      </div>
    </section>

    <section class="card border-dashed border-baax-blue-200 bg-baax-blue-50/50">
      <h2 class="section-title mb-2">احراز هویت</h2>
      <p class="text-sm text-baax-blue-500">به‌زودی</p>
    </section>
  </DemoGate>
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
</script>
