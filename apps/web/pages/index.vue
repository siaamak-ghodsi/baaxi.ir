<template>
  <div class="landing">
    <section class="landing-hero">
      <div class="landing-hero-inner">
        <div class="landing-hero-copy">
          <div class="landing-logo-wrap">
            <Logo size="hero" />
          </div>
          <h1 class="landing-headline">هیچوقت پول کم نیار</h1>
          <p class="landing-subline">
            صندوق‌های خانوادگی، فروشگاهی و سازمانی
            <span class="landing-subline-break">پول توی صندوق شماست — باکس فقط ابزار مدیریته</span>
          </p>
          <div class="landing-cta">
            <NuxtLink to="/signup" class="btn-primary landing-cta-primary">ثبت‌نام</NuxtLink>
            <NuxtLink to="/login" class="landing-cta-secondary">ورود</NuxtLink>
          </div>
        </div>

        <div class="landing-preview" aria-hidden="true">
          <div class="landing-preview-stats">
            <div class="landing-preview-stat">
              <p class="stat-label">قسط بعدی</p>
              <p class="stat-value-lg mt-1">۵ میلیون</p>
              <p class="mt-0.5 text-2xs text-baax-blue-400">۱۴۰۴/۰۶/۰۱</p>
            </div>
            <div class="landing-preview-stat">
              <p class="stat-label">وضعیت</p>
              <p class="mt-1.5">
                <span class="badge bg-amber-50 text-amber-700">در انتظار</span>
              </p>
            </div>
            <div class="landing-preview-stat">
              <p class="stat-label">صندوق‌های من</p>
              <p class="stat-value-lg mt-1 text-baax-purple-600">۲</p>
            </div>
          </div>
          <div class="landing-preview-fund">
            <div class="flex items-start justify-between gap-2">
              <div>
                <span class="badge bg-baax-blue-50 text-baax-blue-700">قرعه‌کشی</span>
                <p class="mt-1.5 text-sm font-semibold text-baax-blue-900">صندوق ۱۲ نفره — محله ولیعصر</p>
              </div>
              <span class="text-xs font-medium tabular-nums text-baax-purple-600">۴/۱۲</span>
            </div>
            <div class="landing-preview-fund-grid">
              <div>
                <p class="stat-label">مبلغ ماهانه</p>
                <p class="stat-value mt-0.5">۵M</p>
              </div>
              <div>
                <p class="stat-label">ارزش پات</p>
                <p class="stat-value mt-0.5">۶۰M</p>
              </div>
              <div>
                <p class="stat-label">اعضا</p>
                <p class="stat-value mt-0.5">۱۱/۱۲</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "default" });
</script>
