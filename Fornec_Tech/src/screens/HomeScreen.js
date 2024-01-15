import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
  const handleNavigateToCadastro = () => {
    // Navega para a tela de cadastro
    navigation.navigate('Fornecedor');
  };
  const handleNavigateToDetalhes = () => {
    // Navega para a tela de cadastro
    navigation.navigate('ListaFornecedores');
  };

  // Teste de componentes 
  const handleNavigateToTeste = () => {
    // Navega para a tela de cadastro
    navigation.navigate('UploadPhotoPage');
  };


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo à tela inicial!</Text>
      <View style={styles.buttonContainer}>
        <Button title="Cadastrar Fornecedor" onPress={handleNavigateToCadastro} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Fornecedores" onPress={handleNavigateToDetalhes} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    padding: 16,
  },
  text: {
    fontSize: 24,
    color: '#fff', // Cor do texto
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 15,
    width: '70%', // Largura do container de botão
  },
  button: {
    backgroundColor: '#2ecc71', // Cor de fundo do botão
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#fff', // Cor do texto do botão
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Home;