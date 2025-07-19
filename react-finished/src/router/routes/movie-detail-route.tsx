import { createRoute } from '@tanstack/react-router';

import { DefaultLayout } from '$/router/layouts/default-layout';

export const MovieDetailRoute = createRoute({
  path: '/movies/$id',
  getParentRoute: () => DefaultLayout,
  component: () => <>Movie Detail</>,
});
