import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useFiltersStore} from '@/store/useFiltersStore';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import IonIcons from 'react-native-vector-icons/Ionicons';

type TProps = {
  onPress: () => void;
};
export default function ActiveCategoy({onPress}: TProps) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {
    activeCategory,
    activeSubCategory,
    categories,
    subCategories,
    setActiveCategory,
  } = useFiltersStore();

  function CathegoryPick() {
    const category = categories?.find(c => c.uuid === activeCategory);
    return (
      <View>
        <Text style={{textDecorationLine: 'underline', color: colors.text}}>
          {category?.name || t('All')}
        </Text>
      </View>
    );
  }
  function SubCathegoryPick() {
    const subcategory = subCategories?.find(c => c.uuid === activeSubCategory);
    return (
      <View>
        <Text style={{textDecorationLine: 'underline', color: colors.text}}>
          {subcategory?.name || t('All')}
        </Text>
      </View>
    );
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        borderColor: colors.border,
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{flexDirection: 'row', gap: 8, flex: 1}}>
        <CathegoryPick />
        {!!activeCategory && (
          <>
            <Text style={{color: colors.text}}>/</Text>
            <SubCathegoryPick />
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setActiveCategory(null)}
        style={{flexDirection: 'row', gap: 8, paddingHorizontal: 8}}>
        <IonIcons name="close" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}
