import React from 'react';
import {SafeAreaView} from 'react-native';
import RootNavigation from '@/navigations/RootNavigation';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <RootNavigation />
    </SafeAreaView>
  );
}

export default App;
