import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {AppHeader} from '../../../components';
import CourseCard from './components/CourseCard';
import * as Animatable from 'react-native-animatable';
import {fetchData} from '../../../Helpers/ApiHelper';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';

export default function CoursesScreen({navigation}) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // الحصول على بيانات المستخدم من Redux
  const userData = useSelector(state => state.UserReducer.userData);
  const token = useSelector(state => state.UserReducer.token);

  const fetchCourses = useCallback(async () => {
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
      const response = await fetchData('POST', '/courses/select_courses.php', {
        student_id: userData?.student_id || userData?.id,
        token_value: token,
        mobile: true,
      });

      if (response && response.status === 'success') {
        // البيانات قد تأتي في response.data أو response.message
        const coursesData = response.data || response.message || [];
        setCourses(Array.isArray(coursesData) ? coursesData : []);
      } else {
        Toast.show({
          type: 'error',
          text1: 'خطأ في تحميل البيانات',
          text2: response?.message || 'حدث خطأ، يرجى المحاولة مرة أخرى',
          position: 'top',
          visibilityTime: 3000,
        });
        setCourses([]);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      Toast.show({
        type: 'error',
        text1: 'خطأ في الاتصال',
        text2: 'حدث خطأ، يرجى المحاولة مرة أخرى',
        position: 'top',
        visibilityTime: 3000,
      });
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, [userData, token]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <View style={styles.root}>
      {/* Header */}
      <AppHeader title="المناهج" showBack={false} />
      {/* <HeadPage title="المناهج" /> */}

      {/* List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4FACFE" />
        </View>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={item =>
            item.id?.toString() ||
            item.course_id?.toString() ||
            Math.random().toString()
          }
          renderItem={({item, index}) => (
            <CourseCard
              item={item}
              index={index}
              onPress={() =>
                navigation.navigate('CoursePlayer', {course: item})
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: RFValue(40)}}
          ListFooterComponent={<View style={{height: RFValue(50)}} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Animatable.Text animation="fadeIn" style={styles.emptyText}>
                لا توجد دورات متاحة حالياً
              </Animatable.Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
