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

        <!-- Dashboard preview (illustration only) -->
        <div class="landing-preview" aria-hidden="true">
          <p class="landing-preview-label">نمونه</p>
          <div class="landing-preview-stats">
            <div class="landing-preview-stat">
              <p class="stat-label">قسط بعدی</p>
              <p class="landing-preview-value">۵ میلیون</p>
              <p class="landing-preview-meta">۱۴۰۴/۰۶/۰۱</p>
            </div>
            <div class="landing-preview-stat">
              <p class="stat-label">وضعیت</p>
              <p class="landing-preview-value">در انتظار</p>
            </div>
            <div class="landing-preview-stat">
              <p class="stat-label">صندوق‌های من</p>
              <p class="landing-preview-value">۲</p>
            </div>
          </div>
          <div class="landing-preview-fund">
            <div class="flex items-start justify-between gap-2">
              <div>
                <p class="text-xs text-baax-blue-500/80">قرعه‌کشی</p>
                <p class="mt-0.5 text-sm font-medium text-baax-blue-800/90">صندوق ۱۲ نفره — محله ولیعصر</p>
              </div>
              <span class="text-[11px] text-baax-blue-500/70">۴/۱۲</span>
            </div>
            <div class="landing-preview-fund-grid">
              <div>
                <p class="stat-label">مبلغ ماهانه</p>
                <p class="landing-preview-value-sm">۵M</p>
              </div>
              <div>
                <p class="stat-label">ارزش پات</p>
                <p class="landing-preview-value-sm">۶۰M</p>
              </div>
              <div>
                <p class="stat-label">اعضا</p>
                <p class="landing-preview-value-sm">۱۱/۱۲</p>
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
