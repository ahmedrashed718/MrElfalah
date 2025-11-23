import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONTS} from '../../../../constants';
import {COLORS} from '../../../../constants/theme';

const ExamTitleCard = ({examTitle}) => {
  return (
    <LinearGradient
      colors={['#FF6B6B', '#FF8E72']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.titleCard}>
      <Ionicons name="book-outline" size={RFValue(20)} color="#fff" />
      <Text style={styles.titleText}>{examTitle || 'اختبار'}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  titleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RFValue(12),
    padding: RFValue(14),
    marginBottom: RFValue(20),
    elevation: RFValue(4),
    shadowColor: '#FF6B6B',
    shadowOffset: {width: 0, height: RFValue(2)},
    shadowOpacity: 0.2,
    shadowRadius: RFValue(6),
  },
  titleText: {
    color: COLORS.white,
    fontSize: RFValue(13),
    marginLeft: RFValue(10),
    flex: 1,
    ...FONTS.body5,
  },
});

export default ExamTitleCard;

