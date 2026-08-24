# باکس (Baax)

ابزار مدیریت صندوق قرعه‌کشی و پس‌انداز/وام — **نه بانک**. دامنه: [baaxi.ir](https://baaxi.ir)

نام UI فقط **باکس** است. قوانین محصول در [`docs/PRODUCT.md`](docs/PRODUCT.md).

## مشاهدهٔ دمو روی GitHub Pages

پس از فعال‌سازی Pages توسط maintainer (Settings → Pages → Source: **GitHub Actions**):

**https://siaamak-ghodsi.github.io/baaxi.ir/**

هر push به `main` workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) را اجرا می‌کند و سایت استاتیک را deploy می‌کند.

## ساختار monorepo

```
.
├── apps/web/          # Nuxt 3 + TypeScript + Tailwind (static SPA)
├── docs/PRODUCT.md    # قوانین قفل‌شدهٔ محصول
└── package.json       # npm workspaces
```

## اجرای محلی

```bash
cd apps/web
npm install
npx nuxi dev
```

یا از ریشه:

```bash
npm install
npm run dev
```

مرورگر: [http://localhost:3000/baaxi.ir/](http://localhost:3000/baaxi.ir/) (با `baseURL` پروژه)

## generate (استatic برای GitHub Pages)

```bash
cd apps/web
npm run generate
```

خروجی: `apps/web/.output/public`

یا از ریشه:

```bash
npm run generate
```

پیش‌نمایش محلی:

```bash
cd apps/web
npx serve .output/public
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
