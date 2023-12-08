import {PropsWithChildren} from 'react';
import {AppBottomSheetProvider} from './app-bottom-sheet';
import {AppQueryClientProvider} from './app-query-client';
import {AppAuthProvider} from './app-auth';

export default function AppProviders({children}: PropsWithChildren) {
  return (
    <AppQueryClientProvider>
      <AppAuthProvider>
        <AppBottomSheetProvider>{children}</AppBottomSheetProvider>
      </AppAuthProvider>
    </AppQueryClientProvider>
  );
}
