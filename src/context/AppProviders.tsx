import {PropsWithChildren} from 'react';
import {AppBottomSheetProvider} from './app-bottom-sheet';
import {AppQueryClientProvider} from './app-query-client';

export default function AppProviders({children}: PropsWithChildren) {
  return (
    <AppQueryClientProvider>
      <AppBottomSheetProvider>{children}</AppBottomSheetProvider>
    </AppQueryClientProvider>
  );
}
