import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {AppHeader} from '../../../components';
import CourseCard from './components/CourseCard';
import * as Animatable from 'react-native-animatable';

const courses = [
  {
    id: 1,
    title: 'الكورس الأول للمستوى الثاني',
    description: 'الكورس الثاني للمستوى الأول',
    image: 'https://www.elmisterelfallah.com/banner-1.jpg',
    featured: true,
  },
  {
    id: 2,
    title: 'الكورس الأول للمستوى الأول',
    description: 'المستوى الأول كامل',
    image:
      'https://www.elmisterelfallah.com/assets/images/courses/course_2.jpg',
    featured: true,
  },
  {
    id: 3,
    title: 'منهج الصف الثالث الابتدائي',
    description: 'شرح كامل للمنهج',
    image:
      'https://www.elmisterelfallah.com/assets/images/courses/course_3.jpg',
    featured: false,
  },
  {
    id: 4,
    title: 'الكورس الأول للمستوى الثاني',
    description: 'الكورس الثاني للمستوى الأول',
    image: 'https://www.elmisterelfallah.com/banner-1.jpg',
    featured: true,
  },
  {
    id: 5,
    title: 'الكورس الأول للمستوى الأول',
    description: 'المستوى الأول كامل',
    image:
      'https://www.elmisterelfallah.com/assets/images/courses/course_2.jpg',
    featured: true,
  },
  {
    id: 6,
    title: 'منهج الصف الثالث الابتدائي',
    description: 'شرح كامل للمنهج',
    image:
      'https://www.elmisterelfallah.com/assets/images/courses/course_3.jpg',
    featured: true,
  },
];

export default function CoursesScreen({navigation}) {
  return (
    <View style={styles.root}>
      {/* Header */}
      <AppHeader title="المناهج" showBack={false} />
      {/* <HeadPage title="المناهج" /> */}

      {/* List */}
      <FlatList
        data={courses}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <CourseCard
            item={item}
            onPress={() => navigation.navigate('CoursePlayer')}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: RFValue(40)}}
        ListFooterComponent={<View style={{height: RFValue(50)}} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
