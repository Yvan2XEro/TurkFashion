import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useAuthStore} from '@/store/useAuthStore';
import {AppAvatar} from '../AppAvatar';

export default function HiUser() {
  const {colors} = useTheme();
  const {user} = useAuthStore();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      }}>
      <AppAvatar uri={user?.photo} />
      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 8,
            color: colors.text,
          }}
          numberOfLines={1}>
          Hi, {user?.name || 'Guest'} 👋
        </Text>
        <Text style={{color: colors.text, opacity: 0.75}} numberOfLines={1}>
          Discover fashion that suit your style
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: 52,
          aspectRatio: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 52,
          borderWidth: 1,
          borderColor: colors.border,
        }}>
        <IonIcons name="notifications-outline" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}
