<!-- ICON APP -->
<div align="center">
   <img src="assets/icon.png" alt="Icon" width="200" style="border-radius: 1rem" />
</div>

<!-- Shields -->
<div align="center">
  <img src="https://img.shields.io/github/languages/code-size/EmmanuellaAlbuquerque/Watched?color=fff" alt="code size">
  <img src="https://img.shields.io/badge/%F0%9F%9A%A7%20%20Under%20development%3F-yes-fff.svg" at="Under development">
</div>

# Watched

Mantenha uma lista de todos os filmes e séries que você já assistiu.

## :art: Telas

Home Screen | Details Screen | Watched Screen
:---: | :---:| :---:|
<img src=".github/images/tela1.jpg" width = 300px> | <img src=".github/images/DetailsScreen.jpg" width = 300px> | <img src=".github/images/WatchedScreen.jpg" width = 300px> |

Login Screen | Sign Up (Web View) | Details Screen
:---: | :---:| :---:|
<img src=".github/images/LoginScreen.jpg" width = 300px> | <img src=".github/images/SignUpScreen.jpg" width = 300px> | <img src=".github/images/tela2.jpg" width = 300px> |

## ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [React-Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)


API do The Movie Database (TMDb) que mantém um banco de dados, atualizado constantemente, com os filmes e séries mais recentes.
- [themoviedb](https://developers.themoviedb.org/3/getting-started/introduction) - The Movie Database API

## :rocket: Executando o projeto

Utilize o **yarn** ou o **npm install** para instalar as dependências do projeto.
Em seguida, inicie o projeto.

```sh
npx expo start
```

Lembre-se de obter a API KEY do ([TMDb](https://developers.themoviedb.org/3/getting-started/introduction)). Em seguida, defina o arquivo .env na home do projeto.
 
 ```sh
# .env.example

THEMOVIEDB_APIKEY=
```

## :hammer_and_wrench: Tarefas

#### implementar login
- [x] Create new Token (request_token)
- [x] Login (sucess)

#### implementar bottom nav
- [x] Create Session (session_id)
- [x] List Watched

#### implementar adição aos assistidos
- [x] Create Session (session_id)
- [x] Get Account Info (account id)
- [x] Watched

#### implementar pesquisa
- [ ] for movies
- [ ] for series

## ✍️ Autor

<a href="https://github.com/EmmanuellaAlbuquerque">
  <img style="border-radius: 50%;" src="https://avatars1.githubusercontent.com/u/57198678?s=460&u=18118f08f358d2615421a0694cc00b1c10b8bba0&v=4" width="100px;" alt="eu"/>
</a>

Made with ❤️ by <a href="https://github.com/EmmanuellaAlbuquerque">Manu</a>