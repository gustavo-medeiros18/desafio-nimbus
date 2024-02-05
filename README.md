## Como rodar a aplicação

Primeiro, crie um arquivo `.env` na raiz do projeto com os atributos presentes em `.env.example`.
Em seguida, insira os valores desejados para cada variável de ambiente.

### Executando pelo docker compose

Com isso, execute o seguinte comando a partir da raiz do projeto:

```bash
docker-compose up
```

### Executando localmente

> É necessário ter o PostgreSQL e o NodeJS instalados na máquina.

Execute a seguinte sequência de comandos a partir da raiz do projeto:

```bash
psql -h localhost -U <seu_usuario> -a -f scripts/schema.sql
npm i
npm run start
```

### Executando os testes unirários

Para executar os testes unitários, recomenda-se **rodar a aplicação localmente**, pois devido a latência do banco de dados quando dockerizado, os testes podem falhar, visto que o jest não espera por muito tempo a resposta do banco de dados.

Comando para testar:

```bash
npm run test
```
