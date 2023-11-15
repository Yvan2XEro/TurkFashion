import React, {useLayoutEffect} from 'react';
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
import {useNavigation} from '@react-navigation/core';
import {useTheme} from '@react-navigation/native';
import {paddingTop} from '@/constants/layout';
import {RootStackScreenProps} from '@/navigations/root-navigation';
import useFirestoreItemData from '@/hooks/useFirestoreItemData';
import {Product} from '@/types/models';
import useSubcategoryData from '@/hooks/useSubcategoryData';

const {width} = Dimensions.get('window');
const IMG_HEIGHT = 300;

const DetailsPage = ({
  route,
  navigation,
}: RootStackScreenProps<'DetailsScreen'>) => {
  const {colors} = useTheme();
  const {data} = useFirestoreItemData<Product>({
    collection: 'products',
    uuid: route.params.id,
  });
  const {subCategory} = useSubcategoryData(data?.subCategoryUuid || '');

  const scrollRef = useAnimatedRef<Animated.ScrollView>();

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
              {backgroundColor: colors.card, borderColor: colors.border},
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
  }, []);

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
            uri,
          }}
          style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover"
        />

        <View style={[styles.infoContainer, {backgroundColor: colors.card}]}>
          <Text style={[styles.name, {color: colors.text}]}>{data?.name}</Text>
          <Text style={[styles.location, {color: colors.text}]}>
            {subCategory?.name}
          </Text>
          <Text style={[styles.rooms, {color: colors.text}]}>
            ghjkl ghj ghjkl hjk
          </Text>
          <View style={{flexDirection: 'row', gap: 4}}>
            <Ionicons name="star" size={16} />
            <Text style={[styles.ratings, {color: colors.text}]}>reviews</Text>
          </View>
          <View style={[styles.divider, {borderColor: colors.border}]} />

          <View style={styles.hostView}>
            <Image source={{uri}} style={styles.host} />

            <View>
              <Text style={{fontWeight: '500', fontSize: 16}}>
                Hosted by ghjk
              </Text>
              <Text>Host since ghjkl</Text>
            </View>
          </View>

          <View style={[styles.divider, {borderColor: colors.border}]} />

          <Text style={{color: colors.text}}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
            ullam omnis veniam quidem. Totam, exercitationem fugit! Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Maiores ullam omnis
            veniam quidem. Totam, exercitationem fugit! Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Maiores ullam omnis veniam
            quidem. Totam, exercitationem fugit! Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Maiores ullam omnis veniam quidem.
            Totam, exercitationem fugit! Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Maiores ullam omnis veniam quidem. Totam,
            exercitationem fugit! Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Maiores ullam omnis veniam quidem. Totam,
            exercitationem fugit! Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Maiores ullam omnis veniam quidem. Totam,
            exercitationem fugit!
          </Text>
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
            <Text style={[styles.footerPrice, {color: colors.text}]}>€678</Text>
            <Text>night</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[defaultStyles.btn, {paddingRight: 20, paddingLeft: 20}]}>
            <Text style={[defaultStyles.btnText, {color: colors.text}]}>
              Reserve
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
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
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'mon-sb',
  },
  rooms: {
    fontSize: 16,
    color: 'gray',
    marginVertical: 4,
    fontFamily: 'mon',
  },
  ratings: {
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'grey',
  },
  hostView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: 'grey',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
