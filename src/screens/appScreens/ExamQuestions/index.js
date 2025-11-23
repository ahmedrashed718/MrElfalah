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
import {FONTS} from '../../../constants';
import {AppHeader} from '../../../components';
import {COLORS} from './../../../constants/theme';

const {width} = Dimensions.get('window');

const sampleQuestions = [
  {
    question_id: '3184',
    question_text: 'He was _________ when his team won. ',
    question_image: '',
    question_answers: ['happy', 'nervous', 'sad'],
    question_valid_answer: 'happy',
    course_id: '8',
    unit_id: '41',
    video_id: null,
    type: 'mcq',
    gameType: 'character',
    hint: '',
    real_answers: [
      {answer_text: 'happy', answer_exp: '', answer_check: true},
      {answer_text: 'nervous', answer_exp: '', answer_check: false},
      {answer_text: 'sad', answer_exp: '', answer_check: false},
    ],
  },
  {
    question_id: '3185',
    question_text: 'Salma was _________ before her exam.',
    question_image: '',
    question_answers: ['excited', 'worried', 'happy'],
    question_valid_answer: 'worried',
    course_id: '8',
    unit_id: '41',
    video_id: null,
    type: 'mcq',
    gameType: 'character',
    hint: '',
    real_answers: [
      {answer_text: 'excited', answer_exp: '', answer_check: false},
      {answer_text: 'worried', answer_exp: '', answer_check: true},
      {answer_text: 'happy', answer_exp: '', answer_check: false},
    ],
  },
  {
    question_id: '3186',
    question_text: 'Ahmed _________ proud after scoring a goal. ',
    question_image: '',
    question_answers: ['hurt', 'went', 'felt'],
    question_valid_answer: 'felt',
    course_id: '8',
    unit_id: '41',
    video_id: null,
    type: 'mcq',
    gameType: 'character',
    hint: '',
    real_answers: [
      {answer_text: 'hurt', answer_exp: '', answer_check: false},
      {answer_text: 'went', answer_exp: '', answer_check: false},
      {answer_text: 'felt', answer_exp: '', answer_check: true},
    ],
  },
  {
    question_id: '3187',
    question_text: 'My brother _________ a goal.',
    question_image: '',
    question_answers: ['started', 'felt', 'scored'],
    question_valid_answer: 'scored',
    course_id: '8',
    unit_id: '41',
    video_id: null,
    type: 'mcq',
    gameType: 'character',
    hint: '',
    real_answers: [
      {answer_text: 'started', answer_exp: '', answer_check: false},
      {answer_text: 'felt', answer_exp: '', answer_check: false},
      {answer_text: 'scored', answer_exp: '', answer_check: true},
    ],
  },
  {
    question_id: '3188',
    question_text: 'He was worried about making _________.',
    question_image: '',
    question_answers: ['mistakes', 'games', 'goals'],
    question_valid_answer: 'mistakes',
    course_id: '8',
    unit_id: '41',
    video_id: null,
    type: 'mcq',
    gameType: 'character',
    hint: '',
    real_answers: [
      {answer_text: 'mistakes', answer_exp: '', answer_check: true},
      {answer_text: 'games', answer_exp: '', answer_check: false},
      {answer_text: 'goals', answer_exp: '', answer_check: false},
    ],
  },
  {
    question_id: '3189',
    question_text: 'He _________ proud after scoring a goal. ',
    question_image: '',
    question_answers: ['felt', 'fell', 'feel'],
    question_valid_answer: 'felt',
    course_id: '8',
    unit_id: '41',
    video_id: null,
    type: 'mcq',
    gameType: 'character',
    hint: '',
    real_answers: [
      {answer_text: 'felt', answer_exp: '', answer_check: true},
      {answer_text: 'fell', answer_exp: '', answer_check: false},
      {answer_text: 'feel', answer_exp: '', answer_check: false},
    ],
  },
  {
    question_id: '3190',
    question_text: 'He was _________ when his team won the game. ',
    question_image: '',
    question_answers: ['sad', 'happy', 'tired'],
    question_valid_answer: 'happy',
    course_id: '8',
    unit_id: '41',
    video_id: null,
    type: 'mcq',
    gameType: 'character',
    hint: '',
    real_answers: [
      {answer_text: 'sad', answer_exp: '', answer_check: false},
      {answer_text: 'happy', answer_exp: '', answer_check: true},
      {answer_text: 'tired', answer_exp: '', answer_check: false},
    ],
  },
  {
    question_id: '3191',
    question_text: 'It was my first football _________. ',
    question_image: '',
    question_answers: ['match', 'number', 'name'],
    question_valid_answer: 'match',
    course_id: '8',
    unit_id: '41',
    video_id: null,
    type: 'mcq',
    gameType: 'character',
    hint: '',
    real_answers: [
      {answer_text: 'match', answer_exp: '', answer_check: true},
      {answer_text: 'number', answer_exp: '', answer_check: false},
      {answer_text: 'name', answer_exp: '', answer_check: false},
    ],
  },
  {
    question_id: '3192',
    question_text: 'My team _________ the game yesterday. ',
    question_image: '',
    question_answers: ['wins', 'win', 'won'],
    question_valid_answer: 'won',
    course_id: '8',
    unit_id: '41',
    video_id: null,
    type: 'mcq',
    gameType: 'character',
    hint: '',
    real_answers: [
      {answer_text: 'wins', answer_exp: '', answer_check: false},
      {answer_text: 'win', answer_exp: '', answer_check: false},
      {answer_text: 'won', answer_exp: '', answer_check: true},
    ],
  },
  {
    question_id: '3193',
    question_text: "Eman was worried, _________ she didn't stop.",
    question_image: '',
    question_answers: ['after', 'and', 'but'],
    question_valid_answer: 'but',
    course_id: '8',
    unit_id: '41',
    video_id: null,
    type: 'mcq',
    gameType: 'character',
    hint: '',
    real_answers: [
      {answer_text: 'after', answer_exp: '', answer_check: false},
      {answer_text: 'and', answer_exp: '', answer_check: false},
      {answer_text: 'but', answer_exp: '', answer_check: true},
    ],
  },
  {
    question_id: '3194',
    question_text: 'We _________ football in the park yesterday. ',
    question_image: '',
    question_answers: ['played', 'play', 'plays'],
    question_valid_answer: 'played',
    course_id: '8',
    unit_id: '41',
    video_id: null,
    type: 'mcq',
    gameType: 'character',
    hint: '',
    real_answers: [
      {answer_text: 'played', answer_exp: '', answer_check: true},
      {answer_text: 'play', answer_exp: '', answer_check: false},
      {answer_text: 'plays', answer_exp: '', answer_check: false},
    ],
  },
  {
    question_id: '3195',
    question_text: 'I felt proud of myself.',
    question_image: '',
    question_answers: '',
    question_valid_answer: 'I felt proud of myself.',
    course_id: '8',
    unit_id: '41',
    video_id: null,
    type: 'arrangePuzzle',
    gameType: 'word',
    hint: '',
    correctSentence: 'I felt proud of myself.',
    str_shuffle: ['of', 'myself.', 'felt', 'I', 'proud'],
    real_answers: [],
  },
  {
    question_id: '3196',
    question_text: 'My team won the game.',
    question_image: '',
    question_answers: '',
    question_valid_answer: 'My team won the game.',
    course_id: '8',
    unit_id: '41',
    video_id: null,
    type: 'arrangePuzzle',
    gameType: 'word',
    hint: '',
    correctSentence: 'My team won the game.',
    str_shuffle: ['My', 'team', 'the', 'won', 'game.'],
    real_answers: [],
  },
  {
    question_id: '3197',
    question_text: 'She watched a football match.',
    question_image: '',
    question_answers: '',
    question_valid_answer: 'She watched a football match.',
    course_id: '8',
    unit_id: '41',
    video_id: null,
    type: 'arrangePuzzle',
    gameType: 'word',
    hint: '',
    correctSentence: 'She watched a football match.',
    str_shuffle: ['watched', 'She', 'a', 'football', 'match.'],
    real_answers: [],
  },
  {
    question_id: '3198',
    question_text: 'I was tired and nervous.',
    question_image: '',
    question_answers: '',
    question_valid_answer: 'I was tired and nervous.',
    course_id: '8',
    unit_id: '41',
    video_id: null,
    type: 'arrangePuzzle',
    gameType: 'word',
    hint: '',
    correctSentence: 'I was tired and nervous.',
    str_shuffle: ['was', 'tired', 'I', 'nervous.', 'and'],
    real_answers: [],
  },
  {
    question_id: '3199',
    question_text: 'Ola was worried about making mistakes.',
    question_image: '',
    question_answers: '',
    question_valid_answer: 'Ola was worried about making mistakes.',
    course_id: '8',
    unit_id: '41',
    video_id: null,
    type: 'arrangePuzzle',
    gameType: 'word',
    hint: '',
    correctSentence: 'Ola was worried about making mistakes.',
    str_shuffle: ['worried', 'Ola', 'making', 'was', 'about', 'mistakes.'],
    real_answers: [],
  },
  {
    question_id: '3200',
    question_text: 'We played a football match.',
    question_image: '',
    question_answers: '',
    question_valid_answer: 'We played a football match.',
    course_id: '8',
    unit_id: '41',
    video_id: null,
    type: 'arrangePuzzle',
    gameType: 'word',
    hint: '',
    correctSentence: 'We played a football match.',
    str_shuffle: ['played', 'football', 'match.', 'We', 'a'],
    real_answers: [],
  },
];

