Welcome Contributors.\
We request you to read all guidelines before contributing.

## Prerequisites

> You should have knowledge of following things

- NodeJs
- Express
- Knex
- Postgres
- Redis
- Axios

> Make sure you are running the latest stable version of listed tools. _Update to latest if you don't have_

- Node (version v12.18.2)
- Npm (version 6.14.5)

> You can use this code without frontend, incase you need frontend you will get brief description of frontend at [Blog-Frontend](https://github.com/sukhiboi/blog-frontend).

## Project Skeleton

```bash
.
├── .gitignore
├── README.md
├── repoInfo.json
├── package-lock.json
├── package.json
├── app.js
├── server.js
├── migrations
├── test
├── .github/
│   └── workflows/
│       └── main.yaml
├── src/
│   ├── sessions.js
│   ├── database.js
│   ├── auth/
│   ├── middleware/
│   └── routes/
```

## Setup for development

1. Clone the repository

   ```bash
   git clone https://github.com/sukhiboi/blog-backend.git
   ```

2. Setup frontend. You will get brief description of frontend at [Blog-Frontend](https://github.com/sukhiboi/blog-frontend).

3. Run this commands to get setup ready before you start contributing

   ```bash
   npm install
   ```

4. Run this command to start the app

   ```bash
   npm start [port]
   ```

## Contribution

1. Select an issue that you want to work on.
2. Make sure you got full clarity about the issue and then assign it to yourself.
3. And make sure you run `git pull --rebase` or `git pull -r` before you are going to push the code. If you get any conflicts talk with people who add those lines of code.
