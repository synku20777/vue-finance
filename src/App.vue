<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
// import { computed } from 'vue'
// import router from '@/router'
import Header from '@/components/header.vue'
// import { ApolloClients } from '@vue/apollo-composable'
import { useQuery } from '@vue/apollo-composable'
import { GET_AUTHENTICATED_USER } from '@/graphql/queries/user.query'
// import { ToastInterface } from 'vue-toastification'
import Toaster from '@/components/ui/toast/Toaster.vue'

// const authUser = true
const { result: data } = useQuery(GET_AUTHENTICATED_USER)

// Define a global state or store to manage authentication status
// interface AuthUser {
//   id: string
//   name: string
//   email: string
// }

// let authUser: AuthUser | null = null
// let loadingAuth = true // Start with loadingAuth as true

// // Function to fetch the authenticated user
// const fetchAuthUser = async () => {
//   console.log('Fetching authenticated user...')
//   const { result, loading } = useQuery(GET_AUTHENTICATED_USER)

//   // Wait for the query to complete
//   while (loading.value) {
//     console.log('Waiting for user data...')
//     await new Promise((resolve) => setTimeout(resolve, 100))
//   }

//   // Update the authUser and loadingAuth state
//   authUser = result.value?.authUser
//   console.log('Authenticated user:', authUser)
//   loadingAuth = false
// }

// // Fetch the authenticated user when the app initializes
// fetchAuthUser()
</script>

<template>
  <div class="flex md:flex flex-col">
    <div v-if="data.authUser" class="border-b">
      <div class="flex h-16 items-center px-4">
        <Header />
      </div>
    </div>
    <div class="container flex justify-center space-y-4 py-6">
      <RouterView />
    </div>
  </div>
  <Toaster />
</template>
