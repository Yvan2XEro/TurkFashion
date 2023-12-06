import {View, Text, Pressable, ScrollView} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {useTheme} from '@react-navigation/native';
import {SCREEN_PADDING_HORIZONTAL} from '@/constants';
import {useAppBottomSheet} from '@/context/app-bottom-sheet';
import {useAuthStore} from '@/store/useAuthStore';
import EditName from '@/components/moleculs/EditProfilForms/EditName';
import {TouchableOpacity} from 'react-native';

export default function EditProfileScreen() {
  const {presentAppBottomSheet, dismissAppBottomSheet} = useAppBottomSheet();
  const {user} = useAuthStore();

  return (
    <ScrollView style={{padding: SCREEN_PADDING_HORIZONTAL}}>
      <View style={{gap: 16}}>
        <EditFieldTrigger
          value={user?.name}
          label="Name"
          onPress={() =>
            presentAppBottomSheet(
              <FormWrapper onCancel={dismissAppBottomSheet} title="Edit name">
                <EditName
                  value={user?.name}
                  onSuccess={dismissAppBottomSheet}
                />
              </FormWrapper>,
            )
          }
        />
        <EditFieldTrigger
          value={user?.name}
          label="Phone number"
          onPress={() =>
            presentAppBottomSheet(
              <EditName value={user?.name} onSuccess={dismissAppBottomSheet} />,
            )
          }
        />
      </View>
    </ScrollView>
  );
}

type TProps = {
  value?: string;
  label: string;
  onPress: () => void;
};

function EditFieldTrigger({value, label, onPress}: TProps) {
  const {colors} = useTheme();
  return (
    <View>
      <Text style={{color: colors.text}}>{label} :</Text>
      <Pressable
        onPress={onPress}
        style={{
          height: 50,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: 16,
          justifyContent: 'center',
        }}>
        <Text style={{color: colors.text}}>{value}</Text>
      </Pressable>
    </View>
  );
}

function FormWrapper({
  children,
  onCancel,
  title,
}: PropsWithChildren<{title: string; onCancel: () => void}>) {
  const {colors} = useTheme();

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: colors.border,
          paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
        }}>
        <Text
          style={{
            flex: 1,
            fontSize: 20,
            fontWeight: '700',
            color: colors.text,
          }}>
          {title}
        </Text>
      </View>
      <View style={{padding: SCREEN_PADDING_HORIZONTAL}}>{children}</View>
    </View>
  );
}
