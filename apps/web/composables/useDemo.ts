export function useDemo() {
  const isLoggedIn = useState<boolean>("demo-logged-in", () => false);

  function login() {
    isLoggedIn.value = true;
  }

  return { isLoggedIn, login };
}
