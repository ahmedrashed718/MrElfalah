import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS} from '../../../constants';
const {height, width} = Dimensions.get('window');
export default function SignUpScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      {/* Background */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.background}
      />

      <ScrollView
        contentContainerStyle={styles.scrollBody}
        showsVerticalScrollIndicator={false}>
        {/* Card (Full Screen, Mobile Friendly) */}
        <View style={styles.card}>
          <Text style={styles.title}>تسجيل حساب جديد 📝</Text>
          <Text style={styles.subtitle}>أدخل بياناتك للمتابعة</Text>

          {/* Phone */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>رقم الهاتف 📱</Text>
            <TextInput
              placeholder="أدخل رقم هاتفك"
              placeholderTextColor="#888"
              keyboardType="phone-pad"
              style={styles.input}
            />
          </View>

          {/* Full Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>الاسم الكامل 🧑‍🎓</Text>
            <TextInput
              placeholder="اكتب اسمك كاملاً"
              placeholderTextColor="#888"
              style={styles.input}
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>كلمة المرور 🔐</Text>
            <TextInput
              placeholder="••••••••"
              placeholderTextColor="#888"
              secureTextEntry
              style={styles.input}
            />
          </View>

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>تأكيد كلمة المرور 🔒</Text>
            <TextInput
              placeholder="••••••••"
              placeholderTextColor="#888"
              secureTextEntry
              style={styles.input}
            />
          </View>

          {/* Register Button */}
          <LinearGradient
            colors={['#31D87F', '#00B76B']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.registerBtn}>
            <TouchableOpacity style={styles.btnWrapper}>
              <Text style={styles.registerText}>تسجيل حساب 🎉</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* Login Link */}
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>لديك حساب؟ سجل الدخول</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {flex: 1},

  background: {
    position: 'absolute',
    width,
    height,
  },

  scrollBody: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: RFValue(20),
  },

  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: RFValue(25),
    paddingHorizontal: RFValue(20),
    paddingVertical: RFValue(35),
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },

  title: {
    fontSize: RFValue(22),
    // fontWeight: '900',
    color: '#495ECD',
    marginBottom: RFValue(5),
    ...FONTS.body2,
  },

  subtitle: {
    fontSize: RFValue(13),
    color: '#555',
    marginBottom: RFValue(25),
    ...FONTS.body5,
  },

  inputContainer: {
    width: '100%',
    marginBottom: RFValue(18),
  },

  label: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color: '#000',
    textAlign: 'right',
    marginBottom: RFValue(5),
    ...FONTS.body4,
  },

  input: {
    width: '100%',
    height: RFValue(40),
    backgroundColor: '#F7F9FC',
    borderRadius: RFValue(10),
    paddingHorizontal: RFValue(10),
    fontSize: RFValue(12),
    textAlign: 'right',
    borderWidth: 1,
    borderColor: '#E0E4EA',
    ...FONTS.body4,
  },

  registerBtn: {
    width: '100%',
    height: RFValue(45),
    borderRadius: RFValue(12),
    marginTop: RFValue(10),
  },

  btnWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  registerText: {
    color: '#fff',
    fontSize: RFValue(15),
    fontWeight: '700',
    ...FONTS.body2,
  },

  fbBtn: {
    marginTop: RFValue(10),
    marginBottom: RFValue(10),
  },

  fbText: {
    fontSize: RFValue(14),
    color: '#444',
    ...FONTS.body5,
  },

  loginLink: {
    fontSize: RFValue(14),
    color: '#495ECD',
    fontWeight: '600',
    ...FONTS.body4,
    marginTop: RFValue(15),
  },
});
