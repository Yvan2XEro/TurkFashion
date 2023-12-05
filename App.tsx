import React from 'react';
import RootNavigation from '@/navigations/root-navigation';
// import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App() {
  return (
    // <SafeAreaProvider style={{flex: 1}}>
    <GestureHandlerRootView style={{flex: 1}}>
      <RootNavigation />
    </GestureHandlerRootView>
    // {/* </SafeAreaProvider> */}
  );
}

export default App;
