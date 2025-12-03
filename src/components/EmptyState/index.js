import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {lotties, COLORS, FONTS} from '../../constants';

const EmptyState = ({message = 'لا توجد بيانات متاحة حالياً', style}) => {
  return (
    <View style={[styles.container, style]}>
      <LottieView
        source={lotties.empty}
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
    paddingVertical: RFValue(50),
  },
  lottie: {
    width: RFValue(250),
    height: RFValue(250),
  },
  message: {
    marginTop: RFValue(15),
    fontSize: RFValue(16),
    color: COLORS.text || '#666',
    textAlign: 'center',
    ...FONTS.body3,
  },
});

export default EmptyState;

