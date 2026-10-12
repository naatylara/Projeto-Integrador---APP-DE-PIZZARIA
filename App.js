import React from 'react';    
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CarrinhoProvider } from './src/context/CarrinhoContext';

import Home from './src/screens/Home';
import Cardapio from './src/screens/Cardapio';
import Pizza from './src/screens/Pizza';
import Carrinho from './src/screens/Carrinho';
import FinalizarPedido from './src/screens/FinalizarPedido';
import PedidoConfirmado from './src/screens/PedidoConfirmado';
import Pin from './src/screens/Pin';
import AreaApoio from './src/screens/AreaApoio';
import Ligar180 from './src/screens/Ligar180';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CarrinhoProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Inicio"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Inicio" component={Home} />
          <Stack.Screen name="Cardapio" component={Cardapio} />
          <Stack.Screen name="Detalhes" component={Pizza} />
          <Stack.Screen name="Carrinho" component={Carrinho} />
          <Stack.Screen name="Finalizar" component={FinalizarPedido} />
          <Stack.Screen name="Confirmado" component={PedidoConfirmado} />
          <Stack.Screen name="Pin" component={Pin} />
          <Stack.Screen name="Apoio" component={AreaApoio} />
          <Stack.Screen name="Ligar180" component={Ligar180} />
        </Stack.Navigator>
      </NavigationContainer>
    </CarrinhoProvider>
  );
}