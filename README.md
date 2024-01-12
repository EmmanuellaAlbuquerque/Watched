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

https://github.com/EmmanuellaAlbuquerque/Watched/assets/57198678/def53002-6e9c-4d35-8b0d-b4bbedcc6034

## :art: Telas

Login Screen | Home Screen | Details Screen (Watched)
:---: | :---:| :---:|
<img src=".github/images/NewLoginScreen2.jpg" width = 300px> | <img src=".github/images/HomeScreenNew.jpg" width=300px> | <img src=".github/images/DetailsScreenWatched.jpg" width = 300px> |

Search Screen | Watched Screen | Details Screen (Not Watched)
:---: | :---:| :---:|
<img src=".github/images/SearchScreen.jpg" width=300px> | <img src=".github/images/WatchedScreenFull.jpg" width = 300px> | <img src=".github/images/DetailsScreenNotWatched.jpg" width = 300px> |

## ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [React-Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)


API do The Movie Database (TMDb) que mantém um banco de dados, atualizado constantemente, com os filmes e séries mais recentes.
- [themoviedb](https://developers.themoviedb.org/3/getting-started/introduction) - The Movie Database API

## :rocket: Executando o projeto

### Versions Used

- Node 17
- Expo 47
- React Native 0.70.5

Primeiramente, lembre-se de obter a API KEY do ([TMDb](https://developers.themoviedb.org/3/getting-started/introduction)). Em seguida, defina o arquivo .env na home do projeto.
 
 ```sh
# .env.example

THEMOVIEDB_APIKEY=
```

Utilize o **yarn** ou o **npm install** para instalar as dependências do projeto.
Em seguida, inicie o projeto.

```sh
nvm use 17
nvm current

npx expo start
```

## :iphone: APK

[Android APK](.github/APK/Watched.apk)

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
- [x] Add to Watched

#### implementar pesquisa
- [x] For movies
- [x] For series

## ✍️ Autor

<a href="https://github.com/EmmanuellaAlbuquerque">
  <img style="border-radius: 50%;" src="https://avatars1.githubusercontent.com/u/57198678?s=460&u=18118f08f358d2615421a0694cc00b1c10b8bba0&v=4" width="100px;" alt="eu"/>
</a>

Made with ❤️ by <a href="https://github.com/EmmanuellaAlbuquerque">Manu</a>