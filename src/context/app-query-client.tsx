import {PropsWithChildren} from 'react';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';

export function AppQueryClientProvider({children}: PropsWithChildren) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
}
