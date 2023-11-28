import React, {useCallback, useLayoutEffect, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
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
import {AppButton} from '@/components/atoms/AppButton';
import {useColorScheme} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {FloatingCart} from '@/components/moleculs/FloatingCart';
import {useQuery} from '@tanstack/react-query';
import {universalRetrieve} from '@/lib/api/universalfetch';
import {Product} from '@/lib/api/products';
import {
  DetailsSkeleton,
  FooterSkeleton,
  ImageSkeleton,
} from './DetailsScreenSkeleton';

const {width} = Dimensions.get('window');
const IMG_HEIGHT = 300;

type TProps = RootStackScreenProps<'DetailsScreen'>;
const DetailsPage = ({route, navigation}: TProps) => {
  const id = route.params.id;
  const {data: product, isLoading} = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      return await universalRetrieve<Product>({
        path: `/products/${id}`,
      });
    },
  });
  const {colors} = useTheme();
  const colorSheme = useColorScheme();

  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const onDecrease = useCallback(() => {}, []);

  const onIncrease = useCallback(() => {}, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTransparent: true,

      headerBackground: () => (
        <>
          <Animated.View
            style={[
              headerAnimatedStyle,
              {paddingTop},
              {
                height: 100,
                borderBottomWidth: StyleSheet.hairlineWidth,
                backgroundColor: colors.card,
                borderColor: colors.background,
              },
            ]}></Animated.View>
        </>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}>
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
    <View style={[{flex: 1}]}>
      <Animated.ScrollView
        contentContainerStyle={{paddingBottom: 100}}
        ref={scrollRef}
        scrollEventThrottle={16}>
        {isLoading && <ImageSkeleton />}
        {!isLoading && (
          <Animated.Image
            source={{
              uri: product?.photoUrl,
            }}
            style={[{height: IMG_HEIGHT, width: width}, imageAnimatedStyle]}
            resizeMode="cover"
          />
        )}

        {isLoading && <DetailsSkeleton />}

        {!isLoading && (
          <View style={[{padding: 24, backgroundColor: colors.card}]}>
            <Text
              style={[
                {
                  fontSize: 26,
                  fontWeight: 'bold',
                  fontFamily: 'mon-sb',
                  color: colors.text,
                },
              ]}>
              {product?.name}
            </Text>
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
                {product?.subCategory.category.name} /{' '}
                {product?.subCategory.name}
              </Text>
            </>

            <View style={{flexDirection: 'row', gap: 4}}>
              <Ionicons color={colors.text} name="star" size={16} />
              <Text
                style={[
                  {
                    fontSize: 16,
                    fontFamily: 'mon-sb',
                  },
                  {color: colors.text},
                ]}>
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
              {product?.filtersValues.map(({name, value}, i) => (
                <Text
                  key={i}
                  style={[{color: colors.text, alignItems: 'center'}]}>
                  <IonIcons name="information-circle-outline" size={16} />{' '}
                  <Text style={{fontWeight: '600'}}>{name}</Text> : {value}
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
            <Text style={{color: colors.text}}>{product?.description}</Text>
          </View>
        )}
      </Animated.ScrollView>

      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderTopColor: 'grey',
            borderTopWidth: StyleSheet.hairlineWidth,
          },
          {backgroundColor: colors.card},
        ]}
        entering={SlideInDown.delay(200)}>
        {isLoading && <FooterSkeleton />}
        {!isLoading && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                height: '100%',
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}>
              <Text
                style={[
                  {fontSize: 18, fontFamily: 'mon-sb'},
                  {color: colors.text},
                ]}>
                $10$
              </Text>
            </TouchableOpacity>

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
                  10
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

            <AppButton onPress={() => {}}>
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
          </View>
        )}
      </Animated.View>

      <FloatingCart />
    </View>
  );
};

const styles = StyleSheet.create({
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailsPage;
