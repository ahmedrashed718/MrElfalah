import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS} from '../../../constants';
import {AppHeader} from '../../../components';

const {width} = Dimensions.get('window');

const sampleQuestions = [
  {
    id: 1,
    question:
      'The Nile .......................... is a very long river in Egypt. 🤔',
    options: [
      {id: 'A', text: 'River'},
      {id: 'B', text: 'Lake'},
      {id: 'C', text: 'Sea'},
      {id: 'D', text: 'Oasis'},
    ],
  },
  {
    id: 2,
    question: 'What is the capital of Egypt?',
    options: [
      {id: 'A', text: 'Cairo'},
      {id: 'B', text: 'Alexandria'},
      {id: 'C', text: 'Giza'},
      {id: 'D', text: 'Luxor'},
    ],
  },
];

export default function ExamQuestion({route, navigation}) {
  const {examTitle} = route.params || {};
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(60 * 60);
  const [showSidePanel, setShowSidePanel] = useState(false);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const totalQuestions = 12;
  const currentQuestion =
    sampleQuestions[currentQuestionIndex] || sampleQuestions[0];

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Progress bar
  useEffect(() => {
    const progress = (currentQuestionIndex + 1) / totalQuestions;
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentQuestionIndex]);

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = optionId => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: optionId,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleQuestionSelect = index => {
    setCurrentQuestionIndex(index);
    setShowSidePanel(false);
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const isTimeWarning = timeRemaining < 300;

  return (
    <View style={styles.container}>
      <AppHeader
        title="الامتحان"
        showBack={true}
        rightIcon={<Ionicons name="menu" size={RFValue(22)} color="#fff" />}
        onRightIconPress={() => setShowSidePanel(!showSidePanel)}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.scrollContent}>
          {/* Header */}
          <LinearGradient
            colors={['#667EEA', '#764BA2']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.timerSection}>
                <View
                  style={[
                    styles.timerContainer,
                    isTimeWarning && styles.timerWarning,
                  ]}>
                  <Ionicons
                    name="time-outline"
                    size={RFValue(18)}
                    color="#fff"
                  />
                  <Text
                    style={[
                      styles.timerText,
                      isTimeWarning && styles.timerWarningText,
                    ]}>
                    {formatTime(timeRemaining)}
                  </Text>
                </View>
              </View>

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
                {Math.round(
                  ((currentQuestionIndex + 1) / totalQuestions) * 100,
                )}
                %
              </Text>
            </View>
          </LinearGradient>

          {/* Title */}
          <LinearGradient
            colors={['#FF6B6B', '#FF8E72']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.titleCard}>
            <Ionicons name="book-outline" size={RFValue(20)} color="#fff" />
            <Text style={styles.titleText}>
              {examTitle || 'اختبار الدرس الاول الصف الرابع يونت 4'}
            </Text>
          </LinearGradient>

          {/* Question Card */}
          <View style={styles.questionCard}>
            <View style={styles.questionHeader}>
              <View style={styles.questionBadge}>
                <Text style={styles.questionBadgeText}>
                  Q{currentQuestionIndex + 1}
                </Text>
              </View>
              <Text style={styles.questionType}>Multiple Choice</Text>
            </View>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
          </View>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map(option => {
              const isSelected =
                selectedAnswers[currentQuestion.id] === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => handleAnswerSelect(option.id)}
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
                        <Text style={styles.optionLetter}>{option.id}</Text>
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
                      {option.text}
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

          {/* Navigation */}
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={[
                styles.previousButton,
                currentQuestionIndex === 0 && styles.buttonDisabled,
              ]}
              onPress={handlePrevious}
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

            <TouchableOpacity
              style={[
                styles.nextButton,
                currentQuestionIndex >= totalQuestions - 1 &&
                  styles.buttonDisabled,
              ]}
              onPress={handleNext}
              disabled={currentQuestionIndex >= totalQuestions - 1}>
              <LinearGradient
                colors={
                  currentQuestionIndex >= totalQuestions - 1
                    ? ['#ccc', '#ccc']
                    : ['#667EEA', '#764BA2']
                }
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.nextButtonGradient}>
                <Text
                  style={[
                    styles.nextButtonText,
                    currentQuestionIndex >= totalQuestions - 1 &&
                      styles.buttonDisabledText,
                  ]}>
                  التالي
                </Text>

                <Ionicons
                  name="arrow-back"
                  size={RFValue(20)}
                  color={
                    currentQuestionIndex >= totalQuestions - 1 ? '#999' : '#fff'
                  }
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* SIDE PANEL (New Version You Requested) */}
      {showSidePanel && (
        <View style={styles.sidePanel}>
          <View style={styles.sidePanelHeader}>
            <Text style={styles.sidePanelTitle}>التنقل بين الأسئلة</Text>
            <TouchableOpacity onPress={() => setShowSidePanel(false)}>
              <Ionicons
                name="close"
                size={RFValue(24)}
                color={COLORS.secondary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.questionsGrid}>
            {Array.from({length: totalQuestions}, (_, i) => i + 1).map(
              (num, index) => {
                const isCurrent = index === currentQuestionIndex;
                const isAnswered = selectedAnswers[sampleQuestions[index]?.id];

                return (
                  <TouchableOpacity
                    key={num}
                    style={[
                      styles.questionNumberButton,
                      isCurrent && styles.questionNumberButtonActive,
                      isAnswered &&
                        !isCurrent &&
                        styles.questionNumberButtonAnswered,
                    ]}
                    onPress={() => handleQuestionSelect(index)}>
                    <Text
                      style={[
                        styles.questionNumberText,
                        isCurrent && styles.questionNumberTextActive,
                      ]}>
                      {num}
                    </Text>
                  </TouchableOpacity>
                );
              },
            )}
          </View>
        </View>
      )}

      {/* Overlay */}
      {showSidePanel && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setShowSidePanel(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    padding: RFValue(16),
    paddingBottom: RFValue(100),
  },

  /* ====== Header ====== */
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

  /* ====== Title Card ====== */
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

  /* ====== Question Card ====== */
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
  },

  /* ====== Options ====== */
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

  /* ===== Navigation ===== */
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

  buttonDisabled: {
    opacity: 0.6,
  },

  /* ===== SIDE PANEL (Your Requested Version) ===== */
  sidePanel: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.5,
    backgroundColor: '#fff',
    elevation: RFValue(10),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: RFValue(2)},
    shadowOpacity: 0.25,
    shadowRadius: RFValue(8),
    zIndex: 100,
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
    backgroundColor: '#4CAF50',
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
