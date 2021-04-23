# Construindo uma REST CRUD API com NodeJS, Express e MongoDB usando MVC

**Empresas no mundo todo usam APIs para trocarem dados entre sistemas, dentro de um mesmo padrão. Segundo este artigo do blog da [mooble](https://www.moblee.com.br/blog/motivos-para-ter-sua-propria-api/), o qual recomendo lerem, "através de uma API é possível fazer com que vários sistemas modifiquem e consumam uma mesma base de informações de maneira padronizada, respeitando regras de negócio únicas". Portanto irei mostrar de uma forma simples, como construir uma API própria para fazer comunicação com sua aplicação seja no frontend ou mobile, usando umas das stacks mais requisitadas do mercado para backend developers. Com uma API como essa, temos a utilidade de usá-la em vários projetos ao mesmo tempo, o que torna muito valiosa sua produção.**  

* [Pré-requisitos](#pré-requisitos)
	* [Instalando o NodeJS no Windows](#instalando-o-nodejs-no-windows)
        * [Via Setup](#via-setup)
        * [Via Chocolatey](#via-chocolatey)
    * [Instalando o Yarn no Windows](#instalando-o-yarn-no-windows)
* [Projeto backend-node](#projeto-backend-node)
    * [Colocando o projeto em execução local](#colocando-o-projeto-em-execução-local)
        * [Criando o projeto](#criando-o-projeto)
        * [Adicionando dependências com Yarn](#adicionando-dependências-com-yarn)
        * [Criando o server e colocando o projeto para rodar](#criando-o-server-e-colocando-o-projeto-para-rodar)
    * [Conectando o projeto a uma base de dados MongoDB](#conectando-o-projeto-a-uma-base-de-dados-mongodb)
        * [Criando conta no mongoDB Atlas](#criando-conta-no-mongodb-atlas)
        * [Criando Cluster](#criando-cluster)
        * [Criando usuário](#criando-usuário)
        * [Criando permissão de ip](#criando-permissão-de-ip)
        * [Conectando cluster na aplicação](#conectando-cluster-na-aplicação)
    * [Criando model de usuário](#criando-model-de-usuário)
    * [Criando controller de usuário](#criando-controller-de-usuário) 
        * [Criando função store para inserir novo usuário](#criando-função-store-para-inserir-novo-usuário)
        * [Criando função show para listar todos usuários](#criando-função-show-para-listar-todos-usuários)
        * [Criando função update para atualizar dados de um usuário](#criando-função-update-para-atualizar-dados-de-um-usuário)
        * [Criando função delete para remover um usuário](#criando-função-delete-para-remover-um-usuário)
    * [Criando o arquivo de rotas](#criando-o-arquivo-de-rotas)
        * [Criando rotas e métodos para as funções do controller](#criando-rotas-e-métodos-para-as-funções-do-controller)
        * [Exportando routes para o server.js](#exportando-routes-para-o-server.js)

# Pré-requisitos

**Primeiro, instale na máquina, como pré-requesitos, o NodeJS e em seguida o Yarn para o gerenciamento de pacotes do Node. Daí surge a questão: porque não usar NPM em vez desse Yarn? Simples! Segundo este artigo do blog da [lambda3](https://www.lambda3.com.br/2016/10/yarn-primeiras-impressoes/?doing_wp_cron=1570393730.9670929908752441406250), a ideia do Yarn é melhorar o tempo de download dos pacotes, pois o NPM é conhecido por ser lento nas restaurações das dependências e inclusive sendo possível resolver dependências sem o uso da internet usando o cache local.**

* ## Instalando o NodeJS no Windows

### Via Setup

**Baixe o setup de instalação do node:**

[https://nodejs.org/dist/v10.16.3/node-v10.16.3-x64.msi](https://nodejs.org/dist/v10.16.3/node-v10.16.3-x64.msi) 

**Instale e em seguida teste o comando `node -v` no cmd para ter certeza que o node foi instalado corretamente:**

```bash
C:\Users\dev> node -v
v10.16.3
```

### Via Chocolatey

**Execute o cmd como Administrador e rode o script a seguir:**

```bash
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

**Teste o comando `choco --v` no cmd para ter certeza que o Chocolatey foi instalado corretamente:**

```bash
C:\Users\dev> choco --v
Chocolatey v0.10.15
```

**Ainda no cmd, rode o comando `choco install nodejs.install` para instalar o node:**

```bash
C:\Users\dev> choco install nodejs.install
```

* ## Instalando o Yarn no Windows

**Baixe o setup de instalação do Yarn:**

[https://yarnpkg.com/latest.msi](https://yarnpkg.com/latest.msi) 

**Instale e em seguida teste o comando `yarn -v` no cmd para ter certeza que o Yarn foi instalado corretamente:**

```bash
C:\Users\dev> yarn -v
1.19.0
```

# Projeto backend-node

**Pegue logo seu café que vamos colocar a mão na massa e criar esse backend pra rodar nossos projetos com mais produtividade do que nunca!**

* ## Colocando o projeto em execução local

**O intuito aqui é construir a base do projeto e rodá-lo em seu localhost como se estivesse usando um xampp ou wamp server da vida.**

### Criando o projeto

**Crie um diretório para a API em seu computador. (Estou criando em "C:/Users/dev/Desktop/projetosJS/")**

**Acesse o diretório do projeto pelo cmd e inicialize o yarn com o comando `yarn init -y`. Ele vai criar nosso package.json, onde vamos adicionar as dependências. (Não feche o cmd ainda)**

```bash
C:\Users\dev\Desktop\projetosJS\backend-node> yarn init -y
```

**Abra o projeto com algum editor ou IDE de sua preferência. (Estou usando o VSCode por ser uma IDE bem completa, rápida e ainda possuir um terminal integrado)**

### Adicionando dependências com Yarn

<!-- yarn add express && yarn add nodemon -D && yarn add mongosse -->
**Com o cmd no diretório, rode o comando abaixo para que o Yarn adicione as dependências necessárias no projeto.**

```bash
C:\Users\dev> yarn add express && yarn add nodemon -D && yarn add mongoose
```

<!-- add "scripts": { "dev": "nodemon src/server.js" } -->
**Vá até package.json e cole o script abaixo, antes de "dependencies". Isso vai fazer com que quando "dev" for chamado, o nodemon encontre o arquivo server.js e o coloque em execução.**

```js
"scripts": {
    "dev": "nodemon src/server.js"
},
```

**Seu package.json deve ficar dessa forma, com algumas diferenças no meu caso, como "repository", "author" e versões das dependências:**

```js
{
  "name": "backend-node",
  "version": "1.0.0",
  "main": "index.js",
  "repository": "git@github.com:maxsuelfernandob/REST-API-com-NodeJS-Express-e-MongoDB.git",
  "author": "Maxsuel Fernando <maxsuel.dev@gmail.com>",
  "license": "MIT",
  "scripts": {
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^5.7.3"
  },
  "devDependencies": {
    "nodemon": "^1.19.3"
  }
}
```

### Criando o server e colocando o projeto para rodar

**Crie uma pasta chamada `src` na raiz do projeto e dentro dela, um arquivo js com o nome `server.js`.**

**Em server.js, devemos importar o express e o mongoose e criar uma constante da aplicação que receba o express como uma função.**

```js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
```

**Daí invocamos o método use(express.json()) e o método "listen" na nossa constante "app", passando o valor 3333 como parâmetro, para criar um servidor e vinculá-lo à porta 3333.**

```js
app.use(express.json());

app.listen(3333);
```

**No cmd, rode o comando `yarn dev` para chamar o script que foi criado no package.json. Agora temos um servidor local rodando na porta 3333. (localhost:3333)**

```bash
C:\Users\dev\Desktop\projetosJS\backend-node> yarn dev
```

* ## Conectando o projeto a uma base de dados MongoDB

**Agora, vamos conectar nossa aplicação a uma base de dados MongoDB, dentro de um Cluster na Web.**

### Criando conta no mongoDB Atlas 

**Primeiramente você deve ter uma conta no MongoDB Atlas. Para isso, acesse o link abaixo e realize o cadastro.**

[https://www.mongodb.com/cloud/atlas#atlas-form-container](https://www.mongodb.com/cloud/atlas#atlas-form-container)

### Criando Cluster

**Faça o login no MongoDB Atlas. Agora vamos criar um Cluster, clicando em `Build a New Cluster`.**

**Aqui não alteramos nada, apenas o campo `Cluster Name` com o nome do seu cluster.**

### Criando usuário 

**Vá em `Database Access` e clique em `ADD NEW USER`.**

**Aqui também não tem muito o que fazer. Só deixar tudo como está, criando seu username e password e clicar em `Add User`.**

### Criando permissão de ip

**Em `Network Access`, clicamos em `ADD IP ADDRESS` e em `ALLOW ACCESS FROM ANYWHERE` para liberar acesso para qualquer ip e em `Confirm` para confirmar.**

### Conectando cluster na aplicação 

**Voltamos para a aba `Clusters` e clicamos em `CONNECT` para conectar o cluster criado, na aplicação.**

**Clique em `Connect Your Application` e copie o link gerado, pois iremos usá-lo a seguir.**

**Dentro da aplicação, em server.js, vamos importar a biblioteca mongoose, logo abaixo da importação do express.**

```js
const mongoose = require('mongoose');
```

**Logo abaixo podemos usar o método connect do mongoose para fazer a conexão com o banco. Como primeiro parâmetro, usamos o link gerado anteriormente. Vamos passar ainda como segundo parâmetro, um objeto com `useNewUrlParser` e `useUnifiedTopology` ambos como `true`.**

```js
mongoose.connect('mongodb+srv://<username>:<password>@maxsueldb-jk0sk.mongodb.net/admin?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
```

**Altere `username` e `password` pelos nomes de usuário e senha que você acabou de criar e troque `admin` pelo nome da base de dados. Pronto, já estamos com o projeto conectado com o mongoDB! Até o momento, seu arquivo server.js deve ficar dessa forma:**

```js
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://"usuarioMongoDB":<"senhaMongoDB">@"nomeCluster"-jk0sk.mongodb.net/"nomeDB"?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

app.listen(3333);
```

* ## Criando model de usuário

**Vamos criar nosso model de usuário com as definições dos dados a serem usados.**

**Crie um diretório chamado `models` dentro de src. Dentro de models, crie o arquivo `User.js`.**

**Em User.js, vamos importar o mongoose.**

```js
const mongoose = require('mongoose');
```

**Agora criamos o Schema para o usuário, criando um objeto de `mongoose.Schema` e definimos os atributos do usuário.**

```js
const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});
```

**Exporte UserSchema com o método `mongoose.model`, passando um parâmetro referenciando o model e outro passando o Schema criado.**

```js
module.exports = mongoose.model('User', UserSchema);
```

* ## Criando controller de usuário 

**Vamos criar nosso controller de usuário com suas funções de cadastrar, listar, atualizar e remover.**

**Crie uma pasta dentro de src chamada `controller` e dentro dela um arquivo `UserController.js`.**

**Em UserController, importe o model de User:**

```js
const User = require('../models/User.js');
```

**E deixe um module.exports pronto para receber as funções:**

```js
module.exports = {

}
```

### Criando função store para inserir novo usuário

**Vamos criar nosso primeiro usuário na aplicação. Essa função ficará responsável por inserir um novo usuário em nossa base de dados, a partir de uma requisição. Crie a função a seguir, dentro de module.exports:**

```js
async store(req, res) {  //Create a User
    const { name, email } = req.body;
        
    let user = await User.findOne({ email });
        
    if(!user) {
        user = await User.create({ name, email });
    }

    return res.json({ user });
},
```

**Temos aqui uma função assíncrona com dois parâmetros, um que vem da requisição e outro para ser passado como uma resposta (`req e res`). Pegamos os valores `name` e `email` através do corpo da requisição e vemos se o usuário já existe no banco, verificando o campo email. Com o método `create`, fazemos a inserção e retornamos um valor json com os dados do usuário.**

### Criando função show para listar todos usuários

**Depois de criar nosso usuário, vamos fazer uma função que mostre uma listagem de usuários cadastrados.**

```js
async show(req, res) {  //Return all Users
    const users = await User.find({});

    return res.json(users);
},
```

**Essa já é uma função mais simples, onde o método `find()` busca todos os usuários no model de User e depois são retornados como uma resposta.**

### Criando função update para atualizar dados de um usuário

**Com essa função, pegamos o id do usuário em que queremos alterar seus dados, como parâmetro e seus dados dentro do corpo da requisição.**

```js
async update(req, res) {  //Update a User
    const { name, email } = req.body;
    const { user_id } = req.params;
    const user = await User.findByIdAndUpdate(user_id, { name, email });

    return res.json(user);
},
```

**Primeiro, pegamos os campos name e email que são dados do usuário a serem alterados, dentro do corpo da requisição com `req.body`. Em seguida, criamos a constante `user_id` que iremos usá-la em nossa rota daqui a pouco e informamos que ela vem como parâmetro da requisição com `req.params`. Por ultimo, usamos o método `findByIdAndUpdate()` para que o model encontre esse usuário pelo id passado e o altere.**

### Criando função delete para remover um usuário

**Chegamos na última função da nossa API onde iremos remover um usuário do banco de dados e retornar os dados desse usuário deletado.**

```js
async delete(req, res) { // Delete a User
    const { user_id } = req.params;
    const user = await User.findByIdAndDelete(user_id);
        
    return res.json(user);
}
```

**Com mais uma função assíncrona, mais uma vez pegamos o id do usuário a ser removido com req.params, onde vai ser passado em sua rota e usamos o método `findByIdAndDelete()` para encontrá-lo e removê-lo.**

* ## Criando o arquivo de rotas

**Crie um arquivo `routes.js` em src para passarmos os métodos GET, POST, PUT e DELETE e direcionarmos nossos métodos através do endereçamento de rotas.**

**Importe o express e atribua `express.Router()` a uma constante chamada `routes`.**

```js
const express = require('express');
const routes = express.Router();
```

**Agora importe o controller do usuário para que possa ser usado nas rotas.**

```js
const UserController = require('./controllers/UserController');
```

### Criando rotas e métodos para as funções do controller

**Finalmente estamos chegando ao final de nossa API. Então vamos criar as rotas que serão recuperadas pelo endereço do navegador.**

```js
routes.get('/users/listen', UserController.show);
routes.post('/users/create', UserController.store);
routes.put('/users/:user_id/update',UserController.update);
routes.delete('/users/:user_id/delete',UserController.delete);
```

**Cada método recebe dois parâmetros, um com o endereçamento da rota a ser usada e outro capturando a função passada pelo controller do usuário. Como falei antes, perceba que os endereçamentos dos métodos PUT e DELETE usam `:user_id`. Eles são os mesmos parâmetros de requisição que usamos nas funções update e delete do controller de usuário.**

### Exportando routes para o server.js

**Por fim, vamos exportar nosso routes pelo module.exports e usá-lo em nosso server.js.**

```js
module.exports = routes;
```

**Em server.js, importe o arquivo de rotas e use na aplicação com `app.use(routes)`; logo abaixo de `app.use(express.json());`**

```js
const routes = require('./routes');
//...
app.use(express.json());
app.use(routes);
```

**E assim terminamos de construir nossa aplicação e estamos prontos para usá-la em nossos projetos. Espero ter ajudado até aqui e estou a disposição para ajudar caso tenha dúvidas ou não conseguiu finalizar a API com sucesso.**