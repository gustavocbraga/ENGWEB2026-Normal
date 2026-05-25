# 1
## 1.1
Alterações feitas no dataset: id -> _id
Comandos para importar dataset em uma bd:
```
# Correr docker 
docker run -d -p 27017:27017 --name mongoEW -v mongoData2026:/data/db mongo

# Copiar dataset para docker
docker cp jogos.json mongoEW:/tmp

# Importar dataset para o container
mongoimport -d jogostabuleiro -c jogos /tmp/jogos.json --jsonArray
```
Testar importação:
```
docker exec -it mongoEW mongosh
show dbs
use jogostabuleiro
show collections
db.jogos.findOne()
```

## 1.3 API de dados

### 1.3.1. Modelo e Persistência de Dados
A persistencia foi feita utilizando a base de dados NoSQL MongoDB e o moongoose

O modelo dos dados foi estruturado utilizando Schemas secundarios, (**autores**, **editoras**, **mecanicas** e **premios**) para representar a entidade jogos.

O campo id foi substituido por _id para ser mapeado como chave primária

### 1.3.2. Setup e Povoamento Automático (Database Setup)
O ambiente foi isolado utilizando contentores Docker

O processo de inicialização e importação do dataset ocorre da seguinte forma:

1. **Orquestração e Volumes:** O serviço `mongodb` utiliza a imagem oficial do Mongo. Para injetar os dados automaticamente, a pasta de conjuntos de dados (`../datasets`) contendo o ficheiro estruturado **`jogos.json`** e o script de automação **`init-mongo.sh`** foram mapeados como volumes para o diretório interno `/docker-entrypoint-initdb.d` do contentor.
2. **Script de Inicialização (`init-mongo.sh`):** A imagem oficial do MongoDB executa por omissão qualquer script `.sh` contido na pasta de *entrypoint* durante o primeiro arranque do banco de dados. O script desenvolvido varre dinamicamente a pasta à procura de ficheiros `.json`, extrai o nome do ficheiro para definir a coleção (criando assim a coleção `jogos`) e executa o utilitário nativo **`mongoimport`** com a flag `--jsonArray` para povoar a base de dados instantaneamente com os registos iniciais.
3. **Variáveis de Ambiente:** Através de um ficheiro `.env` partilhado, os parâmetros de configuração como o nome da base de dados (`jogostabuleiro`) e as portas de comunicação interna/externa permanecem completamente parametrizados e dinâmicos.

### 1.3.4. Execução
correr o comando:
```
docker compose up -d --build 
```
dentro da pasta ex1


# 2
O modelo de dados implementado: 
* **`titulo`**: String (Obrigatório)
* **`autor`**: String 
* **`paginas`**: Número 
* **`genero`**: String 
* **`lido`**: Booleano 

## 2.1. Orquestração de serviços com docker
### 3. Orquestração e Isolamento com Docker

O contentor api_leituras expõe apenas a porta 19020
**Povoamento inicial**:
 script `init-mongo.sh` lê o ficheiro de dados estruturado em **`datasets/livros.json`** (contendo 10 livros pré-definidos) e efetua um `mongoimport` automático para criar a coleção populada instantaneamente.

## 🛠️ Instruções de Execução (Exercício 2)
### Passos para Inicialização
correr o comando:
```
docker compose up -d --build 
```
dentro da pasta ex2


