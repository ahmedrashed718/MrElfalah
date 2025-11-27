import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import * as Animatable from 'react-native-animatable';
import {FONTS, COLORS} from '../../../../constants';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const SECTION_MARGIN = RFValue(15);
const CARD_SPACING = RFValue(8);
const SECTION_PADDING = RFValue(16);
const CARD_WIDTH =
  (width - SECTION_MARGIN * 2 - SECTION_PADDING * 2 - CARD_SPACING) / 2;

const ActivitiesCard = () => {
  const navigation = useNavigation();

  const activities = [
    {
      id: 1,
      title: 'أغنية الدرس',
      icon: 'musical-notes',
      gradient: ['#4A90E2', '#9013FE'],
      onPress: () => {
        // Navigate to lesson song
      },
    },
    {
      id: 2,
      title: 'نطق الكلمات',
      icon: 'mic',
      gradient: ['#FF6B6B', '#FF8E53'],
      onPress: () => {
        // Navigate to pronunciation
      },
    },
    {
      id: 3,
      title: 'تسميع الكلمات',
      icon: 'star',
      gradient: ['#FF6B9D', '#FF4757'],
      onPress: () => {
        // Navigate to recitation
      },
    },
    {
      id: 4,
      title: 'حل مع الفلاح',
      icon: 'star',
      gradient: ['#4ECDC4', '#44A08D'],
      onPress: () => {
        navigation.navigate('ExamQuestion');
      },
    },
    {
      id: 5,
      title: 'اختبار الدرس',
      icon: 'star',
      gradient: ['#A855F7', '#EC4899'],
      fullWidth: true,
      onPress: () => {
        navigation.navigate('ExamQuestion');
      },
    },
  ];

  const renderActivityButton = (activity, index) => {
    const isFullWidth = activity.fullWidth;
    const buttonWidth = isFullWidth
      ? width - SECTION_MARGIN * 2 - SECTION_PADDING * 2
      : CARD_WIDTH;

    return (
      <Animatable.View
        key={activity.id}
        animation="fadeInUp"
        delay={index * 100}
        duration={500}
        style={[
          {
            width: buttonWidth,
            marginRight: !isFullWidth && index % 2 === 0 ? CARD_SPACING : 0,
            marginBottom: CARD_SPACING,
          },
        ]}>
        <TouchableOpacity
          style={styles.activityButton}
          activeOpacity={0.7}
          onPress={activity.onPress}>
          <LinearGradient
            colors={activity.gradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradient}>
            <View style={styles.activityContent}>
              <Ionicons
                name={activity.icon}
                size={RFValue(22)}
                color="#FFFFFF"
                style={styles.icon}
              />
              <Text style={styles.activityTitle}>{activity.title}</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  return (
    <View style={styles.activitiesSection}>
      <View style={styles.sectionContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.sectionTitle}>أنشطة إضافية</Text>
          <Ionicons
            name="sparkles"
            size={RFValue(20)}
            color="#A855F7"
            style={styles.headerIcon}
          />
        </View>

        <View style={styles.activitiesGrid}>
          {activities.map((activity, index) =>
            renderActivityButton(activity, index),
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  activitiesSection: {
    marginHorizontal: SECTION_MARGIN,
    marginTop: RFValue(20),
    marginBottom: RFValue(10),
  },
  sectionContainer: {
    backgroundColor: COLORS.white,
    borderRadius: RFValue(16),
    padding: SECTION_PADDING,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {elevation: 3},
    }),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(12),
    // justifyContent: 'flex-end',
    width: '100%',
  },
  headerIcon: {
    marginLeft: RFValue(8),
  },
  sectionTitle: {
    fontSize: RFValue(18),
    color: COLORS.black,
    ...FONTS.body3,
    // fontWeight: '600',
    // textAlign: 'right',
  },
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityButton: {
    borderRadius: RFValue(10),
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.12,
        shadowRadius: 3,
      },
      android: {elevation: 2},
    }),
  },
  gradient: {
    paddingVertical: RFValue(14),
    paddingHorizontal: RFValue(10),
    minHeight: RFValue(70),
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: RFValue(4),
  },
  activityTitle: {
    fontSize: RFValue(11),
    color: '#FFFFFF',
    textAlign: 'center',
    ...FONTS.body4,
    fontWeight: '600',
    lineHeight: RFValue(16),
  },
});

export default ActivitiesCard;
