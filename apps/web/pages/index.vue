<template>
  <div class="mx-auto max-w-lg py-16 text-center sm:py-24">
    <Logo class-name="mb-8 inline-flex" />
    <h1 class="text-3xl font-bold text-baax-blue-900">باکس</h1>
    <p class="mt-2 text-baax-blue-500">baaxi.ir</p>
    <div class="mt-10 flex justify-center gap-3">
      <NuxtLink to="/login" class="btn-secondary min-w-[120px]">ورود</NuxtLink>
      <NuxtLink to="/signup" class="btn-primary min-w-[120px]">ثبت‌نام</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "default" });
</script>
