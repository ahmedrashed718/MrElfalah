import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS} from '../../../../constants';

const VideoControls = ({
  currentTime,
  duration,
  progressPercentage,
  paused,
  volume,
  muted,
  playbackRate,
  selectedQuality,
  fullscreen,
  onTogglePlayPause,
  onToggleMute,
  onProgressPress,
  onVolumePress,
  onSpeedPress,
  onQualityPress,
  onFullscreenPress,
  formatTime,
}) => {
  return (
    <View style={styles.videoControlsSection}>
      <View style={styles.controlsWrapper}>
        {/* Row 1: Progress Bar */}
        <View style={styles.controlsRow1}>
          <TouchableOpacity
            style={styles.progressBarContainer}
            onPress={onProgressPress}
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
              onPress={onTogglePlayPause}
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
            onPress={onFullscreenPress}
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
            onPress={onToggleMute}
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
            onPress={onVolumePress}
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
            onPress={onSpeedPress}
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
            onPress={onQualityPress}
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
  );
};

const styles = StyleSheet.create({
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
});

export default VideoControls;

