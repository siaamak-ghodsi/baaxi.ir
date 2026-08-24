<template>
  <NuxtLink :to="home" class="inline-flex items-center gap-2" :class="className">
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="36" height="36" rx="8" fill="#2563eb" />
      <path
        d="M8 14h20v14a2 2 0 01-2 2H10a2 2 0 01-2-2V14z"
        fill="white"
        fill-opacity="0.9"
      />
      <path
        d="M8 14l10-6 10 6"
        stroke="#7c3aed"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <path d="M14 20h8" stroke="#2563eb" stroke-width="2" stroke-linecap="round" />
    </svg>
    <span class="text-xl font-bold text-baax-blue-900">باکس</span>
  </NuxtLink>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ className?: string; home?: string }>(), { home: "/" });
</script>
