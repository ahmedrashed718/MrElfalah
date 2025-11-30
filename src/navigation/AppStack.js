import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import BottomTabs from './BottomTabs';
import AuthStack from './AuthStack';
import {
  CoursePlayer,
  Home,
  QuestionBank,
  QuestionStages,
  ExamResults,
  VidPlayer,
} from '../screens/appScreens';
import ExamQuestion from '../screens/appScreens/ExamQuestions';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  // التحقق من حالة المستخدم من Redux
  const isLoggedIn = useSelector(state => state.UserReducer.login);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName={isLoggedIn ? 'BottomTabs' : 'AuthStack'}>
      {/* جميع الـ screens موجودة دائماً */}
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CoursePlayer" component={CoursePlayer} />
      <Stack.Screen name="VidPlayer" component={VidPlayer} />
      <Stack.Screen name="ExamQuestion" component={ExamQuestion} />
      <Stack.Screen name="ExamResults" component={ExamResults} />
      <Stack.Screen name="QuestionBank" component={QuestionBank} />
      <Stack.Screen name="QuestionStages" component={QuestionStages} />
    </Stack.Navigator>
  );
};

export default AppStack;
