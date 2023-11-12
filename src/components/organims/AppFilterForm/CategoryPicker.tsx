import {View, Text} from 'react-native';
import React, {useMemo} from 'react';
import {useTheme} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useFiltersStore} from '@/store/useFiltersStore';
import {Image} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';

type TProps = {
  onClose: () => void;
};
export default function CategoryPicker({onClose}: TProps) {
  const theme = useTheme();
  const {
    categories,
    setActiveCategory,
    activeCategory,
    activeSubCategory,
    subCategories,
    setActiveSubCategory,
  } = useFiltersStore();
  const category = useMemo(() => {
    return categories?.find(c => c.uuid === activeCategory);
  }, [categories, activeCategory]);

  const subCategory = useMemo(() => {
    return subCategories?.find(c => c.uuid === activeSubCategory);
  }, [subCategories, activeSubCategory]);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 24,
        }}>
        <Text
          style={{
            flex: 1,
            fontSize: 20,
            fontWeight: '700',
            color: theme.colors.text,
          }}>
          Cathegorie
        </Text>
        <TouchableOpacity onPress={() => setActiveCategory(null)}>
          <Text
            style={{
              color: theme.colors.text,
              opacity: 0.5,
            }}>
            Reset
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: 24,
          gap: 24,
          paddingVertical: 24,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            if (!activeCategory) return onClose();
            setActiveCategory(null);
          }}>
          <IonIcons
            style={{
              color: theme.colors.text,
              opacity: 0.5,
            }}
            name="arrow-back"
            size={24}
            color={theme.colors.text}
          />
          <Text
            style={{
              color: theme.colors.text,
              opacity: 0.5,
            }}>
            Back
          </Text>
        </TouchableOpacity>
        {!!category && (
          <Text
            style={{
              color: theme.colors.text,
            }}>
            {category.name}
            {'   '}/{'   '}
            {subCategory?.name}
          </Text>
        )}
      </View>
      <BottomSheetScrollView style={{flex: 1}}>
        <View style={{paddingHorizontal: 24, gap: 24}}>
          {!category ? (
            <>
              {categories.map((c, i) => {
                const isACtive = c.uuid === activeCategory;
                return (
                  <CategoryItem
                    key={i}
                    name={c.name}
                    photoUrl={c.photoUrl}
                    isACtive={isACtive}
                    onPress={() => {
                      if (isACtive) {
                        setActiveCategory(null);
                      } else {
                        setActiveCategory(c.uuid);
                      }
                    }}
                  />
                );
              })}
            </>
          ) : (
            <>
              {subCategories
                .filter(c => c.categoryUuid === category.uuid)
                .map((c, i) => {
                  const isACtive = c.uuid === activeSubCategory;
                  return (
                    <CategoryItem
                      key={i}
                      name={c.name}
                      photoUrl={c.photoUrl}
                      isACtive={isACtive}
                      onPress={() => {
                        if (isACtive) {
                          setActiveSubCategory(null);
                        } else {
                          setActiveSubCategory(c.uuid);
                        }
                        onClose();
                      }}
                    />
                  );
                })}
            </>
          )}
        </View>
      </BottomSheetScrollView>
    </View>
  );
}

type CategoryItemProps = {
  onPress: () => void;
  name: string;
  photoUrl?: string;
  isACtive: boolean;
};
function CategoryItem({onPress, name, photoUrl, isACtive}: CategoryItemProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        borderRadius: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: isACtive ? theme.colors.border : 'transparent',
      }}>
      {!!photoUrl && (
        <Image
          source={{uri: photoUrl}}
          style={{width: 40, height: 40, borderRadius: 40}}
        />
      )}
      <Text
        style={{
          color: theme.colors.text,
          fontSize: 16,
        }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}
