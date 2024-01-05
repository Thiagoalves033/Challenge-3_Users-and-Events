# Challenge 03 - Users and Events

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Node](https://img.shields.io/badge/-nodejs-black?style=for-the-badge&logoColor=white&logo=node.js&color=366A31) ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) ![Mongo](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) ![Jest](https://img.shields.io/badge/-Jest-black?style=for-the-badge&logoColor=white&logo=jest&color=BF3B14) ![ESlint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)

## 📋 Table of Contents

1. 🔍 [Overview](#-overview)
2. 📚 [Prerequisites](#-prerequisites)
3. 🔨 [Installation](#-installation)
4. 🔧 [Configuration](#-configuration)
5. 🚀 [Build](#-build)
6. ✅ [Tests](#-tests)
7. 🌐 [API Endpoints](#-api-endpoints)

## 🔍 Overview

This is a REST API designed to manage events through authorized users.

## 📚 Prerequisites

- **Node.js**:
  A JavaScript runtime that allows JavaScript code to be used outside a web browser. It can be downloaded here: https://nodejs.org/en. LTS version is recommended.

---

- **MongoDB Atlas**: MongoDB Atlas is a multi-cloud database service by the same people that build MongoDB. You'll need this to manage your database. Follow the steps specified here: https://www.mongodb.com/docs/atlas/getting-started/.

  After creating the database, you will need a connection string, which looks like this:

  ```
  mongodb+srv://<username>:<password>@cluster_name.lxa8cyq.mongodb.net/<collection>?retryWrites=true&w=majority
  ```

---

- **Text Editor or IDE**: You'll need a text editor or an Integrated Development Environment (IDE) to view and edit the code. A very popular choice is Visual Studio Code, which can be downloaded here: https://code.visualstudio.com/.

## 🔨 Installation

1. **Download this repository.**

- Download ZIP

  - On the main page of the repository, click on the `Code` button, then click `Download ZIP`
  - Extract the ZIP file to the desired folder on your local machine.

- Git

```bash
# If you use Git, simply run the following command on the desired folder:
 git clone git@github.com:Thiagoalves033/Challenge-3_Users-and-Events.git
```

2. **Dependencies**

```bash
# Install the project dependencies
npm install
```

## 🔧 Configuration

Create a file called `.env` on your root folder and refer to the table bellow in order to fulfill it.

|     Name     |                   Description                    | Required | Default value |                   Limitations                    |
| :----------: | :----------------------------------------------: | :------: | :-----------: | :----------------------------------------------: |
|    `PORT`    |     Port on which the API will be available      |    ❌    |    `3000`     | If set, must be a number between `0` and `65535` |
| `MONGO_URI`  | Connection string to your MongoDB Atlas database |    ✅    |      ❌       |              Can't be empty string               |
| `JWT_SECRET` |   Secret string used to create your JWT Tokens   |    ✅    |      ❌       |              Can't be empty string               |

## 🚀 Build

In order to build the application for development, run the following commands:

```bash
# Build the app
npm build

# Run the app in development mode
npm run start:dev
```

In order to build the application for production, run the following commands:

```bash
# Build the app
npm build

# Run the app in production mode
npm start
```

## ✅ Tests

### 🧪 Unit tests

![Jest Test Count](https://img.shields.io/badge/Tests-46-red)

<!-- prettier-ignore -->
![Statements Count](https://img.shields.io/badge/Statements-208/208_covered_(100%)-red)

<!-- prettier-ignore -->
![Covered Branches](https://img.shields.io/badge/Branches-24/24_covered_(100%)-red)

<!-- prettier-ignore -->
![Covered Functions](https://img.shields.io/badge/Functions-44/44_covered_(100%)-red)

<!-- prettier-ignore -->
![Covered Lines](https://img.shields.io/badge/Lines-198/198_covered_(100%)-red)

### ▶️ Commands

```bash
# Run unit tests
npm test

# Run unit tests with coverage
npm run test:coverage
```

## 🌐 API Endpoints

**Note:** `<URL>` used in this section means `localhost:<your_port>/api/v1`

### `<URL>/user/sign-up`

> HTTP methods
>
> - POST — Create a new user

### `<URL>/user/sign-in`

> HTTP methods
>
> - POST — Login of an existing user

### `<URL>/events`

> HTTP methods
>
> - POST — Create a new event
> - GET — Get events
> - DELETE — Delete events

### `<URL>/events/:id`

> HTTP methods
>
> - GET — Get a single event
> - DELETE — Delete a single event
