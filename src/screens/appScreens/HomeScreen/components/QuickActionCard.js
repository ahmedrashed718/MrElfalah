import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {COLORS, FONTS} from '../../../../constants';

const QuickActionCard = ({item, index, onPress}) => (
  <Animatable.View
    animation="fadeInRight"
    delay={index * 150}
    style={styles.actionCard}>
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress(item.route)}
      style={styles.actionButton}>
      <LinearGradient
        colors={item.gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.actionGradient}>
        <Ionicons
          name={item.icon}
          size={RFValue(26)}
          color={COLORS.white}
          style={styles.actionIcon}
        />
        <Text style={styles.actionTitle}>{item.title}</Text>
        <Text style={styles.actionSubtitle}>{item.subtitle}</Text>
        <Ionicons
          name="arrow-back"
          size={RFValue(16)}
          color={COLORS.white}
          style={styles.actionArrow}
        />
      </LinearGradient>
    </TouchableOpacity>
  </Animatable.View>
);

const styles = StyleSheet.create({
  actionCard: {
    marginBottom: RFValue(12),
    borderRadius: RFValue(16),
    overflow: 'hidden',
    ...COLORS.shadow,
  },
  actionButton: {
    borderRadius: RFValue(16),
    overflow: 'hidden',
  },
  actionGradient: {
    padding: RFValue(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionIcon: {
    marginLeft: RFValue(12),
    marginRight: RFValue(5),
  },
  actionTitle: {
    fontSize: RFValue(16),
    color: COLORS.white,
    ...FONTS.body3,
    flex: 1,
  },
  actionSubtitle: {
    fontSize: RFValue(11),
    color: COLORS.white,
    opacity: 0.9,
    ...FONTS.body5,
    position: 'absolute',
    bottom: RFValue(16),
    right: RFValue(50),
  },
  actionArrow: {
    marginRight: RFValue(4),
  },
});

export default QuickActionCard;

