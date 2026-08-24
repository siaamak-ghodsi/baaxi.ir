<template>
  <div class="mx-auto max-w-sm py-12">
    <h1 class="mb-6 text-2xl font-bold text-baax-blue-900">ورود</h1>
    <form class="card space-y-4" @submit.prevent="onSubmit">
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
      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
      <button type="submit" class="btn-primary w-full">تأیید</button>
    </form>
    <p class="mt-4 text-center text-sm text-baax-blue-500">
      حساب ندارید؟
      <NuxtLink to="/signup" class="text-baax-purple-600 hover:underline">ثبت‌نام</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "default" });

const route = useRoute();
const router = useRouter();
const { login, panelPath } = useAuth();

const phone = ref("");
const error = ref("");

function onSubmit() {
  error.value = "";
  const result = login(phone.value);
  if (!result.ok) {
    error.value = result.error;
    return;
  }
  const redirect = route.query.redirect as string | undefined;
  router.push(redirect || panelPath());
}
</script>
