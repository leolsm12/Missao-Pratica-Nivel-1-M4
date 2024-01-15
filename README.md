# Documentação do Projeto FORNEC_TECH

## Descrição Geral

Este projeto React Native consiste em uma aplicação de gerenciamento de fornecedores, onde os usuários podem cadastrar, visualizar, editar e excluir informações sobre fornecedores. A aplicação possui múltiplas telas, incluindo tela inicial, tela de login, tela de listagem de fornecedores, tela de detalhes do fornecedor e tela de cadastro de fornecedor.

## Estrutura do Projeto

O projeto está organizado com a seguinte estrutura de diretórios:

- `src` : Contém o código-fonte da aplicação.
  - `appNavigator` :  Diretório contendo a navegação entre as telas.
  - `screens` : Diretório contendo as telas da aplicação.
    - `FornecedoresScreen`: Tela de cadastro de fornecedor.
    - `DetalhesFornecedorScreen`: Tela de detalhes do fornecedor.
    - `HomeScreen`: Tela inicial da aplicação.
    - `ListaFornecedores`: Tela de listagem de fornecedores.
    - `LoginScreen`: Tela de login da aplicação.

## Componente `FornecedorScreen`
### Descrição
Este componente representa a tela de cadastro de fornecedor. Permite ao usuário inserir informações como nome, endereço, contato e categoria do fornecedor. Ao pressionar o botão "Cadastrar", os dados são enviados para o backend.

### Estados
- `nome` :  Armazena o valor do campo de nome.
- `endereco` : Armazena o valor do campo de endereço.
- `contato` : Armazena o valor do campo de contato.
- `categoria` : Armazena o valor do campo de categoria do produto.

### Métodos
- `handleCadastro()` : Realiza o cadastro do fornecedor ao enviar os dados para o backend.

### Estrutuda do Componente 
- Campos de entrada de texto para inserção de nome, endereço, contato e categoria do produto.
- Um botão "Cadastrar" que, quando pressionado, chama o método `handleCadastro`.

## Componente `DetalhesFornecedorScreen`
### Descrição
Este componente representa a tela de detalhes do fornecedor. Permite ao usuário visualizar e editar informações do fornecedor, incluindo uma imagem. Também permite a escolha e upload de uma nova foto.

### Métodos 
- `handleEditarFornecedor` :  Realiza a edição do fornecedor ao enviar os dados para o backend.
- `pickImageAsync` : Permite ao usuário escolher uma imagem da galeria.
- `handleUploadImage` : Realiza o upload da imagem para o backend.

### Estrutura do Componente
- Uma imagem do fornecedor.
- Um botão "Escolha uma foto" que permite escolher uma nova imagem da galeria.
- Campos de entrada de texto para editar nome, endereço, contato e categoria do produto.
- Um botão "Editar" que ativa o modo de edição.
- Um botão "Salvar Edições" que, quando pressionado, chama o método `handleEditarFornecedor`.

## Componente `HomeScreen`
### Descrição
Este componente representa a tela inicial da aplicação. Apresenta um botão para cadastrar fornecedores e outro para visualizar a lista de fornecedores.

### Métodos
- `handleNavigateToCadastro()` : Navega para a tela de cadastro de fornecedor.
- `handleNavigateToDetalhes()` : Navega para a tela de listagem de fornecedores.

### Estrutura do Componente
- Um texto de boas-vindas.
- Um botão "Cadastrar Fornecedor" que, quando pressionado, chama o método `handleNavigateToCadastro`.
- Um botão "Fornecedores" que, quando pressionado, chama o método `handleNavigateToDetalhes`.

## Componente `ListaFornecedores`
### Descrição
Este componente representa a tela de listagem de fornecedores. Permite ao usuário filtrar a lista por categoria e nome, além de visualizar detalhes e excluir fornecedores.

### Estados
- `fornecedores` : Armazena a lista de fornecedores.
- `fcategorias` : Armazena a lista de categorias únicas.
- `categoriaSelecionada` : Armazena a categoria selecionada no filtro.
- `filtroNome` : Armazena o nome utilizado no filtro.
- `showApp` e `showNames` : Controlam a exibição condicional de componentes.

### Métodos 
- `handleButton1Click()` e `handleButton2Click()` : Controlam a exibição condicional de componentes.
- `handleFornecedorPress(fornecedor)` : Navega para a tela de detalhes do fornecedor.
- `handleExcluirFornecedor(id)` : Exclui um fornecedor ao enviar a requisição para o backend.
- `handleCategoriaChange(value)` : Atualiza o estado da categoria selecionada no filtro.

### Estrutura do Componente
- Botões para filtrar a lista por categoria ou nome.
- Componentes condicionais `App` e `App2` exibidos com base nos botões pressionados.
- Um componente `SelectList` para seleção da categoria.
- Um campo de entrada de texto para filtrar por nome.
- Uma lista de fornecedores renderizada usando `FlatList`.

## Componente `LoginScreen`
### Descrição
Este componente representa a tela de login da aplicação. Permite ao usuário inserir seu login e senha para autenticação.

### Estados
- `username` : Armazena o valor do campo de login.
- `password` : Armazena o valor do campo de senha.
- `errorMessage` : Armazena a mensagem de erro exibida em caso de falha no login.

### Métodos
- `handleLogin()` : Realiza a lógica de autenticação e navega para a tela "Home".
- `handleInputChange()` : Limpa a mensagem de erro quando o usuário começa a digitar novamente.

### Estrutura do Componente
- Um título "FornecTech".
- Campos de entrada de texto para inserção de login e senha.
- Um botão "Entrar" que, quando pressionado, chama o método `handleLogin`.
- Uma mensagem de erro exibida condicionalmente.

## Estilo 
Os componentes utilizam estilos para proporcionar uma experiência visual agradável com um esquema de cores escura.


