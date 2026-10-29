# Finance Tracker

Track income, spending, and investments. See where your money goes.

| Light | Dark |
|-------|------|
| ![Dashboard, light mode](docs/screenshots/after-04-dashboard-light.png) | ![Dashboard, dark mode](docs/screenshots/after-05-dashboard-dark.png) |

A full-stack personal finance app. Vue 3 on the front end, a GraphQL API on the back end, MongoDB for storage. The interface follows a clean white-and-blue style inspired by Ubiquiti UniFi and iOS 7 to 10.

More screenshots and the design story: [docs/SHOWCASE.md](docs/SHOWCASE.md).

## Features

- Sign up and log in. The session lives in a cookie.
- Add a transaction: type (income, expense, investment), amount, description, payment method, date.
- Dashboard with total income, total expenses, total investments, and a net balance donut with a legend.
- Transaction list, newest first, with a confirmation before delete.
- Light and dark theme. Layout works from 360px wide.
- Euro formatting, empty states, loading states.

## Tech stack

| Layer | Tools |
|-------|-------|
| Front end | Vue 3 (`<script setup>`, TypeScript), Vite, Vue Router |
| UI | Tailwind CSS 3, shadcn-vue, Radix Vue, Lucide icons, Unovis charts |
| Data | Apollo Client, `@vue/apollo-composable` |
| Back end | Node.js, Express, Apollo Server 4, Passport (local strategy), express-session |
| Database | MongoDB, Mongoose |
| Tooling | Docker Compose for the back end, ESLint, Prettier |

## Run it locally

You need Node.js 22 and Docker.

```sh
# 1. Start MongoDB and the API (http://localhost:4000/graphql)
docker compose up -d --build

# 2. Load demo data
docker compose exec backend node seed.js

# 3. Start the front end (http://localhost:5173)
npm install
npm run dev
```

Demo login: `demo` / `demo1234`.

Without Docker: copy `backend/.env.example` to `backend/.env`, start your own MongoDB, then run `npm install && npm run dev` in `backend/` and `npm run seed`.

To reset the database: `docker compose down -v`.

The front end expects the API on `localhost:4000`. The API allows the front end on `localhost:5173` only.

## Design notes

- **One dashboard.** The first version had placeholder pages and a mock import menu. I removed them. A small finished app reads better than a large half-built one.
- **One token set.** Colors, radii, and fonts live in CSS variables in `src/assets/base.css`. Light and dark mode change the values, not the components.
- **Money colors are never the only signal.** Income, expense, and investment each have a color, a label, and a sign.
- **Chart colors come from the same tokens**, so the donut follows the theme with no extra code.
- **Forms use native validation.** Decimal amounts work, the date defaults to today, and delete asks first.
- **Every data view has loading, empty, and error states.**

Before and after screenshots are in [docs/SHOWCASE.md](docs/SHOWCASE.md).

## Known limits

This is a student project. It runs locally. Authentication hardening and automated tests are out of scope. There is no edit-transaction screen yet.

## Project layout

```
backend/    Express + Apollo Server + Mongoose (typeDefs, resolvers, models, seed.js)
src/        Vue app (views, components, GraphQL documents, router)
docs/       Project reference, design plan, screenshots, showcase notes
```

Developer reference: [docs/PROJECT.md](docs/PROJECT.md).
