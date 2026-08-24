<template>
  <div v-if="!isLoggedIn" class="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
    <div class="card max-w-md">
      <h2 class="text-xl font-bold text-baax-blue-900">ورود به دمو</h2>
      <p class="mt-2 text-sm text-baax-blue-600">
        بدون شماره تلفن یا OTP — فقط برای مشاهدهٔ رابط کاربری
      </p>
      <button type="button" class="btn-primary mt-6 w-full" @click="login">
        ورود یک‌کلیکی (دمو)
      </button>
    </div>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
const { isLoggedIn, login } = useDemo();
</script>
