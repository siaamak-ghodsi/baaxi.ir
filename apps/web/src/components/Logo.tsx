import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect width="36" height="36" rx="8" fill="#2563eb" />
        <path
          d="M8 14h20v14a2 2 0 01-2 2H10a2 2 0 01-2-2V14z"
          fill="white"
          fillOpacity="0.9"
        />
        <path
          d="M8 14l10-6 10 6"
          stroke="#7c3aed"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M14 20h8"
          stroke="#2563eb"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-xl font-bold text-baax-blue-900">باکس</span>
    </Link>
  );
}
