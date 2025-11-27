import React from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../../../../constants';

const {height} = Dimensions.get('window');

const VideoPlayer = ({
  videoRef,
  videoUrl,
  paused,
  volume,
  muted,
  playbackRate,
  onLoad,
  onProgress,
  onEnd,
  onTogglePlayPause,
}) => {
  return (
    <View style={styles.videoContainer}>
      <LinearGradient
        colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.02)']}
        style={styles.videoWrapper}>
        <View style={styles.videoBox}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={onTogglePlayPause}
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
  );
};

const styles = StyleSheet.create({
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
  videoTouchArea: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
});

export default VideoPlayer;

