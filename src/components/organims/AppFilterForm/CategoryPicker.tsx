import {View, Text} from 'react-native';
import React, {useMemo} from 'react';
import {useTheme} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useFiltersStore} from '@/store/useFiltersStore';
import {Image} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useQuery} from '@tanstack/react-query';
import {universalFetch} from '@/lib/api/universalfetch';
import {SubCategory} from '@/lib/api/sub-categories';
import {Category} from '@/lib/api/categories';
import {CategoryItem, CategoryItemSkeleton} from './CategoryItem';

type TProps = {
  onClose: () => void;
};
export default function CategoryPicker({onClose}: TProps) {
  const theme = useTheme();
  const {isPending, data: subCategories} = useQuery({
    queryKey: ['sub-categories'],
    queryFn: () =>
      universalFetch<SubCategory>({
        limit: 100,
        page: 1,
        path: '/sub-categories',
      }),
  });
  const {isPending: categoriesPending, data: categories} = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      universalFetch<Category>({
        limit: 100,
        page: 1,
        path: '/categories',
      }),
  });
  const {
    setActiveCategory,
    activeCategory,
    activeSubCategory,
    setActiveSubCategory,
  } = useFiltersStore();
  const category = useMemo(() => {
    return categories?.data?.find(c => c.id === activeCategory?.id);
  }, [categories, activeCategory]);

  const subCategory = useMemo(() => {
    if (!subCategories?.data) return null;
    return subCategories.data.find(c => c.id === activeSubCategory?.id);
  }, [subCategories?.data, activeSubCategory]);

  function RenderContent() {
    if (isPending) {
      return (
        <>
          {Array.from({length: 10}).map((_, i) => (
            <CategoryItemSkeleton key={i} />
          ))}
        </>
      );
    }
    return (
      <>
        {!category ? (
          <>
            {categories?.data.map((c, i) => {
              const isACtive = c.id === activeCategory?.id;
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
                      setActiveCategory(c);
                    }
                  }}
                />
              );
            })}
          </>
        ) : (
          <>
            {subCategories?.data
              .filter(c => c.category.id === category.id)
              .map((c, i) => {
                const isACtive = c.id === activeSubCategory?.id;
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
                        setActiveSubCategory(c);
                      }
                      onClose();
                    }}
                  />
                );
              })}
          </>
        )}
      </>
    );
  }

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
          <RenderContent />
        </View>
      </BottomSheetScrollView>
    </View>
  );
}
