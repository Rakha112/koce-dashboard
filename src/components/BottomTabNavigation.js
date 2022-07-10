/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import KategoriMenuPage from '../screen/KategoriMenuPage';
import MaterialTopTabNavigation from '../components/MaterialTopTabNavigation';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import NotaIcon from '../assets/svg/NotaIcon.svg';
import NotaIconAktif from '../assets/svg/NotaIconAktif.svg';
import MenuIcon from '../assets/svg/MenuIcon.svg';
import MenuIconAktif from '../assets/svg/MenuIconAktif.svg';
function BottomTabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FFA901',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Inter-Regular',
        },
        tabBarButton: props => (
          <View style={{flex: 1}}>
            <TouchableWithoutFeedback
              containerStyle={{flex: 1}}
              activeOpacity={0.95}
              {...props}
            />
          </View>
        ),
      }}>
      <Tab.Screen
        name="Order"
        component={MaterialTopTabNavigation}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <NotaIconAktif width={26} height={26} />
            ) : (
              <NotaIcon width={26} height={26} />
            ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={KategoriMenuPage}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <MenuIconAktif width={30} height={30} />
            ) : (
              <MenuIcon width={30} height={30} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomTabNavigation;
const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0,
    elevation: 0,
    paddingBottom: Platform.OS === 'android' ? 5 : 25,
    height: Platform.OS === 'android' ? 60 : 80,
  },
  hidden: {
    display: 'none',
    position: undefined,
  },
});
