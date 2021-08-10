# MyWallet

This is the back-end to the MyWallet web app. More information can be found at:

-   https://github.com/ptrkc/mywallet-react

## Technologies

![](https://shields.io/badge/-JavaScript-F7DF1E?logo=JavaScript&logoColor=white&style=for-the-badge)
![](https://shields.io/badge/-Node.js-339933?logo=Node.js&logoColor=white&style=for-the-badge)
![](https://shields.io/badge/-PostgreSQL-4169E1?logo=PostgreSQL&logoColor=white&style=for-the-badge)
![](https://shields.io/badge/-Express-000000?logo=express&logoColor=white&style=for-the-badge)

## How to run

1. Clone this repository

2. Create the database

```bash
psql -c 'create database mywallet'
```

3. Dump the SQL to create the tables

```bash
psql mywallet < dump.sql
```

4. Create a file named `.env` following the provided `.env.example`

5. Install the dependencies

```bash
npm i
```

6. Run the back-end with

```bash
npm start
```

7. Follow the front-end instructions at:

-   https://github.com/ptrkc/mywallet-react#how-to-run
