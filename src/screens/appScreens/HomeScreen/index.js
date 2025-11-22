import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {AppHeader, GradientText, ScreensContainer} from '../../../components';
import {COLORS, FONTS} from '../../../constants';

export default function HomeScreen() {
  const [user, setUser] = useState({
    name: 'احمد السعيد راشد',
    phone: '01212745939',
  });
  return (
    // <ScreensContainer>
    <>
      <AppHeader title="الصفحة الرئيسية" showBack={false} />
      <View style={styles.container}>
        <Text style={styles.title}>الصفحة الرئيسية</Text>
        <Text style={styles.welcomeText}>مرحباً بعودتك،</Text>

        <GradientText style={[styles.welcomeText, styles.username]}>
          {user.name}
        </GradientText>

        <Text style={styles.subText}>استمر في رحلتك التعليمية الرائعة! 🚀</Text>
      </View>
    </>
    // </ScreensContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: RFValue(26),
    marginBottom: 10,
    ...FONTS.body1,
  },
  subtitle: {
    fontSize: RFValue(15),
    color: '#555',
    textAlign: 'center',
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: RFValue(16),
    color: '#fff',
    fontWeight: '600',
  },
  welcomeText: {
    fontSize: RFValue(20),
    textAlign: 'center',
    color: COLORS.black,
    ...FONTS.body1,
  },

  username: {
    color: COLORS.primary,
  },

  subText: {
    fontSize: RFValue(15),
    marginTop: RFValue(5),
    color: COLORS.black,
    textAlign: 'center',
    ...FONTS.body5,
  },
});
