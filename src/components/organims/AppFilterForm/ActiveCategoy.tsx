import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useFiltersStore} from '@/store/useFiltersStore';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

type TProps = {
  onPress: () => void;
};
export default function ActiveCategoy({onPress}: TProps) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {activeCategory, activeSubCategory, categories, subCategories} =
    useFiltersStore();

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
    <TouchableOpacity onPress={onPress} style={{flexDirection: 'row', gap: 8}}>
      <CathegoryPick />
      {!!activeCategory && (
        <>
          <Text style={{color: colors.text}}>/</Text>
          <SubCathegoryPick />
        </>
      )}
    </TouchableOpacity>
  );
}
