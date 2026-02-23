## Funcionalidade e regras

- [X]  O usuário pode criar uma conta e fazer login
- [X]  O usuário pode ser capaz de alterar o seu nome 
- [x]  O usuário pode ver e gerenciar apenas as categorias e transações criadas por ele
- [X]  Deve ser possível criar uma transação
- [X]  Deve ser possível deletar uma transação
- [x]  Deve ser possível editar uma transação
- [X]  Deve ser possível listar todas as transações
- [X]  Deve ser possível listar todas as transações de um usuário especifico
- [X]  Deve ser possível criar uma categoria
- [X]  Deve ser possível deletar uma categoria
- [X]  Deve ser possível editar uma categoria
- [X]  Deve ser possível listar todas as categorias
- [X]  Deve ser possível listar todas as categorias de um usuário especifico

## Funcionalidades para o front-end
# Tela Dashboard   FINALIZADA

- [x]  Deve ser apresentado o saldo total do usuário
- [x]  Deve ser apresentado a receita do mês do usuário
- [x]  Deve ser apresentado a despesa do mês do usuário
- [x]  Deve ser apresentado as 5 transações mais recentes (pelo SelectedDate) na pagina inicial  (POSSO USAR O FILTERTRANSACTIONS MAS LIMITANDO NOS 5 PRIMEIROS REGISTROS!)
- [x]  Deve ser possivel falar qual o saldo total de uma categoria
- [x]  Deve ser possivel falar a quantidade de transações de cada categoria
- [x]  Deve ser possivel apresentar na tela inicial uma lista com 5 categorias com saldo negativo (PODEMOS FAZER UMA LISTA DOS BALANCES NEGATIVOS USANDO A FUNÇÃO QUE APRESENTA OS SALDOS DAS CATEGORIAS!)

# Tela Transações
- [ ]  Deve ser possivel fazer uma filtragem pela descrição da transação
- [ ]  Deve ser possivel fazer uma filtragem pelo tipo da transação
- [ ]  Deve ser possível fazer uma filtragem pela categoria da transação
- [ ]  Deve ser possível fazer uma filtragem pelo período da transação
- [X]  Deve ser apresentado uma tabela com as transações ordenadas pela selectedDate. Deve permitir paginação
- [X]  Deve ser apresentado o total das transações coletadas no filtro 

# Tela Categorias      FINALIZADA
- [X]  Deve ser possivel mostrar o total de categorias
- [X]  Deve ser possivel mostrar o total de transações
- [X]  Deve ser possivel mostrar a categoria com mais transações
- [X]  Deve ser possivel mostrar o total de transações em cada categoria
- [X]  Deve ser possivel mostrar as categorias criadas (não tem uma paginação então pode colocar um scroll)

Além disso, também temos algumas regras importantes específicas para o front-end:

- [X]  É obrigatória a criação de uma aplicação React usando GraphQL para consultas na API e Vite como `bundler`;
- [ ]  Siga o mais fielmente possível o layout do Figma;

## Páginas

Essa aplicação possui: 
- [ ] 6 páginas 
- [ ] dois modais com os formulários (Dialog):

[X] A página raiz (`/`) que exibe:
[X] Tela de login caso o usuário esteja deslogado
[X] Tela dashboard caso usuário esteja logado

## Ferramentas

É obrigatório o uso de:

- [X] TypeScript
- [X] React
- [X] Vite sem framework
- [X] Graphql

## Variáveis ambiente

Todo projeto tem diversas configurações de variáveis que devem ser diferentes de acordo com o ambiente que ele é executado. Para isso, importante sabermos, de forma fácil e intuitiva, quais variáveis são essas. Então é obrigatório que esse projeto tenha um arquivo `.env.example` com as chaves necessárias.

- [x] VITE_BACKEND_URL=

## Dicas

- [X] Comece o projeto pela aba `Style Guide` no Figma. Dessa forma, você prepara todo o seu tema, fontes e componentes e quando for criar as páginas vai ser bem mais tranquilo;

