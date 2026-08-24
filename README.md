# باکس (Baax)

ابزار مدیریت صندوق قرعه‌کشی و پس‌انداز/وام — **نه بانک**. دامنه: [baaxi.ir](https://baaxi.ir)

نام UI فقط **باکس** است. قوانین محصول در [`docs/PRODUCT.md`](docs/PRODUCT.md).

## ساختار monorepo

```
.
├── apps/web/          # Nuxt 3 + TypeScript + Tailwind (static SPA)
├── docs/PRODUCT.md    # قوانین قفل‌شدهٔ محصول
└── package.json       # npm workspaces
```

## کار روی سایت (محلی)

```bash
cd apps/web
npm install
npx nuxi dev
```

مرورگر: [http://localhost:3000/baaxi.ir/](http://localhost:3000/baaxi.ir/)

از ریشهٔ repo:

```bash
npm install
npm run dev
```

## build استاتیک (محلی)

```bash
cd apps/web
npm run generate
```

خروجی: `apps/web/.output/public`

پیش‌نمایش همان خروجی:

```bash
cd apps/web
npx serve .output/public
```

> workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) برای deploy اختیاری GitHub Pages (در صورت فعال‌سازی توسط maintainer روی همین repo **خصوصی**) نگه داشته شده — نیازی به عمومی کردن repo نیست.

## صفحات دمو

| مسیر | توضیح |
|------|--------|
| `/` | فرود — لیست صندوق‌ها |
| `/fund/[id]` | جزئیات صندوق (قرعه‌کشی یا پس‌انداز/وام) |
| `/ledger` | دفترکل per-fund |
| `/quick-buy` | mock خرید زودهنگام (Snapp Pay / دیجی‌کالا / Tara) |

ورود: یک‌کلیک «ورود دمو» — بدون OTP یا شمارهٔ تلفن.

## برند

- پایه: آبی/سفید — بنفش فقط برای تأکید
- RTL + فونت Vazirmatn
- تأخیر/خطا: قرمز/کهربایی — **نه بنفش**

## خارج از محدوده

- پنل مدیر/ادمین
- KYC، custody، پرداخت واقعی
- امتیاز اعتباری ساختگی
