<template>
  <div class="mx-auto max-w-md py-8 sm:py-10">
    <div class="mb-5">
      <h1 class="page-title">ورود به باکس</h1>
      <p class="page-subtitle mt-1">برای ورود، کد ملی و شماره موبایل ثبت‌شده را وارد کنید.</p>
    </div>

    <form class="card space-y-4" @submit.prevent="onSubmit">
      <div class="rounded-lg border border-baax-blue-100 bg-baax-blue-50/60 px-3 py-2.5">
        <p class="text-xs leading-relaxed text-baax-blue-700">
          ورود با اطلاعات هویتی ثبت‌شده در زمان عضویت انجام می‌شود.
        </p>
      </div>

      <div>
        <label class="input-label" for="nationalId">کد ملی</label>
        <input
          id="nationalId"
          v-model="nationalIdDisplay"
          type="text"
          inputmode="numeric"
          maxlength="10"
          placeholder="۰۰۱۲۳۴۵۶۷۸"
          class="input font-mono tracking-wider"
          dir="ltr"
          @input="onNationalIdInput"
        />
        <p v-if="nationalIdError" class="mt-1.5 text-xs text-red-600">{{ nationalIdError }}</p>
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
          autocomplete="tel"
        />
      </div>

      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
      <button type="submit" class="btn-primary w-full" :disabled="submitting">ورود</button>
    </form>

    <p class="mt-4 text-center text-sm text-baax-blue-500">
      حساب ندارید؟
      <NuxtLink to="/signup" class="font-medium text-baax-purple-600 hover:underline">ثبت‌نام</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { normalizeNationalId, validateNationalId } from "~/utils/national-id";

definePageMeta({ layout: "default" });

const route = useRoute();
const router = useRouter();
const { login, panelPath } = useAuth();

const nationalId = ref("");
const nationalIdDisplay = ref("");
const phone = ref("");
const error = ref("");
const nationalIdError = ref("");
const submitting = ref(false);

function onNationalIdInput() {
  nationalId.value = normalizeNationalId(nationalIdDisplay.value);
  nationalIdDisplay.value = nationalId.value;
  nationalIdError.value = "";
}

function onSubmit() {
  error.value = "";
  nationalIdError.value = "";

  const idCheck = validateNationalId(nationalId.value);
  if (!idCheck.ok) {
    nationalIdError.value = idCheck.error;
    return;
  }

  submitting.value = true;
  const result = login(phone.value, nationalId.value);
  submitting.value = false;

  if (!result.ok) {
    error.value = result.error;
    return;
  }
  const redirect = route.query.redirect as string | undefined;
  router.push(redirect || panelPath());
}
</script>
