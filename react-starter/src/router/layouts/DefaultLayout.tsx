import { createRoute, Outlet } from '@tanstack/react-router';

import { RootRoute } from '$/router/RootRoute';

export const DefaultLayout = createRoute({
  id: 'default-layout',
  getParentRoute: () => RootRoute,
  component: () => (
    <div className="container mx-auto h-screen w-full py-8">
      <Outlet />
    </div>
  ),
});
