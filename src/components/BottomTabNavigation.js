import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MenuPage from '../screen/MenuPage';
import MaterialTopTabNavigation from '../components/MaterialTopTabNavigation';
function BottomTabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Order" component={MaterialTopTabNavigation} />
      <Tab.Screen name="Menu" component={MenuPage} />
    </Tab.Navigator>
  );
}
export default BottomTabNavigation;
