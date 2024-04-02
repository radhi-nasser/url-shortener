# URL Shortener

## Introduction

This is an url shortener app. It consists of a backend ( built with [NestJs](https://nestjs.com/) and [Prisma](https://www.prisma.io/) ) that handles the shortening logic and retrieving the urls. And a frontend ( built with [React](https://react.dev/) ) that have a form to create a new shortened url.

We use a Postgres db to save the long urls and the short ones.

When working with this project I've been using https://supabase.com/ as serverless database but you can use any other alternatives.

## Getting started

### Backend

- Create a new database
- Copy the `.env.example` to create a new file `.env` and change the database url.
- Install the dependencies:

```bash
npm install
```

- Generate the prisma client

```bash
npx prisma generate
```

- Create the database migrations

```bash
npx prisma migrate dev
```

### Frontend

- Copy the `.env.example` to create a new file `.env`
- Install the dependencies:

```bash
npm install
```

## Running the app

Run the backend:

```bash
npm run start:dev
```

Run the frontend:

```bash
npm run start:start
```

The frontend will be available at: http://localhost:3000/ ( unless you change that).

And the backend will be available at: http://localhost:4000/ ( unless you change that).

You will have also Swagger documentation available at http://localhost:4000/docs/.

Both the app and api restart on code change.

## Improvements Roadmap

### Feature Improvements

- [ ] Add user signup and login to see a list of generated short urls and generate a new one.
- [ ] Add rate limiting to avoid DDOS attacks.
- [ ] Expiration dates on URLs
- [ ] Clicks counter

### Tech Improvements

- [ ] Dockerize the app
- [ ] Add testing to the backend and the frontend
- [ ] Add a form library to better handle the form when it will get bigger.
- [x] Handle possible backend collisions.
- [ ] Improve frontend error handling
