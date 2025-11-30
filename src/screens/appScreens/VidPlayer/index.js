import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Dimensions, StatusBar, Platform} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../../../constants';
import {AppHeader} from '../../../components';
import VideoPlayer from './components/VideoPlayer';
import VideoControls from './components/VideoControls';
import SpeedModal from './components/SpeedModal';
import QualityModal from './components/QualityModal';
import FullscreenModal from './components/FullscreenModal';

const {width, height} = Dimensions.get('window');

export default function VidPlayer({route, navigation}) {
  const videoUrl = route.params?.videoUrl || route.params?.url || '';
  const videoTitle = route.params?.title || 'مشغل الفيديو';

  const [paused, setPaused] = useState(true);
  const videoRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [showControls, setShowControls] = useState(true);
  const [showQualityModal, setShowQualityModal] = useState(false);
  const [showSpeedModal, setShowSpeedModal] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('Auto (360p • 1.4 Mbps)');
  const [fullscreen, setFullscreen] = useState(false);

  const qualityOptions = [
    'Auto (360p • 1.4 Mbps)',
    '720p • 2.5 Mbps',
    '1080p • 5 Mbps',
  ];

  const speedOptions = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

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

  const handleFullscreenProgressPress = event => {
    if (duration <= 0) {
      return;
    }
    const {locationX} = event.nativeEvent;
    const screenWidth = Dimensions.get('window').width;
    const progressBarWidth = screenWidth - RFValue(40);
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

  const toggleControls = () => {
    setShowControls(!showControls);
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

  if (!videoUrl) {
    return (
      <View style={styles.container}>
        <AppHeader title={videoTitle} />
        <View style={styles.errorContainer}>
          <View style={styles.errorCard} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <AppHeader title={videoTitle} />

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

      <View style={styles.videoSection}>
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
          showControls={showControls}
          onToggleControls={toggleControls}
        />

        {showControls && (
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
        )}
      </View>

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
        currentTime={currentTime}
        duration={duration}
        progressPercentage={progressPercentage}
        onProgressPress={handleFullscreenProgressPress}
        formatTime={formatTime}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  videoSection: {
    flex: 1,
    paddingTop: RFValue(20),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(20),
  },
  errorCard: {
    backgroundColor: COLORS.white,
    borderRadius: RFValue(16),
    padding: RFValue(20),
    width: '100%',
    maxWidth: RFValue(300),
  },
});

