import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-baax-blue-900">۴۰۴</h1>
        <p className="mt-2 text-baax-blue-600">صفحه پیدا نشد</p>
        <Link href="/" className="btn-primary mt-6">
          بازگشت به خانه
        </Link>
      </div>
    </PageShell>
  );
}
