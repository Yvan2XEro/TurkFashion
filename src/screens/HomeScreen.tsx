import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import {HiUser} from '@/components/atoms/HiUser';
import {SCREEN_PADDING_HORIZONTAL} from '@/constants';

export default function HomeScreen() {
  return (
    <ScrollView style={{paddingHorizontal: SCREEN_PADDING_HORIZONTAL}}>
      <SafeAreaView style={{paddingVertical: 24, gap: 24}}>
        <HiUser />
      </SafeAreaView>
    </ScrollView>
  );
}
