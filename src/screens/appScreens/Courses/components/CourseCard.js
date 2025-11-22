import React, {useMemo, useRef} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {COLORS, FONTS} from '../../../../constants';

const buttonColors = [
  ['#FF6F91', '#FF9671'],
  ['#FFC75F', '#F9A825'],
  ['#00C9A7', '#008F7A'],
  ['#6A5AE0', '#836FFF'],
  ['#FF5F6D', '#FFC371'],
  ['#42E695', '#3BB2B8'],
  ['#F53844', '#42378F'],
  ['#F5576C', '#F093FB'],
  ['#4FACFE', '#00F2FE'],
  ['#F77062', '#FE5196'],
  ['#30CFD0', '#330867'],
  ['#FF9966', '#FF5E62'],
];

export default function CourseCard({item, onPress, index}) {
  const cardRef = useRef(null);

  const randomGradient = useMemo(
    () => buttonColors[Math.floor(Math.random() * buttonColors.length)],
    [],
  );

  // HANDLER CLICK ANIMATION
  const handlePress = () => {
    cardRef.current?.pulse(300);
    setTimeout(() => onPress?.(), 200);
  };

  return (
    <Animatable.View
      ref={cardRef}
      animation="swing"
      delay={index * 120}
      duration={700}
      // easing="ease-out"
      style={styles.container}>
      <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
        <View style={styles.card}>
          {/* IMAGE */}
          <Image source={{uri: item.image}} style={styles.image} />

          {/* Featured Badge */}
          {item.featured && (
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredText}>مميز ⭐</Text>
            </View>
          )}

          {/* Info */}
          <View style={styles.infoBox}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>

            <TouchableOpacity style={styles.btn} onPress={handlePress}>
              <LinearGradient
                colors={randomGradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.btnGradient}>
                <View style={styles.btnContent}>
                  <Ionicons
                    name="happy-outline"
                    size={RFValue(14)}
                    color={'#fff'}
                  />

                  <Text style={styles.btnText}>ابدأ التعلم الآن 🎯</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: RFValue(10),
    marginTop: RFValue(10),
  },
  card: {
    width: '94%',
    backgroundColor: '#fff',
    borderRadius: RFValue(14),
    overflow: 'hidden',
    elevation: 2,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: RFValue(130),
    resizeMode: 'cover',
  },
  featuredBadge: {
    position: 'absolute',
    top: RFValue(8),
    right: RFValue(8),
    backgroundColor: COLORS.primary,
    paddingVertical: RFValue(3),
    paddingHorizontal: RFValue(6),
    borderRadius: RFValue(6),
  },
  featuredText: {
    color: COLORS.white,
    fontSize: RFValue(9),
    ...FONTS.body5,
  },
  infoBox: {
    padding: RFValue(10),
  },
  title: {
    fontSize: RFValue(12),
    color: COLORS.black,
    ...FONTS.body2,
  },
  description: {
    fontSize: RFValue(10),
    color: COLORS.gray,
    marginVertical: RFValue(3),
    ...FONTS.body4,
  },
  btn: {
    marginTop: RFValue(5),
  },
  btnGradient: {
    paddingVertical: RFValue(7),
    borderRadius: RFValue(8),
    alignItems: 'center',
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(6),
  },
  btnText: {
    color: '#fff',
    ...FONTS.body1,
    fontSize: RFValue(13),
  },
});
