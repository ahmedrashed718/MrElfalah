import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {COLORS, FONTS} from '../../../../constants';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const StatCard = ({item, index}) => (
  <Animatable.View
    animation="fadeInUp"
    delay={index * 100}
    style={styles.statCard}>
    <View
      style={[styles.statIconContainer, {backgroundColor: `${item.color}15`}]}>
      <Ionicons name={item.icon} size={RFValue(20)} color={item.color} />
    </View>
    <Text style={styles.statValue}>{item.value}</Text>
    <Text style={styles.statLabel}>{item.label}</Text>
  </Animatable.View>
);

const styles = StyleSheet.create({
  statCard: {
    width: (width - RFValue(42)) / 2,
    backgroundColor: COLORS.white,
    borderRadius: RFValue(12),
    padding: RFValue(10),
    marginBottom: RFValue(10),
    alignItems: 'center',
    ...COLORS.shadow,
  },
  statIconContainer: {
    width: RFValue(48),
    height: RFValue(48),
    borderRadius: RFValue(24),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: RFValue(6),
  },
  statValue: {
    fontSize: RFValue(20),
    color: COLORS.black,
    ...FONTS.h2,
    marginBottom: RFValue(4),
  },
  statLabel: {
    fontSize: RFValue(11),
    color: COLORS.darkGray,
    ...FONTS.body4,
  },
});

export default StatCard;

