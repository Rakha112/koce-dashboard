import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import BottomTabNavigation from './src/components/BottomTabNavigation';
import ToastComponent from './src/components/ToastComponent';
import ProdukPage from './src/screen/ProdukPage';
const App = () => {
  const Stack = createStackNavigator();
  return (
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
  );
};

export default App;
