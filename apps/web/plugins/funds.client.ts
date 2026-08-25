export default defineNuxtPlugin(() => {
  const { hydrate } = useFunds();
  hydrate();
});
