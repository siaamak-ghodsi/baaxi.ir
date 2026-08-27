<template>
  <div>
    <nav class="mb-4 text-sm text-baax-blue-500">
      <NuxtLink to="/organizer" class="hover:text-baax-blue-700">صندوق‌ها</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-baax-blue-800">ایجاد صندوق</span>
    </nav>

    <header class="mb-6">
      <h1 class="text-2xl font-bold text-baax-blue-900">ایجاد صندوق</h1>
    </header>

    <form class="card space-y-6" @submit.prevent="onSubmit">
      <div>
        <label class="stat-label mb-1 block" for="name">نام صندوق</label>
        <input
          id="name"
          v-model="name"
          type="text"
          placeholder="مثلاً صندوق ۱۲ نفره — محله ولیعصر"
          class="w-full rounded-xl border border-baax-blue-200 px-4 py-2.5 text-baax-blue-900 focus:border-baax-purple-500 focus:outline-none focus:ring-1 focus:ring-baax-purple-500"
        />
      </div>

      <div>
        <p class="stat-label mb-2">نوع صندوق</p>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="opt in typeOptions"
            :key="opt.value"
            type="button"
            class="rounded-xl border px-3 py-2.5 text-sm transition"
            :class="
              type === opt.value
                ? 'border-baax-purple-500 bg-baax-purple-500/5 text-baax-purple-600'
                : 'border-baax-blue-200 text-baax-blue-700'
            "
            @click.prevent="type = opt.value"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label class="stat-label mb-1 block" for="memberCount">تعداد اعضا</label>
          <input
            id="memberCount"
            v-model.number="memberCount"
            type="number"
            min="2"
            class="w-full rounded-xl border border-baax-blue-200 px-4 py-2.5 text-baax-blue-900 focus:border-baax-purple-500 focus:outline-none focus:ring-1 focus:ring-baax-purple-500"
          />
        </div>
        <div>
          <label class="stat-label mb-1 block" for="totalCycles">تعداد دوره</label>
          <input
            id="totalCycles"
            v-model.number="totalCycles"
            type="number"
            min="1"
            class="w-full rounded-xl border border-baax-blue-200 px-4 py-2.5 text-baax-blue-900 focus:border-baax-purple-500 focus:outline-none focus:ring-1 focus:ring-baax-purple-500"
          />
        </div>
      </div>

      <section v-if="type === 'rosca'" class="space-y-4 rounded-xl border border-baax-blue-100 bg-baax-blue-50/40 p-4">
        <h2 class="section-title">قرعه‌کشی</h2>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="stat-label mb-1 block" for="monthlyAmount">مبلغ ماهانه (تومان)</label>
            <input
              id="monthlyAmount"
              v-model.number="monthlyAmount"
              type="number"
              min="100000"
              step="100000"
              class="w-full rounded-xl border border-baax-blue-200 bg-white px-4 py-2.5 text-baax-blue-900 focus:border-baax-purple-500 focus:outline-none focus:ring-1 focus:ring-baax-purple-500"
            />
          </div>
          <div>
            <label class="stat-label mb-1 block" for="potValue">ارزش پات (تومان)</label>
            <input
              id="potValue"
              v-model.number="potValue"
              type="number"
              min="100000"
              step="100000"
              class="w-full rounded-xl border border-baax-blue-200 bg-white px-4 py-2.5 text-baax-blue-900 focus:border-baax-purple-500 focus:outline-none focus:ring-1 focus:ring-baax-purple-500"
            />
          </div>
        </div>
      </section>

      <section v-else-if="type === 'savings_loan'" class="space-y-4 rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
        <h2 class="section-title">پس‌انداز/وام</h2>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="stat-label mb-1 block" for="savingsAmount">پس‌انداز ماهانه (تومان)</label>
            <input
              id="savingsAmount"
              v-model.number="monthlyAmount"
              type="number"
              min="100000"
              step="100000"
              class="w-full rounded-xl border border-baax-blue-200 bg-white px-4 py-2.5 text-baax-blue-900 focus:border-baax-purple-500 focus:outline-none focus:ring-1 focus:ring-baax-purple-500"
            />
          </div>
          <div>
            <label class="stat-label mb-1 block" for="loanCap">سقف وام (تومان)</label>
            <input
              id="loanCap"
              v-model.number="loanCap"
              type="number"
              min="100000"
              step="100000"
              class="w-full rounded-xl border border-baax-blue-200 bg-white px-4 py-2.5 text-baax-blue-900 focus:border-baax-purple-500 focus:outline-none focus:ring-1 focus:ring-baax-purple-500"
            />
          </div>
          <div>
            <label class="stat-label mb-1 block" for="membershipFee">حق عضویت (تومان)</label>
            <input
              id="membershipFee"
              v-model.number="membershipFee"
              type="number"
              min="0"
              step="50000"
              class="w-full rounded-xl border border-baax-blue-200 bg-white px-4 py-2.5 text-baax-blue-900 focus:border-baax-purple-500 focus:outline-none focus:ring-1 focus:ring-baax-purple-500"
            />
          </div>
          <div>
            <label class="stat-label mb-1 block" for="installmentAmount">قسط (تومان)</label>
            <input
              id="installmentAmount"
              v-model.number="installmentAmount"
              type="number"
              min="100000"
              step="100000"
              class="w-full rounded-xl border border-baax-blue-200 bg-white px-4 py-2.5 text-baax-blue-900 focus:border-baax-purple-500 focus:outline-none focus:ring-1 focus:ring-baax-purple-500"
            />
          </div>
        </div>
      </section>

      <section v-else class="space-y-4 rounded-xl border border-baax-purple-200 bg-baax-purple-500/5 p-4">
        <h2 class="section-title">دیه</h2>
        <p class="text-xs text-baax-blue-600">
          صندوق مشترک برای دیه و تسویه خسارات ناشی از جرایم غیرعمد — نه بانک و نه بیمه.
        </p>

        <label class="flex cursor-pointer items-center gap-2">
          <input
            v-model="isFamily"
            type="checkbox"
            class="rounded border-baax-blue-300 text-baax-purple-600 focus:ring-baax-purple-500"
          />
          <span class="text-sm text-baax-blue-800">خانوادگی</span>
        </label>

        <div>
          <label class="stat-label mb-1 block" for="diyahAmount">سهم ماهانه (تومان)</label>
          <input
            id="diyahAmount"
            v-model.number="monthlyAmount"
            type="number"
            min="100000"
            step="100000"
            class="w-full rounded-xl border border-baax-blue-200 bg-white px-4 py-2.5 text-baax-blue-900 focus:border-baax-purple-500 focus:outline-none focus:ring-1 focus:ring-baax-purple-500"
          />
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="stat-label mb-1 block">امین</label>
            <select
              v-model="ameenPick"
              class="mb-2 w-full rounded-xl border border-baax-blue-200 bg-white px-3 py-2 text-sm focus:border-baax-purple-500 focus:outline-none focus:ring-1 focus:ring-baax-purple-500"
            >
              <option value="">انتخاب کاربر یا نام جدید…</option>
              <option v-for="u in users" :key="u.phone" :value="u.name">{{ u.name }}</option>
              <option value="__custom__">نام جدید…</option>
            </select>
            <input
              v-if="ameenPick === '__custom__'"
              v-model="ameenCustom"
              type="text"
              placeholder="نام امین"
              class="w-full rounded-xl border border-baax-blue-200 bg-white px-3 py-2 text-sm focus:border-baax-purple-500 focus:outline-none focus:ring-1 focus:ring-baax-purple-500"
            />
          </div>
          <div>
            <label class="stat-label mb-1 block">امان</label>
            <select
              v-model="amanPick"
              class="mb-2 w-full rounded-xl border border-baax-blue-200 bg-white px-3 py-2 text-sm focus:border-baax-purple-500 focus:outline-none focus:ring-1 focus:ring-baax-purple-500"
            >
              <option value="">انتخاب کاربر یا نام جدید…</option>
              <option v-for="u in users" :key="u.phone" :value="u.name">{{ u.name }}</option>
              <option value="__custom__">نام جدید…</option>
            </select>
            <input
              v-if="amanPick === '__custom__'"
              v-model="amanCustom"
              type="text"
              placeholder="نام امان"
              class="w-full rounded-xl border border-baax-blue-200 bg-white px-3 py-2 text-sm focus:border-baax-purple-500 focus:outline-none focus:ring-1 focus:ring-baax-purple-500"
            />
          </div>
        </div>
      </section>

      <section v-if="charterPreviewText" class="space-y-2">
        <h2 class="section-title">پیش‌نمایش اساسنامه</h2>
        <p class="text-xs text-baax-blue-500">پس از ایجاد، اساسنامه ثابت می‌ماند و قابل تغییر نیست.</p>
        <FundCharterPanel :text="charterPreviewText" :title="undefined" />
      </section>

      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

      <div class="flex flex-wrap gap-3">
        <button type="submit" class="btn-primary">ایجاد صندوق</button>
        <NuxtLink to="/organizer" class="btn-secondary">انصراف</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { FundType } from "~/data/mock";
