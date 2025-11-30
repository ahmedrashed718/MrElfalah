import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import Toast from 'react-native-toast-message';
import {COLORS, FONTS} from '../../../constants';
import {
  modifyIsLogin,
  setUser,
  setToken,
} from '../../../redux/reducers/UserReducer';
import {fetchData} from '../../../Helpers/ApiHelper';
import Auth from '../../../Services';

const {height, width} = Dimensions.get('window');

export default function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    phoneNumber: '',
    password: '',
  });

  const validatePhoneNumber = phone => {
    const cleanedPhone = phone.replace(/\s+/g, '').replace(/[-+()]/g, '');

    if (!phone.trim()) {
      return 'رقم الهاتف مطلوب';
    }

    if (!/^0?1[0-2,5]{1}[0-9]{8}$/.test(cleanedPhone)) {
      return 'يرجى إدخال رقم هاتف صحيح';
    }

    return '';
  };

  const validatePassword = pass => {
    if (!pass.trim()) {
      return 'كلمة المرور مطلوبة';
    }

    if (pass.length < 4) {
      return 'كلمة المرور يجب أن تكون 4 أحرف على الأقل';
    }

    return '';
  };

  const handlePhoneChange = text => {
    setPhoneNumber(text);
    if (errors.phoneNumber) {
      setErrors(prev => ({...prev, phoneNumber: ''}));
    }
  };

  const handlePasswordChange = text => {
    setPassword(text);
    if (errors.password) {
      setErrors(prev => ({...prev, password: ''}));
    }
  };

  const handleLogin = async () => {
    const phoneError = validatePhoneNumber(phoneNumber);
    const passwordError = validatePassword(password);

    setErrors({
      phoneNumber: phoneError,
      password: passwordError,
    });

    if (!phoneError && !passwordError) {
      setLoading(true);
      try {
        const cleanedPhone = phoneNumber
          .replace(/\s+/g, '')
          .replace(/[-+()]/g, '');

        const loginData = {
          email: cleanedPhone,
          pass: password,
          mobile: true,
        };

        console.log('Login Data:', loginData);

        const response = await fetchData(
          'POST',
          '/auth/new_login.php',
          loginData,
        );

        console.log('Login Response:', response);

        if (response && response.status === 'success') {
          const userData = response.message || response.data;

          if (userData) {
            dispatch(setUser(userData));
            const token = userData.token_value || '';
            if (token) {
              dispatch(setToken(token));
            }

            await Auth.saveSession(userData, token);
          }

          dispatch(modifyIsLogin(true));

          const userName =
            typeof userData === 'object' && userData?.student_name
              ? userData.student_name
              : null;
          Toast.show({
            type: 'success',
            text1: 'تم تسجيل الدخول بنجاح!',
            text2: userName ? `مرحباً ${userName}` : 'مرحباً بك',
            position: 'top',
            visibilityTime: 2000,
          });

          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'BottomTabs'}],
            });
          }, 500);
        } else {
          const errorMessage =
            typeof response?.message === 'string'
              ? response.message
              : typeof response?.message === 'object'
              ? JSON.stringify(response.message)
              : 'حدث خطأ، يرجى المحاولة مرة أخرى';

          Toast.show({
            type: 'error',
            text1: 'فشل تسجيل الدخول',
            text2: errorMessage,
            position: 'top',
            visibilityTime: 3000,
          });
          setLoading(false);
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'حدث خطأ',
          text2:
            error.message ||
            'حدث خطأ أثناء تسجيل الدخول، يرجى المحاولة مرة أخرى',
          position: 'top',
          visibilityTime: 3000,
        });
        setLoading(false);
      }
    }
  };

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
        <View style={styles.card}>
          <Text style={styles.title}>تسجيل الدخول ✨</Text>

          <Text style={styles.subtitle}>ادخل بياناتك للمتابعة 🎒</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>رقم الهاتف 📱</Text>
            <TextInput
              placeholder="أدخل رقم هاتفك"
              placeholderTextColor="#888"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              style={[
                styles.input,
                errors.phoneNumber ? styles.inputError : null,
              ]}
            />
            {errors.phoneNumber ? (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>كلمة المرور 🔐</Text>
            <TextInput
              placeholder="••••••••"
              placeholderTextColor="#888"
              secureTextEntry
              value={password}
              onChangeText={handlePasswordChange}
              style={[styles.input, errors.password ? styles.inputError : null]}
            />
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          <LinearGradient
            colors={['#5AB0FF', '#7560FF']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.loginBtn}>
            <TouchableOpacity
              style={styles.btnWrapper}
              onPress={handleLogin}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.loginText}>دخول 🚀</Text>
              )}
            </TouchableOpacity>
          </LinearGradient>

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
    height: RFValue(45),
    backgroundColor: '#F7F9FC',
    borderRadius: RFValue(12),
    paddingHorizontal: RFValue(12),
    fontSize: RFValue(12),
    textAlign: 'right',
    borderWidth: 1,
    borderColor: '#E3E6EB',
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

  inputError: {
    borderColor: '#FF4444',
    borderWidth: 1.5,
    backgroundColor: '#FFF5F5',
  },

  errorText: {
    fontSize: RFValue(11),
    color: '#FF4444',
    marginTop: RFValue(4),
    ...FONTS.body5,
  },
});
