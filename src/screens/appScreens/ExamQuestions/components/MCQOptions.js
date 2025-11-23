import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Animated} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONTS} from '../../../../constants';

const MCQOptions = ({answers, selectedAnswer, onAnswerSelect, scaleAnim}) => {
  return (
    <View style={styles.optionsContainer}>
      {answers &&
        answers.map((answer, index) => {
          const optionId = String.fromCharCode(65 + index); // A, B, C, D
          const isSelected = selectedAnswer === optionId;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => onAnswerSelect(optionId)}
              activeOpacity={0.7}>
              <Animated.View
                style={[
                  styles.optionCard,
                  isSelected && styles.optionCardSelected,
                  isSelected && {transform: [{scale: scaleAnim}]},
                ]}>
                <View
                  style={[
                    styles.optionIcon,
                    isSelected
                      ? styles.optionIconSelected
                      : styles.optionIconDefault,
                  ]}>
                  {!isSelected ? (
                    <Text style={styles.optionLetter}>{optionId}</Text>
                  ) : (
                    <Ionicons
                      name="checkmark"
                      size={RFValue(18)}
                      color="#fff"
                    />
                  )}
                </View>

                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                  ]}>
                  {answer.answer_text}
                </Text>

                {isSelected && (
                  <Ionicons
                    name="checkmark-circle"
                    size={RFValue(24)}
                    color="#667EEA"
                  />
                )}
              </Animated.View>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    marginBottom: RFValue(24),
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: RFValue(14),
    padding: RFValue(16),
    marginBottom: RFValue(12),
    borderWidth: RFValue(2),
    borderColor: '#E8E8E8',
    direction: 'ltr',
  },
  optionCardSelected: {
    borderColor: '#667EEA',
    backgroundColor: '#F3F4FF',
  },
  optionIcon: {
    width: RFValue(40),
    height: RFValue(40),
    borderRadius: RFValue(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: RFValue(14),
  },
  optionIconDefault: {
    backgroundColor: '#F0F0F0',
  },
  optionIconSelected: {
    backgroundColor: '#667EEA',
  },
  optionLetter: {
    fontSize: RFValue(16),
    color: '#666',
    ...FONTS.body4,
  },
  optionText: {
    flex: 1,
    fontSize: RFValue(15),
    color: '#333',
    ...FONTS.body3,
  },
  optionTextSelected: {
    color: '#667EEA',
    ...FONTS.body3,
  },
});

export default MCQOptions;

