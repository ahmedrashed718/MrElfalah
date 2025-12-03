import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {AppHeader, LottieLoader, EmptyState} from '../../../components';
import {COLORS, FONTS} from '../../../constants';
import StageCard from './components/StageCard';
import {fetchData} from '../../../Helpers/ApiHelper';
import Toast from 'react-native-toast-message';

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

export default function QuestionStages({route, navigation}) {
  const {questionBankTitle, questionBankId, course_id} = route.params || {};
  const [questionStages, setQuestionStages] = useState([]);
  const [loading, setLoading] = useState(true);

  const courseId = course_id || questionBankId;

  const fetchStages = useCallback(async () => {
    try {
      setLoading(true);

      if (!courseId) {
        Toast.show({
          type: 'error',
          text1: 'خطأ في البيانات',
          text2: 'لم يتم العثور على معرف الدورة',
          position: 'top',
          visibilityTime: 3000,
        });
        setLoading(false);
        return;
      }

      const response = await fetchData(
        'POST',
        '/courses/select_course_unit.php',
        {
          course_id: courseId,
        },
      );

      if (response && response.status === 'success') {
        const stagesData = response.message || [];
        setQuestionStages(Array.isArray(stagesData) ? stagesData : []);
      } else {
        Toast.show({
          type: 'error',
          text1: 'خطأ في تحميل البيانات',
          text2: response?.message || 'حدث خطأ، يرجى المحاولة مرة أخرى',
          position: 'top',
          visibilityTime: 3000,
        });
        setQuestionStages([]);
      }
    } catch (error) {
      console.error('Error fetching stages:', error);
      Toast.show({
        type: 'error',
        text1: 'خطأ في الاتصال',
        text2: 'حدث خطأ، يرجى المحاولة مرة أخرى',
        position: 'top',
        visibilityTime: 3000,
      });
      setQuestionStages([]);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchStages();
  }, [fetchStages]);

  const getRandomGradient = itemId => {
    const safeId = itemId || Math.floor(Math.random() * 1000);
    const index = safeId % colorPalette.length;
    return colorPalette[index];
  };

  const handleCardPress = item => {
    if (navigation && item) {
      const unitId = item.unit_id || '';
      navigation.navigate('ExamQuestion', {
        examTitle: item.unit_name || '',
        stageId: unitId,
        unit_id: unitId,
        course_id: courseId,
        questionBankTitle: questionBankTitle,
      });
    }
  };

  const renderCard = ({item, index}) => {
    // إضافة فحص للتأكد من وجود item
    if (!item) {
      return null;
    }

    const itemId = item.id || item.unit_id || index;
    const gradient = getRandomGradient(itemId);
    const number = index + 1;

    return (
      <StageCard
        item={item}
        index={index}
        gradient={gradient}
        number={number}
        onPress={() => handleCardPress(item)}
      />
    );
  };

  return (
    <>
      <AppHeader
        title={'مراحل الأسئلة'}
        showBack={true}
        // reducedShadow={true}
      />

      {loading ? (
        <LottieLoader message="جاري تحميل المراحل..." />
      ) : (
        <FlatList
          data={questionStages}
          keyExtractor={(item, index) => {
            if (item?.unit_id) {
              return `stage-${item.unit_id}-${index}`;
            }
            return `stage-${index}`;
          }}
          renderItem={renderCard}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            questionBankTitle ? (
              <Animatable.View
                animation="fadeInDown"
                duration={600}
                style={styles.titleCardWrapper}>
                <View style={styles.titleCard}>
                  <LinearGradient
                    colors={['#00C9A7', '#FF6B9D']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.titleCardGradient}>
                    <View style={styles.titleCardContent}>
                      <View style={styles.iconWrapper}>
                        <Ionicons
                          name="library-outline"
                          size={RFValue(28)}
                          color={COLORS.white}
                        />
                      </View>
                      <View style={styles.titleTextContainer}>
                        <Text style={styles.titleLabel}>بنك الأسئلة</Text>
                        <Text style={styles.titleText} numberOfLines={2}>
                          {questionBankTitle}
                        </Text>
                      </View>
                      <Ionicons
                        name="book-outline"
                        size={RFValue(24)}
                        color={COLORS.white}
                        style={styles.rightIcon}
                      />
                    </View>
                  </LinearGradient>
                </View>
              </Animatable.View>
            ) : null
          }
          ListFooterComponent={<View style={styles.footer} />}
          ListEmptyComponent={
            <EmptyState message="لا توجد مراحل متاحة حالياً" />
          }
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  titleCardWrapper: {
    // paddingHorizontal: RFValue(15),
    paddingTop: RFValue(5),
    paddingBottom: RFValue(5),
  },

  titleCard: {
    borderRadius: RFValue(16),
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: RFValue(4),
    },
    shadowOpacity: 0.2,
    shadowRadius: RFValue(8),
  },

  titleCardGradient: {
    padding: RFValue(18),
    minHeight: RFValue(90),
  },

  titleCardContent: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  iconWrapper: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(25),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: RFValue(2),
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },

  titleTextContainer: {
    flex: 1,
    marginHorizontal: RFValue(12),
    alignItems: 'flex-end',
  },

  titleLabel: {
    fontSize: RFValue(11),
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: RFValue(4),
    // textAlign: 'center',
    alignSelf: 'flex-start',
    ...FONTS.body4,
  },

  titleText: {
    fontSize: RFValue(16),
    color: COLORS.white,
    fontWeight: 'bold',
    // textAlign: 'right',
    lineHeight: RFValue(24),
    alignSelf: 'flex-start',
    ...FONTS.h3,
  },

  rightIcon: {
    opacity: 0.8,
  },

  listContent: {
    paddingTop: RFValue(15),
    paddingBottom: RFValue(25),
    backgroundColor: '#F0F9FF',
    paddingHorizontal: RFValue(15),
  },

  footer: {
    height: RFValue(50),
  },
});
