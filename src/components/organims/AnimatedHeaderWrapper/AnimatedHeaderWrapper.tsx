import {SCREEN_PADDING_HORIZONTAL} from '@/constants';
import {useTheme} from '@react-navigation/native';
import React, {useRef} from 'react';
import {View, Text, ScrollView, Animated, StyleSheet} from 'react-native';

const AnimatedTitle = Animated.createAnimatedComponent(Text);

type TProps = {
  children: React.ReactNode;
  title: string;
};
export default function AnimatedHeaderWrapper(props: TProps) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });

  const titleTranslate = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
        <View style={styles.content}>{props.children}</View>
      </ScrollView>

      <AnimatedTitle
        style={[
          styles.title,
          {
            opacity: titleOpacity,
            color: colors.text,
            transform: [{scale: titleScale}, {translateY: titleTranslate}],
          },
        ]}>
        {props.title}
      </AnimatedTitle>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
    paddingTop: 56,
  },
  title: {
    position: 'absolute',
    top: 16,
    left: 16,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black', // Adjust the color as needed
  },
});
