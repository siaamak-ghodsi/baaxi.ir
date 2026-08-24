<template>
  <div class="flex min-h-screen flex-col">
    <Header />
    <main class="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
      <slot />
    </main>
    <footer class="border-t border-baax-blue-100 py-4 text-center text-xs text-baax-blue-400">
      baaxi.ir
    </footer>
  </div>
</template>
