import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONTS} from '../../../../constants';
import {COLORS} from '../../../../constants/theme';

const {width} = Dimensions.get('window');

const SidePanel = ({
  showSidePanel,
  onClose,
  questions,
  currentQuestionIndex,
  selectedAnswers,
  onQuestionSelect,
  onPrevious,
  onNext,
  onFinish,
  totalQuestions,
}) => {
  if (!showSidePanel) return null;

  return (
    <>
      <View style={styles.sidePanel}>
        <View style={styles.sidePanelHeader}>
          <Text style={styles.sidePanelTitle}>التنقل بين الأسئلة</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons
              name="close"
              size={RFValue(24)}
              color={COLORS.secondary}
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.questionsGridScroll}>
          <View style={styles.questionsGrid}>
            {questions.map((question, index) => {
              const isCurrent = index === currentQuestionIndex;
              const isAnswered = selectedAnswers[question?.question_id];

              return (
                <TouchableOpacity
                  key={question.question_id || index}
                  style={[
                    styles.questionNumberButton,
                    isCurrent && styles.questionNumberButtonActive,
                    isAnswered &&
                      !isCurrent &&
                      styles.questionNumberButtonAnswered,
                  ]}
                  onPress={() => onQuestionSelect(index)}>
                  <Text
                    style={[
                      styles.questionNumberText,
                      isCurrent && styles.questionNumberTextActive,
                    ]}>
                    {index + 1}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Navigation Buttons in Side Panel */}
        <View style={styles.sidePanelNavigation}>
          {/* Previous Button */}
          <TouchableOpacity
            style={[
              styles.sidePanelButtonFull,
              currentQuestionIndex === 0 && styles.sidePanelButtonDisabled,
            ]}
            onPress={onPrevious}
            disabled={currentQuestionIndex === 0}>
            <Ionicons
              name="arrow-forward"
              size={RFValue(18)}
              color={currentQuestionIndex === 0 ? '#ccc' : '#333'}
            />
            <Text
              style={[
                styles.sidePanelButtonText,
                currentQuestionIndex === 0 &&
                  styles.sidePanelButtonTextDisabled,
              ]}>
              السابق
            </Text>
          </TouchableOpacity>

          {/* Next or Finish Button */}
          {currentQuestionIndex >= totalQuestions - 1 ? (
            <TouchableOpacity
              style={styles.sidePanelFinishButtonFull}
              onPress={() => {
                onFinish();
                onClose();
              }}>
              <LinearGradient
                colors={['#4CAF50', '#45a049']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.sidePanelFinishButtonGradient}>
                <Ionicons
                  name="checkmark-circle"
                  size={RFValue(18)}
                  color="#fff"
                />
                <Text style={styles.sidePanelFinishButtonText}>
                  إنهاء الامتحان
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.sidePanelNextButtonFull}
              onPress={onNext}>
              <LinearGradient
                colors={['#667EEA', '#764BA2']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.sidePanelNextButtonGradient}>
                <Text style={styles.sidePanelNextButtonText}>التالي</Text>
                <Ionicons name="arrow-back" size={RFValue(18)} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Overlay */}
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      />
    </>
  );
};

const styles = StyleSheet.create({
  sidePanel: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.7,
    backgroundColor: '#fff',
    elevation: RFValue(10),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: RFValue(2)},
    shadowOpacity: 0.25,
    shadowRadius: RFValue(8),
    zIndex: 100,
    flexDirection: 'column',
    paddingTop: RFValue(18),
  },
  sidePanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: RFValue(16),
    borderBottomWidth: RFValue(1),
    borderBottomColor: '#E0E0E0',
  },
  sidePanelTitle: {
    fontSize: RFValue(14),
    color: COLORS.secondary,
    ...FONTS.body3,
  },
  questionsGridScroll: {
    flex: 1,
  },
  questionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: RFValue(12),
  },
  questionNumberButton: {
    width: RFValue(40),
    height: RFValue(40),
    borderRadius: RFValue(8),
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    margin: RFValue(4),
  },
  questionNumberButtonActive: {
    backgroundColor: COLORS.primary,
  },
  questionNumberButtonAnswered: {
    backgroundColor: '#37daffff',
  },
  questionNumberText: {
    fontSize: RFValue(14),
    color: '#666',
    ...FONTS.body4,
  },
  questionNumberTextActive: {
    color: '#fff',
    ...FONTS.body4,
  },
  sidePanelNavigation: {
    flexDirection: 'column',
    padding: RFValue(12),
    borderTopWidth: RFValue(1),
    borderTopColor: '#E0E0E0',
    backgroundColor: '#F8F9FA',
    gap: RFValue(8),
  },
  sidePanelButtonFull: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: RFValue(10),
    paddingVertical: RFValue(12),
    gap: RFValue(6),
  },
  sidePanelNextButtonFull: {
    width: '100%',
    borderRadius: RFValue(10),
    overflow: 'hidden',
  },
  sidePanelNextButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RFValue(12),
    gap: RFValue(6),
  },
  sidePanelNextButtonText: {
    color: '#fff',
    fontSize: RFValue(13),
    ...FONTS.body4,
  },
  sidePanelFinishButtonFull: {
    width: '100%',
    borderRadius: RFValue(10),
    overflow: 'hidden',
  },
  sidePanelFinishButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RFValue(12),
    gap: RFValue(6),
  },
  sidePanelFinishButtonText: {
    color: '#fff',
    fontSize: RFValue(13),
    ...FONTS.body4,
    fontWeight: 'bold',
  },
  sidePanelButtonText: {
    color: '#333',
    fontSize: RFValue(13),
    ...FONTS.body4,
  },
  sidePanelButtonTextDisabled: {
    color: '#ccc',
  },
  sidePanelButtonDisabled: {
    opacity: 0.5,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 99,
  },
});

export default SidePanel;

