import React, {useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {COLORS, FONTS} from '../../../../constants';

export default function StageCard({item, index, gradient, number, onPress}) {
  const cardRef = useRef(null);

  const handlePress = () => {
    // Pulse animation
    cardRef?.current?.pulse(300);
    // Call onPress after animation
    setTimeout(() => {
      onPress?.();
    }, 200);
  };

  // Icon mapping for different stages - matching the image design
  const getIconName = index => {
    const icons = [
      'document-text-outline', // Unit 1 - document
      'help-circle-outline', // Unit 2 - question mark
      'star-outline', // Unit 3 - star
      'telescope-outline', // Unit 4 - telescope
      'film-outline', // Unit 5 - film reel
    ];
    return icons[index % icons.length];
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
          {/* Card Content */}
          <View style={styles.cardContent}>
            {/* Top Section with Icon and Badge */}
            <View style={styles.topSection}>
              {/* Number Badge - Right */}
              <LinearGradient
                colors={gradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.numberBadge}>
                <Text style={styles.numberText}>المرحلة {number}</Text>
              </LinearGradient>

              {/* Icon - Left */}
              <View style={styles.iconContainer}>
                <Ionicons
                  name={getIconName(index)}
                  size={RFValue(40)}
                  color={gradient[0]}
                  style={styles.icon}
                />
              </View>
            </View>

            {/* Main Title */}
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.title}
            </Text>

            {/* Motivational Text */}
            <View style={styles.motivationalContainer}>
              <Text style={styles.motivationalText} numberOfLines={2}>
                هل أنتم مستعدون لرحلة تعليمية رائعة؟ هيا نبدأ معا! ✨
              </Text>
            </View>

            {/* Button */}
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.8}
              onPress={handlePress}>
              <LinearGradient
                colors={gradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.buttonGradient}>
                <Ionicons
                  name="rocket-outline"
                  size={RFValue(16)}
                  color="#fff"
                  style={styles.buttonIcon}
                />
                <Text style={styles.buttonText}>لنبدأ رحلة التعلم الآن!</Text>
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
    paddingHorizontal: RFValue(0),
    marginTop: RFValue(12),
    width: '100%',
  },

  card: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: RFValue(18),
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: RFValue(4),
    },
    shadowOpacity: 0.15,
    shadowRadius: RFValue(8),
    minHeight: RFValue(280),
  },

  cardContent: {
    padding: RFValue(18),
    flex: 1,
    justifyContent: 'space-between',
  },

  topSection: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: RFValue(16),
    paddingTop: RFValue(4),
  },

  iconContainer: {
    width: RFValue(60),
    height: RFValue(60),
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    opacity: 0.9,
  },

  numberBadge: {
    width: RFValue(80),
    height: RFValue(38),
    borderRadius: RFValue(19),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: RFValue(6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: RFValue(3),
    },
    shadowOpacity: 0.35,
    shadowRadius: RFValue(5),
  },

  numberText: {
    color: COLORS.white,
    fontSize: RFValue(11),
    ...FONTS.body4,
    fontWeight: 'bold',
  },

  cardTitle: {
    fontSize: RFValue(18),
    color: COLORS.black,
    marginBottom: RFValue(14),
    minHeight: RFValue(50),
    textAlign: 'center',
    lineHeight: RFValue(26),
    ...FONTS.h3,
  },

  motivationalContainer: {
    backgroundColor: '#F0F9FF',
    borderRadius: RFValue(12),
    padding: RFValue(12),
    marginBottom: RFValue(16),
    minHeight: RFValue(55),
    borderWidth: RFValue(1),
    borderColor: '#E0F2FE',
  },

  motivationalText: {
    fontSize: RFValue(12),
    color: '#1E40AF',
    textAlign: 'center',
    lineHeight: RFValue(18),
    ...FONTS.body4,
  },

  buttonContainer: {
    borderRadius: RFValue(12),
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: RFValue(2),
    },
    shadowOpacity: 0.2,
    shadowRadius: RFValue(4),
  },

  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RFValue(14),
    paddingHorizontal: RFValue(12),
    gap: RFValue(8),
  },

  buttonText: {
    color: COLORS.white,
    fontSize: RFValue(12),
    ...FONTS.body3,
    fontWeight: '600',
    letterSpacing: RFValue(0.3),
  },

  buttonIcon: {
    marginHorizontal: RFValue(4),
  },
});

