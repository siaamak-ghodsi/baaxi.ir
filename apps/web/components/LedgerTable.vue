<template>
  <div class="overflow-x-auto px-4 pb-1 pt-3">
    <table class="w-full">
      <thead>
        <tr class="table-head">
          <th class="table-th pr-2">تاریخ</th>
          <th class="table-th">شرح</th>
          <th class="table-th pl-2 text-left">مبلغ</th>
          <th class="table-th pl-2 text-left">مانده</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in entries" :key="entry.id" class="table-row">
          <td class="table-td pr-2 tabular-nums text-baax-blue-600">{{ entry.date }}</td>
          <td class="table-td text-baax-blue-900">{{ entry.label }}</td>
          <td
            class="table-td pl-2 text-left font-medium tabular-nums"
            :class="{
              'text-emerald-600': entry.type === 'credit',
              'text-baax-blue-800': entry.type === 'debit',
              'text-amber-600': entry.type === 'fee',
            }"
          >
            {{ entry.type === "debit" ? "−" : "+" }}{{ formatToman(entry.amount) }}
          </td>
          <td class="table-td pl-2 text-left tabular-nums text-baax-blue-600">
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
