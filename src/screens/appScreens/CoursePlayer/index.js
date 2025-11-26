import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
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

const {height} = Dimensions.get('window');

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

  // Get category icon
  const getCategoryIcon = category => {
    switch (category) {
      case 'جرامر':
        return 'book-outline';
      case 'محادثة':
        return 'chatbubbles-outline';
      case 'قراءة':
        return 'document-text-outline';
      default:
        return 'library-outline';
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader title={'دروس الدورة'} />

      <SectionList
        ListHeaderComponent={
          <>
            <LinearGradient
              colors={['#00C9A7', '#FF6B9D', '#FF6B9D']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.pointsCard}>
              <View style={styles.pointsContent}>
                <View style={styles.pointsLeft}>
                  <View style={styles.pointsIconContainer}>
                    <Ionicons
                      name="library"
                      size={RFValue(28)}
                      color="#FFFFFF"
                    />
                  </View>
                  <View style={styles.pointsTextContainer}>
                    <Text style={styles.pointsTitle}>دروس الدورة 📚</Text>
                    <Text style={styles.pointsSubtitle}>
                      اختر مغامرتك التعليمية! 🎮
                    </Text>
                  </View>
                </View>
                <View style={styles.pointsBadge}>
                  <View style={styles.pointsBadgeInner}>
                    <Ionicons
                      name="star"
                      size={RFValue(18)}
                      color="#FFD700"
                    />
                    <Text style={styles.pointsText}>{points}</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>

            <View style={styles.videoContainer}>
              <LinearGradient
                colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.02)']}
                style={styles.videoWrapper}>
                <View style={styles.videoBox}>
                  <Video
                    ref={videoRef}
                    source={{uri: videoUrl}}
                    paused={paused}
                    resizeMode="contain"
                    style={styles.video}
                    controls={true}
                  />
                  {paused && (
                    <View style={styles.videoOverlay}>
                      <Ionicons
                        name="play-circle"
                        size={RFValue(60)}
                        color="rgba(255,255,255,0.9)"
                      />
                    </View>
                  )}
                </View>
              </LinearGradient>
            </View>
          </>
        }
        sections={grouped}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderSectionHeader={({section}) => (
          <View style={styles.categoryHeaderContainer}>
            <LinearGradient
              colors={['#00C9A7', '#FF6B9D']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.categoryHeader}>
              <View style={styles.categoryHeaderContent}>
                <Ionicons
                  name={getCategoryIcon(section.title)}
                  size={RFValue(22)}
                  color={COLORS.white}
                />
                <Text style={styles.categoryTitle}>{section.title}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>
                    {section.data.length}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        )}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={[
              styles.lessonCard,
              selectedLesson === item.id && styles.lessonCardActive,
            ]}
            onPress={() => handleLessonPress(item)}
            activeOpacity={0.8}>
            <View style={styles.lessonLeft}>
              <LinearGradient
                colors={
                  selectedLesson === item.id
                    ? [COLORS.primary, COLORS.secondary]
                    : ['#F0F0F5', '#E8E8F0']
                }
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
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
              </LinearGradient>

              <View style={styles.lessonInfo}>
                <Text
                  style={[
                    styles.lessonTitle,
                    selectedLesson === item.id && styles.lessonTitleActive,
                  ]}
                  numberOfLines={2}>
                  {item.title}
                </Text>

                <View style={styles.lessonMeta}>
                  <View style={styles.lessonMetaItem}>
                    <Ionicons
                      name="time-outline"
                      size={RFValue(10)}
                      color={selectedLesson === item.id ? COLORS.primary : '#888'}
                    />
                    <Text
                      style={[
                        styles.lessonTime,
                        selectedLesson === item.id && styles.lessonTimeActive,
                      ]}>
                      {item.time}
                    </Text>
                  </View>
                  <View style={styles.lessonMetaDivider} />
                  <View style={styles.lessonMetaItem}>
                    <Ionicons
                      name="videocam-outline"
                      size={RFValue(10)}
                      color={selectedLesson === item.id ? COLORS.primary : '#888'}
                    />
                    <Text
                      style={[
                        styles.lessonTime,
                        selectedLesson === item.id && styles.lessonTimeActive,
                      ]}>
                      فيديو
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.lessonPlayButton,
                selectedLesson === item.id && styles.lessonPlayButtonActive,
              ]}>
              <Ionicons
                name={
                  selectedLesson === item.id
                    ? 'play-circle'
                    : 'play-circle-outline'
                }
                size={RFValue(24)}
                color={
                  selectedLesson === item.id ? COLORS.white : COLORS.gray
                }
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },

  listContent: {
    paddingBottom: RFValue(80),
  },

  // Points Card Styles
  pointsCard: {
    marginHorizontal: RFValue(15),
    marginTop: RFValue(15),
    borderRadius: RFValue(24),
    padding: RFValue(20),
    ...Platform.select({
      ios: {
        shadowColor: '#00C9A7',
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {elevation: 8},
    }),
  },

  pointsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  pointsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  pointsIconContainer: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(25),
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: RFValue(12),
  },

  pointsTextContainer: {
    flex: 1,
  },

  pointsTitle: {
    color: '#fff',
    fontSize: RFValue(20),
    fontWeight: 'bold',
    marginBottom: RFValue(4),
    ...FONTS.h2,
  },
  pointsSubtitle: {
    color: '#fff',
    fontSize: RFValue(13),
    opacity: 0.9,
    ...FONTS.body5,
  },
  pointsBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: RFValue(25),
    padding: RFValue(2),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {elevation: 2},
    }),
  },
  pointsBadgeInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(6),
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: RFValue(14),
    paddingVertical: RFValue(10),
    borderRadius: RFValue(23),
  },
  pointsText: {
    color: '#fff',
    fontSize: RFValue(15),
    fontWeight: '600',
    ...FONTS.body4,
  },

  // Video Container Styles
  videoContainer: {
    marginHorizontal: RFValue(15),
    marginTop: RFValue(20),
  },
  videoWrapper: {
    borderRadius: RFValue(24),
    padding: RFValue(4),
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: {elevation: 5},
    }),
  },
  videoBox: {
    width: '100%',
    height: height * 0.32,
    backgroundColor: '#000',
    borderRadius: RFValue(20),
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  // Category Header Styles
  categoryHeaderContainer: {
    marginTop: RFValue(24),
    marginBottom: RFValue(12),
  },
  categoryHeader: {
    marginHorizontal: RFValue(15),
    borderRadius: RFValue(16),
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(16),
    ...Platform.select({
      ios: {
        shadowColor: '#00C9A7',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {elevation: 4},
    }),
  },
  categoryHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(10),
  },
  categoryTitle: {
    fontSize: RFValue(18),
    color: COLORS.white,
    fontWeight: 'bold',
    flex: 1,
    ...FONTS.h2,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: RFValue(12),
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(4),
    minWidth: RFValue(30),
    alignItems: 'center',
  },
  categoryBadgeText: {
    color: COLORS.white,
    fontSize: RFValue(12),
    fontWeight: 'bold',
  },

  // Lesson Card Styles
  lessonCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: RFValue(15),
    marginVertical: RFValue(5),
    padding: RFValue(12),
    borderRadius: RFValue(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: 'transparent',
    minHeight: RFValue(70),
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: {elevation: 2},
    }),
  },

  lessonCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary100,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {elevation: 4},
    }),
  },

  lessonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  lessonNumber: {
    width: RFValue(42),
    height: RFValue(42),
    borderRadius: RFValue(21),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: RFValue(12),
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {elevation: 1},
    }),
  },
  lessonNumberActive: {},
  lessonNumberText: {
    fontSize: RFValue(14),
    color: COLORS.secondary,
    fontWeight: 'bold',
    ...FONTS.body3,
  },
  lessonNumberTextActive: {
    color: COLORS.white,
  },

  lessonInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  lessonTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: RFValue(8),
    marginBottom: RFValue(8),
  },
  lessonTitle: {
    color: '#333',
    flex: 1,
    fontSize: RFValue(12),
    fontWeight: '600',
    lineHeight: RFValue(18),
    marginBottom: RFValue(6),
    ...FONTS.body3,
  },
  lessonTitleActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(6),
  },
  lessonMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(3),
  },
  lessonMetaDivider: {
    width: 1,
    height: RFValue(10),
    backgroundColor: '#E0E0E0',
  },
  lessonTime: {
    fontSize: RFValue(10),
    color: '#888',
    ...FONTS.body5,
  },
  lessonTimeActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },

  lessonPlayButton: {
    width: RFValue(38),
    height: RFValue(38),
    borderRadius: RFValue(19),
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RFValue(8),
  },
  lessonPlayButtonActive: {
    backgroundColor: COLORS.primary,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {elevation: 4},
    }),
  },
});
