<template>
  <header
    class="sticky top-0 z-50"
    :class="
      isLanding
        ? 'bg-baax-purple-50/90 backdrop-blur-md'
        : 'border-b border-baax-blue-100/80 bg-white/95 backdrop-blur-md'
    "
  >
    <div class="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2.5">
      <Logo :home="homeLink" />
      <div v-if="!isLoggedIn" class="flex items-center gap-2">
        <NuxtLink to="/login" class="btn-ghost hidden sm:inline-flex">ورود</NuxtLink>
        <NuxtLink to="/login" class="btn-secondary h-9 px-3 text-xs sm:hidden">ورود</NuxtLink>
        <NuxtLink to="/signup" class="btn-primary h-9 px-3.5 text-xs sm:h-10 sm:px-4 sm:text-sm">
          ثبت‌نام
        </NuxtLink>
      </div>
      <div v-else class="flex items-center gap-2 sm:gap-3">
        <span class="hidden max-w-[8rem] truncate text-sm font-medium text-baax-blue-700 sm:inline sm:max-w-none">
          {{ session?.name }}
        </span>
        <button type="button" class="btn-ghost text-baax-blue-500 hover:text-red-600" @click="onLogout">
          خروج
        </button>
      </div>
    </div>
    <nav
      v-if="isLoggedIn && navItems.length"
      class="border-t border-baax-blue-100/60 bg-white/80 px-4 py-1.5"
    >
      <div class="mx-auto flex max-w-5xl gap-1 overflow-x-auto">
        <NuxtLink
          v-for="item in navItems"
          :key="item.href"
          :to="item.href"
          class="nav-tab"
          :class="isActive(item.href) ? 'nav-tab-active' : 'nav-tab-inactive'"
        >
          {{ item.label }}
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const { session, isLoggedIn, logout, panelPath } = useAuth();

const isLanding = computed(() => route.path === "/");

const homeLink = computed(() => {
  if (!isLoggedIn.value) return "/";
  return panelPath();
});

const memberNav = [
  { href: "/member", label: "خانه" },
  { href: "/member/browse", label: "صندوق‌ها" },
  { href: "/ledger", label: "دفترکل" },
];

const organizerNav = [
  { href: "/organizer", label: "صندوق‌ها" },
  { href: "/organizer/create", label: "ایجاد صندوق" },
];

const navItems = computed(() => {
  if (!isLoggedIn.value) return [];
  if (session.value?.role === "organizer") return organizerNav;
  return memberNav;
});

function isActive(href: string): boolean {
  if (href === "/member") return route.path === "/member";
  if (href === "/organizer") {
    return route.path === "/organizer" || route.path.startsWith("/organizer/fund/");
  }
  if (href === "/organizer/create") return route.path === "/organizer/create";
  return route.path === href || route.path.startsWith(`${href}/`);
}

function onLogout() {
  logout();
  router.push("/");
}
</script>
