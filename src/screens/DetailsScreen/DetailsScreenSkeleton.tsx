import {AppSkeletonWrapper} from '@/components/atoms/AppSkeletonWrapper';
import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const IMG_HEIGHT = 300;

export function ImageSkeleton() {
  return (
    <AppSkeletonWrapper>
      <View>
        <View style={{width, height: IMG_HEIGHT}} />
      </View>
    </AppSkeletonWrapper>
  );
}

export function ProductDetailsCardSkeleton() {
  return (
    <AppSkeletonWrapper>
      <View
        style={{
          aspectRatio: 2 / 3,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 24,
        }}>
        <View style={StyleSheet.absoluteFill} />
      </View>
    </AppSkeletonWrapper>
  );
}

export function FooterSkeleton() {
  return (
    <AppSkeletonWrapper>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{width: 50, height: 25}} />
        <View style={{width: 120, height: 40, borderRadius: 100}} />
      </View>
    </AppSkeletonWrapper>
  );
}

export function DetailsSkeleton() {
  return (
    <AppSkeletonWrapper>
      <View style={{gap: 4}}>
        <View style={{width: 280, height: 16}} />
        <View style={{width: 360, height: 16}} />
        <View style={{width: 300, height: 16}} />
        <View style={{width: 360, height: 16}} />
        <View style={{width: 360, height: 16}} />
        <View style={{width: 280, height: 24, marginVertical: 8}} />
        <View style={{width: 360, height: 16}} />
        <View style={{width: 360, height: 16}} />
        <View style={{width: 300, height: 16}} />
        <View style={{width: 360, height: 16}} />
        <View style={{width: 120, height: 16}} />
        <View style={{width: 280, height: 16}} />
        <View style={{width: 120, height: 16}} />
        <View style={{width: 170, height: 16}} />
      </View>
    </AppSkeletonWrapper>
  );
}
const styles = StyleSheet.create({
  infoContainerSkeleton: {
    padding: 300,
  },
  nameSkeleton: {
    height: 26,
    width: '80%',
    marginBottom: 16,
  },
  categorySkeleton: {
    height: 18,
    width: '60%',
    marginBottom: 16,
  },
  reviewsSkeleton: {
    height: 20,
    width: '30%',
    marginBottom: 16,
  },
  detailsSkeleton: {
    height: 20,
    width: '40%',
    marginBottom: 16,
  },
  colorSkeleton: {
    height: 16,
    width: '20%',
    marginBottom: 16,
  },
  descriptionSkeleton: {
    height: 100,
    width: '100%',
  },
});
