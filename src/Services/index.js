import AsyncStorage from '@react-native-async-storage/async-storage';

const Auth = {
  /**
   * حفظ جلسة المستخدم في AsyncStorage
   */
  saveSession: async (userData, token) => {
    try {
      await AsyncStorage.multiSet([
        ['userData', JSON.stringify(userData)],
        ['token', token || ''],
        ['isLoggedIn', 'true'],
      ]);
      console.log('Session saved successfully');
    } catch (error) {
      console.error('Error saving session:', error);
    }
  },

  /**
   * تحميل جلسة المستخدم من AsyncStorage
   */
  loadSession: async () => {
    try {
      const [userDataStr, token, isLoggedIn] = await AsyncStorage.multiGet([
        'userData',
        'token',
        'isLoggedIn',
      ]);

      if (isLoggedIn[1] === 'true' && userDataStr[1]) {
        const userData = JSON.parse(userDataStr[1]);
        return {
          userData,
          token: token[1] || '',
          isLoggedIn: true,
        };
      }
      return null;
    } catch (error) {
      console.error('Error loading session:', error);
      return null;
    }
  },

  /**
   * تسجيل الخروج - تنظيف جميع بيانات المستخدم من AsyncStorage
   */
  logout: async () => {
    try {
      // حذف جميع مفاتيح المصادقة
      await AsyncStorage.multiRemove([
        'userToken',
        'userData',
        'authToken',
        'token',
        'isLoggedIn',
      ]);
      // يمكن إضافة المزيد من المفاتيح حسب الحاجة
    } catch (error) {
      console.error('Error during logout:', error);
    }
  },
};

export default Auth;
