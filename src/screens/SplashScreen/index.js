import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Dimensions, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, lotties} from '../../constants';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');

export default function SplashScreen({onAnimationComplete}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.container}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{scale: scaleAnim}, {rotate: spin}],
            },
          ]}>
          <Animated.Image
            source={require('../../assets/images/falah1-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
        <LottieView
          source={lotties.splachLoading}
          autoPlay
          loop
          style={styles.lottie}
        />

        {/* Decorative Elements */}
        <Animated.View
          style={[
            styles.circle1,
            {
              opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.1],
              }),
            },
          ]}
        />
        <Animated.View
          style={[
            styles.circle2,
            {
              opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.15],
              }),
            },
          ]}
        />
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.6,
    height: width * 0.6,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  circle1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: COLORS.white,
  },
  circle2: {
    position: 'absolute',
    bottom: -150,
    left: -150,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: COLORS.white,
  },
  lottie: {
    // position: 'absolute',
    width: 100,
    height: 100,
    // bottom: -20,
  },
});
