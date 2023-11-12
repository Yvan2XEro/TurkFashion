import {PropsWithChildren} from 'react';
import {AppBottomSheetProvider} from './app-bottom-sheet';
import {AppStateInitProvider} from './app-state-init';

export default function AppProviders({children}: PropsWithChildren) {
  return (
    <AppBottomSheetProvider>
      <AppStateInitProvider>{children}</AppStateInitProvider>
    </AppBottomSheetProvider>
  );
}
