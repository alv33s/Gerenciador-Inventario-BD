# 📜Projeto Gerenciador de Estoque com TypeORM
Neste projeto, desenvolvemos um gerenciador de inventário utilizando TypeScript e TypeORM para persistência de dados em um banco de dados MySQL. O sistema permite o gerenciamento de categorias e produtos, proporcionando uma interface de linha de comando interativa e eficiente.

## 🚧Estrutura do projeto

   - 📂.vscode
   - 📂dist
        - Cópia dos arquivos src compliados em JavaScript
   - 📂node_modules
        - Dependências necessárias
   - 📂src
        - 📂cli
            - Interface gráfica `menu.ts`
        - 📂database
            - `data-source.ts`
        - 📂services
            - Classes `categoriaService.ts` e `produtoService.ts`
        - 📂 entities
            - Categoria.ts
            - Produto.ts
        - 📂models
            - Icategoria.ts
            - Iproduto.ts
  - index.ts 
  - package-lock.json
  - package.json
    
                Configurações  {
                                "name": "projeto_inventariocli_typeorm",
                                "version": "1.0.0",
                                "description": "",
                                "main": "index.js",
                                "scripts": {
                                  "test": "echo \"Error: no test specified\" && exit 1"
                                },
                                "start": "ts-node src/index.ts",
                                "dev": "nodemon --exec ts-node src/index.ts",
                                "keywords": [],
                                "author": "",
                                "license": "ISC",
                                "type": "commonjs",
                                "dependencies": {
                                  "chalk": "^5.4.1",
                                  "inquirer": "^12.5.0",
                                  "mysql2": "^3.14.0",
                                  "ts-node": "^10.9.2",
                                  "typeorm": "^0.3.21",
                                  "typescript": "^5.8.2"
                                },
                                "devDependencies": {
                                  "@types/inquirer": "^9.0.7",
                                  "@types/node": "^22.13.17",
                                  "nodemon": "^3.1.9"
                                }
                              }


- tsconfig.json

                          {
                              "compilerOptions": {
                              "target": "es2016", 
                              "module": "commonjs",                               
                              "rootDir": "./src", 
                              "outDir": "./dist","esModuleInterop": true,
                              "forceConsistentCasingInFileNames": true,
                              "strict": true,  
                              "skipLibCheck": true,
                              "experimentalDecorators": true,
                              "emitDecoratorMetadata": true
                              }
      
                          }

- **.vscode:** Configurações do VS Code.
- **dist:** Arquivos JavaScript compilados a partir do TypeScript.
- **node_modules:** Dependências do projeto.
- **src:** Código fonte do projeto.
- **cli:** Interface de linha de comando (menu.ts).
- **database:** Configuração da conexão com o banco de dados (data-source.ts).
- **entities:** Definição das entidades do TypeORM (Categoria.ts, Produto.ts).
- **services:** Lógica de negócios (categoriaService.ts, produtoService.ts).
- **models:** Interfaces (Iproduto.ts, Icategoria.ts).
- **index.ts**: Ponto de entrada do aplicativo.
      

## ⚙️ Sintaxe e Boas Práticas
  - TypeORM: Utilização do TypeORM para mapeamento objeto-relacional e interação com o banco de dados.
  - Entidades: Definição das tabelas e colunas do banco de dados como entidades TypeScript.
  - Serviços: Separação da lógica de negócios em serviços para melhor organização e manutenção.
  - Interfaces: Uso de interfaces para definir contratos de objetos, melhorando a tipagem e a clareza do código.
  - Async/Await: Utilização de async/await para lidar com operações assíncronas de banco de dados.

### Validações
   - Criamos validações para garantir a integridade dos produtos e categorias.

### Dependências

- typeorm: ORM para interagir com o banco de dados.
- mysql2: Driver MySQL para Node.js.
- inquirer: Biblioteca para criar interfaces de linha de comando interativas.
- reflect-metadata: Necessário para o TypeORM.

        

## 🍃Fluxo do Sistema
- Conexão com o banco de dados MySQL usando TypeORM.
- Interface de linha de comando interativa para gerenciamento de categorias e produtos.
- Operações CRUD para categorias e produtos.
- Tratamento de erros e validações para garantir a integridade dos dados.

## Funcionalidades Principais
- Cadastro, listagem, busca, atualização e remoção de categorias.
- Cadastro, listagem, busca, atualização e remoção de produtos.
- Persistência de dados em banco de dados MySQL usando TypeORM.
- Interface de linha de comando interativa e intuitiva.

## Como Executar o Projeto
Este guia detalha como executar o Projeto 2, que utiliza TypeORM para persistência de dados em um banco de dados MySQL.

### 1.Pré-requisitos:

- Node.js e npm: Certifique-se de ter o Node.js e o npm (Node Package Manager) instalados em seu sistema. Você pode baixá-los em nodejs.org   
- MySQL: Instale o MySQL Server e configure um banco de dados. Você pode baixar o MySQL Community Server em dev.mysql.com [URL inválido removido].
- Editor de Código: Recomenda-se usar um editor de código como o Visual Studio Code para facilitar o desenvolvimento.
### 2. Configuração do Banco de Dados:

- Crie o banco de dados:
  - Abra um cliente MySQL (como o MySQL Workbench ou a linha de comando) e execute o seguinte comando para criar o banco de dados inventario:
  SQL

        CREATE DATABASE IF NOT EXISTS inventario;
    
- Configure as credenciais:
  - Abra o arquivo src/database/data-source.ts no seu editor de código.
  - Substitua "seu_usuario" e "sua_senha" pelas suas credenciais do MySQL.
  - Verifique se as configurações de host e port estão corretas.
### 3. Instalação das Dependências:

- Abra o terminal na raiz do seu projeto.
- Execute o seguinte comando para instalar as dependências necessárias:

      npm install

### 4. Compilação do Código TypeScript:

- Execute o seguinte comando para compilar o código TypeScript em JavaScript:

      npx tsc

- Isso criará a pasta dist com os arquivos JavaScript compilados.
  
### 5. Execução do Aplicativo:

- Execute o aplicativo usando o Node.js:

      node dist/index.js

## Autor
Felipe Alves Muniz
