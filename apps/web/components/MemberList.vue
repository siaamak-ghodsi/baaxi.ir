<template>
  <p v-if="members.length === 0" class="text-sm text-baax-blue-500">
    لیست اعضا در این دمو خالی است.
  </p>
  <ul v-else class="divide-y divide-baax-blue-50">
    <li
      v-for="member in members"
      :key="member.id"
      class="flex items-center justify-between py-3"
    >
      <div class="flex items-center gap-3">
        <span
          class="flex h-8 w-8 items-center justify-center rounded-full bg-baax-blue-100 text-sm font-medium text-baax-blue-700"
        >
          {{ member.seat }}
        </span>
        <div>
          <p class="font-medium text-baax-blue-900">
            {{ member.name }}
            <span
              v-if="member.isWinner"
              class="mr-2 rounded bg-baax-purple-100 px-1.5 py-0.5 text-xs text-baax-purple-600"
            >
              برنده
            </span>
          </p>
          <p v-if="member.daysOverdue && member.daysOverdue > 10" class="text-xs text-red-600">
            {{ member.daysOverdue }} روز تأخیر — آماده جایگزینی از لیست انتظار
          </p>
          <p
            v-else-if="member.daysOverdue && member.daysOverdue <= 10"
            class="text-xs text-amber-600"
          >
            {{ member.daysOverdue }} روز تأخیر — در دوره اخطار
          </p>
        </div>
      </div>
      <span
        class="rounded-full border px-2.5 py-0.5 text-xs font-medium"
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
