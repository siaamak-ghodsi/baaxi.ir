# باکس (Baax)

ابزار مدیریت صندوق قرعه‌کشی و پس‌انداز/وام — **نه بانک**. دامنه: [baaxi.ir](https://baaxi.ir)

نام UI فقط **باکس** است. قوانین محصول در [`docs/PRODUCT.md`](docs/PRODUCT.md).

## ساختار monorepo

```
.
├── apps/web/          # Nuxt 3 + TypeScript + Tailwind
├── docs/PRODUCT.md    # قوانین قفل‌شدهٔ محصول
└── package.json       # npm workspaces
```

## اجرای محلی

```bash
cd apps/web
npm install
npx nuxi dev
```

یا:

```bash
npm install
npm run dev
```

مرورگر: [http://localhost:3000](http://localhost:3000)

## build

```bash
cd apps/web
npm run build
```

خروجی Nitro با preset `netlify`: فایل‌های استاتیک در `dist/` و توابع SSR در `.netlify/functions-internal/`.

## استقرار روی Netlify

فایل [`netlify.toml`](netlify.toml) در ریشهٔ repo تنظیم شده است:

```toml
[build]
  base = "apps/web"
  command = "npm install && npm run build"
  publish = "dist"
```

1. repo را در Netlify وصل کنید (یا `netlify deploy --build`)
2. Netlify به‌طور خودکار `netlify.toml` را می‌خواند — نیازی به تنظیم دستی build نیست
3. **Node version:** 20 (در `netlify.toml` تنظیم شده)

برای پیش‌نمایش محلی پس از build:

```bash
cd apps/web
npx nuxi preview
```

یا با Netlify CLI:

```bash
cd apps/web
npx netlify deploy --build
```

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
