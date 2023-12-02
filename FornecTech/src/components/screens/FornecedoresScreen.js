import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const CadastroFornecedor = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [contato, setContato] = useState('');
  const [categoria_prod, setCategorias] = useState('');

  const handleCadastro = async () => {
    try {
      const response = await fetch('http://192.168.100.114:8084/fornecedores/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          endereco,
          contato,
          categoria_prod,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar fornecedor');
      }

      // Se chegou até aqui, o fornecedor foi cadastrado com sucesso
      Alert.alert('Cadastro realizado com sucesso!');
      navigation.navigate('ListaFornecedores');
      setNome('');
      setEndereco('');
      setContato('');
      setCategorias('');
      
      // Navegar para outra tela, se necessário
    } catch (error) {
      console.error('Erro ao cadastrar fornecedor:', error);
      Alert.alert('Erro ao cadastrar fornecedor. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome:"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Endereço:"
        value={endereco}
        onChangeText={(text) => setEndereco(text)}
      />

      <TextInputMask
        style={styles.input}
        placeholder="Contato:"
        type={'cel-phone'}
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) ',
        }}
        value={contato}
        onChangeText={(text) => setContato(text)}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Categoria:"
        value={categoria_prod}
        onChangeText={(text) => setCategorias(text.trim())}
      />

      <Button title="Cadastrar" onPress={handleCadastro} />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  label: {
    fontSize: 18,
    marginBottom: 6,
    color: '#2c3e50', // Cor mais escura
    textTransform: 'uppercase', // Transforma o texto em maiúsculas
    letterSpacing: 0.5, // Ajusta o espaçamento entre as letras
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 0,
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 12,
    
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CadastroFornecedor;