import React from 'react';
import {View, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';

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
}) => {
  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.fullscreenContainer}>
        <View style={styles.fullscreenHeader}>
          <TouchableOpacity
            style={styles.fullscreenCloseButton}
            onPress={onClose}
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
              onPress={onTogglePlayPause}
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
  );
};

const styles = StyleSheet.create({
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
});

export default FullscreenModal;

