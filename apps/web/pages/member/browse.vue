<template>
  <div>
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-baax-blue-900">صندوق‌ها</h1>
    </header>

    <section v-if="myFunds.length" class="mb-8">
      <h2 class="section-title mb-4">عضویت من</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <FundCard v-for="fund in myFunds" :key="fund.id" :fund="fund" />
      </div>
    </section>

    <section>
      <h2 class="section-title mb-4">پیوستن</h2>
      <div v-if="browseFunds.length" class="grid gap-4 md:grid-cols-2">
        <div v-for="fund in browseFunds" :key="fund.id">
          <FundCard :fund="fund" />
          <button
            type="button"
            class="btn-secondary mt-2 w-full text-sm"
            :disabled="joining === fund.id"
            @click="onJoin(fund.id)"
          >
            {{ joining === fund.id ? "در حال پیوستن…" : "پیوستن" }}
          </button>
          <p v-if="joinError[fund.id]" class="mt-1 text-xs text-red-600">{{ joinError[fund.id] }}</p>
        </div>
      </div>
      <p v-else class="text-sm text-baax-blue-500">صندوق باز جدیدی نیست.</p>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ auth: "member" });

const router = useRouter();
const { session, currentUser } = useAuth();
const { memberFunds, browsableFunds, joinFund } = useFunds();

const user = computed(() => currentUser());
const myFunds = computed(() => memberFunds(user.value?.joinedFundIds ?? []));
const browseFunds = computed(() => browsableFunds(user.value?.joinedFundIds ?? []));

const joining = ref<string | null>(null);
const joinError = ref<Record<string, string>>({});

async function onJoin(fundId: string) {
  if (!session.value) return;
  joining.value = fundId;
  joinError.value = { ...joinError.value, [fundId]: "" };

  const result = joinFund(fundId, session.value.name, session.value.phone);
  joining.value = null;

  if (!result.ok) {
    joinError.value = { ...joinError.value, [fundId]: result.error };
    return;
  }

  await router.push(`/fund/${fundId}`);
}
</script>
