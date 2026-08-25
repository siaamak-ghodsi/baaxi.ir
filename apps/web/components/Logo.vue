<template>
  <NuxtLink :to="home" class="inline-flex items-center gap-2.5" :class="className">
    <img
      :src="iconSrc"
      :width="iconSize"
      :height="iconSize"
      alt=""
      class="shrink-0"
      aria-hidden="true"
    />
    <span class="text-xl font-bold text-baax-blue-900">باکس</span>
  </NuxtLink>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    className?: string;
    home?: string;
    iconSize?: number;
  }>(),
  {
    home: "/",
    iconSize: 36,
  }
);

const app = useRuntimeConfig().app;
const base = app.baseURL.endsWith("/") ? app.baseURL : `${app.baseURL}/`;
const iconSrc = `${base}logo-icon.png`;
</script>
