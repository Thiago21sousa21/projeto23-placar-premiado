# projeto23-placar-premiado
  API de uma aplicação de gerenciamento de apostas feita em typescript. Nela você pode criar um participante com saldo inicial, criar jogos, apostar neles, encerrar os jogos.
  Os saldos dos participantes são atualizados e os status das apostas também quando um jogo é finalizado. Também é possivel conferir todas as apostas em um jogo, a lista de participantes e a lista com todos os jogos!



[# link do deploy](https://placar-premiado-api.onrender.com)


# Rotas:
- **POST** `/participants`
    - Cria um participante com determinado saldo inicial.
        
- **POST** `/games`
    - Cria um novo jogo, com placar inicial 0x0 e marcado como não finalizado.
        
- **POST** `/bets`
    - Cadastra uma aposta de um participante em um determinado jogo. O valor da aposta deve ser descontado imediatamente do saldo do participante.
        
- **POST** `/games/:id/finish`
    - Finaliza um jogo e consequentemente atualiza todas as apostas atreladas a ele, calculando o valor ganho em cada uma e atualizando o saldo dos participantes ganhadores.
        
- **GET** `/participants`
    - Retorna todos os participantes e seus respectivos saldos.       
        
- **GET** `/games`
    - Retorna todos os jogos cadastrados.
        
- **GET** `/games/:id`

  # Tecnologias usadas
  - Prisma ORM para gerenciar o banco de dados PosgreSQL
  - Typescript para desenvolvimento
  - Jest e Supertest para testes
  - Express
  - Prisma
  - Postgres
  - Joi

# Como rodar
  - Instalar as dependencias:
    `npm install`
  - Criar banco de dados
  - criar arquivo .env seguindo modelo do .env.example
  - `npx prisma migrate deploy`
  - npm run dev
  - Retorna os dados de um jogo junto com as apostas atreladas a ele.

# Como rodar testes
  - criar arquivo .env.test seguindo modelo do .env.example
  - `npm run test:migration:run `
  - `npm run test:coverage`   

