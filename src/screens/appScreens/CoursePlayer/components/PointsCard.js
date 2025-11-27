import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONTS} from '../../../../constants';

const PointsCard = ({points}) => {
  return (
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
  );
};

const styles = StyleSheet.create({
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
});

export default PointsCard;

