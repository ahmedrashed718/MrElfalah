import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {AppHeader} from '../../../components';
import {sampleQuestions} from './components/sampleQuestions';
import ArrangePuzzleGame from './components/ArrangePuzzleGame';
import ExamHeader from './components/ExamHeader';
import ExamTitleCard from './components/ExamTitleCard';
import QuestionCard from './components/QuestionCard';
import MCQOptions from './components/MCQOptions';
import NavigationButtons from './components/NavigationButtons';
import SidePanel from './components/SidePanel';
import {Animated} from 'react-native';

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
          <ExamHeader
            timeRemaining={timeRemaining}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            progressWidth={progressWidth}
          />

          {/* Title */}
          <ExamTitleCard examTitle={examTitle} />

          {/* Question Card - Only show for MCQ */}
          {currentQuestion.type !== 'arrangePuzzle' && (
            <QuestionCard
              questionText={currentQuestion.question_text}
              questionNumber={currentQuestionIndex + 1}
            />
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
            <MCQOptions
              answers={currentQuestion.real_answers}
              selectedAnswer={selectedAnswers[currentQuestion.question_id]}
              onAnswerSelect={handleAnswerSelect}
              scaleAnim={scaleAnim}
            />
          )}

          {/* Navigation */}
          <NavigationButtons
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onFinish={handleFinishExam}
          />
        </View>
      </ScrollView>

      {/* SIDE PANEL */}
      <SidePanel
        showSidePanel={showSidePanel}
        onClose={() => setShowSidePanel(false)}
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        selectedAnswers={selectedAnswers}
        onQuestionSelect={handleQuestionSelect}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onFinish={handleFinishExam}
        totalQuestions={totalQuestions}
      />
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
});