import { charterPreview } from "~/utils/charter";
import { loadUsers } from "~/utils/auth-storage";

definePageMeta({ auth: "organizer" });

const router = useRouter();
const { session } = useAuth();
const { createFund } = useFunds();

const typeOptions: { value: FundType; label: string }[] = [
  { value: "rosca", label: "قرعه‌کشی" },
  { value: "savings_loan", label: "پس‌انداز/وام" },
  { value: "diyah", label: "دیه" },
];

const name = ref("");
const type = ref<FundType>("rosca");
const memberCount = ref(12);
const totalCycles = ref(12);
const monthlyAmount = ref(5_000_000);
const potValue = ref(60_000_000);
const loanCap = ref(40_000_000);
const membershipFee = ref(500_000);
const installmentAmount = ref(3_500_000);
const isFamily = ref(false);
const ameenPick = ref("");
const amanPick = ref("");
const ameenCustom = ref("");
const amanCustom = ref("");
const error = ref("");

const users = computed(() => loadUsers());

function resolveTrusteeName(pick: string, custom: string): string {
  if (pick === "__custom__") return custom.trim();
  return pick.trim();
}

function resolveTrusteePhone(name: string): string | undefined {
  const user = users.value.find((u) => u.name === name);
  return user?.phone;
}

const charterPreviewText = computed(() => {
  if (!name.value.trim() && type.value !== "diyah") return "";
  const ameenName = type.value === "diyah" ? resolveTrusteeName(ameenPick.value, ameenCustom.value) : undefined;
  const amanName = type.value === "diyah" ? resolveTrusteeName(amanPick.value, amanCustom.value) : undefined;
  return charterPreview({
    type: type.value,
    name: name.value.trim() || "—",
    memberCount: memberCount.value,
    monthlyAmount: monthlyAmount.value,
    totalCycles: totalCycles.value,
    isFamily: isFamily.value,
    ameenName,
    amanName,
    potValue: potValue.value,
    loanCap: loanCap.value,
  });
});

