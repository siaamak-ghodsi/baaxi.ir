import type { Session, UserRecord, UserRole } from "~/utils/auth-storage";
import {
  findUserByCredentials,
  findUserByPhone,
  loadSession,
  loadUsers,
  normalizePhone,
  registerUser,
  saveSession,
} from "~/utils/auth-storage";
import { validateNationalId } from "~/utils/national-id";

export function useAuth() {
  const session = useState<Session | null>("auth-session", () => null);
  const hydrated = useState("auth-hydrated", () => false);
  const userTick = useState("auth-user-tick", () => 0);

  const isLoggedIn = computed(() => !!session.value);

  function hydrate() {
    session.value = loadSession();
    hydrated.value = true;
  }

  function setSession(user: UserRecord) {
    const next: Session = {
      name: user.name,
      phone: user.phone,
      nationalId: user.nationalId,
      role: user.role,
    };
    session.value = next;
    saveSession(next);
  }

  function signup(name: string, phone: string, nationalId: string, role: UserRole) {
    const normalized = normalizePhone(phone);
    const idResult = validateNationalId(nationalId);
    if (!idResult.ok) return { ok: false as const, error: idResult.error };
    const result = registerUser({
      name,
      phone: normalized,
      nationalId: idResult.value,
      role,
      joinedFundIds: [],
    });
    if (!result.ok) return result;
    const user = findUserByPhone(normalized)!;
    setSession(user);
    return { ok: true as const };
  }

  function login(phone: string, nationalId: string) {
    const idResult = validateNationalId(nationalId);
    if (!idResult.ok) return { ok: false as const, error: idResult.error };
    const normalized = normalizePhone(phone);
    if (!/^09\d{9}$/.test(normalized)) {
      return { ok: false as const, error: "شماره موبایل معتبر نیست" };
    }
    const user = findUserByCredentials(normalized, idResult.value);
    if (!user) {
      return { ok: false as const, error: "کاربری با این مشخصات یافت نشد" };
    }
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

  function refreshUser() {
    userTick.value += 1;
  }

  function currentUser(): UserRecord | undefined {
    userTick.value;
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
    refreshUser,
  };
}
