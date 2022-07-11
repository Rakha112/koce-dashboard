import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import BottomTabNavigation from './src/components/BottomTabNavigation';
import ToastComponent from './src/components/ToastComponent';
import ProdukPage from './src/screen/ProdukPage';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
const App = () => {
  const Stack = createStackNavigator();

  const initailState = {
    loading: true,
  };

  const rootReducer = (state = initailState, action) => {
    switch (action.type) {
      case 'LOADING':
        return {
          ...state,
          loading: action.payload,
        };
      default:
        return state;
    }
  };

  const store = configureStore({reducer: rootReducer});
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle="dark-content"
        />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}>
            <Stack.Screen name="Home" component={BottomTabNavigation} />
            <Stack.Screen name="Produk" component={ProdukPage} />
          </Stack.Navigator>
        </NavigationContainer>
        <ToastComponent />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
