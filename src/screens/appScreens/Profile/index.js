import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import {COLORS, FONTS, icons} from '../../../constants';
import {
  modifyIsLogin,
  removeUser,
  setToken,
  setUser as setUserData,
} from '../../../redux/reducers/UserReducer';
import {fetchData} from '../../../Helpers/ApiHelper';
import Auth from '../../../Services';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [editMode, setEditMode] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const userData = useSelector(state => state.UserReducer.userData);

  const token = useSelector(state => state.UserReducer.token);

  const [user, setUser] = useState({
    name: userData?.student_name || 'اسم الطالب',
    phone: userData?.phone || userData?.student_email || '01000000000',
    email: userData?.student_email || 'mail@example.com',
  });

  const [temp, setTemp] = useState({
    name: user.name,
    phone: user.phone,
    password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    password: '',
  });

  const handleEditPress = () => {
    setTemp({
      name: user.name,
      phone: user.phone,
      password: '',
    });
    setErrors({
      name: '',
      phone: '',
      password: '',
    });
    setEditMode(true);
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      phone: '',
      password: '',
    };

    if (!temp.name || temp.name.trim() === '') {
      newErrors.name = 'الاسم مطلوب';
    }

    if (!temp.phone || temp.phone.trim() === '') {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!/^[0-9]+$/.test(temp.phone.trim())) {
      newErrors.phone = 'رقم الهاتف يجب أن يحتوي على أرقام فقط';
    } else if (temp.phone.trim().length < 10) {
      newErrors.phone = 'رقم الهاتف يجب أن يكون 10 أرقام على الأقل';
    }

    if (!temp.password || temp.password.trim() === '') {
      newErrors.password = 'كلمة المرور الجديدة مطلوبة';
    } else if (temp.password.length < 4) {
      newErrors.password = 'كلمة المرور يجب أن تكون 4 أحرف على الأقل';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.phone && !newErrors.password;
  };

  const save = async () => {
    if (!validateForm()) {
      return;
    }

    setSaveLoading(true);
    try {
      const response = await fetchData('POST', '/auth/profile-update.php', {
        student_id: userData?.student_id,
        student_name: temp.name.trim(),
        phone: temp.phone.trim(),
        pass: temp.password,
        token_value: token,
        mobile: true,
      });

      console.log('Profile Update Response:', response);

      if (response && response.status === 'success') {
        const updatedUserData = {
          ...userData,
          student_name: temp.name.trim(),
          phone: temp.phone.trim(),
        };

        dispatch(setUserData(updatedUserData));

        setUser({
          ...user,
          name: temp.name.trim(),
          phone: temp.phone.trim(),
        });
        setEditMode(false);
        setErrors({
          name: '',
          phone: '',
          password: '',
        });
        setTemp({
          name: temp.name.trim(),
          phone: temp.phone.trim(),
          password: '',
        });

        Toast.show({
          type: 'success',
          text1: 'تم الحفظ بنجاح',
          text2: response?.message || 'تم تحديث بياناتك بنجاح',
          position: 'top',
          visibilityTime: 2000,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'فشل التحديث',
          text2: response?.message || 'حدث خطأ أثناء تحديث البيانات',
          position: 'top',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      console.log('Profile Update Error:', error);
      Toast.show({
        type: 'error',
        text1: 'حدث خطأ',
        text2: 'فشل الاتصال بالخادم',
        position: 'top',
        visibilityTime: 3000,
      });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setErrors({
      name: '',
      phone: '',
      password: '',
    });
    setTemp({
      name: user.name,
      phone: user.phone,
      password: '',
    });
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      const response = await fetchData('POST', '/auth/student_logout.php', {
        student_id: userData?.student_id,
        token_value: token,
        mobile: true,
      });

      console.log('Logout Response:', response);

      if (response && response.status === 'success') {
        await Auth.logout();
        dispatch(modifyIsLogin(false));
        dispatch(removeUser());
        dispatch(setToken(''));

        Toast.show({
          type: 'success',
          text1: 'تم تسجيل الخروج بنجاح',
          text2: 'إلى اللقاء!',
          position: 'top',
          visibilityTime: 2000,
        });

        setTimeout(() => {
          const appStackNavigation = navigation.getParent();
          if (appStackNavigation) {
            appStackNavigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'AuthStack'}],
              }),
            );
          }
        }, 500);
      } else {
        await Auth.logout();
        dispatch(modifyIsLogin(false));
        dispatch(removeUser());
        dispatch(setToken(''));

        Toast.show({
          type: 'error',
          text1: 'فشل تسجيل الخروج من الخادم',
          text2: 'تم تسجيل الخروج محلياً',
          position: 'top',
          visibilityTime: 3000,
        });

        setTimeout(() => {
          const appStackNavigation = navigation.getParent();
          if (appStackNavigation) {
            appStackNavigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'AuthStack'}],
              }),
            );
          }
        }, 1000);
        setLogoutLoading(false);
      }
    } catch (error) {
      await Auth.logout();
      dispatch(modifyIsLogin(false));
      dispatch(removeUser());
      dispatch(setToken(''));

      Toast.show({
        type: 'error',
        text1: 'حدث خطأ',
        text2: 'تم تسجيل الخروج محلياً',
        position: 'top',
        visibilityTime: 3000,
      });

      setTimeout(() => {
        const appStackNavigation = navigation.getParent();
        if (appStackNavigation) {
          appStackNavigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'AuthStack'}],
            }),
          );
        }
      }, 1000);
      setLogoutLoading(false);
    }
  };

  const firstName = user.name.split(' ')[0];

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.header}>
        <Text style={styles.welcomeText}>مرحباً بعودتك،</Text>

        <Text style={styles.subText}>استمر في رحلتك التعليمية الرائعة! 🚀</Text>
      </LinearGradient>

      <LinearGradient
        colors={['#5C6BC0', '#3F51B5']}
        style={styles.avatarContainer}>
        <Text style={styles.avatarLetter}>{firstName}</Text>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollArea}>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>الاسم</Text>

            {!editMode ? (
              <Text style={styles.value}>{user.name}</Text>
            ) : (
              <>
                <TextInput
                  style={[styles.input, errors.name && styles.inputError]}
                  value={temp.name}
                  onChangeText={t => {
                    setTemp({...temp, name: t});
                    if (errors.name) {
                      setErrors({...errors, name: ''});
                    }
                  }}
                  placeholder="أدخل الاسم"
                />
                {errors.name ? (
                  <Text style={styles.errorText}>{errors.name}</Text>
                ) : null}
              </>
            )}
          </View>

          <View style={styles.separator} />

          <View style={styles.row}>
            <Text style={styles.label}>رقم الهاتف</Text>

            {!editMode ? (
              <Text style={styles.value}>{user.phone}</Text>
            ) : (
              <>
                <TextInput
                  style={[styles.input, errors.phone && styles.inputError]}
                  value={temp.phone}
                  onChangeText={t => {
                    setTemp({...temp, phone: t});
                    if (errors.phone) {
                      setErrors({...errors, phone: ''});
                    }
                  }}
                  keyboardType="phone-pad"
                  placeholder="أدخل رقم الهاتف"
                />
                {errors.phone ? (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                ) : null}
              </>
            )}
          </View>

          {editMode && (
            <>
              <View style={styles.separator} />
              <View style={styles.row}>
                <Text style={styles.label}>كلمة المرور الجديدة</Text>
                <TextInput
                  style={[styles.input, errors.password && styles.inputError]}
                  value={temp.password}
                  onChangeText={t => {
                    setTemp({...temp, password: t});
                    if (errors.password) {
                      setErrors({...errors, password: ''});
                    }
                  }}
                  placeholder="أدخل كلمة المرور الجديدة"
                  secureTextEntry={true}
                />
                {errors.password ? (
                  <Text style={styles.errorText}>{errors.password}</Text>
                ) : null}
              </View>
            </>
          )}
        </View>

        <View style={styles.buttonsRow}>
          {!editMode ? (
            <>
              <TouchableOpacity
                style={styles.halfBtn}
                onPress={handleEditPress}>
                <LinearGradient
                  colors={['#3F51B5', '#5C6BC0']}
                  style={styles.actionGradient}>
                  <View style={styles.btnInner}>
                    <Text style={styles.actionText}>تعديل</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.halfLogoutBtn}
                onPress={handleLogout}
                disabled={logoutLoading}>
                <View style={styles.btnInner}>
                  {logoutLoading ? (
                    <ActivityIndicator size="small" color="#D32F2F" />
                  ) : (
                    <>
                      <Text style={styles.logoutText}>تسجيل خروج</Text>
                      <Image source={icons.logout} style={styles.btnIconRed} />
                    </>
                  )}
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.halfBtn}
                onPress={save}
                disabled={saveLoading}>
                <LinearGradient
                  colors={['#00BFA5', '#00796B']}
                  style={styles.actionGradient}>
                  <View style={styles.btnInner}>
                    {saveLoading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={styles.actionText}>حفظ</Text>
                    )}
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.halfLogoutBtn}
                onPress={handleCancel}
                disabled={saveLoading}>
                <View style={styles.btnInner}>
                  <Text style={styles.logoutText}>إلغاء</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  header: {
    paddingVertical: RFValue(45),
    borderBottomLeftRadius: RFValue(45),
    borderBottomRightRadius: RFValue(45),
    alignItems: 'center',
  },

  welcomeText: {
    color: '#fff',
    fontSize: RFValue(14),
    ...FONTS.body2,
  },

  username: {
    fontSize: RFValue(22),
    marginTop: RFValue(5),
  },

  subText: {
    fontSize: RFValue(12),
    color: '#fff',
    opacity: 0.9,
    marginTop: RFValue(5),
    ...FONTS.body4,
  },

  avatarContainer: {
    alignSelf: 'center',
    paddingHorizontal: RFValue(22),
    height: RFValue(90),
    borderRadius: RFValue(50),
    marginTop: RFValue(-40),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    borderWidth: 3,
    borderColor: '#fff',
  },

  avatarLetter: {
    fontSize: RFValue(22),
    color: '#fff',
    ...FONTS.body2,
  },

  scrollArea: {
    paddingBottom: RFValue(80),
    paddingTop: RFValue(20),
  },

  card: {
    marginHorizontal: RFValue(20),
    backgroundColor: '#fff',
    padding: RFValue(20),
    paddingBottom: RFValue(10),
    borderRadius: RFValue(18),
    elevation: 3,
  },

  row: {
    marginBottom: RFValue(18),
  },

  label: {
    fontSize: RFValue(13),
    color: COLORS.gray,
    ...FONTS.body4,
  },

  value: {
    fontSize: RFValue(16),
    marginTop: RFValue(6),
    color: COLORS.black,
    ...FONTS.body4,
  },

  input: {
    marginTop: RFValue(6),
    backgroundColor: COLORS.lightGray4,
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(12),
    borderRadius: RFValue(10),
    fontSize: RFValue(16),
    ...FONTS.body4,
    textAlign: 'right',
    // direction: 'ltr',
  },

  inputError: {
    borderColor: '#D32F2F',
    borderWidth: 1,
  },

  errorText: {
    fontSize: RFValue(12),
    color: '#D32F2F',
    marginTop: RFValue(5),
    ...FONTS.body4,
  },

  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: RFValue(18),
  },

  buttonsRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginHorizontal: RFValue(20),
    marginTop: RFValue(20),
  },

  halfBtn: {
    flex: 1,
    marginLeft: RFValue(8),
  },

  halfLogoutBtn: {
    flex: 1,
    marginRight: RFValue(8),
    backgroundColor: '#FFCDD2',
    borderRadius: RFValue(12),
    paddingVertical: RFValue(12),
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionGradient: {
    borderRadius: RFValue(12),
    paddingVertical: RFValue(12),
    alignItems: 'center',
  },

  btnInner: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: RFValue(7),
  },

  actionText: {
    color: '#fff',
    fontSize: RFValue(14),
    ...FONTS.body4,
  },

  logoutText: {
    color: '#D32F2F',
    fontSize: RFValue(14),
    ...FONTS.body4,
  },

  btnIconWhite: {
    width: RFValue(18),
    height: RFValue(18),
    tintColor: '#fff',
  },

  btnIconRed: {
    width: RFValue(18),
    height: RFValue(18),
    tintColor: '#D32F2F',
  },
});
