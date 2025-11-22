import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  // StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AppHeader({
  title,
  showBack = true,
  rightIcon,
  onRightIconPress,
  backgroundColor,
  titleColor = COLORS.white,
  titleFontSize = RFValue(22),
}) {
  const navigation = useNavigation();

  const gradientColors = backgroundColor
    ? [backgroundColor, backgroundColor]
    : [COLORS.primary, COLORS.secondary];

  return (
    <>
      <View style={styles.container}>
        <LinearGradient
          colors={gradientColors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradient}>
          <View style={styles.content}>
            <View style={styles.row}>
              {/* Back Button */}
              {showBack ? (
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                  activeOpacity={0.8}>
                  <Ionicons
                    name="chevron-back"
                    size={RFValue(26)}
                    color={titleColor}
                  />
                </TouchableOpacity>
              ) : (
                <View style={styles.placeholder} />
              )}

              {/* Title */}
              <View style={styles.titleContainer}>
                <Text
                  style={[
                    styles.title,
                    {color: titleColor, fontSize: titleFontSize},
                  ]}
                  numberOfLines={1}>
                  {title}
                </Text>
              </View>

              {/* Right Icon or Spacer */}
              {rightIcon ? (
                <TouchableOpacity
                  style={styles.rightButton}
                  onPress={onRightIconPress}
                  activeOpacity={0.8}>
                  {rightIcon}
                </TouchableOpacity>
              ) : (
                <View style={styles.placeholder} />
              )}
            </View>
          </View>
        </LinearGradient>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  gradient: {
    borderBottomLeftRadius: RFValue(30),
    borderBottomRightRadius: RFValue(30),
    paddingTop: Platform.OS === 'ios' ? RFValue(10) : RFValue(20),
    paddingBottom: RFValue(1),
  },
  content: {
    minHeight: RFValue(80),
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: RFValue(20),
  },
  backButton: {
    width: RFValue(40),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(20),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  rightButton: {
    width: RFValue(40),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(20),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  placeholder: {
    width: RFValue(40),
    height: RFValue(40),
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: RFValue(15),
  },
  title: {
    fontSize: RFValue(19),
    ...FONTS.h2,
    textAlign: 'center',
    fontWeight: '600',
  },
});
