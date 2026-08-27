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
            ابزار مدیریت و تشکیل صندوق‌های خانوادگی، فروشگاهی و سازمانی از طریق اعتبارسنجی
          </p>
        </div>

        <!-- Dashboard preview (illustration only) -->
        <div class="landing-preview" aria-hidden="true">
          <div class="landing-preview-stats">
            <div class="landing-preview-stat">
              <p class="stat-label">قسط بعدی</p>
              <p class="mt-1 text-base font-bold text-baax-blue-900">۵٬۰۰۰٬۰۰۰ تومان</p>
              <p class="mt-0.5 text-xs text-baax-blue-500">۱۴۰۴/۰۶/۰۱</p>
            </div>
            <div class="landing-preview-stat">
              <p class="stat-label">وضعیت</p>
              <span class="mt-2 inline-block rounded-full border border-amber-200/80 bg-amber-50/80 px-2 py-0.5 text-xs font-medium text-amber-700">
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
                <span class="inline-block rounded-full bg-baax-blue-100/80 px-2 py-0.5 text-[10px] font-medium text-baax-blue-700">
                  قرعه‌کشی
                </span>
                <p class="mt-1.5 text-sm font-bold text-baax-blue-900">صندوق ۱۲ نفره — محله ولیعصر</p>
              </div>
              <span class="text-xs font-semibold text-baax-purple-600">۴/۱۲</span>
            </div>
            <div class="mt-3 grid grid-cols-3 gap-2 border-t border-baax-blue-100/40 pt-3 text-[11px]">
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
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "default" });
</script>
