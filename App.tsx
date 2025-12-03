import React, {useEffect, useState, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider, useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';
import AppStack from './src/navigation/AppStack';
import {toastConfig} from './src/components/CustomToast';
import store from './src/redux';
import Auth from './src/Services';
import {
  setUser,
  setToken,
  modifyIsLogin,
} from './src/redux/reducers/UserReducer';
import SplashScreen from './src/screens/SplashScreen';

const AppContent = () => {
  const dispatch = useDispatch();
  const [isSessionChecked, setIsSessionChecked] = useState(false);
  const [isSplashComplete, setIsSplashComplete] = useState(false);

  const checkSession = useCallback(async () => {
    try {
      const session = await Auth.loadSession();
      if (session && session.isLoggedIn) {
        dispatch(setUser(session.userData));
        if (session.token) {
          dispatch(setToken(session.token));
        }
        dispatch(modifyIsLogin(true));
      }
    } catch (error) {
      console.error('Error checking session:', error);
    } finally {
      setIsSessionChecked(true);
    }
  }, [dispatch]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const handleSplashComplete = () => {
    setIsSplashComplete(true);
  };

  // Show splash until BOTH animation is complete AND session is checked
  if (!isSplashComplete || !isSessionChecked) {
    return <SplashScreen onAnimationComplete={handleSplashComplete} />;
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

export default App;
