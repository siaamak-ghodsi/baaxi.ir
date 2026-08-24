<template>
  <DemoGate>
    <nav class="mb-4 text-sm text-baax-blue-500">
      <NuxtLink to="/" class="hover:text-baax-blue-700">خانه</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-baax-blue-800">{{ fund.name }}</span>
    </nav>

    <header class="card mb-6">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span
            class="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
            :class="
              fund.type === 'rosca'
                ? 'bg-baax-blue-100 text-baax-blue-700'
                : 'bg-emerald-50 text-emerald-700'
            "
          >
            {{ fundTypeLabel(fund.type) }}
          </span>
          <h1 class="mt-2 text-2xl font-bold text-baax-blue-900">{{ fund.name }}</h1>
          <p class="mt-2 text-sm text-baax-blue-600">{{ fund.description }}</p>
        </div>
        <div class="text-left">
          <p class="stat-label">دورهٔ جاری</p>
          <p class="text-2xl font-bold text-baax-purple-600">
            {{ fund.currentCycle }}
            <span class="text-base font-normal text-baax-blue-500">
              / {{ fund.totalCycles }}
            </span>
          </p>
        </div>
      </div>
    </header>

    <section v-if="fund.type === 'rosca'" class="card">
      <h2 class="section-title mb-4">اطلاعات قرعه‌کشی</h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InfoRow label="مبلغ ماهانه" :value="formatToman(fund.monthlyAmount)" />
        <InfoRow label="ارزش پات" :value="formatToman(fund.potValue ?? 0)" />
        <InfoRow
          label="تعداد اعضا"
          :value="`${fund.filledSeats} / ${fund.memberCount}`"
        />
        <InfoRow label="تاریخ قرعه بعدی" :value="fund.nextDrawDate" />
        <InfoRow
          label="برندهٔ دوره"
          :value="fund.winnerThisCycle ?? '—'"
          highlight
        />
        <InfoRow label="کارمزد پلتفرم" :value="`${fund.platformFeePercent}٪`" />
      </div>
    </section>

    <section v-else class="card">
      <h2 class="section-title mb-4">اطلاعات پس‌انداز/وام</h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InfoRow label="سقف وام" :value="formatToman(fund.loanCap ?? 0)" highlight />
        <InfoRow label="حق عضویت" :value="formatToman(fund.membershipFee ?? 0)" />
        <InfoRow label="قسط ماهانه" :value="formatToman(fund.installmentAmount ?? 0)" />
        <InfoRow label="مبلغ پس‌انداز ماهانه" :value="formatToman(fund.monthlyAmount)" />
        <InfoRow
          label="تعداد اعضا"
          :value="`${fund.filledSeats} / ${fund.memberCount}`"
        />
        <InfoRow label="کارمزد پلتفرم" :value="`${fund.platformFeePercent}٪`" />
      </div>
    </section>

    <section class="card mt-6">
      <h2 class="section-title mb-4">وثیقه</h2>
      <div class="grid gap-4 sm:grid-cols-2">
        <InfoRow
          label="نوع وثیقه"
          :value="fund.collateralType === 'cheque' ? 'چک (پات بزرگ)' : 'سفته الکترونیک'"
        />
        <InfoRow label="مبلغ اسمی" :value="formatToman(fund.collateralFaceValue ?? 0)" />
      </div>
    </section>

    <section class="card mt-6">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="section-title">اعضا و وضعیت پرداخت</h2>
        <span
          v-if="fund.waitlistCount > 0"
          class="rounded-full bg-baax-blue-100 px-2.5 py-0.5 text-xs text-baax-blue-700"
        >
          {{ fund.waitlistCount }} نفر در لیست انتظار
        </span>
      </div>
      <MemberList :members="fund.members" />
      <p class="mt-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
        قانون تأخیر: ۱۰ روز اخطار، سپس جایگزینی صندلی‌های پیش از برد از لیست
        انتظار. جایگزین بدهی معوق را می‌پردازد. برندگان جایگزین نمی‌شوند.
      </p>
    </section>

    <div class="mt-6 flex flex-wrap gap-3">
      <NuxtLink :to="`/ledger?fund=${fund.id}`" class="btn-primary">
        مشاهدهٔ دفترکل
      </NuxtLink>
      <NuxtLink v-if="fund.type === 'rosca'" to="/quick-buy" class="btn-secondary">
        خرید زودهنگام
      </NuxtLink>
    </div>
  </DemoGate>
</template>

<script setup lang="ts">
import { formatToman, fundTypeLabel, getFund } from "~/data/mock";

const route = useRoute();
const id = route.params.id as string;
const fund = getFund(id);

if (!fund) {
  throw createError({ statusCode: 404, statusMessage: "صفحه پیدا نشد" });
}
</script>
