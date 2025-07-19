import { createRoute, Outlet } from '@tanstack/react-router';

import { RootRoute } from '$/router/root-route';

export const DefaultLayout = createRoute({
  id: 'default-layout',
  getParentRoute: () => RootRoute,
  component: () => (
    <div className="container mx-auto h-screen w-full p-5">
      <Outlet />
    </div>
  ),
});
