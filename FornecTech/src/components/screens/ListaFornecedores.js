import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Button, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react_native_simple_dropdown_select_list';

const ListaFornecedores = () => {
  const navigation = useNavigation();  
  const [fornecedores, setFornecedores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(''); // Estado para armazenar a categoria selecionada
  const [filtroNome, setFiltroNome] = useState('');
  const [showApp, setShowApp] = useState(false);
  const [showNames, setShowNames] = useState(false);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.100.114:8084/fornecedores');
        const data = await response.json();
        setFornecedores(data);
        console.log(data);
        // Extrair categorias únicas da lista de fornecedores
        const uniqueCategorias = Array.from(new Set(data.map((fornecedor) => fornecedor.categoria_prod)));
        const categoriasUnicasSet = new Set(uniqueCategorias);
        const categoriasUnicas = Array.from(categoriasUnicasSet);
        console.log('Categorias Únicas:', uniqueCategorias);
        setCategorias(['Todas as Categorias', ...categoriasUnicas]); // Adicionar uma opção vazia e as categorias únicas
        console.log('Categorias :', categorias);
      } catch (error) {
        console.error('Erro ao buscar dados da API', error);
      }
    };

    fetchData();
    console.log('Categorias :', categorias);
    
  }, []);

  const handleButton1Click = () => {
    // Lógica para o primeiro botão
    setShowApp(true);
    setShowNames(false);
  };

  const handleButton2Click = () => {
    // Lógica para o segundo botão
    setShowApp(false);
    setShowNames(true);
  };

  const handleFornecedorPress = (fornecedor) => {
    navigation.navigate('DetalhesFornecedor', { fornecedor });
  };

  const handleExcluirFornecedor = async (id) => {
    try {
      const response = await fetch(`http://192.168.100.114:8084/fornecedores/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setFornecedores(fornecedores.filter((fornecedor) => fornecedor.id !== id));
      } else {
        throw new Error('Erro ao excluir fornecedor');
      }
    } catch (error) {
      console.error('Erro ao excluir fornecedor:', error);
      Alert.alert('Erro ao excluir fornecedor. Tente novamente mais tarde.');
    }
  };

  const handleCategoriaChange = (value) => {
    setCategoriaSelecionada(value);
  };

  const categoriasFilter = categorias.map((categoria) => ({
    value: categoria.toLowerCase(), 
  }));

  const App = () => {
    return (
      <View style={styles.selectContainer}>
        <SelectList
          data={categoriasFilter}
          whatWithSelected={handleCategoriaChange}
          maxHeightList={150}
          placeholder={categoriaSelecionada || "Todas as Categorias"}
          notFoundText="Data not found"
          valueToBeSaved="value"
          containerStyle={styles.selectList}
        />
      </View>
    );
  };

  const App2 = () => {
    return (
      <TextInput
        style={styles.textInput}
        placeholder="Nome"
        value={filtroNome}
        onChangeText={setFiltroNome}
      />
    );
  };

  

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => handleFornecedorPress(item)}>
        <View style={styles.itemContent}>
          <Image source={{ uri: item.foto }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{item.nome}</Text>
            <Text style={styles.categoryText}>{item.categoria_prod}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Button title="Excluir" onPress={() => handleExcluirFornecedor(item.id)} />
    </View>
  );


 if (categoriaSelecionada === "Todas as categorias") {
    categoriaSelecionada = '';
 }

 return (
    <View style={styles.container}>
      
        <View style={styles.buttonContainer}>
          <Button title="filtrar por categora" onPress={handleButton1Click} />
          <View style={styles.buttonSpacer} />
          <Button title="filtrar por nome" onPress={handleButton2Click} />
        </View>
        {showApp && <App />}
        {showNames && <App2 />}
       
      <FlatList
        data={fornecedores.filter((fornecedor) =>
          (categoriaSelecionada === '' || fornecedor.categoria_prod.toLowerCase() === categoriaSelecionada.toLowerCase()) &&
          (filtroNome === '' || fornecedor.nome.toLowerCase().startsWith(filtroNome.toLowerCase()))
        )}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        
      />
    </View> 
 );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryText: {
    fontSize: 14,
    color: '#888',
  },
  selectContainer: {
    marginBottom: 10,
  },
  selectList: {
    width:'100%',
    backgroundColor: '#fff',
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttonSpacer: {
    width: 5,
  },
});

export default ListaFornecedores;