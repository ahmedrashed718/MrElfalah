import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {AppHeader, ScreensContainer} from '../../../components';
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
    <ScreensContainer>
      <AppHeader
        title={questionBankTitle || 'مراحل الأسئلة'}
        showBack={true}
        reducedShadow={true}
      />

      <FlatList
        data={questionStages}
        keyExtractor={item => item.id.toString()}
        renderItem={renderCard}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={<View style={styles.footer} />}
      />
    </ScreensContainer>
  );
}

const styles = StyleSheet.create({
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
