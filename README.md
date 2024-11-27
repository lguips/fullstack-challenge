# Como instalar e rodar os projetos (Backend).
Devemos ter instalado o PostgreSQL na versão 12.x rodando na porta 5432.

### Primeiramente devemos criar o arquivo .env na raiz do projeto backend
Exemplo de string de conexão que devemos ter no nosso arquivo .env.

Criei o banco com o nome de "devs".

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/devs?schema=public"

Depois do arquivo .env criado, devemos instalar as dependencias com seguinte comando:
```
npm install
```

Depois de instalado podemos rodar o projeto com o comando:
```
npm run dev
```

O projeto backend será iniciado na porta 3333.

# Como instalar e rodar os projetos (Frontend).
Entrar na pasta frontend e instalar as dependências com o comando:
```
npm install
```

Rodar o projeto em modo de desenvolvimento com o comando:
```
npm run dev
```

Os testes poderão ser rodados com o comando:
```
npm run test
```
