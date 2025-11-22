import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONTS} from '../../../constants';
import {AppHeader} from '../../../components';

const exams = [
  {
    id: 1,
    title: 'اختبار الدرس الاول الصف الرابع يونت 4',
    description: 'اختبار الدرس الاول الصف الرابع يونت 4',
    time: '1 دقيقة',
    endDate: '2025-11-30',
    icon: 'library',
    colors: ['#FF6B7D', '#FF8E53'],
    buttonColors: ['#FF8E53', '#FF6B7D'],
  },
  {
    id: 2,
    title: 'اختبار الدرس الثالث الصف الاول الاعدادي يونت 4',
    description: 'اختبار الدرس الثالث الصف الاول الاعدادي يونت 4',
    time: '1 دقيقة',
    endDate: '2025-11-30',
    icon: 'construct',
    colors: ['#00C9A7', '#00A8CC'],
    buttonColors: ['#00C9A7', '#00A8CC'],
  },
  {
    id: 3,
    title: 'اختبار الدرس الثالث الصف السادس يونت 4',
    description: 'اختبار الدرس الثالث الصف السادس يونت 4',
    time: '1 دقيقة',
    endDate: '2025-11-30',
    icon: 'triangle',
    colors: ['#2979FF', '#536DFE'],
    buttonColors: ['#2979FF', '#536DFE'],
  },
  {
    id: 4,
    title: 'اختبار الدرس الاول الصف الخامس يونت 4',
    description: 'اختبار الدرس الاول الصف الخامس يونت 4',
    time: '1 دقيقة',
    endDate: '2025-11-30',
    icon: 'flash',
    colors: ['#FF8F00', '#FFC107'],
    buttonColors: ['#FF8F00', '#FF6B7D'],
  },
  {
    id: 5,
    title: 'اختبار الدرس الرابع & الخامس الصف الرابع يونت 4',
    description: 'اختبار الدرس الرابع & الخامس الصف الرابع يونت 4',
    time: '1 دقيقة',
    endDate: '2025-11-30',
    icon: 'globe',
    colors: ['#FF5A82', '#FF7CAE'],
    buttonColors: ['#FF5A82', '#FF7CAE'],
  },
  {
    id: 6,
    title: 'اختبار الدرس الثاني & الثالث الصف الرابع يونت 4',
    description: 'اختبار الدرس الثاني & الثالث الصف الرابع يونت 4',
    time: '1 دقيقة',
    endDate: '2025-11-30',
    icon: 'school',
    colors: ['#2196F3', '#42A5F5'],
    buttonColors: ['#2196F3', '#42A5F5'],
  },
];

