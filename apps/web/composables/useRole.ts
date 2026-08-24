export type DemoRole = "member" | "organizer" | "admin";

export function useRole() {
  const role = useState<DemoRole>("demo-role", () => "member");

  const roles: { id: DemoRole; label: string; path: string }[] = [
    { id: "member", label: "کاربر", path: "/" },
    { id: "organizer", label: "صندوق‌دار", path: "/organizer" },
    { id: "admin", label: "ادمین", path: "/admin" },
  ];

  function setRole(next: DemoRole) {
    role.value = next;
  }

  return { role, roles, setRole };
}
