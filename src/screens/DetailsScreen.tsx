import React, {useCallback, useLayoutEffect, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Share,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import {useTheme} from '@react-navigation/native';
import {paddingTop} from '@/constants/layout';
import {RootStackScreenProps} from '@/navigations/root-navigation';
import useFirestoreItemData from '@/hooks/useFirestoreItemData';
import {Product} from '@/types/models';
import useSubcategoryData from '@/hooks/useSubcategoryData';
import {AppButton} from '@/components/atoms/AppButton';
import {filtersObjects} from '@/helpers/filters';
import {useColorScheme} from 'react-native';
import {useCartStore} from '@/store/useCartStore';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {FloatingCart} from '@/components/moleculs/FloatingCart';

const {width} = Dimensions.get('window');
const IMG_HEIGHT = 300;

type TProps = RootStackScreenProps<'DetailsScreen'>;
const DetailsPage = ({route, navigation}: TProps) => {
  const {colors} = useTheme();
  const colorSheme = useColorScheme();
  const {
    items,
    increase,
    decrease,
    remove: removeItemFromCart,
  } = useCartStore();
  const {data} = useFirestoreItemData<Product>({
    collection: 'products',
    uuid: route.params.id,
  });
  const count = items[data?.uuid + ''];
  const {subCategory, category, filters} = useSubcategoryData({
    categoryUuid: data?.categoryUuid || null,
    subCategoryuuid: data?.subCategoryUuid || null,
  });

  const productFilters = useMemo(() => {
    if (!data || !filters || !filters.length) {
      return [];
    }
    return filtersObjects(data, filters);
  }, [data, filters]);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const onDecrease = useCallback(() => {
    if (count <= 1) {
      return removeItemFromCart(data?.uuid || '');
    }
    decrease(data?.uuid || '');
  }, [items, decrease, data?.uuid, count]);

  const onIncrease = useCallback(() => {
    increase(data?.uuid || '');
  }, [items, increase, data?.uuid]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTransparent: true,

      headerBackground: () => (
        <>
          <Animated.View
            style={[
              headerAnimatedStyle,
              styles.header,
              {paddingTop},
              {
                backgroundColor: colors.card,
                borderColor: colors.background,
              },
            ]}></Animated.View>
        </>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity
            style={[styles.roundButton, {backgroundColor: colors.card}]}>
            <Ionicons name="share-outline" size={22} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roundButton, {backgroundColor: colors.card}]}>
            <Ionicons name="heart-outline" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={[styles.roundButton, {backgroundColor: colors.card}]}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
      ),
    });
  }, [colorSheme]);

  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1],
          ),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  }, []);

  return (
    <View style={[styles.container]}>
      <Animated.ScrollView
        contentContainerStyle={{paddingBottom: 100}}
        ref={scrollRef}
        scrollEventThrottle={16}>
        <Animated.Image
          source={{
            uri: data?.photoUrl || 'https://source.unsplash.com/random',
          }}
          style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover"
        />

        <View style={[styles.infoContainer, {backgroundColor: colors.card}]}>
          <Text style={[styles.name, {color: colors.text}]}>{data?.name}</Text>
          {category && subCategory && (
            <>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 8,
                  fontWeight: '600',
                  color: colors.text,
                }}>
                Category
              </Text>
              <Text
                style={[
                  {
                    fontSize: 18,
                    fontFamily: 'mon-sb',
                    color: colors.text,
                  },
                ]}>
                {category?.name} / {subCategory?.name}
              </Text>
            </>
          )}

          <View style={{flexDirection: 'row', gap: 4}}>
            <Ionicons color={colors.text} name="star" size={16} />
            <Text style={[styles.ratings, {color: colors.text}]}>
              75 reviews
            </Text>
          </View>

          <Text
            style={{
              fontSize: 16,
              marginTop: 8,
              fontWeight: '600',
              color: colors.text,
            }}>
            Details
          </Text>
          <View>
            {productFilters?.map(({label, value}) => (
              <Text key={label} style={[{color: colors.text}]}>
                {label} : {value}
              </Text>
            ))}
          </View>

          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              marginTop: 8,
              color: colors.text,
            }}>
            Description
          </Text>
          <Text style={{color: colors.text}}>{data?.description}</Text>
        </View>
      </Animated.ScrollView>

      <Animated.View
        style={[defaultStyles.footer, {backgroundColor: colors.card}]}
        entering={SlideInDown.delay(200)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={styles.footerText}>
            <Text style={[styles.footerPrice, {color: colors.text}]}>
              ${data?.price}
            </Text>
          </TouchableOpacity>

          {items[data?.uuid + ''] && items[data?.uuid + ''] > 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                backgroundColor: colors.primary,
                padding: 6,
                borderRadius: 100,
              }}>
              <TouchableOpacity
                onPress={onDecrease}
                style={{
                  backgroundColor: colors.card,
                  width: 34,
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 34,
                }}>
                <IonIcons name="remove" size={20} color={colors.text} />
              </TouchableOpacity>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons
                  name="cart-outline"
                  size={24}
                  color={colors.background}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: colors.background,
                  }}>
                  {count}
                </Text>
              </View>
              <TouchableOpacity
                onPress={onIncrease}
                style={{
                  backgroundColor: colors.card,
                  width: 34,
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 34,
                }}>
                <IonIcons name="add" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          )}

          {!!data?.uuid && !items[data?.uuid + ''] && (
            <AppButton onPress={() => increase(data.uuid)}>
              <View
                style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
                <Ionicons
                  name="cart-outline"
                  size={24}
                  color={colors.background}
                />
                <Text style={{color: colors.background}}>Add to cart</Text>
              </View>
            </AppButton>
          )}
        </View>
      </Animated.View>

      <FloatingCart />
    </View>
  );
};

const uri =
  'https://images.unsplash.com/photo-1627225924765-552d49cf47ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
  infoContainer: {
    padding: 24,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
  },

  ratings: {
    fontSize: 16,
    fontFamily: 'mon-sb',
  },

  footerText: {
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: 'mon-sb',
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  header: {
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'mon',
  },
});

export default DetailsPage;

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFFFF',
  },
  inputField: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ABABAB',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  btn: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'mon-b',
  },
  btnIcon: {
    position: 'absolute',
    left: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: 'grey',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
