import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import {COLORS, FONTS} from '../../../../constants';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const PhoneNumberCard = ({item, index, isScrollable}) => {
  const handleCopy = () => {
    Clipboard.setString(item.number);
    Toast.show({
      type: 'success',
      text1: 'تم النسخ بنجاح!',
      text2: `تم نسخ الرقم ${item.number}`,
      position: 'top',
      visibilityTime: 2000,
    });
  };

  return (
    <Animatable.View
      animation="fadeInUp"
      delay={index * 100}
      style={[styles.phoneCard, isScrollable && styles.phoneCardScrollable]}>
      <View style={styles.phoneCardContent}>
        <View
          style={[
            styles.phoneIconContainer,
            {backgroundColor: item.iconColor},
          ]}>
          <Ionicons name={item.icon} size={RFValue(20)} color={COLORS.white} />
        </View>
        <Text style={styles.phoneNumber}>{item.number}</Text>
        <Text style={styles.phoneLabel}>{item.label}</Text>
        {item.subLabel && (
          <Text style={styles.phoneSubLabel}>{item.subLabel}</Text>
        )}
        <TouchableOpacity
          style={styles.copyButton}
          onPress={handleCopy}
          activeOpacity={0.7}>
          <Text style={styles.copyButtonText}>انقر للنسخ</Text>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  phoneCard: {
    width: (width - RFValue(48)) / 2,
    backgroundColor: COLORS.white,
    borderRadius: RFValue(12),
    padding: RFValue(12),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray3,
    ...COLORS.shadow,
  },
  phoneCardScrollable: {
    width: width - RFValue(80),
    minWidth: RFValue(180),
  },
  phoneCardContent: {
    alignItems: 'center',
    width: '100%',
  },
  phoneIconContainer: {
    width: RFValue(42),
    height: RFValue(42),
    borderRadius: RFValue(21),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: RFValue(8),
  },
  phoneNumber: {
    fontSize: RFValue(15),
    color: COLORS.black,
    ...FONTS.body3,
    marginBottom: RFValue(4),
    textAlign: 'center',
  },
  phoneLabel: {
    fontSize: RFValue(10),
    color: COLORS.gray6,
    ...FONTS.body5,
    marginBottom: RFValue(3),
    textAlign: 'center',
  },
  phoneSubLabel: {
    fontSize: RFValue(9),
    color: COLORS.gray6,
    ...FONTS.body5,
    marginBottom: RFValue(8),
    textAlign: 'center',
  },
  copyButton: {
    backgroundColor: COLORS.gray3,
    paddingVertical: RFValue(6),
    paddingHorizontal: RFValue(12),
    borderRadius: RFValue(6),
    width: '100%',
    alignItems: 'center',
    marginTop: RFValue(2),
  },
  copyButtonText: {
    fontSize: RFValue(11),
    color: COLORS.black,
    ...FONTS.body5,
  },
});

export default PhoneNumberCard;
