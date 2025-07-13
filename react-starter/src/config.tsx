export const config = {
  router: { defaultPreload: 'intent' as const, defaultStaleTime: 1000 * 60 * 10 },
  queryClient: { defaultStaleTime: 1000 * 60 * 10 },
};
