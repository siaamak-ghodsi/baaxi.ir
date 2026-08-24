export default defineNuxtRouteMiddleware((to) => {
  const authMeta = to.meta.auth as "member" | "organizer" | undefined;
  const { session, hydrated, panelPath } = useAuth();

  if (to.path === "/login" || to.path === "/signup") {
    if (hydrated.value && session.value) {
      return navigateTo(panelPath());
    }
    return;
  }

  if (to.path === "/") return;

  if (!authMeta) return;

  if (!hydrated.value) return;

  if (!session.value) {
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
  }

  if (authMeta === "member" && session.value.role !== "member") {
    return navigateTo(panelPath("organizer"));
  }
  if (authMeta === "organizer" && session.value.role !== "organizer") {
    return navigateTo(panelPath("member"));
  }
});
