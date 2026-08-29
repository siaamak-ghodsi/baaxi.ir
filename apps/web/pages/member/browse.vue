<template>
  <div>
    <header class="mb-5">
      <h1 class="page-title">صندوق‌ها</h1>
    </header>

    <section v-if="myFunds.length" class="mb-6">
      <h2 class="section-title mb-3">عضویت من</h2>
      <div class="grid gap-3 md:grid-cols-2">
        <FundCard v-for="fund in myFunds" :key="fund.id" :fund="fund" />
      </div>
    </section>

    <section>
      <h2 class="section-title mb-3">پیوستن</h2>
      <div v-if="browseFunds.length" class="grid gap-3 md:grid-cols-2">
        <div v-for="fund in browseFunds" :key="fund.id">
          <FundCard :fund="fund" />
          <button
            type="button"
            class="btn-secondary mt-2 w-full text-sm"
            @click="openJoin(fund.id)"
          >
            پیوستن
          </button>
        </div>
      </div>
      <p v-else class="text-sm text-baax-blue-500">صندوق باز جدیدی نیست.</p>
    </section>

    <JoinFundDialog
      v-if="joinTarget"
      :fund="joinTarget"
      :open="Boolean(joinTarget)"
      @close="joinTarget = null"
      @joined="onJoined"
    />
  </div>
</template>

<script setup lang="ts">
import type { Fund } from "~/data/mock";

definePageMeta({ auth: "member" });

const router = useRouter();
const { currentUser } = useAuth();
const { memberFunds, browsableFunds, getFund } = useFunds();

const user = computed(() => currentUser());
const myFunds = computed(() => memberFunds(user.value?.joinedFundIds ?? []));
const browseFunds = computed(() => browsableFunds(user.value?.joinedFundIds ?? []));

const joinTarget = ref<Fund | null>(null);

function openJoin(fundId: string) {
  const fund = getFund(fundId);
  if (fund) joinTarget.value = fund;
}

async function onJoined() {
  const id = joinTarget.value?.id;
  joinTarget.value = null;
  if (id) await router.push(`/fund/${id}`);
}
</script>
