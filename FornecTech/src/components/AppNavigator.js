// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './screens/HomeScreen';
import FornecedoresScreen from './screens/FornecedoresScreen';
import DetalhesFornecedorScreen from './screens/DetalhesFornecedorScreen';
import LoginScreen from './LoginScreen';
import ListaFornecedores from './screens/ListaFornecedores';
import UploadPhotoPage from './screens/testeFoto';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
<NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3498db', // Cor do cabeçalho
          },
          headerTintColor: '#fff', // Cor do texto do cabeçalho
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="Fornecedor"
          component={FornecedoresScreen}
          options={{ title: 'Fornecedores' }}
        />
        <Stack.Screen
          name="DetalhesFornecedor"
          component={DetalhesFornecedorScreen}
          options={{ title: 'Detalhes do Fornecedor' }}
        />
        <Stack.Screen
          name="ListaFornecedores"
          component={ListaFornecedores}
          options={{ title: 'Lista de Fornecedores' }}
        />
        <Stack.Screen
          name="UploadPhotoPage"
          component={UploadPhotoPage}
          options={{ title: 'Upload de Foto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;