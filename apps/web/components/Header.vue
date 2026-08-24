<template>
  <header class="sticky top-0 z-50 border-b border-baax-blue-100 bg-white/95 backdrop-blur">
    <div class="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
      <Logo />
      <div class="flex rounded-lg bg-baax-blue-50 p-0.5">
        <button
          v-for="item in roles"
          :key="item.id"
          type="button"
          class="rounded-md px-2.5 py-1.5 text-xs font-medium transition sm:px-3 sm:text-sm"
          :class="
            role === item.id
              ? 'bg-white text-baax-purple-600 shadow-sm'
              : 'text-baax-blue-600 hover:text-baax-blue-800'
          "
          @click="switchRole(item.id)"
        >
          {{ item.label }}
        </button>
      </div>
    </div>
    <nav
      v-if="isLoggedIn && navItems.length"
      class="flex gap-1 overflow-x-auto border-t border-baax-blue-50 px-4 py-2"
    >
      <NuxtLink
        v-for="item in navItems"
        :key="item.href"
        :to="item.href"
        class="whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition sm:text-sm"
        :class="
          isActive(item.href)
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
import type { DemoRole } from "~/composables/useRole";

const route = useRoute();
const router = useRouter();
const { isLoggedIn } = useDemo();
const { role, roles, setRole } = useRole();

const memberNav = [
  { href: "/", label: "خانه" },
  { href: "/ledger", label: "دفترکل" },
  { href: "/quick-buy", label: "خرید زودهنگام" },
];

const organizerNav = [
  { href: "/organizer", label: "صندوق‌ها" },
];

const adminNav = [
  { href: "/admin", label: "داشبورد" },
];

const navItems = computed(() => {
  if (!isLoggedIn.value) return [];
  if (role.value === "organizer") return organizerNav;
  if (role.value === "admin") return adminNav;
  return memberNav;
});

function isActive(href: string): boolean {
  if (href === "/") return route.path === "/";
  if (href === "/organizer") return route.path.startsWith("/organizer");
  return route.path === href || route.path.startsWith(`${href}/`);
}

function switchRole(next: DemoRole) {
  setRole(next);
  const target = roles.find((r) => r.id === next);
  if (target) router.push(target.path);
}
</script>
