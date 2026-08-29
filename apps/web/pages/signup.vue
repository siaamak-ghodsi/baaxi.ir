<template>
  <div class="mx-auto max-w-sm py-8 sm:py-10">
    <h1 class="page-title mb-5">ثبت‌نام</h1>
    <form class="card space-y-4" @submit.prevent="onSubmit">
      <div>
        <label class="input-label" for="name">نام</label>
        <input id="name" v-model="name" type="text" class="input" />
      </div>
      <div>
        <label class="input-label" for="phone">شماره موبایل</label>
        <input
          id="phone"
          v-model="phone"
          type="tel"
          inputmode="numeric"
          placeholder="09121234567"
          class="input"
          dir="ltr"
        />
      </div>
      <div>
        <p class="input-label">نقش</p>
        <div class="grid grid-cols-2 gap-2">
          <button
            type="button"
            class="choice-btn"
            :class="role === 'member' ? 'choice-btn-active' : ''"
            @click.prevent="role = 'member'"
          >
            کاربر
          </button>
          <button
            type="button"
            class="choice-btn"
            :class="role === 'organizer' ? 'choice-btn-active' : ''"
            @click.prevent="role = 'organizer'"
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
      <NuxtLink to="/login" class="font-medium text-baax-purple-600 hover:underline">ورود</NuxtLink>
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
