<template>
  <p v-if="members.length === 0" class="text-sm text-baax-blue-500">—</p>
  <ul v-else class="divide-y divide-baax-blue-50">
    <li
      v-for="member in members"
      :key="member.id"
      class="flex items-center justify-between py-3"
    >
      <div class="flex items-center gap-3">
        <span
          class="flex h-7 w-7 items-center justify-center rounded-lg bg-baax-blue-100 text-xs font-semibold tabular-nums text-baax-blue-700"
        >
          {{ member.seat }}
        </span>
        <div>
          <p class="font-medium text-baax-blue-900">
            {{ member.name }}
            <span
              v-if="member.isWinner"
              class="badge mr-2 bg-baax-purple-100 text-baax-purple-700"
            >
              برنده
            </span>
          </p>
          <p v-if="member.daysOverdue && member.daysOverdue > 10" class="text-xs text-red-600">
            {{ member.daysOverdue }} روز تأخیر · آماده جایگزینی
          </p>
          <p
            v-else-if="member.daysOverdue"
            class="text-xs text-amber-600"
          >
            {{ member.daysOverdue }} روز تأخیر
          </p>
        </div>
      </div>
      <span
        class="badge"
        :class="paymentStatusClasses(member.status)"
      >
        {{ paymentStatusLabel(member.status) }}
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { FundMember } from "~/data/mock";
import { paymentStatusClasses, paymentStatusLabel } from "~/utils";

defineProps<{ members: FundMember[] }>();
</script>
