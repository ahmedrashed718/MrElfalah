import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AppStack from './src/navigation/AppStack';
import {toastConfig} from './src/components/CustomToast';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
};
export default App;
