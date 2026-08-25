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
        <div class="grid grid-cols-2 gap-2">
          <button
            type="button"
            class="rounded-xl border px-3 py-2.5 text-sm transition"
            :class="
              type === 'rosca'
                ? 'border-baax-purple-500 bg-baax-purple-500/5 text-baax-purple-600'
                : 'border-baax-blue-200 text-baax-blue-700'
            "
            @click.prevent="type = 'rosca'"
          >
            قرعه‌کشی
          </button>
          <button
            type="button"
            class="rounded-xl border px-3 py-2.5 text-sm transition"
            :class="
              type === 'savings_loan'
                ? 'border-baax-purple-500 bg-baax-purple-500/5 text-baax-purple-600'
                : 'border-baax-blue-200 text-baax-blue-700'
            "
            @click.prevent="type = 'savings_loan'"
          >
            پس‌انداز/وام
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

      <section v-else class="space-y-4 rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
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

definePageMeta({ auth: "organizer" });

const router = useRouter();
const { session } = useAuth();
const { createFund } = useFunds();

const name = ref("");
const type = ref<FundType>("rosca");
const memberCount = ref(12);
const totalCycles = ref(12);
const monthlyAmount = ref(5_000_000);
const potValue = ref(60_000_000);
const loanCap = ref(40_000_000);
const membershipFee = ref(500_000);
const installmentAmount = ref(3_500_000);
const error = ref("");

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
    },
    organizerName
  );

  router.push(`/organizer/fund/${fund.id}`);
}
</script>
