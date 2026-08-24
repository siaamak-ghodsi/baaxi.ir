# باکس (Baax)

ابزار مدیریت صندوق قرعه‌کشی و پس‌انداز/وام — **نه بانک**. دامنه: [baaxi.ir](https://baaxi.ir)

نام UI فقط **باکس** است. قوانین محصول در [`docs/PRODUCT.md`](docs/PRODUCT.md).

## ساختار monorepo

```
.
├── apps/web/          # Next.js (App Router) + TypeScript + Tailwind
├── docs/PRODUCT.md    # قوانین قفل‌شدهٔ محصول
└── package.json       # npm workspaces
```

## اجرای محلی

```bash
cd apps/web
npm install
npm run dev
```

مرورگر: [http://localhost:3000](http://localhost:3000)

## build

```bash
cd apps/web
npm run build
```

یا از ریشهٔ repo:

```bash
npm install
npm run build
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
