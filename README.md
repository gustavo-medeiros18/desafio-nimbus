## Como rodar a aplicação

Primeiro, crie um arquivo `.env` na raiz do projeto com os atributos presentes em `.env.example`.
Em seguida, insira os valores desejados para cada variável de ambiente. Certifique-se de inserir portas
que não estejam ocupadas na sua máquina.

### Executando pelo docker compose

Com isso, execute o seguinte comando a partir da raiz do projeto:

```bash
docker-compose up
```

### Executando localmente

> É necessário ter o PostgreSQL e o NodeJS instalados na máquina. A estrutura presente em `schema.sql` será criada dentro do banco padrão `postgres`.

Execute a seguinte sequência de comandos a partir da raiz do projeto:

```bash
psql -h localhost -U <seu_usuario> -a -f scripts/schema.sql
npm i
npm run start
```

Rodando tanto pelo docker como localmente, a aplicação ficará disponível para requisições normalmente,
com o endpoint exigido no enunciado.

### Executando os testes unirários

Na execução de testes unirários, a aplicação usará um banco de dados local (**sqlite**) em **ambiente de teste**, devido a latência do Postgres quando dockerizado.

Comando para testar:

```bash
npm run test
```
