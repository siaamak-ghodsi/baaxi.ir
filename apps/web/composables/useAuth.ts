import type { Session, UserRecord, UserRole } from "~/utils/auth-storage";
import {
  findUserByPhone,
  loadSession,
  loadUsers,
  normalizePhone,
  registerUser,
  saveSession,
} from "~/utils/auth-storage";

export function useAuth() {
  const session = useState<Session | null>("auth-session", () => null);
  const hydrated = useState("auth-hydrated", () => false);

  const isLoggedIn = computed(() => !!session.value);

  function hydrate() {
    session.value = loadSession();
    hydrated.value = true;
  }

  function setSession(user: UserRecord) {
    const next: Session = { name: user.name, phone: user.phone, role: user.role };
    session.value = next;
    saveSession(next);
  }

  function signup(name: string, phone: string, role: UserRole) {
    const normalized = normalizePhone(phone);
    const result = registerUser({ name, phone: normalized, role, joinedFundIds: [] });
    if (!result.ok) return result;
    const user = findUserByPhone(normalized)!;
    setSession(user);
    return { ok: true as const };
  }

  function login(phone: string) {
    const user = findUserByPhone(phone);
    if (!user) return { ok: false as const, error: "کاربری با این شماره یافت نشد" };
    setSession(user);
    return { ok: true as const };
  }

  function logout() {
    session.value = null;
    saveSession(null);
  }

  function panelPath(role?: UserRole) {
    const r = role ?? session.value?.role;
    if (r === "organizer") return "/organizer";
    return "/member";
  }

  function currentUser(): UserRecord | undefined {
    if (!session.value) return undefined;
    return loadUsers().find((u) => u.phone === session.value!.phone);
  }

  return {
    session,
    hydrated,
    isLoggedIn,
    hydrate,
    signup,
    login,
    logout,
    panelPath,
    currentUser,
  };
}
