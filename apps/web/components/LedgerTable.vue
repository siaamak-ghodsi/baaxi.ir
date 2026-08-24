<template>
  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-baax-blue-100 text-right">
          <th class="pb-3 pr-2 font-medium text-baax-blue-600">تاریخ</th>
          <th class="pb-3 font-medium text-baax-blue-600">شرح</th>
          <th class="pb-3 pl-2 text-left font-medium text-baax-blue-600">مبلغ</th>
          <th class="pb-3 pl-2 text-left font-medium text-baax-blue-600">مانده</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-baax-blue-50">
        <tr v-for="entry in entries" :key="entry.id">
          <td class="py-3 pr-2 text-baax-blue-700">{{ entry.date }}</td>
          <td class="py-3 text-baax-blue-900">{{ entry.label }}</td>
          <td
            class="py-3 pl-2 text-left font-medium"
            :class="{
              'text-emerald-600': entry.type === 'credit',
              'text-baax-blue-800': entry.type === 'debit',
              'text-amber-600': entry.type === 'fee',
            }"
          >
            {{ entry.type === "debit" ? "−" : "+" }}{{ formatToman(entry.amount) }}
          </td>
          <td class="py-3 pl-2 text-left text-baax-blue-700">
            {{ formatToman(entry.balance) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { LedgerEntry } from "~/data/mock";
import { formatToman } from "~/data/mock";

defineProps<{ entries: LedgerEntry[] }>();
</script>