// Arrange Puzzle Component
const ArrangePuzzleGame = ({question, onAnswerChange, selectedAnswer}) => {
  const [sortedWords, setSortedWords] = useState([]);
  const [availableWords, setAvailableWords] = useState(
    question.str_shuffle ? [...question.str_shuffle] : [],
  );

  useEffect(() => {
    // Reset when question changes
    setSortedWords([]);
    setAvailableWords(question.str_shuffle ? [...question.str_shuffle] : []);
  }, [question.question_id, question.str_shuffle]);

  const handleWordClick = word => {
    const newSorted = [...sortedWords, word];
    const newAvailable = availableWords.filter((w, idx) => {
      const wordIndex = availableWords.indexOf(word);
      return idx !== wordIndex;
    });

    setSortedWords(newSorted);
    setAvailableWords(newAvailable);

    // Update answer
    const answer = newSorted.join(' ');
    onAnswerChange(answer);
  };

  const handleRemoveWord = (word, index) => {
    const newSorted = sortedWords.filter((_, idx) => idx !== index);
    const newAvailable = [...availableWords, word];

    setSortedWords(newSorted);
    setAvailableWords(newAvailable);

    // Update answer
    const answer = newSorted.join(' ');
    onAnswerChange(answer);
  };

  const handleShuffle = () => {
    const shuffled = [...availableWords].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
  };

  const handleReset = () => {
    setSortedWords([]);
    setAvailableWords(question.str_shuffle ? [...question.str_shuffle] : []);
    onAnswerChange('');
  };

  return (
    <LinearGradient
      colors={[COLORS.secondary, COLORS.primary]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.arrangeGameContainer}>
      {/* Title */}
      <Text style={styles.arrangeGameTitle}>لعبة تسميع الكلمات (الجمل)</Text>
      <Text style={styles.arrangeGameSubtitle}>
        رتب الكلمات لتكوين جملة صحيحة
      </Text>

      {/* Action Buttons */}
      <View style={styles.arrangeActionButtons}>
        <TouchableOpacity
          style={styles.shuffleButton}
          onPress={handleShuffle}
          activeOpacity={0.7}>
          <Ionicons name="shuffle" size={RFValue(18)} color="#fff" />
          <Text style={styles.shuffleButtonText}>خلط الكلمات</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleReset}
          activeOpacity={0.7}>
          <Text style={styles.resetButtonText}>إعادة تعيين</Text>
          <Ionicons name="refresh" size={RFValue(18)} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Sorted Sentence Section */}
      <View style={styles.sortedSentenceContainer}>
        <View style={styles.sectionHeader}>
          <View style={styles.yellowDot} />
          <Text style={styles.sectionTitle}>الجملة المرتبة</Text>
        </View>
        <View style={styles.sortedWordsContainer}>
          {sortedWords.length === 0 ? (
            <Text style={styles.placeholderText}>
              اسحب الكلمات هنا لترتيب الجملة...
            </Text>
          ) : (
            <View style={styles.sortedWordsRow}>
              {sortedWords.map((word, index) => (
                <TouchableOpacity
                  key={`sorted-${index}`}
                  style={styles.sortedWordBlock}
                  onPress={() => handleRemoveWord(word, index)}
                  activeOpacity={0.7}>
                  <View style={styles.wordNumberBadge}>
                    <Text style={styles.wordNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.sortedWordText}>{word}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Available Words Section */}
      <View style={styles.availableWordsContainer}>
        <View style={styles.sectionHeader}>
          <View style={styles.purpleDot} />
          <Text style={styles.sectionTitle}>الكلمات المتاحة</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.availableWordsRow}>
          {availableWords.map((word, index) => (
            <TouchableOpacity
              key={`available-${index}`}
              style={styles.availableWordBlock}
              onPress={() => handleWordClick(word)}
              activeOpacity={0.7}>
              <Text style={styles.availableWordText}>{word}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Current Result */}
      {sortedWords.length > 0 && (
        <View style={styles.currentResultContainer}>
          <Text style={styles.currentResultText}>
            النتيجة الحالية: "{sortedWords.join(' ')}"
          </Text>
        </View>
      )}

      {/* How to Play Section */}
      <View style={styles.howToPlayContainer}>
        <View style={styles.sectionHeader}>
          <View style={styles.blueDot} />
          <Text style={styles.sectionTitle}>كيفية اللعب</Text>
        </View>
        <View style={styles.howToPlayContent}>
          <Text style={styles.howToPlayText}>طريقة اللعب: اضغط ع الكلمة</Text>
          <View style={styles.goalRow}>
            <Ionicons name="star" size={RFValue(16)} color="#FFC107" />
            <Text style={styles.goalText}>الهدف: رتب الكلمات لتكوين جملة</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default function ExamQuestion({route, navigation}) {
  const {examTitle} = route.params || {};
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(60 * 60);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [startTime] = useState(Date.now());

  const progressAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Get questions from route params or use sample questions
  const questions = route.params?.questions || sampleQuestions;
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex] || questions[0];

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex, totalQuestions]);

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
      [currentQuestion.question_id]: optionId,
    });
  };

  const handleArrangeAnswerChange = answer => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.question_id]: answer,
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
    if (index >= 0 && index < totalQuestions) {
      setCurrentQuestionIndex(index);
      setShowSidePanel(false);
    }
  };

  const handleFinishExam = () => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    navigation.navigate('ExamResults', {
      questions,
      selectedAnswers,
      timeTaken,
      examTitle: examTitle || 'اختبار4',
    });
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
            <Text style={styles.titleText}>{examTitle || 'اختبار'}</Text>
          </LinearGradient>

          {/* Question Card - Only show for MCQ */}
          {currentQuestion.type !== 'arrangePuzzle' && (
            <View style={styles.questionCard}>
              <View style={styles.questionHeader}>
                <View style={styles.questionBadge}>
                  <Text style={styles.questionBadgeText}>
                    Q{currentQuestionIndex + 1}
                  </Text>
                </View>
                <Text style={styles.questionType}>Multiple Choice</Text>
              </View>
              <Text style={styles.questionText}>
                {currentQuestion.question_text} 🤔
              </Text>
            </View>
          )}

          {/* Conditional Rendering based on question type */}
          {currentQuestion.type === 'arrangePuzzle' ? (
            <ArrangePuzzleGame
              question={currentQuestion}
              onAnswerChange={handleArrangeAnswerChange}
              selectedAnswer={
                selectedAnswers[currentQuestion.question_id] || ''
              }
            />
          ) : (
            /* Options for MCQ */
            <View style={styles.optionsContainer}>
              {currentQuestion.real_answers &&
                currentQuestion.real_answers.map((answer, index) => {
                  const optionId = String.fromCharCode(65 + index); // A, B, C, D
                  const isSelected =
                    selectedAnswers[currentQuestion.question_id] === optionId;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleAnswerSelect(optionId)}
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
          )}

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

            {currentQuestionIndex >= totalQuestions - 1 ? (
              // Finish Exam Button (Green)
              <TouchableOpacity
                style={styles.finishButton}
                onPress={handleFinishExam}>
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
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
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
                    onPress={() => handleQuestionSelect(index)}>
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
              onPress={() => {
                handlePrevious();
              }}
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
                  handleFinishExam();
                  setShowSidePanel(false);
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
                onPress={() => {
                  handleNext();
                }}>
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
    direction: 'ltr',
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

  /* ===== SIDE PANEL  ===== */
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

  /* ===== SIDE PANEL NAVIGATION BUTTONS ===== */
  sidePanelNavigation: {
    flexDirection: 'column',
    padding: RFValue(12),
    borderTopWidth: RFValue(1),
    borderTopColor: '#E0E0E0',
    backgroundColor: '#F8F9FA',
    gap: RFValue(8),
  },

  sidePanelNavigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: RFValue(8),
  },

  sidePanelPreviousButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: RFValue(10),
    paddingVertical: RFValue(12),
    gap: RFValue(6),
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

  sidePanelPreviousButtonFull: {
    width: '100%',
  },

  sidePanelNextButton: {
    flex: 1,
    borderRadius: RFValue(10),
    overflow: 'hidden',
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

  sidePanelFinishButton: {
    flex: 1,
    borderRadius: RFValue(10),
    overflow: 'hidden',
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

  /* ===== Arrange Puzzle Game Styles ===== */
  arrangeGameContainer: {
    marginBottom: RFValue(24),
    borderRadius: RFValue(16),
    padding: RFValue(20),
    elevation: RFValue(4),
    shadowColor: '#667EEA',
    shadowOffset: {width: 0, height: RFValue(2)},
    shadowOpacity: 0.3,
    shadowRadius: RFValue(8),
  },

  arrangeGameTitle: {
    fontSize: RFValue(22),
    color: '#fff',
    textAlign: 'center',
    marginBottom: RFValue(8),
    ...FONTS.body2,
    fontWeight: 'bold',
  },

  arrangeGameSubtitle: {
    fontSize: RFValue(14),
    color: '#fff',
    textAlign: 'center',
    marginBottom: RFValue(20),
    ...FONTS.body4,
  },

  arrangeActionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: RFValue(20),
    gap: RFValue(10),
  },

  shuffleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF8C42',
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(16),
    borderRadius: RFValue(12),
    borderTopRightRadius: RFValue(20),
    gap: RFValue(8),
  },

  shuffleButtonText: {
    color: '#fff',
    fontSize: RFValue(14),
    ...FONTS.body4,
  },

  resetButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(16),
    borderRadius: RFValue(12),
    borderTopLeftRadius: RFValue(20),
    gap: RFValue(8),
  },

  resetButtonText: {
    color: '#fff',
    fontSize: RFValue(14),
    ...FONTS.body4,
  },

  sortedSentenceContainer: {
    backgroundColor: '#E8E8E8',
    borderRadius: RFValue(16),
    padding: RFValue(16),
    marginBottom: RFValue(16),
    minHeight: RFValue(120),
  },

  availableWordsContainer: {
    backgroundColor: '#E8E8E8',
    borderRadius: RFValue(16),
    padding: RFValue(16),
    marginBottom: RFValue(16),
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(12),
  },

  yellowDot: {
    width: RFValue(8),
    height: RFValue(8),
    borderRadius: RFValue(4),
    backgroundColor: '#FFC107',
    marginLeft: RFValue(8),
  },

  purpleDot: {
    width: RFValue(8),
    height: RFValue(8),
    borderRadius: RFValue(4),
    backgroundColor: '#9C27B0',
    marginLeft: RFValue(8),
  },

  blueDot: {
    width: RFValue(8),
    height: RFValue(8),
    borderRadius: RFValue(4),
    backgroundColor: '#2196F3',
    marginLeft: RFValue(8),
  },

  sectionTitle: {
    fontSize: RFValue(14),
    color: '#333',
    ...FONTS.body4,
    fontWeight: '600',
  },

  sortedWordsContainer: {
    minHeight: RFValue(80),
    justifyContent: 'center',
    direction: 'ltr',
  },

  placeholderText: {
    fontSize: RFValue(14),
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
    ...FONTS.body4,
  },

  sortedWordsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: RFValue(8),
  },

  sortedWordBlock: {
    backgroundColor: '#D3D3D3',
    borderRadius: RFValue(12),
    padding: RFValue(12),
    paddingTop: RFValue(20),
    marginBottom: RFValue(8),
    position: 'relative',
    minWidth: RFValue(80),
    alignItems: 'center',
  },

  wordNumberBadge: {
    position: 'absolute',
    top: RFValue(4),
    left: RFValue(4),
    width: RFValue(24),
    height: RFValue(24),
    borderRadius: RFValue(12),
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  wordNumberText: {
    color: '#fff',
    fontSize: RFValue(12),
    ...FONTS.body5,
    fontWeight: 'bold',
  },

  sortedWordText: {
    fontSize: RFValue(14),
    color: '#333',
    ...FONTS.body4,
  },

  availableWordsRow: {
    flexDirection: 'row',
    gap: RFValue(8),
    paddingVertical: RFValue(4),
  },

  availableWordBlock: {
    backgroundColor: '#D3D3D3',
    borderRadius: RFValue(12),
    padding: RFValue(12),
    minWidth: RFValue(70),
    alignItems: 'center',
  },

  availableWordText: {
    fontSize: RFValue(14),
    color: '#333',
    ...FONTS.body4,
  },

  currentResultContainer: {
    marginTop: RFValue(8),
    marginBottom: RFValue(16),
    padding: RFValue(12),
    // backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderRadius: RFValue(8),
    // ...FONTS.body3,
  },

  currentResultText: {
    fontSize: RFValue(14),
    color: COLORS.black,
    textAlign: 'center',
    ...FONTS.body4,
  },

  howToPlayContainer: {
    backgroundColor: '#B3E5FC',
    borderRadius: RFValue(16),
    padding: RFValue(16),
  },

  howToPlayContent: {
    marginTop: RFValue(8),
  },

  howToPlayText: {
    fontSize: RFValue(13),
    color: '#333',
    marginBottom: RFValue(8),
    ...FONTS.body4,
  },

  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(6),
  },

  goalText: {
    fontSize: RFValue(13),
    color: '#333',
    ...FONTS.body4,
  },
});
