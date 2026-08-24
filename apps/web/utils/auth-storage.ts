export type UserRole = "member" | "organizer";

export interface UserRecord {
  name: string;
  phone: string;
  role: UserRole;
  joinedFundIds: string[];
}

export interface Session {
  name: string;
  phone: string;
  role: UserRole;
}

export const SESSION_KEY = "baax-session";
export const USERS_KEY = "baax-users";

export const seedUsers: UserRecord[] = [
  {
    name: "علی م.",
    phone: "09121234567",
    role: "member",
    joinedFundIds: ["rosca-12", "savings-loan-8"],
  },
  {
    name: "سیاامک غ.",
    phone: "09129876543",
    role: "organizer",
    joinedFundIds: [],
  },
];

export function normalizePhone(input: string): string {
  return input.replace(/\D/g, "").replace(/^98/, "0");
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

export function registerUser(user: UserRecord): { ok: true } | { ok: false; error: string } {
  const phone = normalizePhone(user.phone);
  if (!isValidPhone(phone)) return { ok: false, error: "شماره موبایل معتبر نیست" };
  if (!user.name.trim()) return { ok: false, error: "نام را وارد کنید" };
  const users = loadUsers();
  if (users.some((u) => u.phone === phone)) {
    return { ok: false, error: "این شماره قبلاً ثبت شده" };
  }
  users.push({ ...user, phone, name: user.name.trim() });
  saveUsers(users);
  return { ok: true };
}
