import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { FundCard } from "@/components/FundCard";
import { DemoGate } from "@/components/DemoProvider";
import { funds } from "@/data/mock";

export default function HomePage() {
  return (
    <PageShell>
      <DemoGate>
        <section className="mb-10 text-center sm:text-right">
          <p className="mb-2 text-sm font-medium text-baax-purple-600">
            ابزار مدیریت صندوق — نه بانک
          </p>
          <h1 className="text-3xl font-bold text-baax-blue-900 sm:text-4xl">
            صندوق‌های گروهی، شفاف و ساده
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-baax-blue-600 sm:mx-0">
            باکس به اعضای صندوق کمک می‌کند قرعه‌کشی و پس‌انداز/وام را با دفترکل
            جداگانه، وثیقهٔ الکترونیک و قوانین تأخیر شفاف مدیریت کنند.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
            <Link href="/fund/rosca-12" className="btn-primary">
              مشاهدهٔ صندوق نمونه
            </Link>
            <Link href="/ledger" className="btn-secondary">
              دفترکل
            </Link>
          </div>
        </section>

        <section className="mb-10 grid gap-4 sm:grid-cols-3">
          <FeatureCard
            title="قرعه‌کشی (ROSCA)"
            description="یک برنده در هر دورهٔ ماهانه. برندگان قابل جایگزینی نیستند."
          />
          <FeatureCard
            title="پس‌انداز/وام"
            description="سقف وام، حق عضویت و قسط — هر کدام فیلد جدا در UI."
          />
          <FeatureCard
            title="دفترکل per-fund"
            description="هر صندوق دفترکل مستقل. درآمد پلتفرم فقط کارمزد."
          />
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="section-title">صندوق‌های فعال</h2>
            <span className="text-sm text-baax-blue-500">{funds.length} صندوق</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {funds.map((fund) => (
              <FundCard key={fund.id} fund={fund} />
            ))}
          </div>
        </section>

        <section className="mt-10 card border-dashed border-baax-purple-200 bg-gradient-to-l from-baax-purple-500/5 to-transparent">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-bold text-baax-blue-900">خرید زودهنگام</h3>
              <p className="mt-1 text-sm text-baax-blue-600">
                پس از برد، ابتدا بدهی به Snapp Pay / دیجی‌کالا / Tara، سپس نقد
              </p>
            </div>
            <Link href="/quick-buy" className="btn-primary shrink-0">
              مشاهدهٔ mock
            </Link>
          </div>
        </section>
      </DemoGate>
    </PageShell>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="card">
      <h3 className="font-semibold text-baax-blue-900">{title}</h3>
      <p className="mt-2 text-sm text-baax-blue-600">{description}</p>
    </div>
  );
}
