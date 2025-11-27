import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS} from '../../../../constants';

const LessonCard = ({item, selectedLesson, onPress}) => {
  return (
    <TouchableOpacity
      style={[
        styles.lessonCard,
        selectedLesson === item.id && styles.lessonCardActive,
      ]}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={styles.lessonLeft}>
        <LinearGradient
          colors={
            selectedLesson === item.id
              ? [COLORS.primary, COLORS.secondary]
              : ['#F0F0F5', '#E8E8F0']
          }
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={[
            styles.lessonNumber,
            selectedLesson === item.id && styles.lessonNumberActive,
          ]}>
          <Text
            style={[
              styles.lessonNumberText,
              selectedLesson === item.id && styles.lessonNumberTextActive,
            ]}>
            {item.id}
          </Text>
        </LinearGradient>

        <View style={styles.lessonInfo}>
          <Text
            style={[
              styles.lessonTitle,
              selectedLesson === item.id && styles.lessonTitleActive,
            ]}
            numberOfLines={2}>
            {item.title}
          </Text>

          <View style={styles.lessonMeta}>
            <View style={styles.lessonMetaItem}>
              <Ionicons
                name="time-outline"
                size={RFValue(10)}
                color={
                  selectedLesson === item.id ? COLORS.primary : '#888'
                }
              />
              <Text
                style={[
                  styles.lessonTime,
                  selectedLesson === item.id && styles.lessonTimeActive,
                ]}>
                {item.time}
              </Text>
            </View>
            <View style={styles.lessonMetaDivider} />
            <View style={styles.lessonMetaItem}>
              <Ionicons
                name="videocam-outline"
                size={RFValue(10)}
                color={
                  selectedLesson === item.id ? COLORS.primary : '#888'
                }
              />
              <Text
                style={[
                  styles.lessonTime,
                  selectedLesson === item.id && styles.lessonTimeActive,
                ]}>
                فيديو
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.lessonPlayButton,
          selectedLesson === item.id && styles.lessonPlayButtonActive,
        ]}>
        <Ionicons
          name={
            selectedLesson === item.id
              ? 'play-circle'
              : 'play-circle-outline'
          }
          size={RFValue(24)}
          color={selectedLesson === item.id ? COLORS.white : COLORS.gray}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  lessonCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: RFValue(15),
    marginVertical: RFValue(5),
    padding: RFValue(12),
    borderRadius: RFValue(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: 'transparent',
    minHeight: RFValue(70),
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: {elevation: 2},
    }),
  },
  lessonCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary100,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {elevation: 4},
    }),
  },
  lessonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lessonNumber: {
    width: RFValue(42),
    height: RFValue(42),
    borderRadius: RFValue(21),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: RFValue(12),
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {elevation: 1},
    }),
  },
  lessonNumberActive: {},
  lessonNumberText: {
    fontSize: RFValue(14),
    color: COLORS.secondary,
    fontWeight: 'bold',
    ...FONTS.body3,
  },
  lessonNumberTextActive: {
    color: COLORS.white,
  },
  lessonInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  lessonTitle: {
    color: '#333',
    flex: 1,
    fontSize: RFValue(12),
    fontWeight: '600',
    lineHeight: RFValue(18),
    marginBottom: RFValue(6),
    ...FONTS.body3,
  },
  lessonTitleActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(6),
  },
  lessonMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(3),
  },
  lessonMetaDivider: {
    width: 1,
    height: RFValue(10),
    backgroundColor: '#E0E0E0',
  },
  lessonTime: {
    fontSize: RFValue(10),
    color: '#888',
    ...FONTS.body5,
  },
  lessonTimeActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  lessonPlayButton: {
    width: RFValue(38),
    height: RFValue(38),
    borderRadius: RFValue(19),
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RFValue(8),
  },
  lessonPlayButtonActive: {
    backgroundColor: COLORS.primary,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {elevation: 4},
    }),
  },
});

export default LessonCard;

