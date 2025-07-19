import { createRoute } from '@tanstack/react-router';

import { HomePage } from '$/pages/home-page';
import { DefaultLayout } from '$/router/layouts/default-layout';

export const HomepageRoute = createRoute({
  path: '/',
  getParentRoute: () => DefaultLayout,
  component: HomePage,
});
