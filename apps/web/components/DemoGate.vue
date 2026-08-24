<template>
  <div v-if="!isLoggedIn" class="flex min-h-[50vh] items-center justify-center px-4">
    <div class="card w-full max-w-sm text-center">
      <Logo class-name="mb-4 flex w-full justify-center" />
      <button type="button" class="btn-primary w-full" @click="login">ورود</button>
    </div>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
const { isLoggedIn, login } = useDemo();
</script>
