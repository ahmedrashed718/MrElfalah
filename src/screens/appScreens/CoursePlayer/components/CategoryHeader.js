import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS} from '../../../../constants';

const CategoryHeader = ({section}) => {
  const getCategoryIcon = category => {
    switch (category) {
      case 'جرامر':
        return 'book-outline';
      case 'محادثة':
        return 'chatbubbles-outline';
      case 'قراءة':
        return 'document-text-outline';
      default:
        return 'library-outline';
    }
  };

  return (
    <View style={styles.categoryHeaderContainer}>
      <LinearGradient
        colors={['#00C9A7', '#FF6B9D']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.categoryHeader}>
        <View style={styles.categoryHeaderContent}>
          <Ionicons
            name={getCategoryIcon(section.title)}
            size={RFValue(22)}
            color={COLORS.white}
          />
          <Text style={styles.categoryTitle}>{section.title}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>
              {section.data.length}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryHeaderContainer: {
    marginTop: RFValue(24),
    marginBottom: RFValue(12),
  },
  categoryHeader: {
    marginHorizontal: RFValue(15),
    borderRadius: RFValue(16),
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(16),
    ...Platform.select({
      ios: {
        shadowColor: '#00C9A7',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {elevation: 4},
    }),
  },
  categoryHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(10),
  },
  categoryTitle: {
    fontSize: RFValue(18),
    color: COLORS.white,
    fontWeight: 'bold',
    flex: 1,
    ...FONTS.h2,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: RFValue(12),
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(4),
    minWidth: RFValue(30),
    alignItems: 'center',
  },
  categoryBadgeText: {
    color: COLORS.white,
    fontSize: RFValue(12),
    fontWeight: 'bold',
  },
});

export default CategoryHeader;

