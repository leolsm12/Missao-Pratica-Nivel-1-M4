import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { TextInputMask } from 'react-native-masked-text';



const DetalhesFornecedor = () => {
  const route = useRoute();
  const { fornecedor } = route.params;
  const [edicaoAtiva, setEdicaoAtiva] = useState(false);
  const [fornecedorEditado, setFornecedorEditado] = useState({ ...fornecedor });
  const navigation = useNavigation(); 
  const [image, setImage] = useState(null);


  const handleEditarFornecedor = async () => {
    try {
      const response = await fetch(`http://192.168.100.114:8084/fornecedores/${fornecedor.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fornecedorEditado),
      });

      if (response.ok) {
        Alert.alert('Fornecedor editado com sucesso!');
        setEdicaoAtiva(false);
        
      } else {
        throw new Error('Erro ao editar fornecedor');
      }
    } catch (error) {
      console.error('Erro ao editar fornecedor:', error);
      Alert.alert('Erro ao editar fornecedor. Tente novamente mais tarde.');
    }
    navigation.navigate('ListaFornecedores')
  };

  const handleNavigateTofoto = () => {
    // Navega para a tela de cadastro
    navigation.navigate('UploadPhotoPage');
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (result.cancelled === false) {
        // Resultado contém a URI da imagem escolhida
        setImage(result.assets[0].uri);
  
        // Adiciona a lógica para enviar a imagem para o backend
        handleUploadImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erro ao escolher a foto:', error);
      Alert.alert('Erro ao escolher a foto. Tente novamente mais tarde.');
    }
  };
  
  const handleUploadImage = async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: fornecedor.id,
      });
  
      const response = await fetch(`http://192.168.100.114:8084/upload`, {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: formData,
          });
      
          if (response.ok) {
            Alert.alert('Foto enviada com sucesso!');
          } else {
            throw new Error('Erro ao enviar a foto');
          }
        } catch (error) {
          console.error('Erro ao enviar a foto:', error);
          Alert.alert('Erro ao enviar a foto. Tente novamente mais tarde.');
        }
      };

      return (
        <View style={styles.container}>
          <Image source={{ uri: fornecedor.foto }} style={styles.foto} />
          <Button title="Escolha uma foto" onPress={pickImage} />
      
          {edicaoAtiva ? (
            <TextInput
              style={styles.input}
              value={fornecedorEditado.foto}
              onChangeText={(text) => setFornecedorEditado({ ...fornecedorEditado, foto: text })}
              placeholder="URL da Foto"
            />
          ) : null}
      
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Nome:</Text>
              {edicaoAtiva ? (
                <TextInput
                  style={styles.input}
                  value={fornecedorEditado.nome}
                  onChangeText={(text) => setFornecedorEditado({ ...fornecedorEditado, nome: text })}
                  placeholder="Nome"
                />
              ) : (
                <Text style={styles.text}>{fornecedor.nome}</Text>
              )}
            </View>
      
            <View style={styles.infoRow}>
              <Text style={styles.label}>Endereço:</Text>
              {edicaoAtiva ? (
                <TextInput
                  style={styles.input}
                  value={fornecedorEditado.endereco}
                  onChangeText={(text) => setFornecedorEditado({ ...fornecedorEditado, endereco: text })}
                  placeholder="Endereço"
                />
              ) : (
                <Text style={styles.text}>{fornecedor.endereco}</Text>
              )}
            </View>
      
            <View style={styles.infoRow}>
              <Text style={styles.label}>Contato:</Text>
              {edicaoAtiva ? (
                <TextInputMask
                  style={styles.input}
                  type={'cel-phone'}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) ',
                  }}
                  value={fornecedorEditado.contato}
                  onChangeText={(text) => setFornecedorEditado({ ...fornecedorEditado, contato: text })}
                  keyboardType="phone-pad"
                  placeholder="Contato"
                />
              ) : (
                <Text style={styles.text}>{fornecedor.contato}</Text>
              )}
            </View>
      
            <View style={styles.infoRow}>
              <Text style={styles.label}>Categoria:</Text>
              {edicaoAtiva ? (
                <TextInput
                  style={styles.input}
                  value={fornecedorEditado.categoria_prod}
                  onChangeText={(text) => setFornecedorEditado({ ...fornecedorEditado, categoria_prod: text })}
                  placeholder="Categorias"
                />
              ) : (
                <Text style={styles.text}>{fornecedor.categoria_prod}</Text>
              )}
            </View>
          </View>
      
          {edicaoAtiva ? (
            <Button title="Salvar Edições" onPress={handleEditarFornecedor} />
          ) : (
            <Button  title="Editar" onPress={() => setEdicaoAtiva(true)} />
          )}
        </View>
      );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  foto: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 16,
  },
  input: {
    minWidth: 250,
    height: 40,
    borderColor: 'grey',
    borderWidth: 0,
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    
  },
});

export default DetalhesFornecedor;