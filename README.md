# DEVCONNECTOR - social network app for developer

## Table of contents

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Project status](#project-status)
- [Launch](#launch)
- [Version](#version)
- [Author](#author)
- [Contact](#contact)

## Introduction

DEVCONNECTOR is a project of social media network that cover some core features.

## Technologies

Project is created with MERN stack:

- Nodejs version: v12.18.3
- Expressjs version: v4.17.1
- Reactjs
- Mongodb version: v4.4.0
- Socketio version: v2.3.0
- And more...

## Project status

Devconnector is inspired by Brad Traversy with some core features. In this version, I added some more features:

- Real-time public chat room
- A recruiter page for adding recruitment news
- Classification authorization: admin, recruiter, user
- Admin page (in process...)
- Event page (in process...)
- Adding new friends (in process...)
- Real-time messenger (in process...)

## Launch

### Presequisite Environment

- Nodejs (npm)
- Mongodb

### `How to run it locally?`

First you need to clone the git repository, then install it locally using npm

```
1. $ git clone https://github.com/codersx-philip-nguyen/dev-connector.git
2. $ cd dev-connector
3. $ npm i
4. $ cd client
5. $ npm i
6. $ cd ..

# To run server locally, you must have .env file in root project directory
# See below .env file struture and replace with your value
# After that, just run the command as below to start

7. $ npm run dev

# project started
```

### `.env structure`

```
mongoURI=<MONGO_DB_SERVER>
jwtSecret=<Any String>
githubClientId=<Any String>
githubClientSecret=<Any String>
githubSecret=<Any String>
REACT_APP_FETCH_URL=http://localhost:5000
TOKEN_HEADER=<Any String> #example: header-auth-token
PORT=5000
```

## Version

DEVCONNECTOR v2.0.0

## Author

Huyen Nguyen Van (Phillip Nguyen)

## Certificate

![Certificate]('./client/public/Udemy-Certificate.jpeg')

## Contact

Email: phillipng.working@gmail.com
