import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS} from '../../constants';

export const toastConfig = {
  success: ({text1, text2}) => (
    <View style={styles.toastContainer}>
      <LinearGradient
        colors={['#7B60ED', '#9B7DFF', '#7B60ED']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.toastGradient}>
        <View style={styles.toastContent}>
          <View style={styles.textContainer}>
            <Text style={styles.text1}>{text1}</Text>
            {text2 && <Text style={styles.text2}>{text2}</Text>}
          </View>
          <View style={[styles.iconContainer, styles.successIconContainer]}>
            <Ionicons
              name="checkmark-circle"
              size={RFValue(30)}
              color={COLORS.white}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  ),
  error: ({text1, text2}) => (
    <View style={styles.toastContainer}>
      <LinearGradient
        colors={['#F14D4D', '#FF6B6B', '#F14D4D']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.toastGradient}>
        <View style={styles.toastContent}>
          <View style={[styles.iconContainer, styles.errorIconContainer]}>
            <Ionicons
              name="close-circle"
              size={RFValue(30)}
              color={COLORS.white}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text1}>{text1}</Text>
            {text2 && <Text style={styles.text2}>{text2}</Text>}
          </View>
        </View>
      </LinearGradient>
    </View>
  ),
  info: ({text1, text2}) => (
    <View style={styles.toastContainer}>
      <LinearGradient
        colors={['#4FACFE', '#00C9FF', '#4FACFE']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.toastGradient}>
        <View style={styles.toastContent}>
          <View style={[styles.iconContainer, styles.infoIconContainer]}>
            <Ionicons
              name="information-circle"
              size={RFValue(30)}
              color={COLORS.white}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text1}>{text1}</Text>
            {text2 && <Text style={styles.text2}>{text2}</Text>}
          </View>
        </View>
      </LinearGradient>
    </View>
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    minHeight: RFValue(75),
    width: '92%',
    borderRadius: RFValue(18),
    overflow: 'hidden',
    ...COLORS.shadow,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  toastGradient: {
    flex: 1,
    borderRadius: RFValue(18),
    paddingHorizontal: RFValue(18),
    paddingVertical: RFValue(14),
  },
  toastContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: RFValue(44),
    height: RFValue(44),
    borderRadius: RFValue(22),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: RFValue(8),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  successIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  errorIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  infoIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  textContainer: {
    flex: 1,
    // justifyContent: 'center',
    paddingRight: RFValue(4),
  },
  text1: {
    fontSize: RFValue(16),
    color: COLORS.white,
    ...FONTS.h3,
    marginBottom: RFValue(3),
    fontWeight: '600',
    // textAlign: 'right',
  },
  text2: {
    fontSize: RFValue(13),
    color: COLORS.white,
    opacity: 0.95,
    ...FONTS.body4,
    // textAlign: 'right',
    lineHeight: RFValue(18),
  },
});
