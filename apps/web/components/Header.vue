<template>
  <header class="sticky top-0 z-50 border-b border-baax-blue-100 bg-white/95 backdrop-blur">
    <div class="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
      <Logo :home="homeLink" />
      <div v-if="!isLoggedIn" class="flex gap-2">
        <NuxtLink to="/login" class="btn-secondary text-sm">ورود</NuxtLink>
        <NuxtLink to="/signup" class="btn-primary text-sm">ثبت‌نام</NuxtLink>
      </div>
      <div v-else class="flex items-center gap-3">
        <span class="hidden text-sm text-baax-blue-600 sm:inline">{{ session?.name }}</span>
        <button type="button" class="text-sm text-baax-blue-500 hover:text-red-600" @click="onLogout">
          خروج
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
const route = useRoute();
const router = useRouter();
const { session, isLoggedIn, logout, panelPath } = useAuth();

const homeLink = computed(() => {
  if (!isLoggedIn.value) return "/";
  return panelPath();
});

const memberNav = [
  { href: "/member", label: "خانه" },
  { href: "/member/browse", label: "صندوق‌ها" },
  { href: "/ledger", label: "دفترکل" },
];

const organizerNav = [{ href: "/organizer", label: "صندوق‌ها" }];

const navItems = computed(() => {
  if (!isLoggedIn.value) return [];
  if (session.value?.role === "organizer") return organizerNav;
  return memberNav;
});

function isActive(href: string): boolean {
  if (href === "/member") return route.path === "/member";
  if (href === "/organizer") return route.path.startsWith("/organizer");
  return route.path === href || route.path.startsWith(`${href}/`);
}

function onLogout() {
  logout();
  router.push("/");
}
</script>
