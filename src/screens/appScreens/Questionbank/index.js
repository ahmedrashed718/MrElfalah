import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {AppHeader} from '../../../components';
import QuestionCard from './components/QuestionCard';
import {fetchData} from '../../../Helpers/ApiHelper';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';

const colorPalette = [
  ['#FF9966', '#FF5E62'],
  ['#00C9A7', '#00A896'],
  ['#4FACFE', '#00F2FE'],
  ['#F77062', '#FE5196'],
  ['#42E695', '#3BB2B8'],
  ['#FF6F91', '#FF9671'],
  ['#FFC75F', '#F9A825'],
  ['#6A5AE0', '#836FFF'],
  ['#FF5F6D', '#FFC371'],
  ['#F53844', '#42378F'],
  ['#F5576C', '#F093FB'],
  ['#4FACFE', '#00F2FE'],
];

export default function QuestionBank({navigation}) {
  const [questionBanks, setQuestionBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  // الحصول على بيانات المستخدم من Redux
  const userData = useSelector(state => state.UserReducer.userData);
  const token = useSelector(state => state.UserReducer.token);

  const fetchMyCourses = useCallback(async () => {
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

      // إرسال الطلب POST مع id و token
      const response = await fetchData(
        'POST',
        '/courses/select_my_courses.php',
        {
          student_id: userData?.student_id || userData?.id,
          token_value: token,
          mobile: true,
        },
      );

      if (response && response.status === 'success') {
        // البيانات قد تأتي في response.data أو response.message
        const coursesData = response.data || response.message || [];
        setQuestionBanks(Array.isArray(coursesData) ? coursesData : []);
      } else {
        Toast.show({
          type: 'error',
          text1: 'خطأ في تحميل البيانات',
          text2: response?.message || 'حدث خطأ، يرجى المحاولة مرة أخرى',
          position: 'top',
          visibilityTime: 3000,
        });
        setQuestionBanks([]);
      }
    } catch (error) {
      console.error('Error fetching my courses:', error);
      Toast.show({
        type: 'error',
        text1: 'خطأ في الاتصال',
        text2: 'حدث خطأ، يرجى المحاولة مرة أخرى',
        position: 'top',
        visibilityTime: 3000,
      });
      setQuestionBanks([]);
    } finally {
      setLoading(false);
    }
  }, [userData, token]);

  useEffect(() => {
    fetchMyCourses();
  }, [fetchMyCourses]);

  const getRandomGradient = itemId => {
    // إضافة فحص للتأكد من وجود itemId
    const safeId = itemId || Math.floor(Math.random() * 1000);
    const index = safeId % colorPalette.length;
    return colorPalette[index];
  };

  const handleCardPress = item => {
    if (navigation && item) {
      navigation.navigate('QuestionStages', {
        questionBankTitle: item.title || item.name || item.course_name || '',
        questionBankId: item.id || item.course_id || '',
      });
    }
  };

  const renderCard = ({item, index}) => {
    // إضافة فحص للتأكد من وجود item
    if (!item) {
      return null;
    }

    // استخدام course_id إذا لم يكن id موجوداً
    const itemId = item.id || item.course_id || index;
    const gradient = getRandomGradient(itemId);
    const number = index + 1;

    return (
      <QuestionCard
        item={item}
        index={index}
        gradient={gradient}
        number={number}
        onPress={() => handleCardPress(item)}
      />
    );
  };

  return (
    // <ScreensContainer>
    <>
      <AppHeader title={'بنك الاسئلة'} showBack={false} />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4FACFE" />
        </View>
      ) : (
        <FlatList
          data={questionBanks}
          keyExtractor={(item, index) => {
            // تحسين keyExtractor لضمان مفاتيح فريدة
            if (item?.id) {
              return `course-${item.id}`;
            }
            if (item?.course_id) {
              return `course-${item.course_id}`;
            }
            // استخدام index كجزء من المفتاح لضمان التفرد
            return `course-${index}-${Date.now()}`;
          }}
          renderItem={renderCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListFooterComponent={<View style={styles.footer} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyText}>لا توجد دورات متاحة حالياً</View>
            </View>
          }
        />
      )}
    </>
    // </ScreensContainer>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingTop: RFValue(10),
    paddingBottom: RFValue(20),
    backgroundColor: '#F0F9FF',
  },

  footer: {
    height: RFValue(50),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: RFValue(50),
  },
  emptyText: {
    fontSize: RFValue(16),
    color: '#999',
    textAlign: 'center',
  },
});
