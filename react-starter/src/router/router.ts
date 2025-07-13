import { createRouter } from '@tanstack/react-router';

import { config } from '$/config';
import { DefaultLayout } from '$/router/layouts/DefaultLayout';
import { RootRoute } from '$/router/RootRoute';
import { HomepageRoute } from '$/router/routes/HomepageRoute';

export const router = createRouter({
  defaultPreload: config.router.defaultPreload,
  defaultStaleTime: config.router.defaultStaleTime,
  routeTree: RootRoute.addChildren([DefaultLayout.addChildren([HomepageRoute])]),
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
