// ============================================================
// Ponto de entrada do app "Pede Pizza Já".
//
// Aqui ficam o provedor do carrinho (CarrinhoProvider) e o navegador
// em pilha (Stack), que registra TODAS as telas do protótipo da
// Entrega 1: as da fachada (Início, Cardápio, Detalhes, Carrinho,
// Finalizar e Confirmado) e as da área de apoio camuflada (Pin,
// Apoio, Ligar180 e Ligar190).
//
// O nome dado em cada Stack.Screen ("Cardapio", "Pin"...) é o que as
// telas usam em navigation.navigate("...") para ir de uma para outra.
// ============================================================



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
import Ligar190 from './src/screens/Ligar190';


// Cria o navegador em pilha: cada tela aberta fica empilhada sobre a
// anterior, e o botão de voltar desempilha.
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // O CarrinhoProvider envolve o app inteiro para que qualquer tela
    // consiga ler e alterar o mesmo carrinho (ver context/CarrinhoContext.js).
    <CarrinhoProvider>
      <NavigationContainer>
        {/* headerShown: false esconde o cabeçalho padrão do Stack, porque as telas
        usam o componente Cabecalho, feito para combinar com o visual do app. */}
         <Stack.Navigator
          screenOptions={{ headerShown: false }}
        >
          {/* Fachada (app de pizzaria). A PRIMEIRA tela registrada é a tela inicial. */}
          <Stack.Screen name="Inicio" component={Home} />
          <Stack.Screen name="Cardapio" component={Cardapio} />
          <Stack.Screen name="Detalhes" component={Pizza} />
          <Stack.Screen name="Carrinho" component={Carrinho} />
          <Stack.Screen name="Finalizar" component={FinalizarPedido} />
          <Stack.Screen name="Confirmado" component={PedidoConfirmado} />
          {/* Área de apoio camuflada: só é alcançada pelo atalho oculto do Cardápio
          (toque longo na pizza especial), passando pelo PIN. */}
          <Stack.Screen name="Pin" component={Pin} />
          <Stack.Screen name="Apoio" component={AreaApoio} />
          <Stack.Screen name="Ligar180" component={Ligar180} />
          <Stack.Screen name="Ligar190" component={Ligar190} />
        </Stack.Navigator>
      </NavigationContainer>
    </CarrinhoProvider>
  );
}