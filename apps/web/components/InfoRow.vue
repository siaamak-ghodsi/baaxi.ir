<template>
  <div class="rounded-lg bg-baax-blue-50/70 p-3">
    <p class="stat-label">{{ label }}</p>
    <p
      class="mt-0.5 text-sm font-semibold tabular-nums"
      :class="highlight ? 'text-baax-purple-600' : 'text-baax-blue-900'"
    >
      {{ value }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
  highlight?: boolean;
}>();
</script>
