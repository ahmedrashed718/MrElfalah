import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {lotties, COLORS, FONTS} from '../../constants';

const LottieLoader = ({message = 'جاري التحميل...', style}) => {
  return (
    <View style={[styles.container, style]}>
      <LottieView
        source={lotties.loading}
        autoPlay
        loop
        style={styles.lottie}
      />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: RFValue(350),
    height: RFValue(350),
  },
  message: {
    // marginTop: RFValue(10),
    fontSize: RFValue(16),
    color: COLORS.text || '#333',
    textAlign: 'center',
    ...FONTS.body3,
  },
});

export default LottieLoader;
