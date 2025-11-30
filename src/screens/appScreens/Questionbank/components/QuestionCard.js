import React, {useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {COLORS, FONTS} from '../../../../constants';
import images from '../../../../constants/images';

export default function QuestionCard({item, index, gradient, number, onPress}) {
  const cardRef = useRef(null);

  if (!item) {
    return null;
  }

  const safeGradient = gradient || ['#4FACFE', '#00F2FE'];

  const imageUri = item.course_photo_url || images.flahLogo || '';
  const title = item.course_name || 'بدون عنوان';
  const subtitle = item.course_content || '';

  const handlePress = () => {
    // Pulse animation
    cardRef?.current?.pulse(300);
    // Call onPress after animation
    setTimeout(() => {
      onPress?.();
    }, 200);
  };

  return (
    <Animatable.View
      ref={cardRef}
      animation="swing"
      delay={index * 120}
      duration={700}
      style={styles.cardWrapper}>
      <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
        <View style={styles.card}>
          {/* Header Image Section */}
          <View style={styles.imageContainer}>
            {imageUri ? (
              <Image
                source={{uri: imageUri}}
                style={styles.cardImage}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.cardImage, {backgroundColor: '#E0E0E0'}]} />
            )}
            {/* Number Badge */}
            <View
              style={[styles.numberBadge, {backgroundColor: safeGradient[0]}]}>
              <Text style={styles.numberText}>{number}</Text>
            </View>
          </View>

          {/* Card Content */}
          <View style={styles.cardContent}>
            {/* Main Title */}
            <Text style={styles.cardTitle} numberOfLines={2}>
              {title}
            </Text>

            {/* Subtitle */}
            {subtitle ? (
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText} numberOfLines={2}>
                  {subtitle}
                </Text>
              </View>
            ) : null}

            {/* Button */}
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.8}
              onPress={handlePress}>
              <LinearGradient
                colors={safeGradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.buttonGradient}>
                <Ionicons
                  name="rocket-outline"
                  size={RFValue(16)}
                  color="#fff"
                  style={styles.buttonIcon}
                />
                <Text style={styles.buttonText}>هيا بنا نبدأ ..!</Text>
                <Ionicons
                  name="game-controller-outline"
                  size={RFValue(18)}
                  color={'white'}
                  style={styles.buttonIcon}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    paddingHorizontal: RFValue(10),
    marginTop: RFValue(10),
  },

  card: {
    width: '94%',
    backgroundColor: COLORS.white,
    borderRadius: RFValue(14),
    overflow: 'hidden',
    elevation: 2,
    alignSelf: 'center',
  },

  imageContainer: {
    height: RFValue(130),
    overflow: 'hidden',
    position: 'relative',
  },

  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },

  numberBadge: {
    position: 'absolute',
    top: RFValue(12),
    left: RFValue(12),
    width: RFValue(32),
    height: RFValue(32),
    borderRadius: RFValue(16),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: RFValue(2),
    borderColor: COLORS.white,
    elevation: RFValue(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: RFValue(2),
    },
    shadowOpacity: 0.4,
    shadowRadius: RFValue(4),
  },

  numberText: {
    color: COLORS.white,
    fontSize: RFValue(14),
    fontWeight: 'bold',
    ...FONTS.body4,
  },

  cardContent: {
    padding: RFValue(14),
  },

  cardTitle: {
    fontSize: RFValue(14),
    color: COLORS.black,
    marginBottom: RFValue(8),
    minHeight: RFValue(40),
    ...FONTS.body2,
  },

  subtitleContainer: {
    backgroundColor: '#E0F2FE',
    borderRadius: RFValue(8),
    padding: RFValue(8),
    marginBottom: RFValue(12),
    minHeight: RFValue(40),
  },

  subtitleText: {
    fontSize: RFValue(11),
    color: COLORS.darkGray,
    textAlign: 'center',
    ...FONTS.body4,
  },

  buttonContainer: {
    borderRadius: RFValue(10),
    overflow: 'hidden',
  },

  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(8),
    gap: RFValue(6),
  },

  buttonText: {
    color: COLORS.white,
    // fontWeight: 'bold',
    ...FONTS.body1,
    fontSize: RFValue(14),
  },

  buttonIcon: {
    marginHorizontal: RFValue(2),
  },
});
