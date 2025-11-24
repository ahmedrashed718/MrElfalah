import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {COLORS, FONTS} from '../../../../constants';

const SectionHeader = ({title, subtitle, description, icon, iconColor}) => (
  <Animatable.View animation="fadeInDown" style={styles.sectionHeaderContainer}>
    <View style={[styles.sectionIconContainer, {backgroundColor: iconColor}]}>
      <Ionicons name={icon} size={RFValue(32)} color={COLORS.white} />
    </View>
    <Text style={styles.sectionMainTitle}>{title}</Text>
    <Text style={styles.sectionSubTitle}>{subtitle}</Text>
    <Text style={styles.sectionDescription}>{description}</Text>
    <View style={styles.sectionDivider}>
      <View style={[styles.dividerLine, styles.dividerLinePurple]} />
      <View style={[styles.dividerLine, styles.dividerLineBlue]} />
    </View>
  </Animatable.View>
);

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    alignItems: 'center',
    marginBottom: RFValue(14),
  },
  sectionIconContainer: {
    width: RFValue(60),
    height: RFValue(60),
    borderRadius: RFValue(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: RFValue(10),
    ...COLORS.shadow,
  },
  sectionMainTitle: {
    fontSize: RFValue(20),
    color: '#7B60ED',
    ...FONTS.h2,
    marginBottom: RFValue(3),
    textAlign: 'center',
  },
  sectionSubTitle: {
    fontSize: RFValue(12),
    color: COLORS.gray6,
    ...FONTS.body5,
    marginBottom: RFValue(6),
    textAlign: 'center',
  },
  sectionDescription: {
    fontSize: RFValue(11),
    color: COLORS.gray6,
    ...FONTS.body5,
    textAlign: 'center',
    marginBottom: RFValue(10),
    paddingHorizontal: RFValue(15),
  },
  sectionDivider: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: RFValue(6),
    marginTop: RFValue(3),
  },
  dividerLine: {
    width: RFValue(35),
    height: RFValue(2.5),
    borderRadius: RFValue(2),
  },
  dividerLinePurple: {
    backgroundColor: '#7B60ED',
  },
  dividerLineBlue: {
    backgroundColor: '#4FACFE',
  },
});

export default SectionHeader;

