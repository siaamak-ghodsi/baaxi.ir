<template>
  <div class="rounded-xl border border-baax-blue-100 bg-baax-blue-50/30 p-4">
    <h3 v-if="title" class="mb-3 text-sm font-semibold text-baax-blue-900">{{ title }}</h3>
    <pre class="whitespace-pre-wrap font-[inherit] text-sm leading-relaxed text-baax-blue-800">{{ charterText }}</pre>
  </div>
</template>

<script setup lang="ts">
import type { Fund } from "~/data/mock";

const props = withDefaults(
  defineProps<{ fund?: Fund; text?: string; title?: string }>(),
  { title: "اساسنامه (ثابت)" }
);

const charterText = computed(() => props.text ?? props.fund?.charter?.text ?? "");
</script>
