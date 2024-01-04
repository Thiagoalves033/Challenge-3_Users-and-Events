# Challenge 03 - Users and Events

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

![Node](https://img.shields.io/badge/-nodejs-black?style=for-the-badge&logoColor=white&logo=node.js&color=366A31)

## Overview

This is a REST API designed to manage events through authorized users.

## :computer: Running

### :books: Prerequisites

- **Node.js**:
  A JavaScript runtime that allows JavaScript code to be used outside a web browser. It can be downloaded here: https://nodejs.org/en. LTS version is recommended.

---

- **MongoDB Atlas**: MongoDB Atlas is a multi-cloud database service by the same people that build MongoDB. You'll need this to manage your database. Follow the steps specified here: https://www.mongodb.com/docs/atlas/getting-started/.

  ```
  # After creating the database, you will need a connection string, which looks like this:

  mongodb+srv://<username>:<password>@cluster_name.lxa8cyq.mongodb.net/<collection>?retryWrites=true&w=majority
  ```

---

- **Text Editor or IDE**: You'll need a text editor or an Integrated Development Environment (IDE) to view and edit the code. A very popular choice is Visual Studio Code, which can be downloaded here: https://code.visualstudio.com/.

### :hammer: Installation

1. **Download this repository.**

- Download ZIP

```
# On the main page of the repository, click on the 'Code' button, then click 'Download ZIP'
Extract the ZIP file to the desired folder
```

- Git

```
# If you use Git, simply run the following command on the desired folder:
 git clone git@github.com:Thiagoalves033/Challenge-3_Users-and-Events.git
```

2. **Dependencies**

```
# Install the project dependencies
npm install
```

### :wrench: Configuration

Create a file called `.env` on your root folder and refer to the table bellow in order to fulfill it.

|     Name     |                   Description                    | Required | Default value |                   Limitations                    |
| :----------: | :----------------------------------------------: | :------: | :-----------: | :----------------------------------------------: |
|    `PORT`    |     Port on which the API will be available      |    ❌    |    `3000`     | If set, must be a number between `0` and `65535` |
| `MONGO_URI`  | Connection string to your MongoDB Atlas database |    ✅    |      ❌       |              Can't be empty string               |
| `JWT_SECRET` |   Secret string used to create your JWT Tokens   |    ✅    |      ❌       |              Can't be empty string               |

## :rocket: Build

In order to build the application for development, run the following commands:

```
# Build the app
npm build

# Run the app in development mode
npm start:dev
```

In order to build the application for production, run the following commands:

```
# Build the app
npm build

# Run the app in development mode
npm start
```

## API Endpoints
