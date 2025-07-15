import { createRoute } from '@tanstack/react-router';

import { HomePage } from '$/pages/HomePage';
import { DefaultLayout } from '$/router/layouts/DefaultLayout';

export const HomepageRoute = createRoute({
  path: '/',
  getParentRoute: () => DefaultLayout,
  component: HomePage,
});
