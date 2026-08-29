<template>
  <div class="flex min-h-[50vh] flex-col items-center justify-center text-center">
    <h1 class="font-display text-4xl font-extrabold text-baax-blue-900">۴۰۴</h1>
    <p class="mt-2 text-baax-blue-600">صفحه پیدا نشد</p>
    <NuxtLink to="/" class="btn-primary mt-6"> بازگشت به خانه </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{ error: { statusCode?: number } }>();
</script>
