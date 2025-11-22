import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {AppHeader, ScreensContainer} from '../../../components';
import QuestionCard from './components/QuestionCard';

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

// Sample question bank data
const questionBanks = [
  {
    id: 1,
    title: 'الكورس الأول المستوى الثاني',
    subtitle: 'الكورس الأول المستوى الثاني',
    image:
      'https://res.cloudinary.com/dwwmvxxqh/image/upload/v1751468344/cour_1_l2_oiukgk.jpg',
  },
  {
    id: 2,
    title: 'الكورس الأول المستوى الأول',
    subtitle: 'الكورس الأول المستوى الأول',
    image:
      'https://res.cloudinary.com/dwwmvxxqh/image/upload/v1751468344/cour_1_l2_oiukgk.jpg',
  },
  {
    id: 3,
    title: 'الصف الرابع الابتدائي',
    subtitle: 'منهج الصف الرابع الابتدائي',
    image:
      'https://www.elmisterelfallah.com/assets/images/courses/course_3.jpg',
  },
  {
    id: 4,
    title: 'الكورس الثاني المستوى الأول',
    subtitle: 'الكورس الثاني المستوى الأول',
    image: 'https://www.elmisterelfallah.com/banner-1.jpg',
  },
  {
    id: 5,
    title: 'الكورس الثاني المستوى الثاني',
    subtitle: 'الكورس الثاني المستوى الثاني',
    image:
      'https://www.elmisterelfallah.com/assets/images/courses/course_2.jpg',
  },
  {
    id: 6,
    title: 'الكورس الثاني المستوى الأول',
    subtitle: 'الكورس الثاني المستوى الأول',
    image:
      'https://www.elmisterelfallah.com/assets/images/courses/course_3.jpg',
  },
];

export default function QuestionBank({navigation}) {
  const getRandomGradient = itemId => {
    const index = itemId % colorPalette.length;
    return colorPalette[index];
  };

  const handleCardPress = item => {
    if (navigation) {
      navigation.navigate('QuestionStages', {
        questionBankTitle: item.title,
        questionBankId: item.id,
      });
    }
  };

  const renderCard = ({item, index}) => {
    const gradient = getRandomGradient(item.id);
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
    <ScreensContainer>
      <AppHeader title={'بنك الاسئلة'} showBack={false} />

      <FlatList
        data={questionBanks}
        keyExtractor={item => item.id.toString()}
        renderItem={renderCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={<View style={styles.footer} />}
      />
    </ScreensContainer>
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
});
