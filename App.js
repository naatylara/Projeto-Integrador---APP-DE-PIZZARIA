// ============================================================
// PEDE PIZZA JÁ
// Arquivo principal de configuração do aplicativo.
//
// Responsável por configurar a navegação entre as telas,
// gerenciar o contexto compartilhado do carrinho e integrar
// a interface da pizzaria à área de apoio.
//
// O aplicativo possui duas áreas principais:
// - Pizzaria: cardápio, pedidos, carrinho e finalização.
// - Área de Apoio: acesso protegido por PIN, canais de ajuda,
//   rede de contatos e envio de alertas SOS.
//
// As rotas registradas no Stack.Navigator permitem a
// navegação entre as diferentes funcionalidades do sistema.
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
import RedeContatos from './src/screens/RedeContatos';  


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
          {/* Navegação principal da pizzaria. */}
          <Stack.Screen name="Inicio" component={Home} />
          <Stack.Screen name="Cardapio" component={Cardapio} />
          <Stack.Screen name="Detalhes" component={Pizza} />
          <Stack.Screen name="Carrinho" component={Carrinho} />
          <Stack.Screen name="Finalizar" component={FinalizarPedido} />
          <Stack.Screen name="Confirmado" component={PedidoConfirmado} />
          {/* Área de apoio com acesso protegido por PIN. */}
          <Stack.Screen name="Pin" component={Pin} />
          <Stack.Screen name="Apoio" component={AreaApoio} />
          <Stack.Screen name="Ligar180" component={Ligar180} />
          <Stack.Screen name="Ligar190" component={Ligar190} />
          <Stack.Screen name="RedeApoio" component={RedeContatos} />  
        </Stack.Navigator>
      </NavigationContainer>
    </CarrinhoProvider>
  );
}