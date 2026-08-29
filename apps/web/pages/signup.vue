<template>
  <div class="mx-auto max-w-md py-8 sm:py-10">
    <div class="mb-5">
      <h1 class="page-title">ثبت‌نام در باکس</h1>
      <p class="page-subtitle mt-1">
        برای ایجاد حساب، اطلاعات هویتی خود را وارد کرده و استعلام کنید.
      </p>
    </div>

    <form class="card space-y-5" @submit.prevent="onSubmit">
      <div class="rounded-lg border border-baax-blue-100 bg-baax-blue-50/60 px-3 py-2.5">
        <p class="text-xs leading-relaxed text-baax-blue-700">
          اطلاعات زیر برای احراز هویت و ایجاد حساب کاربری استفاده می‌شود.
        </p>
      </div>

      <div>
        <label class="input-label" for="name">نام و نام خانوادگی</label>
        <input
          id="name"
          v-model="name"
          type="text"
          class="input"
          autocomplete="name"
          :disabled="submitting"
        />
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
          :readonly="inquiryVerified"
          :disabled="submitting || inquiryPending"
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
          :disabled="submitting || inquiryPending"
        />
        <p class="mt-1.5 text-xs text-baax-blue-500">شماره موبایل ایرانی (۰۹xxxxxxxxx)</p>
      </div>

      <div>
        <p class="input-label">نقش</p>
        <div class="grid grid-cols-2 gap-2">
          <button
            type="button"
            class="choice-btn"
            :class="role === 'member' ? 'choice-btn-active' : ''"
            :disabled="submitting || inquiryPending"
            @click.prevent="role = 'member'"
          >
            کاربر
          </button>
          <button
            type="button"
            class="choice-btn"
            :class="role === 'organizer' ? 'choice-btn-active' : ''"
            :disabled="submitting || inquiryPending"
            @click.prevent="role = 'organizer'"
          >
            صندوق‌دار
          </button>
        </div>
      </div>

      <div class="rounded-xl border border-baax-blue-100 bg-slate-50/80 p-4">
        <div class="mb-3 flex items-center justify-between gap-2">
          <p class="text-sm font-semibold text-baax-blue-900">استعلام هویت</p>
          <span
            v-if="inquiryVerified"
            class="badge bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
          >
            تأیید شد
          </span>
        </div>

        <div v-if="inquiryPending" class="inquiry-pending" role="status" aria-live="polite">
          <span class="inquiry-spinner" aria-hidden="true" />
          <div>
            <p class="text-sm font-medium text-baax-blue-900">در حال استعلام...</p>
            <p class="mt-0.5 text-xs text-baax-blue-500">لطفاً چند لحظه صبر کنید</p>
          </div>
        </div>

        <div v-else-if="inquiryResult" class="space-y-2">
          <div
            class="inquiry-result-row"
            :class="inquiryResult.nationalIdValid ? 'inquiry-result-ok' : 'inquiry-result-fail'"
          >
            <span class="inquiry-result-icon" aria-hidden="true">
              {{ inquiryResult.nationalIdValid ? "✓" : "✕" }}
            </span>
            <span>{{ inquiryResult.nationalIdMessage }}</span>
          </div>
          <div
            class="inquiry-result-row"
            :class="inquiryResult.mobileValid ? 'inquiry-result-ok' : 'inquiry-result-fail'"
          >
            <span class="inquiry-result-icon" aria-hidden="true">
              {{ inquiryResult.mobileValid ? "✓" : "✕" }}
            </span>
            <span>{{ inquiryResult.mobileMessage }}</span>
          </div>
        </div>

        <p v-else class="text-xs leading-relaxed text-baax-blue-600">
          پیش از ایجاد حساب، کد ملی و شماره موبایل شما بررسی می‌شود.
        </p>

        <button
          v-if="!inquiryVerified"
          type="button"
          class="btn-secondary mt-4 w-full"
          :disabled="!canInquire || inquiryPending"
          @click="runInquiry"
        >
          استعلام و تأیید
        </button>
      </div>

      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

      <button type="submit" class="btn-primary w-full" :disabled="!inquiryVerified || submitting">
        ایجاد حساب
      </button>
    </form>

    <p class="mt-4 text-center text-sm text-baax-blue-500">
      حساب دارید؟
      <NuxtLink to="/login" class="font-medium text-baax-purple-600 hover:underline">ورود</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import type { UserRole } from "~/utils/auth-storage";
