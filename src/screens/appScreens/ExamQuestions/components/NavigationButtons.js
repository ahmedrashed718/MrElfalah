import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONTS} from '../../../../constants';

const NavigationButtons = ({
  currentQuestionIndex,
  totalQuestions,
  onPrevious,
  onNext,
  onFinish,
}) => {
  return (
    <View style={styles.navigationContainer}>
      <TouchableOpacity
        style={[
          styles.previousButton,
          currentQuestionIndex === 0 && styles.buttonDisabled,
        ]}
        onPress={onPrevious}
        disabled={currentQuestionIndex === 0}>
        <Ionicons
          name="arrow-forward"
          size={RFValue(20)}
          color={currentQuestionIndex === 0 ? '#ccc' : '#333'}
        />
        <Text
          style={[
            styles.previousButtonText,
            currentQuestionIndex === 0 && styles.buttonDisabledText,
          ]}>
          السابق
        </Text>
      </TouchableOpacity>

      {currentQuestionIndex >= totalQuestions - 1 ? (
        // Finish Exam Button (Green)
        <TouchableOpacity style={styles.finishButton} onPress={onFinish}>
          <LinearGradient
            colors={['#4CAF50', '#45a049']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.finishButtonGradient}>
            <Ionicons
              name="checkmark-circle"
              size={RFValue(20)}
              color="#fff"
            />
            <Text style={styles.finishButtonText}>إنهاء الامتحان</Text>
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        // Next Button
        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <LinearGradient
            colors={['#667EEA', '#764BA2']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.nextButtonGradient}>
            <Text style={styles.nextButtonText}>التالي</Text>
            <Ionicons name="arrow-back" size={RFValue(20)} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFValue(8),
  },
  previousButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: RFValue(12),
    paddingVertical: RFValue(14),
    marginRight: RFValue(10),
  },
  previousButtonText: {
    color: '#333',
    fontSize: RFValue(14),
    marginLeft: RFValue(8),
    ...FONTS.body4,
  },
  nextButton: {
    flex: 1,
    borderRadius: RFValue(12),
    overflow: 'hidden',
  },
  nextButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RFValue(14),
  },
  nextButtonText: {
    color: '#fff',
    fontSize: RFValue(14),
    marginRight: RFValue(8),
    ...FONTS.body4,
  },
  finishButton: {
    flex: 1,
    borderRadius: RFValue(12),
    overflow: 'hidden',
  },
  finishButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RFValue(14),
  },
  finishButtonText: {
    color: '#fff',
    fontSize: RFValue(14),
    marginLeft: RFValue(8),
    ...FONTS.body4,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonDisabledText: {
    color: '#ccc',
  },
});

export default NavigationButtons;

