import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EditProfile from '../Screens/EditProfileScreen';
import Home from '../Screens/HomeScreen';
import Chat from '../Screens/ChatScreen';
import Setting from '../Screens/SettingScreen';
import {useThemeColor} from '../Screens/ThemeProvider/redux/saga';
import {connect} from 'react-redux';
import AddScreen from '../Screens/AddScreen';
import AddUser from '../Screens/NewChat/AddUser';
import CreateGroup from '../Screens/ChatScreen/CreateGroup';
import GroupChat from '../Screens/ChatScreen/GroupChat';
import TermAndConditions from '../Screens/TermsandCond';

const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = ({theme}) => {
  const styles = getStyles(theme);
  const headerBackgroundColor = useThemeColor('headerColor');
  const activeTab = useThemeColor('activeTab');

  const tabConfig = [
    {
      name: 'home',
      component: Home,
      focusedIcon: (
        <View
          style={[styles.activeIconContainer, {backgroundColor: activeTab}]}>
          <AntDesign size={25} color={'white'} name={'home'} />
        </View>
      ),
      defaultIcon: (
        <View style={[styles.defaultIcon, {}]}>
          <AntDesign size={20} color={'white'} name={'home'} />
          <Text style={{color: 'white', fontSize: 10, marginTop: 2}}>Home</Text>
        </View>
      ),
    },
    {
      name: 'setting',
      component: Setting,
      focusedIcon: (
        <View
          style={[styles.activeIconContainer, {backgroundColor: activeTab}]}>
          <AntDesign size={25} color={'white'} name={'setting'} />
        </View>
      ),
      defaultIcon: (
        <View style={styles.defaultIcon}>
          <AntDesign size={20} color={'white'} name={'setting'} />
          <Text style={{color: 'white', fontSize: 10, marginTop: 2}}>
            Settings
          </Text>
        </View>
      ),
    },
  ];
  const TabBarIcon = ({route, focused}) => {
    const tab = tabConfig.find(tab => tab.name === route.name);
    return <>{focused ? tab.focusedIcon : tab.defaultIcon}</>;
  };

  const BottomNavigator = () => {
    return (
      <Tab.Navigator
        initialRouteName="home"
        screenOptions={({route}) => ({
          tabBarPressColor: 'none',
          tabBarInactiveTintColor: 'gray',
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            height: Platform.OS === 'ios' ? 80 : 70,
            backgroundColor: headerBackgroundColor,
            borderTopColor: 'white',
            borderTopWidth: 1,
          },
          tabBarIconStyle: {
            alignContent: 'center',
            width: 'auto',
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarButton: ['home', 'setting'].includes(route.name)
            ? undefined
            : () => {
                return null;
              },
          tabBarIcon: ({focused}) => (
            <TabBarIcon route={route} focused={focused} />
          ),
          tabBarIndicatorStyle: {display: 'none'},
        })}>
        {tabConfig.map(tab => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
          />
        ))}
      </Tab.Navigator>
    );
  };

  return (
    <AppStack.Navigator
      initialRouteName={'BottomBar'}
      screenOptions={{
        headerShown: false,
      }}>
      <AppStack.Screen name="BottomBar" component={BottomNavigator} />
      <AppStack.Screen name="Chat" component={Chat} />
      <AppStack.Screen name="EditProfile" component={EditProfile} />
      <AppStack.Screen name="AddUser" component={AddUser} />
      <AppStack.Screen name="AddScreen" component={AddScreen} />
      <AppStack.Screen name="CreateGroup" component={CreateGroup} />
      <AppStack.Screen name="GroupChat" component={GroupChat} />
      <AppStack.Screen name="Term&Cond" component={TermAndConditions} />

    </AppStack.Navigator>
  );
};

export const getStyles = theme =>
  StyleSheet.create({
    activeIconContainer: {
      width: 84,
      alignItems: 'center',
      height: 49,
      borderRadius: 24,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    defaultIcon: {
      width: 55,
      alignItems: 'center',
      height: 55,
      justifyContent: 'center',
    },
  });

const mapStateToProps = state => ({
  theme: state?.themes?.theme,
});

export default connect(mapStateToProps, null)(AppNavigator);
