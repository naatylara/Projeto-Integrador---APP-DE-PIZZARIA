
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function Cardapio() {
  return (
    <ScrollView style={styles.container}>

      <Text style={styles.titulo}>
        Nosso Cardápio
      </Text>

      <Text style={styles.subtitulo}>
        Escolha sua pizza favorita
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#C62828',
    textAlign: 'center',
    marginTop: 30,
  },

  subtitulo: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 25,
  },
});

