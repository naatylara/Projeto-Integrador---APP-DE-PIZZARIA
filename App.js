
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/Home';
import Cardapio from './src/screens/Cardapio';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Cardapio"
          component={Cardapio}
          options={{ title: 'Cardápio' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

