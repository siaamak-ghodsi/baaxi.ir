import { validateNationalId } from "~/utils/national-id";
import { isValidPhone, normalizePhone } from "~/utils/auth-storage";

export interface IdentityInquiryInput {
  nationalId: string;
  mobile: string;
}

export interface IdentityInquiryResult {
  ok: boolean;
  nationalIdValid: boolean;
  mobileValid: boolean;
  nationalIdMessage: string;
  mobileMessage: string;
  error?: string;
}

export type IdentityInquiryProvider = (
  input: IdentityInquiryInput,
) => Promise<IdentityInquiryResult>;

const INQUIRY_DELAY_MS = 1200;

/** Local provider: format + checksum only. Swap for Finnotech/شاهکار later. */
async function localIdentityInquiry(input: IdentityInquiryInput): Promise<IdentityInquiryResult> {
  await new Promise((resolve) => setTimeout(resolve, INQUIRY_DELAY_MS));

  const nationalResult = validateNationalId(input.nationalId);
  const normalizedMobile = normalizePhone(input.mobile);
  const mobileValid = isValidPhone(normalizedMobile);

  const nationalIdValid = nationalResult.ok;
  const nationalIdMessage = nationalIdValid ? "کد ملی معتبر است" : nationalResult.error;
  const mobileMessage = mobileValid ? "شماره معتبر است" : "شماره موبایل معتبر نیست";

  const ok = nationalIdValid && mobileValid;

  return {
    ok,
    nationalIdValid,
    mobileValid,
    nationalIdMessage,
    mobileMessage,
    error: ok ? undefined : "استعلام ناموفق بود. اطلاعات را بررسی کنید.",
  };
}

let inquiryProvider: IdentityInquiryProvider = localIdentityInquiry;

/** Replace with a real KYC/registry provider when available. */
export function setIdentityInquiryProvider(provider: IdentityInquiryProvider) {
  inquiryProvider = provider;
}

export function runIdentityInquiry(input: IdentityInquiryInput): Promise<IdentityInquiryResult> {
  return inquiryProvider(input);
}
