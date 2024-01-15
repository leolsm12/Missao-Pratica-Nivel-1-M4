import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    // Lógica de autenticação aqui
    console.log('Login:', username);
    console.log('Senha:', password);
   // if (username === "admin" && password === "1234") {
        navigation.navigate('Home');
   // } else {
   //   setErrorMessage('Login ou senha incorretos');
   // }

  };

  const handleInputChange = () => {
    // Limpar a mensagem de erro quando o usuário começa a digitar novamente
    setErrorMessage('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.companyText}>FornecTech</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Login"
          value={username}
          onChangeText={setUsername}
          onFocus={handleInputChange}
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          onFocus={handleInputChange}
          placeholderTextColor="#fff"
        />
      </View>
      
      <Button title="Entrar" onPress={handleLogin} style={styles.button} />

      {errorMessage ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  companyText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 150,
    borderColor: '#fff',
    borderWidth: 0,
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingLeft: 12,
    borderRadius: 8,
    color: '#fff',
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    borderRadius: 50, // Ajuste para tornar o botão mais arredondado
  },
  errorMessage: {
    color: 'red',
  },
  errorContainer: {
    marginBottom: 15,
  },
});

export default LoginScreen;