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
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {COLORS, FONTS} from '../../../constants';
import {fetchData} from '../../../Helpers/ApiHelper';
const {height, width} = Dimensions.get('window');
export default function SignUpScreen() {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    phoneNumber: '',
    fullName: '',
    password: '',
    confirmPassword: '',
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

  const validateFullName = name => {
    if (!name.trim()) {
      return 'الاسم الكامل مطلوب';
    }

    if (name.trim().length < 3) {
      return 'الاسم يجب أن يكون 3 أحرف على الأقل';
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

  const validateConfirmPassword = (pass, confirmPass) => {
    if (!confirmPass.trim()) {
      return 'تأكيد كلمة المرور مطلوب';
    }

    if (pass !== confirmPass) {
      return 'كلمة المرور غير متطابقة';
    }

    return '';
  };

  const handlePhoneChange = text => {
    setPhoneNumber(text);
    if (errors.phoneNumber) {
      setErrors(prev => ({...prev, phoneNumber: ''}));
    }
  };

  const handleFullNameChange = text => {
    setFullName(text);
    if (errors.fullName) {
      setErrors(prev => ({...prev, fullName: ''}));
    }
  };

  const handlePasswordChange = text => {
    setPassword(text);
    if (errors.password) {
      setErrors(prev => ({...prev, password: ''}));
    }
    if (errors.confirmPassword && text === confirmPassword) {
      setErrors(prev => ({...prev, confirmPassword: ''}));
    }
  };

  const handleConfirmPasswordChange = text => {
    setConfirmPassword(text);
    if (errors.confirmPassword) {
      setErrors(prev => ({...prev, confirmPassword: ''}));
    }
  };

  const handleRegister = async () => {
    const phoneError = validatePhoneNumber(phoneNumber);
    const fullNameError = validateFullName(fullName);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(
      password,
      confirmPassword,
    );

    setErrors({
      phoneNumber: phoneError,
      fullName: fullNameError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    if (
      !phoneError &&
      !fullNameError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      setLoading(true);
      try {
        const cleanedPhone = phoneNumber
          .replace(/\s+/g, '')
          .replace(/[-+()]/g, '');

        const signupData = {
          phone: cleanedPhone,
          student_name: fullName.trim(),
          pass: password,
          university_id: '1',
          grade_id: '1',
          mobile: true,
        };

        console.log('Signup Data:', signupData);

        const response = await fetchData(
          'POST',
          '/auth/signup_2.php',
          signupData,
        );

        console.log('Signup Response:', response);

        if (response && response.status === 'success') {
          Toast.show({
            type: 'success',
            text1: 'تم التسجيل بنجاح!',
            text2: 'يمكنك الآن تسجيل الدخول',
            position: 'top',
            visibilityTime: 2000,
          });

          setTimeout(() => {
            navigation.navigate('Login');
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
            text1: 'فشل التسجيل',
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
            error.message || 'حدث خطأ أثناء التسجيل، يرجى المحاولة مرة أخرى',
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
          <Text style={styles.title}>تسجيل حساب جديد 📝</Text>
          <Text style={styles.subtitle}>أدخل بياناتك للمتابعة</Text>

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
            <Text style={styles.label}>الاسم الكامل 🧑‍🎓</Text>
            <TextInput
              placeholder="اكتب اسمك كاملاً"
              placeholderTextColor="#888"
              value={fullName}
              onChangeText={handleFullNameChange}
              style={[styles.input, errors.fullName ? styles.inputError : null]}
            />
            {errors.fullName ? (
              <Text style={styles.errorText}>{errors.fullName}</Text>
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

          <View style={styles.inputContainer}>
            <Text style={styles.label}>تأكيد كلمة المرور 🔒</Text>
            <TextInput
              placeholder="••••••••"
              placeholderTextColor="#888"
              secureTextEntry
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              style={[
                styles.input,
                errors.confirmPassword ? styles.inputError : null,
              ]}
            />
            {errors.confirmPassword ? (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            ) : null}
          </View>

          <LinearGradient
            colors={['#31D87F', '#00B76B']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.registerBtn}>
            <TouchableOpacity
              style={styles.btnWrapper}
              onPress={handleRegister}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.registerText}>تسجيل حساب 🎉</Text>
              )}
            </TouchableOpacity>
          </LinearGradient>

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
    height: RFValue(45),
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
