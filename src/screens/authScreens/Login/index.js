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
import {COLORS, FONTS} from '../../../constants';

const {height, width} = Dimensions.get('window');

export default function LoginScreen({navigation}) {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.background}
      />

      <ScrollView
        contentContainerStyle={styles.scrollBody}
        showsVerticalScrollIndicator={false}>
        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.title}>تسجيل الدخول ✨</Text>

          <Text style={styles.subtitle}>ادخل بياناتك للمتابعة 🎒</Text>

          {/* Phone Number */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>رقم الهاتف 📱</Text>
            <TextInput
              placeholder="أدخل رقم هاتفك"
              placeholderTextColor="#888"
              keyboardType="phone-pad"
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

          {/* Login button */}
          <LinearGradient
            colors={['#5AB0FF', '#7560FF']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.loginBtn}>
            <TouchableOpacity
              style={styles.btnWrapper}
              onPress={() => navigation.navigate('BottomTabs')}>
              <Text style={styles.loginText}>دخول 🚀</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* Help & Register */}
          <TouchableOpacity style={styles.helpBtn}>
            <Text style={styles.helpText}>هل تحتاج للمساعدة؟ 💬</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupBtn}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupText}>مستخدم جديد؟ سجل الآن 🌟</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>التعلم معنا ممتع وسهل! 🧠✨</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  background: {
    position: 'absolute',
    width,
    height,
  },

  scrollBody: {
    paddingTop: RFValue(100),
    paddingBottom: RFValue(40),
    alignItems: 'center',
  },

  card: {
    width: '88%',
    backgroundColor: '#fff',
    borderRadius: RFValue(25),
    paddingHorizontal: RFValue(20),
    paddingVertical: RFValue(30),
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },

  logo: {
    width: RFValue(160),
    height: RFValue(70),
    marginBottom: RFValue(15),
  },

  title: {
    fontSize: RFValue(23),
    color: '#495ECD',
    marginBottom: RFValue(8),
    ...FONTS.h1,
  },

  subtitle: {
    fontSize: RFValue(14),
    color: '#444',
    marginBottom: RFValue(30),
    ...FONTS.body4,
  },

  inputContainer: {
    width: '100%',
    marginBottom: RFValue(18),
  },

  label: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color: '#333',
    marginBottom: RFValue(5),
    ...FONTS.body4,
  },

  input: {
    width: '100%',
    height: RFValue(40),
    backgroundColor: '#F7F9FC',
    borderRadius: RFValue(12),
    paddingHorizontal: RFValue(12),
    fontSize: RFValue(12),
    textAlign: 'right',
    borderWidth: 1,
    borderColor: '#E3E6EB',
    // justifyContent: 'center',
    alignItems: 'center',
    ...FONTS.body4,
  },

  loginBtn: {
    width: '100%',
    height: RFValue(50),
    borderRadius: RFValue(14),
    marginTop: RFValue(10),
  },

  btnWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginText: {
    color: '#fff',
    fontSize: RFValue(16),
    fontWeight: '700',
    ...FONTS.body2,
  },

  helpBtn: {
    marginTop: RFValue(12),
  },

  helpText: {
    fontSize: RFValue(14),
    color: '#444',
    ...FONTS.body5,
  },

  signupBtn: {
    backgroundColor: '#CFFFCB',
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(15),
    borderRadius: RFValue(10),
    marginTop: RFValue(12),
  },

  signupText: {
    color: '#2F7A1F',
    fontSize: RFValue(14),
    fontWeight: '600',
    ...FONTS.body4,
  },

  footerText: {
    marginTop: RFValue(20),
    fontSize: RFValue(14),
    color: '#333',
    ...FONTS.body5,
  },
});
