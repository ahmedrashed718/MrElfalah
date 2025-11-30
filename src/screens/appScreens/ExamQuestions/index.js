import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {AppHeader} from '../../../components';
import ArrangePuzzleGame from './components/ArrangePuzzleGame';
import ExamHeader from './components/ExamHeader';
import ExamTitleCard from './components/ExamTitleCard';
import QuestionCard from './components/QuestionCard';
import MCQOptions from './components/MCQOptions';
import NavigationButtons from './components/NavigationButtons';
import SidePanel from './components/SidePanel';
import {Animated} from 'react-native';
import {fetchData} from '../../../Helpers/ApiHelper';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';

export default function ExamQuestion({route, navigation}) {
  const {examTitle, examId} = route.params || {};
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(60 * 1);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [startTime] = useState(Date.now());
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user data from Redux
  const userData = useSelector(state => state.UserReducer.userData);
  const token = useSelector(state => state.UserReducer.token);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const examFinishedRef = useRef(false);
  const selectedAnswersRef = useRef({});
  const questionsRef = useRef([]);
  const examTitleRef = useRef('');
  const navigationRef = useRef(null);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex] || questions[0];

  // Fetch exam questions from API
  useEffect(() => {
    const fetchExamQuestions = async () => {
      try {
        setLoading(true);

        // Check if examId is provided
        if (!examId) {
          Toast.show({
            type: 'error',
            text1: 'خطأ في البيانات',
            text2: 'لم يتم العثور على معرف الامتحان',
            position: 'top',
            visibilityTime: 3000,
          });
          setQuestions([]);
          setLoading(false);
          return;
        }

        // Check if user data and token exist
        if (!userData?.student_id && !userData?.id) {
          Toast.show({
            type: 'error',
            text1: 'خطأ في البيانات',
            text2: 'لم يتم العثور على معرف المستخدم',
            position: 'top',
            visibilityTime: 3000,
          });
          setQuestions([]);
          setLoading(false);
          return;
        }

        if (!token) {
          Toast.show({
            type: 'error',
            text1: 'خطأ في المصادقة',
            text2: 'لم يتم العثور على رمز المصادقة',
            position: 'top',
            visibilityTime: 3000,
          });
          setQuestions([]);
          setLoading(false);
          return;
        }
        // Call API to fetch exam questions
        const response = await fetchData(
          'POST',
          '/courses/select_exam_questions.php',
          {
            exam_id: examId,
            student_id: userData?.student_id || userData?.id,
            token_value: token,
            mobile: true,
          },
        );

        if (response && response.status === 'success') {
          // Data may come in response.data or response.message
          const questionsData = response.message || [];
          const questionsArray = Array.isArray(questionsData)
            ? questionsData
            : [];

          // Debug: Log response to see structure
          console.log('API Response:', JSON.stringify(response, null, 2));
          console.log('Questions Array:', questionsArray.length);

          if (questionsArray.length > 0) {
            setQuestions(questionsArray);
            // API returns time in seconds, use it directly
            // Check multiple possible locations for exam_time
            let examTimeInSeconds = null;

            if (response.exam_time) {
              examTimeInSeconds = response.exam_time;
            } else if (response.data?.exam_time) {
              examTimeInSeconds = response.data.exam_time;
            } else if (response.message?.exam_time) {
              examTimeInSeconds = response.message.exam_time;
            } else if (
              typeof response.message === 'object' &&
              response.message.exam_time
            ) {
              examTimeInSeconds = response.message.exam_time;
            } else if (questionsArray[0]?.exam_time) {
              examTimeInSeconds = questionsArray[0].exam_time;
            }

            // console.log('Found exam_time:', examTimeInSeconds);

            if (examTimeInSeconds) {
              setTimeRemaining(Number(examTimeInSeconds));
            } else {
              console.warn(
                'exam_time not found in response, using default 60 seconds',
              );
            }
          } else {
            Toast.show({
              type: 'info',
              text1: 'لا توجد أسئلة',
              text2: 'لا توجد أسئلة متاحة لهذا الامتحان',
              position: 'top',
              visibilityTime: 3000,
            });
            setQuestions([]);
          }
        } else {
          Toast.show({
            type: 'error',
            text1: 'خطأ في تحميل الأسئلة',
            text2: response?.message || 'حدث خطأ، يرجى المحاولة مرة أخرى',
            position: 'top',
            visibilityTime: 3000,
          });
          setQuestions([]);
        }
      } catch (error) {
        console.error('Error fetching exam questions:', error);
        Toast.show({
          type: 'error',
          text1: 'خطأ في الاتصال',
          text2: 'حدث خطأ، يرجى المحاولة مرة أخرى',
          position: 'top',
          visibilityTime: 3000,
        });
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExamQuestions();
  }, [examId, userData, token]);

  // Keep refs updated
  useEffect(() => {
    selectedAnswersRef.current = selectedAnswers;
  }, [selectedAnswers]);

  useEffect(() => {
    questionsRef.current = questions;
  }, [questions]);

  useEffect(() => {
    examTitleRef.current = examTitle;
  }, [examTitle]);

  useEffect(() => {
    navigationRef.current = navigation;
  }, [navigation]);

  // Timer
  useEffect(() => {
    if (loading || questions.length === 0) {
      return;
    }

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
  }, [loading, questions.length]);

  // Auto-finish exam when timer reaches 0
  useEffect(() => {
    if (
      timeRemaining <= 0 &&
      !examFinishedRef.current &&
      navigationRef.current
    ) {
      examFinishedRef.current = true;
      // Use setTimeout to defer navigation outside of render cycle
      setTimeout(() => {
        const timeTaken = Math.floor((Date.now() - startTime) / 1000);
        navigationRef.current?.navigate('ExamResults', {
          questions: questionsRef.current,
          selectedAnswers: selectedAnswersRef.current,
          timeTaken,
          examTitle: examTitleRef.current || 'اختبار4',
        });
      }, 0);
    }
  }, [timeRemaining, startTime]);

  // Progress bar
  useEffect(() => {
    if (totalQuestions > 0) {
      const progress = (currentQuestionIndex + 1) / totalQuestions;
      Animated.timing(progressAnim, {
        toValue: progress,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      // Reset progress to 0 if no questions
      Animated.timing(progressAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
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

  const handleFinishExam = useCallback(() => {
    if (examFinishedRef.current) {
      return; // Prevent multiple submissions
    }
    examFinishedRef.current = true;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    navigation.navigate('ExamResults', {
      questions,
      selectedAnswers,
      timeTaken,
      examTitle: examTitle || 'اختبار4',
    });
  }, [startTime, navigation, questions, selectedAnswers, examTitle]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  // Show loading indicator while fetching questions
  if (loading) {
    return (
      <View style={styles.container}>
        <AppHeader title="الامتحان" showBack={true} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4FACFE" />
        </View>
      </View>
    );
  }

  // Show message if no questions available
  if (totalQuestions === 0) {
    return (
      <View style={styles.container}>
        <AppHeader title="الامتحان" showBack={true} />
        <View style={styles.loadingContainer}>
          <Text style={styles.emptyText}>لا توجد أسئلة متاحة</Text>
        </View>
      </View>
    );
  }

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
          {currentQuestion && currentQuestion.type !== 'arrangePuzzle' && (
            <QuestionCard
              questionText={currentQuestion.question_text}
              questionNumber={currentQuestionIndex + 1}
            />
          )}

          {/* Conditional Rendering based on question type */}
          {currentQuestion &&
            (currentQuestion.type === 'arrangePuzzle' ? (
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
            ))}

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: RFValue(16),
    color: '#999',
    textAlign: 'center',
  },
});
