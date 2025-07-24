import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { RouterProvider } from '@tanstack/react-router';

import { router } from '$/router/router';
import { queryClient } from '$/services/client';

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});

export const App = () => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <RouterProvider router={router} />
    </PersistQueryClientProvider>
  );
};
