<template>
  <div
    class="flex min-h-screen flex-col"
    :class="isLanding ? 'bg-baax-purple-50' : 'bg-slate-50'"
  >
    <Header />
    <main
      class="mx-auto w-full max-w-5xl flex-1 px-4"
      :class="isLanding ? 'py-0' : 'py-5 sm:py-6'"
    >
      <slot />
    </main>
    <footer
      v-if="!isLanding"
      class="border-t border-baax-blue-100/60 bg-white py-3 text-center text-2xs text-baax-blue-400"
    >
      baaxi.ir
    </footer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const isLanding = computed(() => route.path === "/");
</script>
