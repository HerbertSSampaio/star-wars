import React from 'react';
import {Provider} from 'react-redux';

import store from './store';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home';
import CharacterDetails from './pages/CharacterDetails';
import FavoriteCharacters from './pages/FavoriteCharacters';

const Stack = createNativeStackNavigator();

const App: React.FC = () => (
  <Provider store={store}>
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
        <Stack.Screen
          name="FavoriteCharacters"
          component={FavoriteCharacters}
          options={{title: 'Personagens Favoritos'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
