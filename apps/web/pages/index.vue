<template>
  <div class="landing">
    <!-- Hero -->
    <section class="landing-hero">
      <div class="landing-hero-inner">
        <div class="landing-hero-copy">
          <img
            :src="logoSrc"
            width="200"
            height="250"
            alt="باکس"
            class="landing-logo mb-6"
          />
          <p class="landing-tagline">
            ابزار مدیریت صندوق — قرعه‌کشی و پس‌انداز/وام، با دفترکل جدا برای هر صندوق.
          </p>
          <div class="landing-cta">
            <NuxtLink to="/signup" class="btn-primary landing-cta-primary">ثبت‌نام</NuxtLink>
            <NuxtLink to="/login" class="btn-secondary">ورود</NuxtLink>
          </div>
          <p class="landing-domain">baaxi.ir</p>
        </div>

        <!-- Dashboard preview panel -->
        <div class="landing-preview" aria-hidden="true">
          <div class="landing-preview-header">
            <span class="landing-preview-dot" />
            <span class="landing-preview-dot" />
            <span class="landing-preview-dot" />
            <span class="landing-preview-title">پنل عضو</span>
          </div>
          <div class="landing-preview-body">
            <div class="landing-preview-stats">
              <div class="landing-preview-stat">
                <p class="stat-label">قسط بعدی</p>
                <p class="mt-1 text-base font-bold text-baax-blue-900">۵٬۰۰۰٬۰۰۰ تومان</p>
                <p class="mt-0.5 text-xs text-baax-blue-500">۱۴۰۴/۰۶/۰۱</p>
              </div>
              <div class="landing-preview-stat">
                <p class="stat-label">وضعیت</p>
                <span class="mt-2 inline-block rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                  در انتظار
                </span>
              </div>
              <div class="landing-preview-stat">
                <p class="stat-label">صندوق‌های من</p>
                <p class="mt-1 text-base font-bold text-baax-purple-600">۲</p>
              </div>
            </div>
            <div class="landing-preview-fund">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <span class="inline-block rounded-full bg-baax-blue-100 px-2 py-0.5 text-[10px] font-medium text-baax-blue-700">
                    قرعه‌کشی
                  </span>
                  <p class="mt-1.5 text-sm font-bold text-baax-blue-900">صندوق ۱۲ نفره — محله ولیعصر</p>
                </div>
                <span class="text-xs font-semibold text-baax-purple-600">۴/۱۲</span>
              </div>
              <div class="mt-3 grid grid-cols-3 gap-2 border-t border-baax-blue-50 pt-3 text-[11px]">
                <div>
                  <p class="stat-label">مبلغ ماهانه</p>
                  <p class="font-semibold text-baax-blue-900">۵M</p>
                </div>
                <div>
                  <p class="stat-label">ارزش پات</p>
                  <p class="font-semibold text-baax-blue-900">۶۰M</p>
                </div>
                <div>
                  <p class="stat-label">اعضا</p>
                  <p class="font-semibold text-baax-blue-900">۱۱/۱۲</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Differentiators -->
    <section class="landing-diff">
      <div class="landing-diff-inner">
        <ul class="landing-diff-list">
          <li v-for="item in differentiators" :key="item">
            <span class="landing-diff-bullet" aria-hidden="true" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "default" });

const app = useRuntimeConfig().app;
const base = app.baseURL.endsWith("/") ? app.baseURL : `${app.baseURL}/`;
const logoSrc = `${base}logo.png`;

const differentiators = [
  "زودتر از قرعه نقد یا خرید می‌گیری",
  "صندلی تأخیر از لیست انتظار پر می‌شود، نه ضبط",
  "صندوق‌دار احراز را از باکس می‌خرد",
];
</script>
