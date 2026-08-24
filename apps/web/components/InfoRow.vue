<template>
  <div class="rounded-xl bg-baax-blue-50 p-3">
    <p class="stat-label">{{ label }}</p>
    <p
      class="mt-1 font-semibold"
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
