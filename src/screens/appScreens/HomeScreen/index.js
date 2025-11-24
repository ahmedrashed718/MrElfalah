import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {AppHeader, GradientText} from '../../../components';
import {COLORS, FONTS, Images} from '../../../constants';
import {
  StatCard,
  QuickActionCard,
  CourseCard,
  PhoneNumberCard,
  SectionHeader,
} from './components';

export default function HomeScreen() {
  const navigation = useNavigation();

  // Stats data
  const stats = [
    {id: 1, label: 'الدورات', value: '12', icon: 'book', color: '#4FACFE'},
    {
      id: 2,
      label: 'الامتحانات',
      value: '24',
      icon: 'document-text',
      color: '#F093FB',
    },
    {id: 3, label: 'النقاط', value: '1,250', icon: 'trophy', color: '#FFA726'},
    {
      id: 4,
      label: 'المستوى',
      value: '5',
      icon: 'trending-up',
      color: '#66BB6A',
    },
  ];

  // Quick actions
  const quickActions = [
    {
      id: 1,
      title: 'المناهج',
      subtitle: 'استكشف الدورات',
      icon: 'library',
      gradient: [COLORS.primary, '#FF6B6B'],
      route: 'المناهج',
    },
    {
      id: 2,
      title: 'الاختبارات',
      subtitle: 'تدرب واختبر',
      icon: 'document-text-outline',
      gradient: [COLORS.secondary, '#667EEA'],
      route: 'بنك الاسئله',
    },
    {
      id: 3,
      title: 'بنك الاسئله',
      subtitle: 'اختبارات تفاعلية',
      icon: 'school-outline',
      gradient: ['#F093FB', '#F5576C'],
      route: 'QuestionBank',
    },
  ];

  // Latest courses
  const latestCourses = [
    {
      id: 1,
      title: 'الكورس الأول للمستوى الثاني',
      progress: 65,
      image: 'https://www.elmisterelfallah.com/banner-1.jpg',
    },
    {
      id: 2,
      title: 'الكورس الأول للمستوى الأول',
      progress: 40,
      image:
        'https://www.elmisterelfallah.com/assets/images/courses/course_2.jpg',
    },
    {
      id: 3,
      title: 'منهج الصف الثالث الابتدائي',
      progress: 90,
      image:
        'https://www.elmisterelfallah.com/assets/images/courses/course_3.jpg',
    },
  ];

  // Transfer Numbers
  const transferNumbers = [
    {
      id: 1,
      number: '01508465005',
      label: 'تحويل ودعم فني',
      icon: 'flash',
      iconColor: '#7B60ED',
    },
    {
      id: 2,
      number: '01102300955',
      label: 'تحويل ودعم فني',
      icon: 'shield-checkmark',
      iconColor: '#FF8C42',
    },
  ];

  // Contact Numbers
  const contactNumbers = [
    {
      id: 1,
      number: '01507635005',
      label: 'GENERAL INQUIRIES',
      subLabel: 'Business Hours',
      icon: 'people',
      iconColor: '#7B60ED',
    },
    {
      id: 2,
      number: '01508275005',
      label: 'TECHNICAL SUPPORT',
      subLabel: 'Business Hours',
      icon: 'chatbubble-ellipses',
      iconColor: '#FF8C42',
    },
    {
      id: 3,
      number: '01102300933',
      label: 'CUSTOMER SERVICE',
      subLabel: '24/7',
      icon: 'call',
      iconColor: '#FF8C42',
    },
  ];

  const handleQuickAction = route => {
    if (route === 'QuestionBank') {
      navigation.navigate('QuestionBank');
    } else {
      navigation.navigate('BottomTabs', {screen: route});
    }
  };

  return (
    <>
      <AppHeader title="الصفحة الرئيسية" showBack={false} />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <Animatable.View animation="fadeInDown" style={styles.heroSection}>
          <View style={styles.welcomeContainer}>
            {/* <Animatable.View animation="fadeInDown" delay={100} style={styles.logoContainer}> */}
            <Image
              source={Images.flahLogo}
              style={styles.logo}
              resizeMode="contain"
            />
            {/* </Animatable.View> */}
            <Text style={styles.greetingText}>مرحباً بعودتك 👋</Text>
            <GradientText style={styles.userName}>
              أهلا بك مع مستر الفلاح
            </GradientText>
            <Text style={styles.motivationText}>
              مع المستر الفلاح انت دايما في نجاح ! 🚀
            </Text>
          </View>
        </Animatable.View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>إحصائياتك</Text>
          <View style={styles.statsGrid}>
            {stats.map((item, index) => (
              <StatCard key={item.id} item={item} index={index} />
            ))}
          </View>
        </View>

        {/* Quick Actions Section */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>ابدأ التعلم الآن</Text>
          {quickActions.map((item, index) => (
            <QuickActionCard
              key={item.id}
              item={item}
              index={index}
              onPress={handleQuickAction}
            />
          ))}
        </View>

        {/* Latest Courses Section */}
        <View style={styles.coursesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>دوراتك الأخيرة</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('المناهج')}
              style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>عرض الكل</Text>
              <Ionicons
                name="arrow-back"
                size={RFValue(12)}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
          {latestCourses.map((item, index) => (
            <CourseCard
              key={item.id}
              item={item}
              index={index}
              navigation={navigation}
            />
          ))}
        </View>

        {/* Transfer Numbers Section */}
        <View style={styles.numbersSection}>
          <SectionHeader
            title="أرقام التحويل"
            subtitle="Transfer Numbers"
            description="أرقام موثوقة وآمنة لجميع عمليات التحويل المالي"
            icon="shield-checkmark"
            iconColor="#7B60ED"
          />
          <View style={styles.phoneCardsContainer}>
            {transferNumbers.map((item, index) => (
              <PhoneNumberCard key={item.id} item={item} index={index} />
            ))}
          </View>
        </View>

        {/* Contact Numbers Section */}
        <View style={styles.numbersSection}>
          <SectionHeader
            title="أرقام التواصل و الاستفسار"
            subtitle="Contact Numbers"
            description="فريق خدمة العملاء جاهز لمساعدتك في أي وقت"
            icon="people"
            iconColor="#7B60ED"
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.phoneCardsScrollContainer}>
            {contactNumbers.map((item, index) => (
              <PhoneNumberCard
                key={item.id}
                item={item}
                index={index}
                isScrollable={true}
              />
            ))}
          </ScrollView>
        </View>

        {/* Motivational Card */}
        <View style={styles.motivationalCard}>
          <LinearGradient
            colors={['#667EEA', '#764BA2', '#667EEA']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.motivationalGradient}>
            <View style={styles.motivationalContentWrapper}>
              <View style={styles.motivationalTextContainer}>
                <Text style={styles.motivationalText}>مع المستر الفلاح ..</Text>
                <Text style={styles.motivationalText}>
                  كل خطوة صغيرة تقربك من هدفك الكبير ! 💪
                </Text>
              </View>
              <View style={styles.motivationalImageWrapper}>
                <Image
                  source={Images.falah1}
                  style={styles.motivationalImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray3,
  },
  scrollContent: {
    paddingBottom: RFValue(80),
  },
  heroSection: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: RFValue(24),
    borderBottomRightRadius: RFValue(24),
    paddingVertical: RFValue(18),
    paddingHorizontal: RFValue(16),
    marginBottom: RFValue(12),
    ...COLORS.shadow,
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: RFValue(14),
    backgroundColor: COLORS.white,
    borderRadius: RFValue(20),
    padding: RFValue(12),
    ...COLORS.shadow,
    elevation: 5,
    borderWidth: 1,
    borderColor: `${COLORS.primary}15`,
  },
  logo: {
    width: RFValue(200),
    height: RFValue(150),
  },
  greetingText: {
    fontSize: RFValue(15),
    color: COLORS.darkGray,
    ...FONTS.body4,
    marginBottom: RFValue(4),
  },
  userName: {
    fontSize: RFValue(22),
    ...FONTS.h2,
    marginBottom: RFValue(6),
  },
  motivationText: {
    fontSize: RFValue(12),
    color: COLORS.gray6,
    ...FONTS.body5,
    textAlign: 'center',
  },
  statsContainer: {
    paddingHorizontal: RFValue(12),
    marginBottom: RFValue(16),
  },
  sectionTitle: {
    fontSize: RFValue(18),
    color: COLORS.black,
    ...FONTS.h3,
    marginBottom: RFValue(12),
    marginHorizontal: RFValue(4),
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionsSection: {
    paddingHorizontal: RFValue(12),
    marginBottom: RFValue(16),
  },
  coursesSection: {
    paddingHorizontal: RFValue(12),
    marginBottom: RFValue(16),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: RFValue(12),
    marginHorizontal: RFValue(4),
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(4),
  },
  viewAllText: {
    fontSize: RFValue(12),
    color: COLORS.primary,
    ...FONTS.body4,
  },
  motivationalCard: {
    marginHorizontal: RFValue(12),
    borderRadius: RFValue(20),
    overflow: 'hidden',
    ...COLORS.shadow,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  motivationalGradient: {
    padding: RFValue(20),
    minHeight: RFValue(160),
    justifyContent: 'center',
  },
  motivationalContentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  motivationalTextContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: RFValue(12),
  },
  motivationalIconWrapper: {
    width: RFValue(36),
    height: RFValue(36),
    borderRadius: RFValue(18),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: RFValue(8),
  },
  motivationalIcon: {
    opacity: 0.9,
  },
  motivationalText: {
    fontSize: RFValue(15),
    color: COLORS.white,
    ...FONTS.body3,
    // textAlign: 'right',
    lineHeight: RFValue(22),
    // fontWeight: '600',
  },
  motivationalImageWrapper: {
    width: RFValue(110),
    height: RFValue(110),
    borderRadius: RFValue(16),
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: RFValue(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  motivationalImage: {
    width: '100%',
    height: '100%',
  },
  bottomSpacer: {
    height: RFValue(16),
  },
  numbersSection: {
    paddingHorizontal: RFValue(12),
    marginBottom: RFValue(18),
    backgroundColor: COLORS.white,
    borderRadius: RFValue(16),
    paddingVertical: RFValue(16),
    ...COLORS.shadow,
  },
  phoneCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: RFValue(10),
  },
  phoneCardsScrollContainer: {
    paddingHorizontal: RFValue(2),
    gap: RFValue(10),
  },
});
