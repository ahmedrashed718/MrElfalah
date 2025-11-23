import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import Svg, {Circle} from 'react-native-svg';
import {FONTS} from '../../../constants';
import {AppHeader} from '../../../components';
const {width} = Dimensions.get('window');
export default function ExamResults({route, navigation}) {
  const {questions, selectedAnswers, timeTaken, examTitle} = route.params || {};

  // Calculate results
  const totalQuestions = questions?.length || 0;
  let correctCount = 0;
  let incorrectCount = 0;

  const results =
    questions?.map(question => {
      const userAnswer = selectedAnswers[question.question_id];
      let isCorrect = false;

      // Check answer based on question type
      if (question.type === 'arrangePuzzle') {
        const correctSentence =
          question.correctSentence || question.question_valid_answer || '';
        const userSentence = userAnswer || '';
        isCorrect =
          userSentence.trim().toLowerCase() ===
          correctSentence.trim().toLowerCase();
      } else {
        // For MCQ, find the correct answer from real_answers
        const correctAnswerObj = question.real_answers?.find(
          ans => ans.answer_check === true,
        );
        if (correctAnswerObj) {
          const correctIndex = question.real_answers.findIndex(
            ans => ans.answer_check === true,
          );
          const correctOptionId = String.fromCharCode(65 + correctIndex); // A, B, C, D
          isCorrect = userAnswer === correctOptionId;
        } else {
          isCorrect = userAnswer === question.question_valid_answer;
        }
      }

      if (isCorrect) {
        correctCount++;
      } else {
        incorrectCount++;
      }
      return {
        ...question,
        userAnswer,
        isCorrect,
      };
    }) || [];

  const scorePercentage =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Circular progress calculations
  const size = 120;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset =
    circumference - (scorePercentage / 100) * circumference;

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSuccessMessage = () => {
    if (scorePercentage >= 80) {
      return 'ممتاز! أداء رائع!';
    } else if (scorePercentage >= 60) {
      return 'لقد نجحت! هناك مجال للتحسين!';
    } else {
      return 'حاول مرة أخرى! يمكنك التحسين!';
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="نتائج الامتحان"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#667EEA', '#764BA2']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>اكتمل الاختبار!</Text>
          </View>

          <View style={styles.headerSubContent}>
            <Text style={styles.headerSubtitle}>{getSuccessMessage()}</Text>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBarBackground}>
              <View
                style={[styles.progressBarFill, {width: `${scorePercentage}%`}]}
              />
            </View>
            <Text style={styles.progressText}>
              {correctCount}/{totalQuestions}
            </Text>
          </View>
        </LinearGradient>

        {/* Content Wrapper */}
        <View style={styles.contentWrapper}>
          {/* MAIN CONTENT */}
          <ScrollView
            style={styles.mainContent}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.mainContentScroll}>
            <View style={styles.reviewHeader}>
              <Ionicons
                name="clipboard-outline"
                size={RFValue(20)}
                color="#667EEA"
              />
              <Text style={styles.reviewHeaderText}>مراجعة الأسئلة</Text>
            </View>

            <View style={styles.questionsList}>
              {results.map((result, index) => {
                // Get correct answer based on question type
                let correctAnswerText = '';
                let userAnswerText = '';

                if (result.type === 'arrangePuzzle') {
                  // For arrange puzzle
                  correctAnswerText =
                    result.correctSentence ||
                    result.question_valid_answer ||
                    '';
                  userAnswerText = result.userAnswer || '';
                } else {
                  // For MCQ
                  const correctAnswerObj = result.real_answers?.find(
                    ans => ans.answer_check === true,
                  );
                  const correctIndex = result.real_answers?.findIndex(
                    ans => ans.answer_check === true,
                  );
                  const correctOptionId =
                    correctIndex !== -1
                      ? String.fromCharCode(65 + correctIndex)
                      : null;

                  correctAnswerText =
                    correctAnswerObj?.answer_text ||
                    result.question_valid_answer ||
                    '';

                  // Get user's answer text
                  if (result.userAnswer) {
                    const userAnswerIndex = result.real_answers?.findIndex(
                      (_, idx) =>
                        String.fromCharCode(65 + idx) === result.userAnswer,
                    );
                    if (userAnswerIndex !== -1 && result.real_answers) {
                      userAnswerText =
                        result.real_answers[userAnswerIndex]?.answer_text || '';
                    } else {
                      userAnswerText = result.userAnswer;
                    }
                  }
                }

                return (
                  <View
                    key={result.question_id || index}
                    style={styles.questionReviewCard}>
                    {/* Question header */}
                    <View style={styles.questionReviewHeader}>
                      <View
                        style={[
                          styles.questionNumberBadge,
                          result.isCorrect
                            ? styles.questionNumberBadgeCorrect
                            : styles.questionNumberBadgeIncorrect,
                        ]}>
                        <Text style={styles.questionNumberText}>
                          {index + 1}
                        </Text>
                      </View>

                      <Text style={styles.questionReviewText}>
                        {result.question_text || result.question}
                        {result.type === 'arrangePuzzle' && (
                          <Text style={styles.questionTypeLabel}>
                            {' '}
                            (ترتيب الكلمات)
                          </Text>
                        )}
                      </Text>
                    </View>

                    {/* Correct answer */}
                    <View style={styles.answerContainer}>
                      <View style={styles.answerLabel}>
                        <Ionicons
                          name="checkmark-circle"
                          size={RFValue(18)}
                          color="#4CAF50"
                        />
                        <Text style={styles.answerLabelText}>
                          الإجابة الصحيحة:
                        </Text>
                      </View>

                      <View style={[styles.answerOption, styles.correctAnswer]}>
                        <Text style={styles.answerOptionText}>
                          {correctAnswerText}
                        </Text>
                        <Ionicons
                          name="checkmark"
                          size={RFValue(20)}
                          color="#4CAF50"
                        />
                      </View>
                    </View>

                    {/* User answer */}
                    {result.userAnswer ? (
                      <View style={styles.answerContainer}>
                        <View style={styles.answerLabel}>
                          <Ionicons
                            name={
                              result.isCorrect
                                ? 'checkmark-circle'
                                : 'close-circle'
                            }
                            size={RFValue(18)}
                            color={result.isCorrect ? '#4CAF50' : '#F44336'}
                          />
                          <Text style={styles.answerLabelText}>إجابتك:</Text>
                        </View>

                        <View
                          style={[
                            styles.answerOption,
                            result.isCorrect
                              ? styles.correctAnswer
                              : styles.incorrectAnswer,
                          ]}>
                          <Text style={styles.answerOptionText}>
                            {userAnswerText}
                          </Text>

                          <Ionicons
                            name={result.isCorrect ? 'checkmark' : 'close'}
                            size={RFValue(20)}
                            color={result.isCorrect ? '#4CAF50' : '#F44336'}
                          />
                        </View>
                      </View>
                    ) : (
                      <View style={styles.answerContainer}>
                        <View style={styles.answerLabel}>
                          <Ionicons
                            name="alert-circle"
                            size={RFValue(18)}
                            color="#FF9800"
                          />
                          <Text style={styles.answerLabelText}>إجابتك:</Text>
                        </View>

                        <View style={[styles.answerOption, styles.noAnswer]}>
                          <Text style={styles.answerOptionText}>
                            لم تقم بالإجابة
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </ScrollView>

          {/* SIDEBAR */}
          <ScrollView
            style={styles.sidebar}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}>
            {/* Score Card */}
            <LinearGradient
              colors={['#F8F9FF', '#FFFFFF']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.scoreCard}>
              <View style={styles.scoreHeader}>
                <Text style={styles.scorePercentage}>{scorePercentage}%</Text>
                <View style={styles.scoreLabelContainer}>
                  <Ionicons
                    name="thumbs-up"
                    size={RFValue(22)}
                    color="#667EEA"
                  />
                  <Text style={styles.scoreLabel}>نتيجتك النهائية</Text>
                </View>
              </View>

              {/* Circular Progress */}
              <View style={styles.circularProgressContainer}>
                <Svg
                  width={size}
                  height={size}
                  style={styles.circularProgressSvg}>
                  {/* Background Circle */}
                  <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#E8E9FF"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                  />
                  {/* Progress Circle */}
                  <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#667EEA"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={progressOffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                  />
                </Svg>
                {/* Center Text */}
                <View style={styles.circularProgressText}>
                  <Text style={styles.circularProgressNumber}>
                    {correctCount}/{totalQuestions}
                  </Text>
                </View>
              </View>
            </LinearGradient>

            {/* Correct Count */}
            <View style={[styles.statCard, styles.correctCard]}>
              <Ionicons
                name="checkmark-circle"
                size={RFValue(24)}
                color="#4CAF50"
              />
              <Text style={styles.statNumber}>{correctCount}</Text>
              <Text style={styles.statLabel}>إجابات صحيحة</Text>
            </View>

            {/* Incorrect Count */}
            <View style={[styles.statCard, styles.incorrectCard]}>
              <Ionicons
                name="close-circle"
                size={RFValue(24)}
                color="#F44336"
              />
              <Text style={styles.statNumber}>{incorrectCount}</Text>
              <Text style={styles.statLabel}>إجابات خاطئة</Text>
            </View>

            {/* Time Taken */}
            <View style={[styles.statCard, styles.timeCard]}>
              <Ionicons
                name="time-outline"
                size={RFValue(24)}
                color="#2196F3"
              />
              <Text style={styles.statNumber}>
                {formatTime(timeTaken || 0)}
              </Text>
              <Text style={styles.statLabel}>الوقت المستغرق</Text>
            </View>
          </ScrollView>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          {/* Retake Test Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (examTitle) {
                navigation.navigate('ExamQuestion', {
                  examTitle: examTitle,
                });
              } else {
                navigation.goBack();
              }
            }}
            style={styles.actionButton}>
            <LinearGradient
              colors={['#764BA2', '#667EEA']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.actionButtonGradient}>
              <Text style={styles.actionButtonText}>إعادة الاختبار</Text>
              <Ionicons
                name="refresh"
                size={RFValue(20)}
                color="#fff"
                style={styles.actionButtonIcon}
              />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{name: 'BottomTabs'}],
              });
            }}
            style={styles.actionButton}>
            <LinearGradient
              colors={['#4ECDC4', '#44A08D']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.actionButtonGradient}>
              <Text style={styles.actionButtonText}>العودة للرئيسية</Text>
              <Ionicons
                name="home"
                size={RFValue(20)}
                color="#fff"
                style={styles.actionButtonIcon}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  header: {
    borderRadius: RFValue(20),
    paddingVertical: RFValue(24),
    paddingHorizontal: RFValue(20),
    marginHorizontal: RFValue(16),
    marginTop: RFValue(12),
    marginBottom: RFValue(20),
    elevation: RFValue(8),
    shadowColor: '#667EEA',
    shadowOffset: {width: 0, height: RFValue(4)},
    shadowOpacity: 0.3,
    shadowRadius: RFValue(8),
  },
  headerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: RFValue(16),
  },
  headerTitle: {
    color: '#fff',
    fontSize: RFValue(24),
    ...FONTS.h2,
    letterSpacing: 0.5,
  },
  headerSubContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: RFValue(20),
    paddingHorizontal: RFValue(8),
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: RFValue(15),
    ...FONTS.body3,
    textAlign: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFValue(4),
  },
  progressBarBackground: {
    flex: 1,
    height: RFValue(12),
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: RFValue(5),
    overflow: 'hidden',
    marginRight: RFValue(14),
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFC107',
    borderRadius: RFValue(5),
  },
  progressText: {
    color: '#fff',
    fontSize: RFValue(15),
    ...FONTS.body4,
    // minWidth: RFValue(55),
    // fontWeight: '600',
  },
  contentWrapper: {
    flexDirection: width > 600 ? 'row' : 'column',
    paddingHorizontal: RFValue(16),
    paddingBottom: RFValue(120),
  },
  mainContent: {
    flex: width > 600 ? 1 : undefined,
    marginRight: width > 600 ? RFValue(16) : 0,
    marginBottom: width > 600 ? 0 : RFValue(20),
  },
  mainContentScroll: {
    paddingBottom: RFValue(24),
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(20),
    backgroundColor: '#fff',
    paddingVertical: RFValue(16),
    paddingHorizontal: RFValue(16),
    borderRadius: RFValue(14),
    elevation: RFValue(3),
    shadowColor: '#667EEA',
    shadowOffset: {width: 0, height: RFValue(2)},
    shadowOpacity: 0.15,
    shadowRadius: RFValue(6),
  },
  reviewHeaderText: {
    fontSize: RFValue(17),
    color: '#667EEA',
    marginLeft: RFValue(10),
    ...FONTS.body3,
    fontWeight: '600',
  },
  questionsList: {
    gap: RFValue(20),
  },
  questionReviewCard: {
    backgroundColor: '#fff',
    borderRadius: RFValue(16),
    padding: RFValue(20),
    marginBottom: RFValue(16),
    elevation: RFValue(3),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: RFValue(2)},
    shadowOpacity: 0.08,
    shadowRadius: RFValue(6),
    borderWidth: RFValue(1),
    borderColor: '#F0F0F0',
  },
  questionReviewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: RFValue(18),
  },
  questionNumberBadge: {
    width: RFValue(36),
    height: RFValue(36),
    borderRadius: RFValue(18),
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: RFValue(14),
    elevation: RFValue(2),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: RFValue(1)},
    shadowOpacity: 0.2,
    shadowRadius: RFValue(2),
  },
  questionNumberBadgeCorrect: {
    backgroundColor: '#4CAF50',
  },
  questionNumberBadgeIncorrect: {
    backgroundColor: '#F44336',
  },
  questionNumberText: {
    color: '#fff',
    fontSize: RFValue(15),
    ...FONTS.body4,
    fontWeight: 'bold',
  },
  questionReviewText: {
    flex: 1,
    fontSize: RFValue(16),
    color: '#222',
    lineHeight: RFValue(26),
    ...FONTS.body3,
    paddingTop: RFValue(2),
    direction: 'ltr',
  },
  questionTypeLabel: {
    fontSize: RFValue(14),
    color: '#667EEA',
    fontStyle: 'italic',
    ...FONTS.body4,
  },
  answerContainer: {
    marginTop: RFValue(16),
  },
  answerLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(10),
  },
  answerLabelText: {
    fontSize: RFValue(13),
    color: '#555',
    marginLeft: RFValue(8),
    ...FONTS.body5,
    fontWeight: '500',
  },
  answerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: RFValue(14),
    paddingHorizontal: RFValue(16),
    borderRadius: RFValue(10),
    borderWidth: RFValue(1.5),
    minHeight: RFValue(50),
  },
  correctAnswer: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  incorrectAnswer: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  noAnswer: {
    backgroundColor: '#FFF3E0',
    borderColor: '#FF9800',
  },
  answerOptionText: {
    flex: 1,
    fontSize: RFValue(15),
    color: '#333',
    ...FONTS.body4,
    marginRight: RFValue(12),
    lineHeight: RFValue(22),
  },
  sidebar: {
    width: width > 600 ? width * 0.35 : '100%',
    minWidth: width > 600 ? RFValue(160) : undefined,
    maxHeight: '100%',
  },
  scoreCard: {
    borderRadius: RFValue(20),
    paddingVertical: RFValue(28),
    paddingHorizontal: RFValue(24),
    alignItems: 'center',
    marginBottom: RFValue(20),
    elevation: RFValue(6),
    shadowColor: '#667EEA',
    shadowOffset: {width: 0, height: RFValue(4)},
    shadowOpacity: 0.3,
    shadowRadius: RFValue(10),
    borderWidth: RFValue(1.5),
    borderColor: '#E8E9FF',
  },
  scoreHeader: {
    alignItems: 'center',
    marginBottom: RFValue(24),
  },
  scorePercentage: {
    fontSize: RFValue(42),
    color: '#667EEA',
    ...FONTS.h1,
    marginBottom: RFValue(14),
    fontWeight: 'bold',
    textShadowColor: 'rgba(102, 126, 234, 0.2)',
    textShadowOffset: {width: 0, height: RFValue(2)},
    textShadowRadius: RFValue(4),
  },
  scoreLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    paddingVertical: RFValue(8),
    paddingHorizontal: RFValue(16),
    borderRadius: RFValue(20),
  },
  scoreLabel: {
    fontSize: RFValue(14),
    color: '#667EEA',
    marginLeft: RFValue(8),
    ...FONTS.body5,
    fontWeight: '600',
  },
  circularProgressContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularProgressSvg: {
    position: 'absolute',
  },
  circularProgressText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
  },
  circularProgressNumber: {
    fontSize: RFValue(18),
    color: '#667EEA',
    ...FONTS.body3,
    fontWeight: 'bold',
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: RFValue(14),
    paddingVertical: RFValue(18),
    paddingHorizontal: RFValue(16),
    alignItems: 'center',
    marginBottom: RFValue(16),
    elevation: RFValue(3),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: RFValue(2)},
    shadowOpacity: 0.1,
    shadowRadius: RFValue(5),
    borderWidth: RFValue(1),
    borderColor: '#F5F5F5',
  },
  correctCard: {
    backgroundColor: '#E8F5E9',
  },
  incorrectCard: {
    backgroundColor: '#FFEBEE',
  },
  timeCard: {
    backgroundColor: '#E3F2FD',
  },
  statNumber: {
    fontSize: RFValue(26),
    color: '#333',
    marginTop: RFValue(10),
    marginBottom: RFValue(6),
    ...FONTS.body2,
    // fontWeight: '600',
  },
  statLabel: {
    fontSize: RFValue(13),
    color: '#666',
    ...FONTS.body3,
    // fontWeight: '500',
  },
  actionButtonsContainer: {
    paddingHorizontal: RFValue(16),
    // paddingTop: RFValue(24),
    paddingBottom: RFValue(32),
    gap: RFValue(16),
  },
  actionButton: {
    borderRadius: RFValue(14),
    overflow: 'hidden',
    elevation: RFValue(4),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: RFValue(2)},
    shadowOpacity: 0.2,
    shadowRadius: RFValue(4),
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RFValue(16),
    paddingHorizontal: RFValue(20),
    minHeight: RFValue(56),
  },
  actionButtonText: {
    color: '#fff',
    fontSize: RFValue(16),
    ...FONTS.body3,
    fontWeight: '600',
    marginRight: RFValue(10),
  },
  actionButtonIcon: {
    marginLeft: RFValue(10),
  },
});
