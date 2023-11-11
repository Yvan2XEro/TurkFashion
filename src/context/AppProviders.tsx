import {PropsWithChildren} from 'react';
import {AppBottomSheetProvider} from './app-bottom-sheet';

export default function AppProviders({children}: PropsWithChildren) {
  return <AppBottomSheetProvider>{children}</AppBottomSheetProvider>;
}
