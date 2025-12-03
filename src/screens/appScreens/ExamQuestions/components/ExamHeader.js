import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONTS} from '../../../../constants';
import {Animated} from 'react-native';

const ExamHeader = ({
  timeRemaining,
  currentQuestionIndex,
  totalQuestions,
  progressWidth,
  showTimer = true,
}) => {
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isTimeWarning = showTimer && timeRemaining !== null && timeRemaining < 30;

  return (
    <LinearGradient
      colors={['#667EEA', '#764BA2']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.header}>
      <View style={styles.headerContent}>
        {showTimer && timeRemaining !== null ? (
          <View style={styles.timerSection}>
            <View
              style={[
                styles.timerContainer,
                isTimeWarning && styles.timerWarning,
              ]}>
              <Ionicons name="time-outline" size={RFValue(18)} color="#fff" />
              <Text
                style={[
                  styles.timerText,
                  isTimeWarning && styles.timerWarningText,
                ]}>
                {formatTime(timeRemaining)}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.timerSection} />
        )}

        <View style={styles.examBadge}>
          <Text style={styles.examBadgeText}>
            {currentQuestionIndex + 1} / {totalQuestions}
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[styles.progressBarFill, {width: progressWidth}]}
          />
        </View>
        <Text style={styles.progressText}>
          {totalQuestions > 0
            ? Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)
            : 0}%
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    borderRadius: RFValue(16),
    padding: RFValue(16),
    marginBottom: RFValue(16),
    elevation: RFValue(8),
    shadowColor: '#667EEA',
    shadowOffset: {width: 0, height: RFValue(4)},
    shadowOpacity: 0.3,
    shadowRadius: RFValue(8),
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: RFValue(12),
  },
  timerSection: {
    flex: 1,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: RFValue(12),
    paddingVertical: RFValue(8),
    borderRadius: RFValue(25),
    width: RFValue(100),
  },
  timerWarning: {
    backgroundColor: 'rgba(255, 107, 107, 0.4)',
  },
  timerText: {
    color: '#fff',
    fontSize: RFValue(14),
    marginLeft: RFValue(6),
    ...FONTS.body4,
  },
  timerWarningText: {
    ...FONTS.body4,
  },
  examBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: RFValue(14),
    paddingVertical: RFValue(6),
    borderRadius: RFValue(20),
  },
  examBadgeText: {
    color: '#fff',
    fontSize: RFValue(12),
    ...FONTS.body5,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarBackground: {
    flex: 1,
    height: RFValue(8),
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: RFValue(4),
    overflow: 'hidden',
    marginRight: RFValue(12),
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFC107',
    borderRadius: RFValue(4),
  },
  progressText: {
    color: '#fff',
    fontSize: RFValue(12),
    ...FONTS.body5,
    minWidth: RFValue(35),
  },
});

export default ExamHeader;
