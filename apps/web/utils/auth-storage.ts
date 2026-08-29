import { validateNationalId } from "~/utils/national-id";

export type UserRole = "member" | "organizer";

export interface UserRecord {
  name: string;
  phone: string;
  nationalId: string;
  role: UserRole;
  joinedFundIds: string[];
}

export interface Session {
  name: string;
  phone: string;
  nationalId: string;
  role: UserRole;
}

export const SESSION_KEY = "baax-session";
export const USERS_KEY = "baax-users";

export const seedUsers: UserRecord[] = [
  {
    name: "علی م.",
    phone: "09121234567",
    nationalId: "0013542419",
    role: "member",
    joinedFundIds: ["rosca-12", "savings-loan-8"],
  },
  {
    name: "سیاامک غ.",
    phone: "09129876543",
    nationalId: "0499370899",
    role: "organizer",
    joinedFundIds: [],
  },
  {
    name: "رضا ن.",
    phone: "09131111111",
    nationalId: "0067749828",
    role: "member",
    joinedFundIds: ["diyah-family-6"],
  },
  {
    name: "مریم ح.",
    phone: "09132222222",
    nationalId: "1000000001",
    role: "member",
    joinedFundIds: [],
  },
];

export function normalizePhone(input: string): string {
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("98") && digits.length >= 12) {
    digits = `0${digits.slice(2)}`;
  }
  if (digits.length === 10 && digits.startsWith("9")) {
    digits = `0${digits}`;
  }
  return digits;
}

export function isValidPhone(phone: string): boolean {
  return /^09\d{9}$/.test(normalizePhone(phone));
}

export function loadUsers(): UserRecord[] {
  if (!import.meta.client) return [...seedUsers];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify(seedUsers));
      return [...seedUsers];
    }
    const parsed = JSON.parse(raw) as UserRecord[];
    return parsed.length ? parsed : [...seedUsers];
  } catch {
    return [...seedUsers];
  }
}

export function saveUsers(users: UserRecord[]) {
  if (!import.meta.client) return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function loadSession(): Session | null {
  if (!import.meta.client) return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function saveSession(session: Session | null) {
  if (!import.meta.client) return;
  if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  else localStorage.removeItem(SESSION_KEY);
}

export function findUserByPhone(phone: string): UserRecord | undefined {
  const normalized = normalizePhone(phone);
  return loadUsers().find((u) => u.phone === normalized);
}

export function findUserByCredentials(
  phone: string,
  nationalId: string,
): UserRecord | undefined {
  const normalizedPhone = normalizePhone(phone);
  const idResult = validateNationalId(nationalId);
  if (!idResult.ok) return undefined;
  return loadUsers().find(
    (u) => u.phone === normalizedPhone && u.nationalId === idResult.value,
  );
}

export function updateUser(phone: string, patch: Partial<UserRecord>): UserRecord | undefined {
  const users = loadUsers();
  const idx = users.findIndex((u) => u.phone === phone);
  if (idx < 0) return undefined;
  users[idx] = { ...users[idx], ...patch };
  saveUsers(users);
  return users[idx];
}

export function registerUser(
  user: Omit<UserRecord, "phone" | "nationalId"> & { phone: string; nationalId: string },
):
  | { ok: true }
  | { ok: false; error: string } {
  const phone = normalizePhone(user.phone);
  if (!isValidPhone(phone)) return { ok: false, error: "شماره موبایل معتبر نیست" };
  const idResult = validateNationalId(user.nationalId);
  if (!idResult.ok) return { ok: false, error: idResult.error };
  if (!user.name.trim()) return { ok: false, error: "نام را وارد کنید" };
  const users = loadUsers();
  if (users.some((u) => u.phone === phone)) {
    return { ok: false, error: "این شماره قبلاً ثبت شده" };
  }
  if (users.some((u) => u.nationalId === idResult.value)) {
    return { ok: false, error: "این کد ملی قبلاً ثبت شده" };
  }
  users.push({
    ...user,
    phone,
    nationalId: idResult.value,
    name: user.name.trim(),
  });
  saveUsers(users);
  return { ok: true };
}
