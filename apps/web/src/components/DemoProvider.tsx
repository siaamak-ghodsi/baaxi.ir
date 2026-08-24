"use client";

import { createContext, useContext, useState } from "react";

interface DemoContextValue {
  isLoggedIn: boolean;
  login: () => void;
  userName: string;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <DemoContext.Provider
      value={{
        isLoggedIn,
        login: () => setIsLoggedIn(true),
        userName: "کاربر دمو",
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}

export function DemoGate({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, login } = useDemo();

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="card max-w-md">
          <h2 className="text-xl font-bold text-baax-blue-900">ورود به دمو</h2>
          <p className="mt-2 text-sm text-baax-blue-600">
            بدون شماره تلفن یا OTP — فقط برای مشاهدهٔ رابط کاربری
          </p>
          <button type="button" onClick={login} className="btn-primary mt-6 w-full">
            ورود یک‌کلیکی (دمو)
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
