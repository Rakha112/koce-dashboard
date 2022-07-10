import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OrderSekarang from '../screen/OrderSekarang';
import OrderSelesai from '../screen/OrderSelesai';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
function MaterialTopTabNavigation() {
  const Tab = createMaterialTopTabNavigator();
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {paddingTop: insets.top, margin: 0},
        tabBarLabelStyle: {fontFamily: 'Inter-Regular', textTransform: 'none'},
        tabBarPressColor: 'white',
        tabBarIndicatorStyle: {backgroundColor: '#FFA901'},
        tabBarActiveTintColor: '#FFA901',
        tabBarInactiveTintColor: 'black',
      }}>
      <Tab.Screen name="Sekarang" component={OrderSekarang} />
      <Tab.Screen name="Selesai" component={OrderSelesai} />
    </Tab.Navigator>
  );
}

export default MaterialTopTabNavigation;
