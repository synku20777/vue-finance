import './assets/main.css'

import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:4000/graphql',
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  credentials: 'include',
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

const app = createApp({
  render: () => h(App),
})

app.use(router)
app.use(apolloProvider)

app.mount('#app')