export default function ExamsScreen({navigation}) {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const isLandscape = dimensions.width > dimensions.height;
  const numColumns = isLandscape ? 3 : 2;
  const horizontalPadding = RFValue(12) * 2; // padding on both sides
  const gap = RFValue(12); // gap between cards
  const totalGaps = gap * (numColumns - 1);
  const cardWidth =
    (dimensions.width - horizontalPadding - totalGaps) / numColumns;

  const renderExamCard = ({item}) => (
    <View style={[styles.cardContainer, {width: cardWidth}]}>
      {/* Top Gradient */}
      <LinearGradient colors={item.colors} style={styles.cardTop}>
        {/* Trophy Icon - Top Left */}
        <Ionicons
          name="trophy-outline"
          size={RFValue(20)}
          color="#fff"
          style={styles.trophyIcon}
        />

        {/* Subject Icon - Top Right */}
        <View style={styles.subjectIconContainer}>
          <Ionicons
            name={item.icon}
            size={RFValue(18)}
            color="#FFC107"
            style={styles.subjectIcon}
          />
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
      </LinearGradient>

      {/* Bottom Content */}
      <View style={styles.cardContent}>
        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        {/* Time Section */}
        <View style={styles.metaSection}>
          <Text style={styles.metaLabel}>الوقت:</Text>
          <View style={styles.metaValueContainer}>
            <View style={styles.timeIconContainer}>
              <Ionicons name="time" size={RFValue(9)} color="#fff" />
            </View>
            <Text style={styles.timeValue}>{item.time}</Text>
          </View>
        </View>

        {/* Date Section */}
        <View style={styles.metaSection}>
          <Text style={styles.metaLabel}>تاريخ الانتهاء:</Text>
          <View style={styles.metaValueContainer}>
            <View style={styles.dateIconContainer}>
              <Ionicons name="calendar" size={RFValue(9)} color="#fff" />
            </View>
            <Text style={styles.dateValue}>{item.endDate}</Text>
          </View>
        </View>

        {/* Start Exam Button with Gradient */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation?.navigate('ExamQuestion', {
              examId: item.id,
              examTitle: item.title,
            })
          }>
          <LinearGradient
            colors={item.buttonColors || item.colors}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.startBtn}>
            <Ionicons
              name="flash"
              size={RFValue(14)}
              color="#fff"
              style={styles.startIcon}
            />
            <Text style={styles.startText}>ابدأ الامتحان</Text>
            <Ionicons
              name="arrow-forward"
              size={RFValue(14)}
              color="#fff"
              style={styles.startIcon}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.root}>
      <AppHeader title="الاختبارات" showBack={false} />

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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: RFValue(18),
    marginBottom: RFValue(20),
    overflow: 'hidden',
    elevation: RFValue(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: RFValue(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: RFValue(4),
    minHeight: RFValue(200),
  },

  cardTop: {
    padding: RFValue(14),
    paddingBottom: RFValue(16),
    height: RFValue(110),
    justifyContent: 'flex-end',
    position: 'relative',
  },

  trophyIcon: {
    position: 'absolute',
    top: RFValue(10),
    left: RFValue(10),
  },

  subjectIconContainer: {
    position: 'absolute',
    top: RFValue(10),
    right: RFValue(10),
    width: RFValue(28),
    height: RFValue(28),
    borderRadius: RFValue(14),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: RFValue(2),
    borderColor: '#000',
  },

  subjectIcon: {
    // Icon styling
  },

  titleContainer: {
    marginTop: RFValue(10),
    paddingRight: RFValue(2),
  },

  cardTitle: {
    color: '#fff',
    fontSize: RFValue(12),
    lineHeight: RFValue(18),
    ...FONTS.body4,
  },

  cardContent: {
    padding: RFValue(14),
    paddingTop: RFValue(12),
  },

  description: {
    fontSize: RFValue(10),
    color: '#666',
    marginBottom: RFValue(10),
    lineHeight: RFValue(16),
    ...FONTS.body5,
  },

  metaSection: {
    marginBottom: RFValue(8),
  },

  metaLabel: {
    fontSize: RFValue(9),
    color: '#666',
    marginBottom: RFValue(4),
    ...FONTS.body5,
  },

  metaValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  timeIconContainer: {
    width: RFValue(18),
    height: RFValue(18),
    borderRadius: RFValue(9),
    backgroundColor: '#00A8E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: RFValue(6),
  },

  timeValue: {
    fontSize: RFValue(10),
    color: '#00A8E8',
    marginLeft: RFValue(5),
    ...FONTS.body5,
  },

  dateIconContainer: {
    width: RFValue(18),
    height: RFValue(18),
    borderRadius: RFValue(9),
    backgroundColor: '#FF6B9D',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: RFValue(6),
  },

  dateValue: {
    fontSize: RFValue(10),
    color: '#333',
    marginLeft: RFValue(5),
    ...FONTS.body5,
  },

  startBtn: {
    paddingVertical: RFValue(9),
    borderRadius: RFValue(10),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: RFValue(12),
  },

  startIcon: {
    marginHorizontal: RFValue(3),
  },

  startText: {
    color: '#fff',
    marginHorizontal: RFValue(4),
    fontSize: RFValue(11),
    ...FONTS.body4,
  },

  columnWrapper: {
    justifyContent: 'space-between',
    gap: RFValue(12),
  },

  listContent: {
    flexGrow: 1,
  },
});
