import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  SectionList,
  Modal,
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

  // Video control states
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [showControls, setShowControls] = useState(true);
  const [showQualityModal, setShowQualityModal] = useState(false);
  const [showSpeedModal, setShowSpeedModal] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState(
    'Auto (360p • 1.4 Mbps)',
  );
  const [fullscreen, setFullscreen] = useState(false);

  const qualityOptions = [
    'Auto (360p • 1.4 Mbps)',
    '720p • 2.5 Mbps',
    '1080p • 5 Mbps',
  ];

  const speedOptions = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

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
    setCurrentTime(0);
  };

  // Format time helper
  const formatTime = seconds => {
    if (!seconds || isNaN(seconds)) {
      return '0:00';
    }
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs
        .toString()
        .padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Video event handlers
  const onLoad = data => {
    setDuration(data.duration);
  };

  const onProgress = data => {
    setCurrentTime(data.currentTime);
  };

  const onEnd = () => {
    setPaused(true);
    setCurrentTime(0);
  };

  // Seek video
  const seekTo = time => {
    if (videoRef.current) {
      videoRef.current.seek(time);
      setCurrentTime(time);
    }
  };

  // Handle progress bar press
  const handleProgressPress = event => {
    if (duration <= 0) {
      return;
    }
    const {locationX} = event.nativeEvent;
    // Get the actual width of the progress bar container
    // margins (12*2) + padding (12*2) = ~48
    const screenWidth = Dimensions.get('window').width;
    const progressBarWidth = screenWidth - RFValue(48);
    const progress = Math.max(0, Math.min(1, locationX / progressBarWidth));
    const newTime = progress * duration;
    seekTo(newTime);
  };

  // Handle volume slider press
  const handleVolumePress = event => {
    const {locationX} = event.nativeEvent;
    const screenWidth = Dimensions.get('window').width;
    // Calculate available width: screen - margins - padding - buttons
    const buttonWidth = RFValue(40) * 3; // 3 buttons (mute, speed, quality)
    const gaps = RFValue(8) * 3; // 3 gaps
    const margins = RFValue(12) * 2; // left and right margins
    const padding = RFValue(12) * 2; // left and right padding
    const sliderWidth = screenWidth - margins - padding - buttonWidth - gaps;
    const newVolume = Math.max(0, Math.min(1, locationX / sliderWidth));
    setVolume(newVolume);
    if (newVolume > 0) {
      setMuted(false);
    } else {
      setMuted(true);
    }
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    setPaused(!paused);
  };

  // Toggle mute
  const toggleMute = () => {
    setMuted(!muted);
  };

  // Change playback rate
  const changeSpeed = speed => {
    setPlaybackRate(speed);
    setShowSpeedModal(false);
  };

  // Change quality
  const changeQuality = quality => {
    setSelectedQuality(quality);
    setShowQualityModal(false);
  };

  // Auto-hide controls
  useEffect(() => {
    if (!paused && showControls) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [paused, showControls]);

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

      {/* Quality Modal */}
      <Modal
        visible={showQualityModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowQualityModal(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowQualityModal(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>اختر الجودة</Text>
            {qualityOptions.map((quality, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.modalOption,
                  selectedQuality === quality && styles.modalOptionActive,
                ]}
                onPress={() => changeQuality(quality)}>
                <Text
                  style={[
                    styles.modalOptionText,
                    selectedQuality === quality && styles.modalOptionTextActive,
                  ]}>
                  {quality}
                </Text>
                {selectedQuality === quality && (
                  <Ionicons
                    name="checkmark"
                    size={RFValue(20)}
                    color={COLORS.primary}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Speed Modal */}
      <Modal
        visible={showSpeedModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSpeedModal(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowSpeedModal(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>اختر السرعة</Text>
            {speedOptions.map((speed, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.modalOption,
                  playbackRate === speed && styles.modalOptionActive,
                ]}
                onPress={() => changeSpeed(speed)}>
                <Text
                  style={[
                    styles.modalOptionText,
                    playbackRate === speed && styles.modalOptionTextActive,
                  ]}>
                  {speed}x
                </Text>
                {playbackRate === speed && (
                  <Ionicons
                    name="checkmark"
                    size={RFValue(20)}
                    color={COLORS.primary}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

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
                    <Ionicons name="star" size={RFValue(18)} color="#FFD700" />
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
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={togglePlayPause}
                    style={styles.videoTouchArea}>
                    <Video
                      ref={videoRef}
                      source={{uri: videoUrl}}
                      paused={paused}
                      resizeMode="contain"
                      style={styles.video}
                      volume={volume}
                      muted={muted}
                      rate={playbackRate}
                      onLoad={onLoad}
                      onProgress={onProgress}
                      onEnd={onEnd}
                      progressUpdateInterval={250}
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
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>

            {/* Video Controls Section - Separate from Video */}
            <View style={styles.videoControlsSection}>
              <View style={styles.controlsWrapper}>
                {/* Row 1: Progress Bar */}
                <View style={styles.controlsRow1}>
                  <TouchableOpacity
                    style={styles.progressBarContainer}
                    onPress={handleProgressPress}
                    activeOpacity={1}>
                    <View style={styles.progressBarBackground}>
                      <View
                        style={[
                          styles.progressBarFill,
                          {width: `${progressPercentage}%`},
                        ]}
                      />
                      {duration > 0 && (
                        <View
                          style={[
                            styles.progressBarThumb,
                            {left: `${progressPercentage}%`},
                          ]}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Row 2: Time, Play/Pause, Fullscreen */}
                <View style={styles.controlsRow2}>
                  <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </Text>
                  </View>

                  <View style={styles.controlsGroupCenter}>
                    <TouchableOpacity
                      style={styles.controlButtonCard}
                      onPress={togglePlayPause}
                      activeOpacity={0.8}>
                      <LinearGradient
                        colors={
                          paused
                            ? [COLORS.primary, COLORS.secondary]
                            : ['#6C757D', '#5A6268']
                        }
                        style={styles.controlButtonGradient}>
                        <Ionicons
                          name={paused ? 'play' : 'pause'}
                          size={RFValue(18)}
                          color="#FFFFFF"
                        />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.controlButtonCard}
                    onPress={() => setFullscreen(!fullscreen)}
                    activeOpacity={0.8}>
                    <View style={styles.controlButtonIcon}>
                      <Ionicons
                        name={
                          fullscreen ? 'contract-outline' : 'expand-outline'
                        }
                        size={RFValue(16)}
                        color={COLORS.primary}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Row 3: Volume, Speed, Quality */}
                <View style={styles.controlsRow3}>
                  <TouchableOpacity
                    style={styles.controlButtonCard}
                    onPress={toggleMute}
                    activeOpacity={0.8}>
                    <View style={styles.controlButtonIcon}>
                      <Ionicons
                        name={muted ? 'volume-mute' : 'volume-high'}
                        size={RFValue(15)}
                        color={muted ? '#999' : COLORS.primary}
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.volumeSliderContainer}
                    onPress={handleVolumePress}
                    activeOpacity={1}>
                    <View style={styles.volumeBarBackground}>
                      <View
                        style={[
                          styles.volumeBarFill,
                          {width: `${(muted ? 0 : volume) * 100}%`},
                        ]}
                      />
                      <View
                        style={[
                          styles.volumeBarThumb,
                          {left: `${(muted ? 0 : volume) * 100}%`},
                        ]}
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.controlButtonCard}
                    onPress={() => setShowSpeedModal(true)}
                    activeOpacity={0.8}>
                    <View style={styles.controlButtonIcon}>
                      <Ionicons
                        name="speedometer-outline"
                        size={RFValue(14)}
                        color={COLORS.primary}
                      />
                      <Text style={styles.controlButtonLabel}>
                        {playbackRate}x
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.controlButtonCard}
                    onPress={() => setShowQualityModal(true)}
                    activeOpacity={0.8}>
                    <View style={styles.controlButtonIcon}>
                      <Ionicons
                        name="tv-outline"
                        size={RFValue(14)}
                        color={COLORS.primary}
                      />
                      <Text style={styles.controlButtonLabel}>
                        {selectedQuality.split(' ')[0]}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Fullscreen Modal */}
            <Modal
              visible={fullscreen}
              transparent={false}
              animationType="fade"
              onRequestClose={() => setFullscreen(false)}>
              <View style={styles.fullscreenContainer}>
                <View style={styles.fullscreenHeader}>
                  <TouchableOpacity
                    style={styles.fullscreenCloseButton}
                    onPress={() => setFullscreen(false)}
                    activeOpacity={0.8}>
                    <Ionicons name="close" size={RFValue(28)} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
                <View style={styles.fullscreenVideoContainer}>
                  <Video
                    ref={videoRef}
                    source={{uri: videoUrl}}
                    paused={paused}
                    resizeMode="contain"
                    style={styles.fullscreenVideo}
                    volume={volume}
                    muted={muted}
                    rate={playbackRate}
                    onLoad={onLoad}
                    onProgress={onProgress}
                    onEnd={onEnd}
                    progressUpdateInterval={250}
                  />
                  {paused && (
                    <TouchableOpacity
                      style={styles.fullscreenPlayButton}
                      onPress={togglePlayPause}
                      activeOpacity={0.8}>
                      <Ionicons
                        name="play-circle"
                        size={RFValue(80)}
                        color="rgba(255,255,255,0.9)"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </Modal>

            {/* الأنشطة الإضافية Section */}
            <View style={styles.activitiesSection}>
              <TouchableOpacity
                style={styles.activitiesCard}
                activeOpacity={0.8}
                onPress={() => {
                  // Navigate to activities screen or show activities
                }}>
                <LinearGradient
                  colors={['rgba(138, 43, 226, 0.8)', 'rgba(75, 0, 130, 0.9)']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.activitiesGradient}>
                  <View style={styles.activitiesContent}>
                    <View style={styles.activitiesIconContainer}>
                      <Ionicons
                        name="sparkles"
                        size={RFValue(24)}
                        color="#FFFFFF"
                      />
                    </View>
                    <View style={styles.activitiesTextContainer}>
                      <Text style={styles.activitiesTitle}>أنشطة إضافية</Text>
                      {/* <View style={styles.activitiesDivider} /> */}
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
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
                      color={
                        selectedLesson === item.id ? COLORS.primary : '#888'
                      }
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
                      color={
                        selectedLesson === item.id ? COLORS.primary : '#888'
                      }
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
                color={selectedLesson === item.id ? COLORS.white : COLORS.gray}
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

  // Video Touch Area
  videoTouchArea: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },

  // Video Controls Section - Separate from Video
  videoControlsSection: {
    marginHorizontal: RFValue(12),
    marginTop: RFValue(10),
    marginBottom: RFValue(6),
  },
  controlsWrapper: {
    backgroundColor: COLORS.white,
    borderRadius: RFValue(16),
    padding: RFValue(12),
    borderWidth: 1,
    borderColor: '#F0F0F0',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {elevation: 3},
    }),
  },
  controlsRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(10),
  },
  progressBarContainer: {
    flex: 1,
    paddingVertical: RFValue(5),
  },
  progressBarBackground: {
    width: '100%',
    height: RFValue(7),
    backgroundColor: '#E8E8E8',
    borderRadius: RFValue(4),
    position: 'relative',
    overflow: 'visible',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RFValue(4),
    position: 'absolute',
    left: 0,
    top: 0,
  },
  progressBarThumb: {
    width: RFValue(18),
    height: RFValue(18),
    borderRadius: RFValue(9),
    backgroundColor: COLORS.primary,
    position: 'absolute',
    top: RFValue(-5.5),
    marginLeft: RFValue(-9),
    borderWidth: 3,
    borderColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 4,
      },
      android: {elevation: 4},
    }),
  },
  timeContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  timeText: {
    fontSize: RFValue(9),
    fontWeight: '600',
    color: '#666',
    ...FONTS.body5,
  },
  controlsRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: RFValue(10),
    gap: RFValue(8),
  },
  controlsGroupCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlsRow3: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(8),
  },
  controlsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(6),
    flex: 1,
  },
  controlButtonCard: {
    borderRadius: RFValue(14),
    overflow: 'hidden',
  },
  controlButtonGradient: {
    width: RFValue(40),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(10),
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {elevation: 3},
    }),
  },
  controlButtonIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: RFValue(3),
    backgroundColor: '#F8F8F8',
    paddingHorizontal: RFValue(8),
    paddingVertical: RFValue(8),
    borderRadius: RFValue(10),
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    minHeight: RFValue(40),
    minWidth: RFValue(40),
  },
  controlButtonLabel: {
    fontSize: RFValue(9),
    fontWeight: '700',
    color: COLORS.primary,
    marginLeft: RFValue(2),
    ...FONTS.body5,
  },
  volumeSliderContainer: {
    flex: 1,
    paddingVertical: RFValue(5),
    marginHorizontal: RFValue(4),
  },
  volumeBarBackground: {
    width: '100%',
    height: RFValue(7),
    backgroundColor: '#E8E8E8',
    borderRadius: RFValue(4),
    position: 'relative',
    overflow: 'visible',
  },
  volumeBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RFValue(4),
    position: 'absolute',
    left: 0,
    top: 0,
  },
  volumeBarThumb: {
    width: RFValue(18),
    height: RFValue(18),
    borderRadius: RFValue(9),
    backgroundColor: COLORS.primary,
    position: 'absolute',
    top: RFValue(-5.5),
    marginLeft: RFValue(-9),
    borderWidth: 3,
    borderColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 4,
      },
      android: {elevation: 4},
    }),
  },

  // Fullscreen Styles
  fullscreenContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  fullscreenHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: RFValue(40),
    paddingHorizontal: RFValue(20),
    paddingBottom: RFValue(10),
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  fullscreenCloseButton: {
    alignSelf: 'flex-end',
    padding: RFValue(8),
  },
  fullscreenVideoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenVideo: {
    width: '100%',
    height: '100%',
  },
  fullscreenPlayButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: RFValue(16),
    padding: RFValue(20),
    width: '80%',
    maxWidth: RFValue(300),
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {elevation: 8},
    }),
  },
  modalTitle: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: RFValue(16),
    textAlign: 'center',
    ...FONTS.h2,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(16),
    borderRadius: RFValue(8),
    marginBottom: RFValue(8),
    backgroundColor: '#F5F5F5',
  },
  modalOptionActive: {
    backgroundColor: COLORS.primary100,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  modalOptionText: {
    fontSize: RFValue(14),
    color: COLORS.black,
    ...FONTS.body3,
  },
  modalOptionTextActive: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },

  // Activities Section Styles
  activitiesSection: {
    marginHorizontal: RFValue(15),
    marginTop: RFValue(20),
    marginBottom: RFValue(10),
  },
  activitiesCard: {
    borderRadius: RFValue(20),
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#8A2BE2',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {elevation: 6},
    }),
  },
  activitiesGradient: {
    padding: RFValue(20),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  activitiesContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activitiesIconContainer: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(25),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: RFValue(12),
  },
  activitiesTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(8),
  },
  activitiesTitle: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: '#FFFFFF',
    ...FONTS.body4,
  },
  activitiesDivider: {
    width: 2,
    height: RFValue(20),
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});
