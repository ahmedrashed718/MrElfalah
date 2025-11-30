import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, SectionList, Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../../../constants';
import {AppHeader} from '../../../components';
import PointsCard from './components/PointsCard';
import PDFButtons from './components/PDFButtons';
import PDFModal from './components/PDFModal';
import VideoPlayer from './components/VideoPlayer';
import VideoControls from './components/VideoControls';
import QualityModal from './components/QualityModal';
import SpeedModal from './components/SpeedModal';
import FullscreenModal from './components/FullscreenModal';
import ActivitiesCard from './components/ActivitiesCard';
import CategoryHeader from './components/CategoryHeader';
import LessonCard from './components/LessonCard';

export default function CoursePlayer({navigation}) {
  const [paused, setPaused] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(1);
  const [points] = useState(0);
  const videoRef = useRef(null);

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

  const [showPDFModal, setShowPDFModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfTitle, setPdfTitle] = useState('');

  const qualityOptions = [
    'Auto (360p • 1.4 Mbps)',
    '720p • 2.5 Mbps',
    '1080p • 5 Mbps',
  ];

  const speedOptions = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

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

  const seekTo = time => {
    if (videoRef.current) {
      videoRef.current.seek(time);
      setCurrentTime(time);
    }
  };

  const handleProgressPress = event => {
    if (duration <= 0) {
      return;
    }
    const {locationX} = event.nativeEvent;
    const screenWidth = Dimensions.get('window').width;
    const progressBarWidth = screenWidth - RFValue(48);
    const progress = Math.max(0, Math.min(1, locationX / progressBarWidth));
    const newTime = progress * duration;
    seekTo(newTime);
  };

  const handleVolumePress = event => {
    const {locationX} = event.nativeEvent;
    const screenWidth = Dimensions.get('window').width;
    const buttonWidth = RFValue(40) * 3;
    const gaps = RFValue(8) * 3;
    const margins = RFValue(12) * 2;
    const padding = RFValue(12) * 2;
    const sliderWidth = screenWidth - margins - padding - buttonWidth - gaps;
    const newVolume = Math.max(0, Math.min(1, locationX / sliderWidth));
    setVolume(newVolume);
    if (newVolume > 0) {
      setMuted(false);
    } else {
      setMuted(true);
    }
  };

  const togglePlayPause = () => {
    setPaused(!paused);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const changeSpeed = speed => {
    setPlaybackRate(speed);
    setShowSpeedModal(false);
  };

  const changeQuality = quality => {
    setSelectedQuality(quality);
    setShowQualityModal(false);
  };

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

  const handleOpenMemo = () => {
    setPdfUrl(
      'https://camp-coding.tech/teachersApp2023/test_camp/admin/uploads/1173748371_1664476196%20_064207.pdf',
    );
    setPdfTitle('عرض المذكرة');
    setShowPDFModal(true);
  };

  const handleOpenCourseFile = () => {
    setPdfUrl('https://pdfobject.com/pdf/sample.pdf');
    setPdfTitle('ملف الدورة التدريبية');
    setShowPDFModal(true);
  };

  const handleClosePDFModal = () => {
    setShowPDFModal(false);
    setPdfUrl('');
    setPdfTitle('');
  };

  return (
    <View style={styles.container}>
      <AppHeader title={'دروس الدورة'} />

      <QualityModal
        visible={showQualityModal}
        qualityOptions={qualityOptions}
        selectedQuality={selectedQuality}
        onClose={() => setShowQualityModal(false)}
        onSelectQuality={changeQuality}
      />

      <SpeedModal
        visible={showSpeedModal}
        speedOptions={speedOptions}
        playbackRate={playbackRate}
        onClose={() => setShowSpeedModal(false)}
        onSelectSpeed={changeSpeed}
      />

      <PDFModal
        visible={showPDFModal}
        pdfUrl={pdfUrl}
        title={pdfTitle}
        onClose={handleClosePDFModal}
      />

      <SectionList
        ListHeaderComponent={
          <>
            <PointsCard points={points} />
            <PDFButtons
              onOpenMemo={handleOpenMemo}
              onOpenCourseFile={handleOpenCourseFile}
            />
            <VideoPlayer
              videoRef={videoRef}
              videoUrl={videoUrl}
              paused={paused}
              volume={volume}
              muted={muted}
              playbackRate={playbackRate}
              onLoad={onLoad}
              onProgress={onProgress}
              onEnd={onEnd}
              onTogglePlayPause={togglePlayPause}
            />
            <VideoControls
              currentTime={currentTime}
              duration={duration}
              progressPercentage={progressPercentage}
              paused={paused}
              volume={volume}
              muted={muted}
              playbackRate={playbackRate}
              selectedQuality={selectedQuality}
              fullscreen={fullscreen}
              onTogglePlayPause={togglePlayPause}
              onToggleMute={toggleMute}
              onProgressPress={handleProgressPress}
              onVolumePress={handleVolumePress}
              onSpeedPress={() => setShowSpeedModal(true)}
              onQualityPress={() => setShowQualityModal(true)}
              onFullscreenPress={() => setFullscreen(!fullscreen)}
              formatTime={formatTime}
            />
            <FullscreenModal
              visible={fullscreen}
              videoRef={videoRef}
              videoUrl={videoUrl}
              paused={paused}
              volume={volume}
              muted={muted}
              playbackRate={playbackRate}
              onLoad={onLoad}
              onProgress={onProgress}
              onEnd={onEnd}
              onClose={() => setFullscreen(false)}
              onTogglePlayPause={togglePlayPause}
            />
            <ActivitiesCard />
          </>
        }
        sections={grouped}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderSectionHeader={({section}) => (
          <CategoryHeader section={section} />
        )}
        renderItem={({item}) => (
          <LessonCard
            item={item}
            selectedLesson={selectedLesson}
            onPress={() => handleLessonPress(item)}
          />
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
});
