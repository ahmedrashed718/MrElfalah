import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONTS} from '../../../../constants';

const QuestionCard = ({questionText, questionNumber}) => {
  return (
    <View style={styles.questionCard}>
      <View style={styles.questionHeader}>
        <View style={styles.questionBadge}>
          <Text style={styles.questionBadgeText}>Q{questionNumber}</Text>
        </View>
        <Text style={styles.questionType}>Multiple Choice</Text>
      </View>
      <Text style={styles.questionText}>{questionText} 🤔</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: RFValue(16),
    padding: RFValue(18),
    marginBottom: RFValue(24),
    elevation: RFValue(3),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: RFValue(2)},
    shadowOpacity: 0.08,
    shadowRadius: RFValue(4),
    borderLeftWidth: RFValue(4),
    borderLeftColor: '#667EEA',
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(12),
  },
  questionBadge: {
    backgroundColor: '#667EEA',
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(5),
    borderRadius: RFValue(8),
  },
  questionBadgeText: {
    color: '#fff',
    fontSize: RFValue(11),
    ...FONTS.body5,
  },
  questionType: {
    color: '#999',
    fontSize: RFValue(11),
    marginLeft: RFValue(12),
    ...FONTS.body5,
  },
  questionText: {
    fontSize: RFValue(16),
    color: '#222',
    lineHeight: RFValue(26),
    ...FONTS.body3,
    direction: 'ltr',
  },
});

export default QuestionCard;

