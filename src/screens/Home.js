//Tela de Inicio do aplicativo, onde o usuário pode ver o nome da pizzaria, uma breve descrição e um botão para acessar o cardápio.

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.logo}>🍕 PIZZARIA 10 🍕</Text>

      <Text style={styles.titulo}>
        A melhor pizza perto de você!
      </Text>

      <Text style={styles.subtitulo}>
        Escolha sua pizza favorita e faça seu pedido.
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Cardapio')}
      >
        <Text style={styles.textoBotao}>
          VER CARDÁPIO
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },

  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#C62828',
    marginBottom: 40,
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },

  subtitulo: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },

  botao: {
    backgroundColor: '#C62828',
    paddingVertical: 15,
    paddingHorizontal: 45,
    borderRadius: 10,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
