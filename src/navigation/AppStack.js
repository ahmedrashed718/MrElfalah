import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import AuthStack from './AuthStack';
import {CoursePlayer, Home} from '../screens/appScreens';
import ExamQuestion from '../screens/appScreens/ExamQuestions';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName="AuthStack">
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CoursePlayer" component={CoursePlayer} />
      <Stack.Screen name="ExamQuestion" component={ExamQuestion} />
    </Stack.Navigator>
  );
};

export default AppStack;
