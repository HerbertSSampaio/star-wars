import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Home from './pages/Home';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#312e38" />
    <Home />
  </NavigationContainer>
);

export default App;
