import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  SectionList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS} from '../../../constants';
import {AppHeader} from '../../../components';

const {width, height} = Dimensions.get('window');

export default function CoursePlayer({navigation}) {
  const [paused, setPaused] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(1);
  const [points] = useState(0);
  const videoRef = useRef(null);

  const lessons = [
    {
      id: 1,
      title: 'Learning the Alphabet',
      time: '00:02:16',
      category: 'جرامر',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: 2,
      title: 'المحاضرة 1',
      time: '00:31:47',
      category: 'جرامر',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    },
    {
      id: 3,
      title: 'المحاضرة 1 الجزء الثاني',
      time: '00:34:22',
      category: 'محادثة',
      videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    },
    {
      id: 4,
      title: 'المحاضرة 2',
      time: '00:18:22',
      category: 'محادثة',
      videoUrl: 'https://media.w3.org/2010/05/bunny/movie.mp4',
    },
    {
      id: 5,
      title: 'المحاضرة 3',
      time: '00:25:44',
      category: 'قراءة',
      videoUrl: 'https://media.w3.org/2010/05/video/movie_300.mp4',
    },
    {
      id: 6,
      title: 'Advanced Reading',
      time: '00:56:33',
      category: 'قراءة',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    },
    {
      id: 7,
      title: 'Grammar Deep Dive: Conditionals',
      time: '01:22:15',
      category: 'جرامر',
      videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    },
    {
      id: 8,
      title: 'Conversation Skills',
      time: '00:39:50',
      category: 'محادثة',
      videoUrl: 'https://media.w3.org/2010/05/bunny/movie.mp4',
    },
    {
      id: 9,
      title: 'Reading Workshop',
      time: '00:47:29',
      category: 'قراءة',
      videoUrl: 'https://media.w3.org/2010/05/video/movie_300.mp4',
    },
  ];

  // GROUP BY CATEGORY
  const grouped = Object.values(
    lessons.reduce((acc, item) => {
      acc[item.category] = acc[item.category] || {
        title: item.category,
        data: [],
      };
      acc[item.category].data.push(item);
      return acc;
    }, {}),
  );

  const [videoUrl, setVideoUrl] = useState(lessons[0].videoUrl);

  const handleLessonPress = lesson => {
    setSelectedLesson(lesson.id);
    setVideoUrl(lesson.videoUrl);
    setPaused(false);
  };

  return (
    <View style={styles.container}>
      <AppHeader title={'دروس الدورة'} />

      <SectionList
        ListHeaderComponent={
          <>
            <LinearGradient
              colors={['#00C9A7', '#FF6B9D']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.pointsCard}>
              <View style={styles.pointsContent}>
                <View>
                  <Text style={styles.pointsTitle}>دروس الدورة 📚 </Text>
                  <Text style={styles.pointsSubtitle}>اختر مغامرتك ! 🎮</Text>
                </View>
                <View style={styles.pointsBadge}>
                  <Ionicons name="star" size={RFValue(20)} color="#FFD700" />
                  <Text style={styles.pointsText}>النقاط: {points}</Text>
                </View>
              </View>
            </LinearGradient>

            <View style={styles.videoContainer}>
              <View style={styles.videoBox}>
                <Video
                  ref={videoRef}
                  source={{uri: videoUrl}}
                  paused={paused}
                  resizeMode="contain"
                  style={styles.video}
                  controls={true}
                />
              </View>
            </View>
          </>
        }
        sections={grouped}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{paddingBottom: 70}}
        renderSectionHeader={({section}) => (
          <LinearGradient
            colors={['#00bfa64e', '#ff6b9c55']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>{section.title}</Text>
          </LinearGradient>
        )}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={[
              styles.lessonCard,
              selectedLesson === item.id && styles.lessonCardActive,
            ]}
            onPress={() => handleLessonPress(item)}
            activeOpacity={0.7}>
            <View style={styles.lessonLeft}>
              <View
                style={[
                  styles.lessonNumber,
                  selectedLesson === item.id && styles.lessonNumberActive,
                ]}>
                <Text
                  style={[
                    styles.lessonNumberText,
                    selectedLesson === item.id && styles.lessonNumberTextActive,
                  ]}>
                  {item.id}
                </Text>
              </View>

              <View style={styles.lessonInfo}>
                <View style={styles.lessonTitleRow}>
                  <Ionicons
                    name="videocam-outline"
                    size={RFValue(16)}
                    color={selectedLesson === item.id ? COLORS.primary : '#666'}
                  />
                  <Text
                    style={[
                      styles.lessonTitle,
                      selectedLesson === item.id && styles.lessonTitleActive,
                    ]}
                    numberOfLines={1}>
                    {item.title}
                  </Text>
                </View>

                <View style={styles.lessonMeta}>
                  <Ionicons
                    name="time-outline"
                    size={RFValue(12)}
                    color="#888"
                  />
                  <Text style={styles.lessonTime}>{item.time}</Text>
                </View>
              </View>
            </View>

            <Ionicons
              name={
                selectedLesson === item.id
                  ? 'play-circle'
                  : 'play-circle-outline'
              }
              size={RFValue(24)}
              color={selectedLesson === item.id ? COLORS.primary : '#999'}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.lightGray},

  pointsCard: {
    marginHorizontal: RFValue(15),
    marginTop: RFValue(15),
    borderRadius: RFValue(20),
    padding: RFValue(18),
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {elevation: 6},
    }),
  },

  pointsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsTitle: {color: '#fff', fontSize: RFValue(18), ...FONTS.h2},
  pointsSubtitle: {
    color: '#fff',
    fontSize: RFValue(13),
    opacity: 0.95,
    ...FONTS.body5,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(6),
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: RFValue(12),
    paddingVertical: RFValue(8),
    borderRadius: RFValue(20),
  },
  pointsText: {color: '#fff', fontSize: RFValue(14), ...FONTS.body4},

  videoContainer: {marginHorizontal: RFValue(15), marginTop: RFValue(15)},
  videoBox: {
    width: '100%',
    height: height * 0.3,
    backgroundColor: '#000',
    borderRadius: RFValue(20),
    overflow: 'hidden',
  },
  video: {width: '100%', height: '100%'},

  categoryHeader: {
    marginHorizontal: RFValue(15),
    marginTop: RFValue(20),
    marginBottom: RFValue(10),
    borderRadius: RFValue(12),
    paddingVertical: RFValue(6),
    paddingHorizontal: RFValue(12),
  },
  categoryTitle: {fontSize: RFValue(20), color: COLORS.white, ...FONTS.h2},

  lessonCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: RFValue(15),
    marginVertical: RFValue(8),
    padding: RFValue(15),
    borderRadius: RFValue(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {elevation: 3},
    }),
  },

  lessonCardActive: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.primary100,
  },
  lessonLeft: {flexDirection: 'row', alignItems: 'center', flex: 1},
  lessonNumber: {
    width: RFValue(40),
    height: RFValue(40),
    borderRadius: RFValue(20),
    backgroundColor: '#ECECFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: RFValue(12),
  },
  lessonNumberActive: {backgroundColor: COLORS.primary},
  lessonNumberText: {
    fontSize: RFValue(16),
    color: COLORS.secondary,
    ...FONTS.body3,
  },
  lessonNumberTextActive: {color: COLORS.white},

  lessonInfo: {flex: 1},
  lessonTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(6),
    marginBottom: RFValue(6),
  },
  lessonTitle: {color: '#333', flex: 1, ...FONTS.body3, fontSize: RFValue(12)},
  lessonTitleActive: {color: COLORS.primary},
  lessonMeta: {flexDirection: 'row', alignItems: 'center', gap: RFValue(4)},
  lessonTime: {fontSize: RFValue(11), color: '#888'},
});
