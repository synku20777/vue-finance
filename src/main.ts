import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
// import { useToast } from '@/components/ui/toast/use-toast'
// import Toast, { POSITION } from 'vue-toastification'
import type { PluginOptions } from 'vue-toastification'
// import 'vue-toastification/dist/index.css'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include', // Ensure credentials are included in requests
})

// const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  credentials: 'include', // Ensure credentials are included in requests
})

const app = createApp(App)

// const options: PluginOptions = {
//   position: POSITION.TOP_RIGHT,
//   timeout: 5000,
//  }
app.provide(DefaultApolloClient, apolloClient)
app.use(router)
// app.use(Toast, options)

app.mount('#app')
