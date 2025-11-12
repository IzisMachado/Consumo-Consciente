import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importações diretas - verifique se os caminhos estão corretos
import LoadingScreen from './screens/LoadingScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import Onboarding from './screens/Onboarding';
import Result from './screens/Result';
import HistoryScreen from './screens/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Loading"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen 
          name="Loading" 
          component={LoadingScreen}
        />
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
        />
        <Stack.Screen 
          name="Onboarding" 
          component={Onboarding} 
        />
        <Stack.Screen 
          name="Result" 
          component={Result} 
        />
        <Stack.Screen 
          name="History" 
          component={HistoryScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}