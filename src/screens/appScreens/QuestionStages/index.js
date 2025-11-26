import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {AppHeader, ScreensContainer} from '../../../components';
import {COLORS, FONTS} from '../../../constants';
import StageCard from './components/StageCard';

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

// Sample stages data
const questionStages = [
  {
    id: 1,
    title: 'المرحلة الأولى',
    subtitle: 'مرحلة البداية والتعلم الأساسي',
  },
  {
    id: 2,
    title: 'المرحلة الثانية',
    subtitle: 'مرحلة التطبيق والممارسة',
  },
  {
    id: 3,
    title: 'المرحلة الثالثة',
    subtitle: 'مرحلة التحدي والتقدم',
  },
  {
    id: 4,
    title: 'المرحلة الرابعة',
    subtitle: 'مرحلة الإتقان والتميز',
  },
  {
    id: 5,
    title: 'المرحلة الخامسة',
    subtitle: 'مرحلة الإبداع والابتكار',
  },
];

export default function QuestionStages({route, navigation}) {
  const {questionBankTitle} = route.params || {};

  const getRandomGradient = itemId => {
    const index = itemId % colorPalette.length;
    return colorPalette[index];
  };

  const handleCardPress = item => {
    if (navigation) {
      navigation.navigate('ExamQuestion', {
        examTitle: item.title,
        stageId: item.id,
        questionBankTitle: questionBankTitle,
      });
    }
  };

  const renderCard = ({item, index}) => {
    const gradient = getRandomGradient(item.id);
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

      <FlatList
        data={questionStages}
        keyExtractor={item => item.id.toString()}
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
      />
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
