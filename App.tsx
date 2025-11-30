import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider, useDispatch} from 'react-redux';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import AppStack from './src/navigation/AppStack';
import {toastConfig} from './src/components/CustomToast';
import store from './src/redux';
import Auth from './src/Services';
import {setUser, setToken, modifyIsLogin} from './src/redux/reducers/UserReducer';

// مكون داخلي للتحقق من الجلسة
const AppContent = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const session = await Auth.loadSession();
      if (session && session.isLoggedIn) {
        // استعادة الجلسة في Redux
        dispatch(setUser(session.userData));
        if (session.token) {
          dispatch(setToken(session.token));
        }
        dispatch(modifyIsLogin(true));
      }
    } catch (error) {
      console.error('Error checking session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#495ECD" />
      </View>
    );
  }

  return (
    <>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
