import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  Courses,
  Exams,
  Home,
  Profile,
  QuestionBank,
} from '../screens/appScreens';
import {COLORS, icons, FONTS, SIZES} from '../constants';

const BottomTab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RFValue(5),
  },
  subscribeContainer: {
    position: 'absolute',
    top: -RFValue(38),
    width: RFValue(65),
    height: RFValue(65),
    borderRadius: RFValue(65 / 2),
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: RFValue(5),
    borderColor: COLORS.white,
  },
  iconStyle: {
    width: RFValue(25),
    height: RFValue(25),
    alignSelf: 'center',
  },
  labelStyle: {
    ...FONTS.body5,
    fontFamily: FONTS.fontFamilyMedium,
    fontSize: RFValue(9),
    color: COLORS.white,
    textAlign: 'center',
    marginTop: RFValue(2),
  },
  tabBarStyle: {
    height: RFValue(75),
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    paddingBottom: RFValue(5),
    paddingTop: SIZES.base,
    borderTopLeftRadius: RFValue(10),
    borderTopRightRadius: RFValue(10),
    position: 'absolute',
  },
});

// Gradient Background Component for Tab Bar
const TabBarBackground = () => {
  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.secondary]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderTopLeftRadius: RFValue(10),
        borderTopRightRadius: RFValue(10),
      }}
    />
  );
};

const TabIcon = ({focused, icon, icon2, label}) => {
  if (label === 'tab_subscribe') {
    return (
      <View style={styles.subscribeContainer}>
        <Image
          source={icons.book2}
          style={{width: RFValue(30), height: RFValue(30)}}
          resizeMode="contain"
          tintColor={'white'}
        />
      </View>
    );
  }

  return (
    <View style={styles.tabContainer}>
      <Image
        source={focused ? icon2 : icon}
        style={styles.iconStyle}
        tintColor={focused ? COLORS.white : COLORS.white}
        resizeMode="contain"
      />
    </View>
  );
};

export default function BottomTabs() {
  return (
    <BottomTab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.white,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => <TabBarBackground />,
        tabBarLabelStyle: styles.labelStyle,
      }}>
      {/* Home Tab 1 */}
      <BottomTab.Screen
        name={'Home'}
        component={Home}
        options={{
          tabBarLabel: 'الرئيسية',
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              icon={icons.home2}
              icon2={icons.home}
              label="المناهج"
            />
          ),
        }}
      />
      {/* Home Tab 2 */}
      <BottomTab.Screen
        name={'QuestionBank'}
        component={QuestionBank}
        options={{
          tabBarLabel: 'بنك الأسئلة',
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              icon={icons.learning2}
              icon2={icons.learning}
              label=""
            />
          ),
        }}
      />

      {/* Middle Subscribe Button */}
      <BottomTab.Screen
        name={'المناهج'}
        component={Courses}
        options={{
          tabBarLabel: 'المناهج',
          tabBarIcon: () => <TabIcon label="tab_subscribe" />,
        }}
      />

      {/* Home Tab 3 */}
      <BottomTab.Screen
        name={'بنك الاسئله'}
        component={Exams}
        options={{
          tabBarLabel: 'الامتحانات',
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              icon={icons.exam2}
              icon2={icons.exam}
              label=""
            />
          ),
        }}
      />

      {/* Home Tab 4 */}
      <BottomTab.Screen
        name={'الملف الشخصي'}
        component={Profile}
        options={{
          tabBarLabel: 'الملف الشخصي',
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              icon={icons.user}
              icon2={icons.user2}
              label=""
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
