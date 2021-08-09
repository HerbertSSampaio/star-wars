import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home';
import CharacterDetails from './pages/CharacterDetails';

const Stack = createNativeStackNavigator();

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#312e38" />
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: 'Lista de personagens'}}
      />
      <Stack.Screen
        name="CharacterDetails"
        component={CharacterDetails}
        options={{title: 'Detalhes do personagem'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
