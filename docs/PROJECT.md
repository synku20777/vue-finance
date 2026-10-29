# Developer reference

Personal finance tracker. Vue 3 SPA + Apollo GraphQL API + MongoDB. Users register, log in, and record transactions (income, expense, investment). The home page shows three total cards, a net balance donut with a legend, and a transactions table.

This is a local student project. Authentication hardening and automated tests are out of scope.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Vue 3 `<script setup lang="ts">`, Vite 5, vue-router 4, TypeScript 5.6 |
| UI | Tailwind 3, shadcn-vue (style `default`, base `gray`, CSS variables), radix-vue, lucide-vue-next, unovis (charts) |
| Data | Apollo Client 3 + `@vue/apollo-composable` (`useQuery`, `useMutation`) |
| Backend | Node ESM, Express 4, Apollo Server 4, Mongoose 8, passport + `graphql-passport` (local strategy), `express-session` + `connect-mongodb-session`, bcryptjs |
| DB | MongoDB (`MONGO_URI`) |

## Run

Docker for the API and MongoDB, host for the frontend.

```sh
docker compose up -d --build              # API -> http://localhost:4000/graphql, MongoDB :27017
docker compose exec backend node seed.js  # demo user demo / demo1234 + 45 EUR transactions
npm install && npm run dev                # frontend -> http://localhost:5173
```

Without Docker: `cd backend && npm install && npm run dev`, with `backend/.env` (copy `backend/.env.example`; gitignored via `*.env`) holding `MONGO_URI` and `SESSION_SECRET`. `npm run seed` in `backend/` seeds the same demo data.

CORS and the Apollo client URL are hardcoded to `localhost:5173` and `localhost:4000`.

Checks: `npm run type-check` (`vue-tsc`), `npm run lint`, `npm run format` (prettier on `src/`), `npm run build`. `type-check` reports 14 known errors (missing declarations for the GraphQL `.js` files and one `ChartLegend` size prop); `npm run build-only` passes.

Style: no semicolons, single quotes, width 100, 2-space indent (`.prettierrc.json`, `.editorconfig`). Alias `@` = `src/`.

## File map

```
backend/
  index.js                 Express + session + passport + Apollo (port 4000)
  db/connectDB.js          mongoose.connect
  passport/passport.config.js   serialize/deserialize + GraphQLLocalStrategy
  models/                  user.model.js, transaction.model.js
  typeDefs/                SDL strings, merged in index.js   (the API contract)
  resolvers/               user.resolver.js, transaction.resolver.js, merged in index.js
  seed.js                  demo user + 45 transactions
  Dockerfile
src/
  main.ts                  Apollo client (credentials: 'include'), router, mount
  App.vue                  Header when logged in, <RouterView>, <Toaster>
  router/index.ts          Routes + beforeEach auth guard (queries authUser, network-only)
  graphql/{queries,mutations}/*.js   gql documents (the client side of the contract)
  views/                   HomeView, loginView, signupView, NotFoundView
  components/              head, header, cards, chart, table, ThemeToggle, AuthLayout
  components/ui/           shadcn-vue primitives. Add via `npx shadcn-vue@latest add <name>`; avoid hand edits
  assets/base.css          Theme CSS variables (light/dark). main.css imports it
  lib/utils.ts             cn() = clsx + tailwind-merge
  lib/format.ts            formatMoney (EUR), categoryLabel, formatDate
docs/
  SHOWCASE.md, screenshots/   portfolio material
docker-compose.yml         MongoDB + backend for local testing
```

Currency is EUR (`src/lib/format.ts`). Font: Plus Jakarta Sans, bundled in `public/fonts` (OFL license).

## Domain

- User: `username` (unique), `email` (unique), `name`, `password` (bcrypt hash).
- Transaction: `userId`, `description`, `paymentType` (`cash` | `card`), `category`, `amount`, `date`.
- Category values stored: `saving`, `expense`, `investment`. The UI labels `saving` as **Income**. Do not rename the stored values without a migration.
- Apollo serializes `Date` as a millisecond-timestamp string; `formatDate` parses it.

## GraphQL contract (backend/typeDefs)

```
Query:    authUser: User
          user(userId: ID!): User
          transactions: [Transaction!]
          transaction(transactionId: ID!): Transaction
          categoryStatistics: [CategoryStatistics!]   # {category, totalAmount}
Mutation: register(input: RegisterInput!): User
          login(input: LoginInput!): User
          logout: LogoutResponse                       # {message}
          createTransaction(input: createTransactionInput!): Transaction
          updateTransaction(input: updateTransaction): Transaction
          deleteTransaction(transactionId: ID!): Transaction
```

A change to a type, field, or argument touches both `backend/typeDefs` + the resolver and `src/graphql/**` + the components that use it.

Auth flow: `login`/`register` set a session cookie (`connect.sid`, httpOnly, 1 day). The router guard runs `authUser` before every navigation. `requiresAuth: false` routes (`/login`, `/signup`) redirect logged-in users to `/`.

## Known limits

- No edit-transaction UI. `UPDATE_TRANSACTION` declares `$input: updateTransactionInput!`, but the schema type is `updateTransaction`, so the mutation fails validation.
- `GET_TRANSACTION` selects `user { ... }`, which `Transaction` does not have. `GET_USER_AND_TRANSACTIONS` calls `user(id:)`; the schema argument is `userId`. The `user` resolver and `User.transactions` resolver have bugs (wrong variable and field names). The frontend does not use these.
- Out of scope for this project: `User.password` is exposed in the GraphQL type; `transaction`, `updateTransaction`, and `deleteTransaction` have no ownership check; `register` and `login` log the plaintext password.
- Root `package.json` carries unused dependencies (`react`, `connect-mongodb-session`, `graphql-passport`, `dotenv`, `@vue/apollo-option`). `backend/package.json` does not declare `cors`, which `index.js` imports (it installs transitively). The backend `start` script uses POSIX env syntax and a wrong path, so it fails on Windows; use `npm run dev` or Docker.
- `tailwind.config.js` is CommonJS in an ESM package. It works; keep it in mind before changing the build config.
- The backend and a few front-end files log debug output with `console.log`.
