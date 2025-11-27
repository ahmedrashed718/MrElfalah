import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS} from '../../../../constants';

const PDFButtons = ({onOpenMemo, onOpenCourseFile}) => {
  return (
    <View style={styles.pdfButtonsSection}>
      <TouchableOpacity
        style={styles.pdfButton}
        activeOpacity={0.8}
        onPress={onOpenMemo}>
        <LinearGradient
          colors={['#FF6B35', '#FF8C42']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.pdfButtonGradient}>
          <Ionicons name="library" size={RFValue(14)} color="#FFFFFF" />
          <Text style={styles.pdfButtonText}>عرض المذكرة</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.pdfButton}
        activeOpacity={0.8}
        onPress={onOpenCourseFile}>
        <LinearGradient
          colors={['#6C5CE7', '#A29BFE']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.pdfButtonGradient}>
          <Ionicons
            name="document-text"
            size={RFValue(14)}
            color={COLORS.white}
          />
          <Text style={styles.pdfButtonText}>عرض ملف الدورة</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pdfButtonsSection: {
    marginHorizontal: RFValue(15),
    marginTop: RFValue(15),
    // marginBottom: RFValue(12),
    flexDirection: 'row',
    gap: RFValue(8),
  },
  pdfButton: {
    flex: 1,
    borderRadius: RFValue(10),
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {elevation: 3},
    }),
  },
  pdfButtonGradient: {
    paddingVertical: RFValue(8),
    paddingHorizontal: RFValue(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: RFValue(6),
    minHeight: RFValue(32),
  },
  pdfButtonText: {
    fontSize: RFValue(11),
    color: COLORS.white,
    textAlign: 'center',
    ...FONTS.body4,
  },
});

export default PDFButtons;
