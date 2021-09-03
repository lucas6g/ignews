<p align="center">
    <img width="300" align="center" src="https://repository-images.githubusercontent.com/346402665/17e19380-840e-11eb-86b6-5475e99b6392">
</p>

<h1 align="center">
   Ig News
</h1>

<p align="center">
  <a href="#rocket-sobre-o-projeto">Sobre o projeto</a> | <a href="#computer-tecnologias">Tecnologias</a> | <a href="#books-guia-de-instalação-e-execução">Guia de instalação e execução</a> |
</p>

## Layout

<img src="https://github.com/Leandro-Goncalves/ignews/raw/main/files/img/web/home.png">

## :rocket: Sobre o projeto

IgNews é um projeto desenvolvido no curso Ignite. tratase de um site de noticias desenvolvido em next com integração com o stripe para pagamentos, faunadb como banco de dados serverless, prismic para cms de noticias

## :computer: Tecnologias

- [React.js](https://pt-br.reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Axios](https://github.com/axios/axios)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Yup](https://github.com/jquense/yup)
- [Jest](https://jestjs.io/)
- [Next Js](https://nextjs.org)
- [Sass](https://sass-lang.com)
- [FaunaDb](https://fauna.com)
- [Stripe](https://stripe.com/br)

## :books: Guia de instalação e execução

### Pré-requisitos

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) v10.20 ou maior
- [Yarn](https://yarnpkg.com/)

### Como executar

⚠️ Quando clonar a aplicação não se esqueça de:
 - Criar um arquivo .env com os seguintes dados:
   - Stripe
      - STRIPE_API_KEY
      - NEXT_PUBLIC_STRIPE_PUBLIC_KEY
      - STRIPE_WEBHOOK_SECRET
      - STRIPE_SUCCESS_URL
      - STRIPE_CANCEL_URL
   - Github
       - GITHUB_CLIENT_ID
       - GITHUB_CLIENT_SECRET
   - FaunaDB
       - FAUNADB_KEY
   - Prismic CMS
       - PRISMIC_ENDPOINT
       - PRIMIC_ACCESS_TOKEN

- Clone o repositório `git clone https://github.com/lucas6g/ignews`
- Vá até o diretório `cd ignews`
- Execute `yarn` para instalar as dependências
- Execute `yarn dev` para rodar o servidor

- Caso deseje executar os testes unitários basta executar `yarn test` em seu terminal.
- Para visualizar um relatório detalhado sobre a cobertura dos testes rode `yarn test:coverage` e acesse o arquivo `coverage/lcov-report/index.html`.
