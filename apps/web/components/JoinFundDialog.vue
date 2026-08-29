<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-end justify-center bg-baax-blue-900/40 p-4 backdrop-blur-sm sm:items-center"
      @click.self="emit('close')"
    >
      <div class="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl border border-baax-blue-100 bg-white p-5 shadow-card-hover">
        <h2 class="section-title">اساسنامه صندوق</h2>
        <p class="mt-0.5 text-sm text-baax-blue-500">{{ fund.name }}</p>

        <FundCharterPanel class="mt-3" :fund="fund" :title="undefined" />

        <label class="mt-4 flex cursor-pointer items-start gap-2.5">
          <input
            v-model="accepted"
            type="checkbox"
            class="mt-0.5 rounded border-baax-blue-300 text-baax-purple-600 focus:ring-baax-purple-500"
          />
          <span class="text-sm leading-relaxed text-baax-blue-700">اساسنامه را خواندم و می‌پذیرم. پس از پیوستن قابل تغییر نیست.</span>
        </label>

        <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>

        <div class="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            class="btn-primary"
            :disabled="loading"
            @click="onConfirm"
          >
            {{ loading ? "در حال پیوستن…" : "تأیید و پیوستن" }}
          </button>
          <button type="button" class="btn-secondary" @click="emit('close')">انصراف</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { Fund } from "~/data/mock";

const props = defineProps<{ fund: Fund; open: boolean }>();
const emit = defineEmits<{ close: []; joined: [] }>();

const { session } = useAuth();
const { joinFund } = useFunds();

const accepted = ref(false);
const loading = ref(false);
const error = ref("");

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      accepted.value = false;
      error.value = "";
    }
  }
);

async function onConfirm() {
  if (!session.value) return;
  if (!accepted.value) {
    error.value = "پذیرش اساسنامه الزامی است";
    return;
  }

  loading.value = true;
  error.value = "";

  const result = joinFund(
    props.fund.id,
    session.value.name,
    session.value.phone,
    true
  );

  loading.value = false;

  if (!result.ok) {
    error.value = result.error;
    return;
  }

  emit("joined");
}
</script>
