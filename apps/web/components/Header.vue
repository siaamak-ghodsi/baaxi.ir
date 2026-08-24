<template>
  <header class="sticky top-0 z-50 border-b border-baax-blue-100 bg-white/95 backdrop-blur">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
      <Logo />
      <nav class="hidden items-center gap-1 sm:flex">
        <NuxtLink
          v-for="item in navItems"
          :key="item.href"
          :to="item.href"
          class="rounded-lg px-3 py-2 text-sm transition"
          :class="
            isActive(item.href)
              ? 'bg-baax-blue-100 font-medium text-baax-blue-800'
              : 'text-baax-blue-600 hover:bg-baax-blue-50'
          "
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
      <span
        class="hidden rounded-full bg-baax-blue-100 px-3 py-1 text-xs font-medium text-baax-blue-700 sm:inline"
      >
        نسخهٔ دمو
      </span>
    </div>
    <nav class="flex gap-1 overflow-x-auto border-t border-baax-blue-50 px-4 py-2 sm:hidden">
      <NuxtLink
        v-for="item in navItems"
        :key="item.href"
        :to="item.href"
        class="whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition"
        :class="
          route.path === item.href
            ? 'bg-baax-purple-600 text-white'
            : 'bg-baax-blue-100 text-baax-blue-700'
        "
      >
        {{ item.label }}
      </NuxtLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
const route = useRoute();

const navItems = [
  { href: "/", label: "خانه" },
  { href: "/fund/rosca-12", label: "صندوق‌ها" },
  { href: "/ledger", label: "دفترکل" },
  { href: "/quick-buy", label: "خرید زودهنگام" },
];

function isActive(href: string): boolean {
  if (href === "/") return route.path === "/";
  if (href.startsWith("/fund")) return route.path.startsWith("/fund");
  return route.path === href || route.path.startsWith(href);
}
</script>
