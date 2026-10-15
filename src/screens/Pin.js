import React, { useState } from 'react';
import {  View,  Text,  TouchableOpacity,  ScrollView,  StyleSheet,} from 'react-native';
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
  const tamanho = 64;
  const margem = 6;

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
    setPin('');
    navigation.navigate('Apoio');
   }
  }

  return (
    <SafeAreaView style={estilos.tela}>
      <ScrollView
        contentContainerStyle={estilos.conteudo}
        showsVerticalScrollIndicator={false}
      >
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

        <View style={[estilos.teclado, { width: (tamanho + margem * 2) * 3 }]}>
          {teclas.map(([numero, letras]) => (
            <TouchableOpacity
              key={numero}
              style={[
                estilos.tecla,
                {
                  width: tamanho,
                  height: tamanho,
                  borderRadius: tamanho / 2,
                  margin: margem,
                },
              ]}
              onPress={() => digitar(numero)}
            >
              <Text style={estilos.teclaNumero}>{numero}</Text>
              {letras !== '' && <Text style={estilos.teclaLetras}>{letras}</Text>}
            </TouchableOpacity>
          ))}
        </View>

        <View style={estilos.linhaAcoes}>
          <TouchableOpacity style={estilos.botaoVerde} onPress={confirmar}>
            <Ionicons name="call" size={26} color={cores.branco} />
          </TouchableOpacity>
          <TouchableOpacity style={estilos.botaoApagar} onPress={apagar}>
            <Ionicons name="close" size={20} color={cores.texto} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  titulo: { fontSize: 18, fontWeight: 'bold' },
  subtitulo: { fontSize: 14, color: cores.cinza, marginTop: 4 },
  bolinhas: { flexDirection: 'row', gap: 12, marginTop: 14 },
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 6,
  },
  tecla: {
    backgroundColor: cores.cinzaClaro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teclaNumero: { fontSize: 26, color: cores.texto },
  teclaLetras: { fontSize: 9, color: cores.texto, letterSpacing: 1 },
  linhaAcoes: { flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 6 },
  botaoVerde: {
    width: 60,
    height: 60,
    borderRadius: 30,
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