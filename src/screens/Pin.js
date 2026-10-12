import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme';

// PIN fixo só para a Entrega 2. Na Entrega 4 virá do campo "pin" da tabela USUARIO (API).
const PIN_CORRETO = '1234';

const teclas = [
  ['1', ''], ['2', 'ABC'], ['3', 'DEF'],
  ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'],
  ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'],
  ['*', ''], ['0', '+'], ['#', ''],
];

export default function Pin({ navigation }) {
  const [pin, setPin] = useState('');
  const [erro, setErro] = useState(false);

  function digitar(valor) {
    if (valor === '*' || valor === '#') return;
    if (pin.length < 4) {
      setPin(pin + valor);
      setErro(false);
    }
  }

  function apagar() {
    if (pin.length === 0) {
      navigation.goBack(); // X sem nada digitado volta para o cardápio
      return;
    }
    setPin(pin.slice(0, -1));
  }

  function confirmar() {
    if (pin === PIN_CORRETO) {
      navigation.replace('Apoio');
    } else {
      setErro(true);
      setPin('');
    }
  }

  return (
    <SafeAreaView style={estilos.tela}>
      <View style={estilos.conteudo}>
        <Ionicons name="lock-closed" size={110} color={cores.vermelho} />
        <Text style={estilos.titulo}>ACESSO RESTRITO</Text>
        <Text style={estilos.subtitulo}>Digite o PIN para continuar</Text>

        <View style={estilos.bolinhas}>
          {[0, 1, 2, 3].map((i) => (
            <View
              key={i}
              style={[estilos.bolinha, i < pin.length && estilos.bolinhaCheia]}
            />
          ))}
        </View>
        <Text style={estilos.erro}>{erro ? 'PIN incorreto' : ' '}</Text>

        <View style={estilos.teclado}>
          {teclas.map(([numero, letras]) => (
            <TouchableOpacity
              key={numero}
              style={estilos.tecla}
              onPress={() => digitar(numero)}
            >
              <Text style={estilos.teclaNumero}>{numero}</Text>
              {letras !== '' && <Text style={estilos.teclaLetras}>{letras}</Text>}
            </TouchableOpacity>
          ))}
        </View>

        <View style={estilos.linhaAcoes}>
          <TouchableOpacity style={estilos.botaoVerde} onPress={confirmar}>
            <Ionicons name="call" size={28} color={cores.branco} />
          </TouchableOpacity>
          <TouchableOpacity style={estilos.botaoApagar} onPress={apagar}>
            <Ionicons name="close" size={20} color={cores.texto} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  titulo: { fontSize: 18, fontWeight: 'bold', marginTop: 12 },
  subtitulo: { fontSize: 14, color: cores.cinza, marginTop: 4 },
  bolinhas: { flexDirection: 'row', gap: 12, marginTop: 16 },
  bolinha: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: cores.vermelho,
  },
  bolinhaCheia: { backgroundColor: cores.vermelho },
  erro: { color: cores.vermelho, fontSize: 12, marginTop: 6, height: 16 },
  teclado: {
    width: 270,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  tecla: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: cores.cinzaClaro,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  teclaNumero: { fontSize: 28, color: cores.texto },
  teclaLetras: { fontSize: 9, color: cores.texto, letterSpacing: 1 },
  linhaAcoes: { flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 4 },
  botaoVerde: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: cores.verde,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoApagar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: cores.cinzaClaro,
    alignItems: 'center',
    justifyContent: 'center',
  },
});