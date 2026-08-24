<template>
  <div class="flex items-center justify-between">
    <span class="text-baax-blue-600">{{ label }}</span>
    <span
      class="font-semibold"
      :class="{
        'text-red-600': variant === 'debt',
        'text-baax-purple-600': highlight,
        'text-baax-blue-900': !highlight && variant !== 'debt',
      }"
    >
      {{ value }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
  variant?: "debt";
  highlight?: boolean;
}>();
</script>
