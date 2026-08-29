/** Normalize کد ملی input to 10 digits only. */
export function normalizeNationalId(input: string): string {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const normalized = input
    .trim()
    .split("")
    .map((ch) => {
      const idx = persianDigits.indexOf(ch);
      return idx >= 0 ? String(idx) : ch;
    })
    .join("")
    .replace(/\D/g, "");
  return normalized;
}

/** Official Iranian national ID checksum (رقم کنترل). */
export function isValidNationalIdChecksum(nationalId: string): boolean {
  const id = normalizeNationalId(nationalId);
  if (!/^\d{10}$/.test(id)) return false;

  if (/^(\d)\1{9}$/.test(id)) return false;

  const checkDigit = Number(id[9]);
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += Number(id[i]) * (10 - i);
  }
  const remainder = sum % 11;
  const expected = remainder < 2 ? remainder : 11 - remainder;
  return checkDigit === expected;
}

export function validateNationalId(input: string): { ok: true; value: string } | { ok: false; error: string } {
  const value = normalizeNationalId(input);
  if (value.length !== 10) {
    return { ok: false, error: "کد ملی باید ۱۰ رقم باشد" };
  }
  if (!isValidNationalIdChecksum(value)) {
    return { ok: false, error: "کد ملی نامعتبر است" };
  }
  return { ok: true, value };
}

/** Mask for display after verification — only last 2 digits visible. */
export function maskNationalId(nationalId: string): string {
  const id = normalizeNationalId(nationalId);
  if (id.length < 2) return "**********";
  return `${"•".repeat(8)}${id.slice(-2)}`;
}
