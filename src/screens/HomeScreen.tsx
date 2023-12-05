import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {HiUser} from '@/components/atoms/HiUser';
import {SCREEN_PADDING_HORIZONTAL, SECTIONS_GAP} from '@/constants';
import {AppSearchBar} from '@/components/moleculs/AppSearchBar';
import {GridCollection} from '@/components/organims/GridCollection';
import {useTheme} from '@react-navigation/native';
import {ProductsList} from '@/components/organims/ProductsList';
import {SubCategoriesList} from '@/components/moleculs/SubCategoriesList';

export default function HomeScreen() {
  const {colors} = useTheme();

  const [selectedSubCategory, setSelectedSubCategory] = React.useState<
    number | null
  >(null);

  return (
    <View style={{paddingHorizontal: SCREEN_PADDING_HORIZONTAL, flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{paddingTop: 24, paddingBottom: 4, gap: SECTIONS_GAP}}>
          <HiUser />
          <AppSearchBar />

          {/* {!selectedTag && ( */}
          <GridCollection
            title="New Arrivals"
            rightButton={
              <TouchableOpacity>
                <Text style={{color: colors.text}}>See all</Text>
              </TouchableOpacity>
            }
            items={[]}
          />
          <SubCategoriesList
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
          />
        </View>
        <ProductsList selectedSubCategory={selectedSubCategory} />
      </View>
    </View>
  );
}
