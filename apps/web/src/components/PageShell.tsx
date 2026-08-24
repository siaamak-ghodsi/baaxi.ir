import { Header } from "@/components/Header";

export function PageShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className={`mx-auto w-full max-w-5xl flex-1 px-4 py-6 ${className}`}>
        {children}
      </main>
      <footer className="border-t border-baax-blue-100 bg-white py-6">
        <div className="mx-auto max-w-5xl px-4 text-center text-sm text-baax-blue-600">
          <p>
            باکس ابزار مدیریت صندوق است، نه بانک.{" "}
            <span className="text-baax-blue-400">baaxi.ir</span>
          </p>
          <p className="mt-1 text-xs text-baax-blue-400">
            درآمد پلتفرم فقط از کارمزد — بدون KYC یا پرداخت واقعی در این دمو
          </p>
        </div>
      </footer>
    </div>
  );
}
