import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MenuPage from '../screen/MenuPage';
import {StyleSheet, Text, View} from 'react-native';
import MaterialTopTabNavigation from '../components/MaterialTopTabNavigation';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import TambahLogo from '../assets/svg/TambahLogo.svg';
import axios from 'axios';
function BottomTabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Order"
        component={MaterialTopTabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuPage}
        options={{
          headerTitle: props => <Text {...props}>Kategori Menu</Text>,
          headerTitleStyle: {fontSize: 20},
          headerRight: props => (
            <TouchableWithoutFeedback
              onPress={() => {
                axios
                  .post('http://localhost:3001/kategori/tambah', {
                    kategori: 'Paket Nasi',
                  })
                  .then(res => {
                    console.log(res.data);
                  });
              }}>
              <TambahLogo {...props} width={30} height={30} fill={'black'} />
            </TouchableWithoutFeedback>
          ),
          headerRightContainerStyle: {paddingRight: 20},
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomTabNavigation;
