import React from 'react';
import {AnimatedHeaderWrapper} from '@/components/organims/AnimatedHeaderWrapper';
import {View, Text, Pressable} from 'react-native';
import {useAuthStore} from '@/store/useAuthStore';
import {useTheme} from '@react-navigation/native';
import {AppAvatar} from '@/components/atoms/AppAvatar';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useAppAuth} from '@/context/app-auth';

export default function ProfileScreen() {
  const {user} = useAuthStore();
  const {logout} = useAppAuth();
  const {colors} = useTheme();

  return (
    <AnimatedHeaderWrapper title="Profil">
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.card,
          padding: 24,
          borderRadius: 24,
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
            {user?.name || 'Guest'}
          </Text>
          <Pressable>
            <Text
              style={{
                color: colors.text,
                opacity: 0.75,
                textDecorationLine: 'underline',
              }}
              numberOfLines={1}>
              Edit your profile
            </Text>
          </Pressable>
        </View>
      </View>

      <MenuItem
        ionIcon="location-outline"
        label="Addresses"
        onPress={() => {}}
      />
      <MenuItem ionIcon="wallet-outline" label="Orders" onPress={() => {}} />
      <MenuItem
        ionIcon="location-outline"
        label="Addresses"
        onPress={() => {}}
      />
      <MenuItem ionIcon="log-out-outline" label="Logout" onPress={logout} />
    </AnimatedHeaderWrapper>
  );
}

type TProps = {
  ionIcon: string;
  label: string;
  onPress: () => void;
};

function MenuItem({ionIcon, label, onPress}: TProps) {
  const {colors} = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        paddingVertical: 12,
        borderBottomWidth: 0.2,
        borderBottomColor: colors.border,
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
        <IonIcons color={colors.text} size={20} name={ionIcon} />
        <Text style={{color: colors.text, fontSize: 16}}>{label}</Text>
      </View>
      <IonIcons color={colors.text} size={18} name="chevron-forward" />
    </Pressable>
  );
}
