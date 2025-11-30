import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions, Platform} from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../../../../constants';

const {width, height} = Dimensions.get('window');

const FullscreenModal = ({
  visible,
  videoRef,
  videoUrl,
  paused,
  volume,
  muted,
  playbackRate,
  onLoad,
  onProgress,
  onEnd,
  onClose,
  onTogglePlayPause,
  currentTime,
  duration,
  progressPercentage,
  onProgressPress,
  formatTime,
}) => {
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    if (visible && !paused && showControls) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, paused, showControls]);

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.fullscreenContainer}>
        {/* Header with close button */}
        {showControls && (
          <View style={styles.fullscreenHeader}>
            <TouchableOpacity
              style={styles.fullscreenCloseButton}
              onPress={onClose}
              activeOpacity={0.8}>
              <Ionicons name="close" size={RFValue(28)} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}

        {/* Video Container */}
        <TouchableOpacity
          style={styles.fullscreenVideoContainer}
          activeOpacity={1}
          onPress={() => {
            setShowControls(!showControls);
          }}>
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
          
          {/* Play/Pause Overlay */}
          {paused && (
            <TouchableOpacity
              style={styles.fullscreenPlayButton}
              onPress={onTogglePlayPause}
              activeOpacity={0.8}>
              <Ionicons
                name="play-circle"
                size={RFValue(80)}
                color="rgba(255,255,255,0.9)"
              />
            </TouchableOpacity>
          )}

          {/* Controls Overlay */}
          {showControls && (
            <View style={styles.fullscreenControls}>
              {/* Progress Bar */}
              <TouchableOpacity
                style={styles.fullscreenProgressContainer}
                onPress={onProgressPress}
                activeOpacity={1}>
                <View style={styles.fullscreenProgressBar}>
                  <View
                    style={[
                      styles.fullscreenProgressFill,
                      {width: `${progressPercentage}%`},
                    ]}
                  />
                  {duration > 0 && (
                    <View
                      style={[
                        styles.fullscreenProgressThumb,
                        {left: `${progressPercentage}%`},
                      ]}
                    />
                  )}
                </View>
              </TouchableOpacity>

              {/* Time and Controls */}
              <View style={styles.fullscreenControlsRow}>
                <View style={styles.fullscreenTimeContainer}>
                  <TouchableOpacity
                    style={styles.fullscreenControlButton}
                    onPress={onTogglePlayPause}
                    activeOpacity={0.8}>
                    <Ionicons
                      name={paused ? 'play' : 'pause'}
                      size={RFValue(24)}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>
                  <View style={styles.fullscreenTimeTextContainer}>
                    <Ionicons
                      name="time-outline"
                      size={RFValue(14)}
                      color="#FFFFFF"
                    />
                    <View style={styles.fullscreenTimeText}>
                      <Text style={styles.fullscreenTimeTextStyle}>
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullscreenContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  fullscreenHeader: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? RFValue(50) : RFValue(20),
    right: RFValue(20),
    zIndex: 10,
    ...Platform.select({
      ios: {
        paddingTop: RFValue(20),
      },
    }),
  },
  fullscreenCloseButton: {
    width: RFValue(40),
    height: RFValue(40),
    borderRadius: RFValue(20),
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenVideoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenVideo: {
    width: width,
    height: height,
  },
  fullscreenPlayButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: RFValue(-40),
    marginTop: RFValue(-40),
    zIndex: 5,
  },
  fullscreenControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingBottom: Platform.OS === 'ios' ? RFValue(40) : RFValue(20),
    paddingTop: RFValue(20),
    paddingHorizontal: RFValue(20),
  },
  fullscreenProgressContainer: {
    marginBottom: RFValue(15),
  },
  fullscreenProgressBar: {
    width: '100%',
    height: RFValue(4),
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: RFValue(2),
    position: 'relative',
    overflow: 'visible',
  },
  fullscreenProgressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RFValue(2),
    position: 'absolute',
    left: 0,
    top: 0,
  },
  fullscreenProgressThumb: {
    width: RFValue(16),
    height: RFValue(16),
    borderRadius: RFValue(8),
    backgroundColor: COLORS.primary,
    position: 'absolute',
    top: RFValue(-6),
    marginLeft: RFValue(-8),
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  fullscreenControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fullscreenTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(10),
  },
  fullscreenControlButton: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(25),
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenTimeTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(5),
  },
  fullscreenTimeText: {
    flexDirection: 'row',
  },
  fullscreenTimeTextStyle: {
    color: '#FFFFFF',
    fontSize: RFValue(12),
    fontWeight: '600',
  },
});

export default FullscreenModal;

