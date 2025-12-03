import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {AppHeader, LottieLoader, EmptyState} from '../../../components';
import {fetchData} from '../../../Helpers/ApiHelper';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import ExamCard from './components/ExamCard';

const defaultColors = [
  ['#FF6B7D', '#FF8E53'],
  ['#00C9A7', '#00A8CC'],
  ['#2979FF', '#536DFE'],
  ['#FF8F00', '#FFC107'],
  ['#FF5A82', '#FF7CAE'],
  ['#2196F3', '#42A5F5'],
];

const defaultIcons = [
  'library',
  'construct',
  'triangle',
  'flash',
  'globe',
  'school',
];

// Helper function to map API exam data to component format
const mapExamData = (exam, index) => {
  const colorIndex = index % defaultColors.length;
  return {
    id: exam.exam_id,
    title: exam.exam_name || 'اختبار',
    description: exam.exam_description,
    time: exam.exam_time || '.. دقيقة',
    endDate: exam.end_date || '2026-00-00',
    icon: defaultIcons[colorIndex],
    colors: defaultColors[colorIndex],
    buttonColors: defaultColors[colorIndex],
  };
};

export default function ExamsScreen({navigation}) {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  // الحصول على بيانات المستخدم من Redux
  const userData = useSelector(state => state.UserReducer.userData);
  const token = useSelector(state => state.UserReducer.token);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  // Fetch exams from API
  const fetchExams = useCallback(async () => {
    try {
      setLoading(true);

      // التحقق من وجود id و token
      if (!userData?.student_id && !userData?.id) {
        Toast.show({
          type: 'error',
          text1: 'خطأ في البيانات',
          text2: 'لم يتم العثور على معرف المستخدم',
          position: 'top',
          visibilityTime: 3000,
        });
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
        setLoading(false);
        return;
      }

      // إرسال الطلب POST إلى API
      const response = await fetchData('POST', '/exams/get_exams.php', {
        student_id: userData?.student_id || userData?.id,
        token_value: token,
        mobile: true,
      });

      if (response && response.status === 'success') {
        // البيانات قد تأتي في response.data أو response.message
        const examsData = response.data || response.message || [];
        const examsArray = Array.isArray(examsData) ? examsData : [];

        // تحويل البيانات إلى الصيغة المطلوبة
        const mappedExams = examsArray.map((exam, index) =>
          mapExamData(exam, index),
        );

        setExams(mappedExams);
      } else {
        Toast.show({
          type: 'error',
          text1: 'خطأ في تحميل البيانات',
          text2: response?.message || 'حدث خطأ، يرجى المحاولة مرة أخرى',
          position: 'top',
          visibilityTime: 3000,
        });
        setExams([]);
      }
    } catch (error) {
      console.error('Error fetching exams:', error);
      Toast.show({
        type: 'error',
        text1: 'خطأ في الاتصال',
        text2: 'حدث خطأ، يرجى المحاولة مرة أخرى',
        position: 'top',
        visibilityTime: 3000,
      });
      setExams([]);
    } finally {
      setLoading(false);
    }
  }, [userData, token]);

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  const isLandscape = dimensions.width > dimensions.height;
  const numColumns = isLandscape ? 3 : 2;
  const horizontalPadding = RFValue(12) * 2;
  const gap = RFValue(12);
  const totalGaps = gap * (numColumns - 1);
  const cardWidth =
    (dimensions.width - horizontalPadding - totalGaps) / numColumns;

  const renderExamCard = ({item}) => (
    <ExamCard item={item} cardWidth={cardWidth} navigation={navigation} />
  );

  return (
    <View style={styles.root}>
      <AppHeader title="الاختبارات" showBack={false} />

      {loading ? (
        <LottieLoader message="جاري تحميل الاختبارات..." />
      ) : (
        <FlatList
          data={exams}
          keyExtractor={item => item.id.toString()}
          numColumns={numColumns}
          columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
          renderItem={renderExamCard}
          contentContainerStyle={[
            styles.listContent,
            {
              paddingBottom: RFValue(50),
              paddingTop: RFValue(15),
              paddingHorizontal: RFValue(12),
            },
          ]}
          key={numColumns} // Force re-render when columns change
          ListEmptyComponent={
            <EmptyState message="لا توجد اختبارات متاحة حالياً" />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  columnWrapper: {
    justifyContent: 'space-between',
    gap: RFValue(12),
  },

  listContent: {
    flexGrow: 1,
  },
});
