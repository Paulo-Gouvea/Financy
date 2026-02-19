## Funcionalidade e regras

- [x]  O usuário pode criar uma conta e fazer login
- [x]  O usuário pode ser capaz de alterar o seu nome 
- [x]  O usuário pode ver e gerenciar apenas as categorias e transações criadas por ele
- [x]  Deve ser possível criar uma transação
- [x]  Deve ser possível deletar uma transação
- [x]  Deve ser possível editar uma transação
- [x]  Deve ser possível listar todas as transações
- [x]  Deve ser possível listar todas as transações de um usuário especifico
- [x]  Deve ser possível criar uma categoria
- [x]  Deve ser possível deletar uma categoria
- [x]  Deve ser possível editar uma categoria
- [x]  Deve ser possível listar todas as categorias
- [x]  Deve ser possível listar todas as categorias de um usuário especifico

## Funcionalidades para o front-end
# Tela Dashboard

- [X]  Deve ser apresentado o saldo total do usuário
- [x]  Deve ser apresentado a receita do mês do usuário
- [x]  Deve ser apresentado a despesa do mês do usuário
- [x*]  Deve ser apresentado as 5 transações mais recentes (pelo SelectedDate) na pagina inicial  (POSSO USAR O FILTERTRANSACTIONS MAS LIMITANDO NOS 5 PRIMEIROS REGISTROS!)
- [X]  Deve ser possivel falar qual o saldo total de uma categoria
- [X]  Deve ser possivel falar a quantidade de transações de cada categoria
- [X]  Deve ser possivel apresentar na tela inicial uma lista com 5 categorias com saldo negativo (PODEMOS FAZER UMA LISTA DOS BALANCES NEGATIVOS USANDO A FUNÇÃO QUE APRESENTA OS SALDOS DAS CATEGORIAS!)

# Tela Transações
- [X]  Deve ser possivel fazer uma filtragem pela descrição da transação
- [X]  Deve ser possivel fazer uma filtragem pelo tipo da transação
- [X]  Deve ser possível fazer uma filtragem pela categoria da transação
- [X]  Deve ser possível fazer uma filtragem pelo período da transação
- [X]  Deve ser apresentado uma tabela com as transações ordenadas pela selectedDate. Deve permitir paginação
- [X]  Deve ser apresentado o total das transações coletadas no filtro 

# Tela Categorias
- [X]  Deve ser possivel mostrar o total de categorias
- [X]  Deve ser possivel mostrar o total de transações
- [X]  Deve ser possivel mostrar a categoria com mais transações
- [x]  Deve ser possivel mostrar o total de transações em cada categoria
- [X]  Deve ser possivel mostrar as categorias criadas (não tem uma paginação então pode colocar um scroll)

## Ferramentas

É obrigatório o uso de:

- [x] TypeScript
- [x] GraphQL
- [x] Prisma
- [x] SQLite

## Variáveis ambiente

Todo projeto tem diversas configurações de variáveis que devem ser diferentes de acordo com o ambiente que ele é executado. Para isso, importante sabermos, de forma fácil e intuitiva, quais variáveis são essas. Então é obrigatório que esse projeto tenha um arquivo `.env.example` com as chaves necessárias.

- [x] JWT_SECRET
- [x] DATABASE_URL

## Opcionais

Lembre-se de seguir todos os requisitos obrigatórios, principalmente os relacionados às tecnologias, como o `GraphQL`. Mas você aprendeu bastante conteúdo ao longo da sua jornada da Pós-Graduação e, se quiser se desafiar, pode aplicar os conceitos de boas práticas e DevOps que estudou. Apenas lembre-se de configurar todo o ambiente para que a aplicação possa ser executada localmente.

## Dicas

- [x] Não se esqueça de habilitar o CORS na aplicação.