watch(type, (next) => {
  if (next === "rosca") {
    potValue.value = monthlyAmount.value * memberCount.value;
  }
});

watch([monthlyAmount, memberCount], () => {
  if (type.value === "rosca") {
    potValue.value = monthlyAmount.value * memberCount.value;
  }
});

function onSubmit() {
  error.value = "";
  if (!name.value.trim()) {
    error.value = "نام صندوق را وارد کنید";
    return;
  }
  if (memberCount.value < 2) {
    error.value = "حداقل ۲ عضو لازم است";
    return;
  }
  if (totalCycles.value < 1) {
    error.value = "تعداد دوره نامعتبر است";
    return;
  }

  let ameenName: string | undefined;
  let amanName: string | undefined;
  let ameenPhone: string | undefined;
  let amanPhone: string | undefined;

  if (type.value === "diyah") {
    ameenName = resolveTrusteeName(ameenPick.value, ameenCustom.value);
    amanName = resolveTrusteeName(amanPick.value, amanCustom.value);
    if (!ameenName) {
      error.value = "نام امین را وارد کنید";
      return;
    }
    if (!amanName) {
      error.value = "نام امان را وارد کنید";
      return;
    }
    if (ameenName === amanName) {
      error.value = "امین و امان باید دو نفر متفاوت باشند";
      return;
    }
    ameenPhone = resolveTrusteePhone(ameenName);
    amanPhone = resolveTrusteePhone(amanName);
  }

  const organizerName = session.value?.name ?? "";
  const fund = createFund(
    {
      name: name.value,
      type: type.value,
      monthlyAmount: monthlyAmount.value,
      memberCount: memberCount.value,
      totalCycles: totalCycles.value,
      potValue: type.value === "rosca" ? potValue.value : undefined,
      loanCap: type.value === "savings_loan" ? loanCap.value : undefined,
      membershipFee: type.value === "savings_loan" ? membershipFee.value : undefined,
      installmentAmount: type.value === "savings_loan" ? installmentAmount.value : undefined,
      isFamily: type.value === "diyah" ? isFamily.value : undefined,
      ameenName,
      amanName,
      ameenPhone,
      amanPhone,
    },
    organizerName
  );

  router.push(`/organizer/fund/${fund.id}`);
}
</script>
