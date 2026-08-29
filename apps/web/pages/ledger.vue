<template>
  <div>
    <header class="mb-5">
      <h1 class="page-title">دفترکل</h1>
    </header>

    <div v-if="!myFunds.length" class="card text-center">
      <p class="text-sm text-baax-blue-500">عضو هیچ صندوقی نیستید — دفترکل خالی است.</p>
      <NuxtLink to="/member/browse" class="btn-primary mt-4 inline-flex text-sm">پیوستن به صندوق</NuxtLink>
    </div>

    <template v-else>
      <div class="mb-5 flex flex-wrap gap-1.5">
        <NuxtLink
          v-for="item in myFunds"
          :key="item.id"
          :to="`/ledger?fund=${item.id}`"
          class="nav-tab"
          :class="selectedFund?.id === item.id ? 'nav-tab-active' : 'nav-tab-inactive border border-baax-blue-200 bg-white'"
        >
          {{ item.name.split('—')[0].trim() }}
        </NuxtLink>
      </div>

      <template v-if="selectedFund">
        <div class="card mb-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 class="font-display text-base font-bold text-baax-blue-900">{{ selectedFund.name }}</h2>
            <p class="text-sm text-baax-blue-500">
              {{ fundTypeLabel(selectedFund.type) }} · دوره {{ selectedFund.currentCycle }}
            </p>
          </div>
          <div class="text-left">
            <p class="stat-label">مانده</p>
            <p class="stat-value-lg mt-0.5">
              {{ formatToman(selectedFund.ledger.at(-1)?.balance ?? 0) }}
            </p>
          </div>
        </div>

        <section v-if="selectedFund.ledger.length" class="card !p-0 overflow-hidden">
          <LedgerTable :entries="selectedFund.ledger" />
        </section>
        <section v-else class="card text-center">
          <p class="text-sm text-baax-blue-500">هنوز تراکنشی ثبت نشده.</p>
        </section>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { formatToman, fundTypeLabel } from "~/data/mock";

definePageMeta({ auth: "member" });

const route = useRoute();
const { currentUser } = useAuth();
const { memberFunds, getFund } = useFunds();

const user = computed(() => currentUser());
const myFunds = computed(() => memberFunds(user.value?.joinedFundIds ?? []));
const fundId = computed(() => route.query.fund as string | undefined);
const selectedFund = computed(() => {
  if (fundId.value) return getFund(fundId.value) ?? myFunds.value[0];
  return myFunds.value[0];
});
</script>
