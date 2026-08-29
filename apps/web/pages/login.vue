<template>
  <div class="mx-auto max-w-sm py-8 sm:py-10">
    <h1 class="page-title mb-5">ورود</h1>
    <form class="card space-y-4" @submit.prevent="onSubmit">
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
      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
      <button type="submit" class="btn-primary w-full">تأیید</button>
    </form>
    <p class="mt-4 text-center text-sm text-baax-blue-500">
      حساب ندارید؟
      <NuxtLink to="/signup" class="font-medium text-baax-purple-600 hover:underline">ثبت‌نام</NuxtLink>
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