import { isValidPhone, normalizePhone } from "~/utils/auth-storage";
import { runIdentityInquiry, type IdentityInquiryResult } from "~/utils/identity-inquiry";
import { maskNationalId, normalizeNationalId, validateNationalId } from "~/utils/national-id";

definePageMeta({ layout: "default" });

const router = useRouter();
const { signup, panelPath } = useAuth();

const name = ref("");
const nationalId = ref("");
const nationalIdDisplay = ref("");
const phone = ref("");
const role = ref<UserRole>("member");
const error = ref("");
const nationalIdError = ref("");
const inquiryPending = ref(false);
const inquiryVerified = ref(false);
const inquiryResult = ref<IdentityInquiryResult | null>(null);
const submitting = ref(false);

const canInquire = computed(() => {
  return (
    name.value.trim().length > 0 &&
    nationalId.value.length === 10 &&
    phone.value.trim().length > 0
  );
});

function onNationalIdInput() {
  nationalId.value = normalizeNationalId(nationalIdDisplay.value);
  nationalIdDisplay.value = nationalId.value;
  nationalIdError.value = "";
  resetInquiry();
}

function resetInquiry() {
  inquiryVerified.value = false;
  inquiryResult.value = null;
}

watch(phone, () => {
  if (inquiryVerified.value || inquiryResult.value) {
    if (inquiryVerified.value) {
      nationalIdDisplay.value = nationalId.value;
    }
    resetInquiry();
  }
});

async function runInquiry() {
  error.value = "";
  nationalIdError.value = "";

  if (!name.value.trim()) {
    error.value = "نام را وارد کنید";
    return;
  }

  const idCheck = validateNationalId(nationalId.value);
  if (!idCheck.ok) {
    nationalIdError.value = idCheck.error;
    return;
  }

  if (!isValidPhone(phone.value)) {
    error.value = "شماره موبایل معتبر نیست";
    return;
  }

  inquiryPending.value = true;
  inquiryResult.value = null;

  try {
    const result = await runIdentityInquiry({
      nationalId: idCheck.value,
      mobile: normalizePhone(phone.value),
    });
    inquiryResult.value = result;

    if (result.ok) {
      inquiryVerified.value = true;
      nationalIdDisplay.value = maskNationalId(idCheck.value);
    }
  } finally {
    inquiryPending.value = false;
  }
}

function onSubmit() {
  if (!inquiryVerified.value) {
    error.value = "ابتدا استعلام هویت را انجام دهید";
    return;
  }

  error.value = "";
  submitting.value = true;

  const result = signup(name.value, phone.value, nationalId.value, role.value);
  submitting.value = false;

  if (!result.ok) {
    error.value = result.error;
    return;
  }
  router.push(panelPath(role.value));
}
</script>

<style scoped>
.inquiry-pending {
  @apply flex items-center gap-3 rounded-lg border border-baax-blue-100 bg-white px-3 py-3;
}

.inquiry-spinner {
  @apply h-5 w-5 shrink-0 rounded-full border-2 border-baax-blue-200 border-t-baax-purple-600;
  animation: spin 0.8s linear infinite;
}

.inquiry-result-row {
  @apply flex items-center gap-2 rounded-lg px-3 py-2 text-sm;
}

.inquiry-result-ok {
  @apply bg-emerald-50 text-emerald-800;
}

.inquiry-result-fail {
  @apply bg-red-50 text-red-700;
}

.inquiry-result-icon {
  @apply inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold;
}

.inquiry-result-ok .inquiry-result-icon {
  @apply bg-emerald-100 text-emerald-700;
}

.inquiry-result-fail .inquiry-result-icon {
  @apply bg-red-100 text-red-700;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
