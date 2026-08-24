<template>
  <div class="mx-auto max-w-sm py-12">
    <h1 class="mb-6 text-2xl font-bold text-baax-blue-900">ثبت‌نام</h1>
    <form class="card space-y-4" @submit.prevent="onSubmit">
      <div>
        <label class="stat-label mb-1 block" for="name">نام</label>
        <input
          id="name"
          v-model="name"
          type="text"
          class="w-full rounded-xl border border-baax-blue-200 px-4 py-2.5 text-baax-blue-900 focus:border-baax-purple-500 focus:outline-none focus:ring-1 focus:ring-baax-purple-500"
        />
      </div>
      <div>
        <label class="stat-label mb-1 block" for="phone">شماره موبایل</label>
        <input
          id="phone"
          v-model="phone"
          type="tel"
          inputmode="numeric"
          placeholder="09121234567"
          class="w-full rounded-xl border border-baax-blue-200 px-4 py-2.5 text-baax-blue-900 focus:border-baax-purple-500 focus:outline-none focus:ring-1 focus:ring-baax-purple-500"
        />
      </div>
      <div>
        <p class="stat-label mb-2">نقش</p>
        <div class="grid grid-cols-2 gap-2">
          <button
            type="button"
            class="rounded-xl border px-3 py-2.5 text-sm transition"
            :class="
              role === 'member'
                ? 'border-baax-purple-500 bg-baax-purple-500/5 text-baax-purple-600'
                : 'border-baax-blue-200 text-baax-blue-700'
            "
            @click="role = 'member'"
          >
            کاربر
          </button>
          <button
            type="button"
            class="rounded-xl border px-3 py-2.5 text-sm transition"
            :class="
              role === 'organizer'
                ? 'border-baax-purple-500 bg-baax-purple-500/5 text-baax-purple-600'
                : 'border-baax-blue-200 text-baax-blue-700'
            "
            @click="role = 'organizer'"
          >
            صندوق‌دار
          </button>
        </div>
      </div>
      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
      <button type="submit" class="btn-primary w-full">ثبت‌نام</button>
    </form>
    <p class="mt-4 text-center text-sm text-baax-blue-500">
      حساب دارید؟
      <NuxtLink to="/login" class="text-baax-purple-600 hover:underline">ورود</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import type { UserRole } from "~/utils/auth-storage";

definePageMeta({ layout: "default" });

const router = useRouter();
const { signup, panelPath } = useAuth();

const name = ref("");
const phone = ref("");
const role = ref<UserRole>("member");
const error = ref("");

function onSubmit() {
  error.value = "";
  const result = signup(name.value, phone.value, role.value);
  if (!result.ok) {
    error.value = result.error;
    return;
  }
  router.push(panelPath(role.value));
}
</script>
