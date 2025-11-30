import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONTS} from '../../../../constants';

const ExamCard = ({item, cardWidth, navigation}) => {
  return (
    <View style={[styles.cardContainer, {width: cardWidth}]}>
      <LinearGradient colors={item.colors} style={styles.cardTop}>
        <Ionicons
          name="trophy-outline"
          size={RFValue(20)}
          color="#fff"
          style={styles.trophyIcon}
        />

        <View style={styles.subjectIconContainer}>
          <Ionicons
            name={item.icon}
            size={RFValue(18)}
            color="#FFC107"
            style={styles.subjectIcon}
          />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.cardContent}>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.metaSection}>
          <Text style={styles.metaLabel}>الوقت:</Text>
          <View style={styles.metaValueContainer}>
            <View style={styles.timeIconContainer}>
              <Ionicons name="time" size={RFValue(9)} color="#fff" />
            </View>
            <Text style={styles.timeValue}>{item.time / 60} دقيقه</Text>
          </View>
        </View>

        <View style={styles.metaSection}>
          <Text style={styles.metaLabel}>تاريخ الانتهاء:</Text>
          <View style={styles.metaValueContainer}>
            <View style={styles.dateIconContainer}>
              <Ionicons name="calendar" size={RFValue(9)} color="#fff" />
            </View>
            <Text style={styles.dateValue}>{item.endDate}</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation?.navigate('ExamQuestion', {
              examId: item.id,
              examTitle: item.title,
            })
          }>
          <LinearGradient
            colors={item.buttonColors || item.colors}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.startBtn}>
            <Ionicons
              name="flash"
              size={RFValue(14)}
              color="#fff"
              style={styles.startIcon}
            />
            <Text style={styles.startText}>ابدأ الامتحان</Text>
            <Ionicons
              name="arrow-back"
              size={RFValue(14)}
              color="#fff"
              style={styles.startIcon}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: RFValue(18),
    marginBottom: RFValue(20),
    overflow: 'hidden',
    elevation: RFValue(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: RFValue(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: RFValue(4),
    minHeight: RFValue(200),
  },

  cardTop: {
    padding: RFValue(14),
    paddingBottom: RFValue(16),
    height: RFValue(110),
    justifyContent: 'flex-end',
    position: 'relative',
  },

  trophyIcon: {
    position: 'absolute',
    top: RFValue(10),
    left: RFValue(10),
  },

  subjectIconContainer: {
    position: 'absolute',
    top: RFValue(10),
    right: RFValue(10),
    width: RFValue(28),
    height: RFValue(28),
    borderRadius: RFValue(14),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: RFValue(2),
    borderColor: '#000',
  },

  subjectIcon: {},

  titleContainer: {
    marginTop: RFValue(10),
    paddingRight: RFValue(2),
  },

  cardTitle: {
    color: '#fff',
    fontSize: RFValue(12),
    lineHeight: RFValue(18),
    ...FONTS.body4,
  },

  cardContent: {
    padding: RFValue(14),
    paddingTop: RFValue(12),
  },

  description: {
    fontSize: RFValue(10),
    color: '#666',
    marginBottom: RFValue(10),
    lineHeight: RFValue(16),
    ...FONTS.body5,
  },

  metaSection: {
    marginBottom: RFValue(8),
  },

  metaLabel: {
    fontSize: RFValue(9),
    color: '#666',
    marginBottom: RFValue(4),
    ...FONTS.body5,
  },

  metaValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  timeIconContainer: {
    width: RFValue(18),
    height: RFValue(18),
    borderRadius: RFValue(9),
    backgroundColor: '#00A8E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: RFValue(6),
  },

  timeValue: {
    fontSize: RFValue(10),
    color: '#00A8E8',
    marginLeft: RFValue(5),
    ...FONTS.body5,
  },

  dateIconContainer: {
    width: RFValue(18),
    height: RFValue(18),
    borderRadius: RFValue(9),
    backgroundColor: '#FF6B9D',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: RFValue(6),
  },

  dateValue: {
    fontSize: RFValue(10),
    color: '#333',
    marginLeft: RFValue(5),
    ...FONTS.body5,
  },

  startBtn: {
    paddingVertical: RFValue(9),
    borderRadius: RFValue(10),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: RFValue(12),
  },

  startIcon: {
    marginHorizontal: RFValue(3),
  },

  startText: {
    color: '#fff',
    marginHorizontal: RFValue(4),
    fontSize: RFValue(11),
    ...FONTS.body4,
  },
});

export default ExamCard;

