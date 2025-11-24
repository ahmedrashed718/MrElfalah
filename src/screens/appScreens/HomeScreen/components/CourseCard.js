import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {COLORS, FONTS} from '../../../../constants';

const CourseCard = ({item, index, navigation}) => (
  <Animatable.View
    animation="fadeInLeft"
    delay={index * 100}
    style={styles.courseCard}>
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('المناهج')}
      style={styles.courseCardContent}>
      <Image source={{uri: item.image}} style={styles.courseImage} />
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle} numberOfLines={2}>
          {item.title}
        </Text>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('CoursePlayer')}>
          <Text style={styles.continueButtonText}>متابعة التعلم</Text>
          <Ionicons
            name="play-circle"
            size={RFValue(16)}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  </Animatable.View>
);

const styles = StyleSheet.create({
  courseCard: {
    marginBottom: RFValue(12),
    borderRadius: RFValue(14),
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    ...COLORS.shadow,
  },
  courseCardContent: {
    flexDirection: 'row',
  },
  courseImage: {
    width: RFValue(100),
    height: RFValue(100),
    resizeMode: 'cover',
  },
  courseInfo: {
    flex: 1,
    padding: RFValue(12),
    justifyContent: 'space-between',
  },
  courseTitle: {
    fontSize: RFValue(13),
    color: COLORS.black,
    ...FONTS.body3,
    marginBottom: RFValue(8),
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: RFValue(4),
  },
  continueButtonText: {
    fontSize: RFValue(12),
    color: COLORS.primary,
    ...FONTS.body4,
  },
});

export default CourseCard;

