import {AppSheetBackdrop} from '@/components/atoms/AppSheetBackdrop';
import {SCREEN_PADDING_HORIZONTAL} from '@/constants';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useTheme} from '@react-navigation/native';
import React, {PropsWithChildren, useCallback, useRef, useState} from 'react';
import {View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const AppBottomSheetContext = React.createContext({
  presentAppBottomSheet: (c: React.ReactNode) => {},
  dismissAppBottomSheet: () => {},
});

export function AppBottomSheetProvider({children}: PropsWithChildren) {
  const {colors} = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [component, setComponent] = useState<React.ReactNode>();

  const presentAppBottomSheet = useCallback(
    (c: React.ReactNode) => {
      setComponent(c);
      bottomSheetModalRef.current?.present();
    },
    [bottomSheetModalRef.current, setComponent],
  );

  const dismissAppBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    setComponent(undefined);
  }, [bottomSheetModalRef.current, setComponent]);

  return (
    <AppBottomSheetContext.Provider
      value={{presentAppBottomSheet, dismissAppBottomSheet}}>
      {children}
      <BottomSheetModalProvider>
        <BottomSheetModal
          snapPoints={['85%']}
          index={0}
          ref={bottomSheetModalRef}
          backdropComponent={props => <AppSheetBackdrop {...props} />}
          backgroundStyle={{
            borderRadius: 24,
            backgroundColor: colors.card,
          }}
          handleIndicatorStyle={{
            backgroundColor: colors.primary,
          }}>
          {component}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </AppBottomSheetContext.Provider>
  );
}

export function useAppBottomSheet() {
  const context = React.useContext(AppBottomSheetContext);
  if (context === undefined) {
    throw new Error(
      'useAppBottomSheet must be used within a AppBottomSheetProvider',
    );
  }
  return context;
}
