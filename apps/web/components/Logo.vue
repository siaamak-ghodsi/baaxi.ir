<template>
  <NuxtLink :to="home" class="inline-flex items-center" :class="className">
    <img
      :src="logoSrc"
      alt="باکس"
      class="baax-logo shrink-0"
      :class="size === 'hero' ? 'baax-logo-hero' : 'baax-logo-header'"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    className?: string;
    home?: string;
    size?: "header" | "hero";
  }>(),
  {
    home: "/",
    size: "header",
  }
);

const app = useRuntimeConfig().app;
const base = app.baseURL.endsWith("/") ? app.baseURL : `${app.baseURL}/`;
const logoSrc = `${base}logo.png`;
</script>
