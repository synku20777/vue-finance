<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
import { computed } from 'vue'
import Header from '@/components/header.vue'
// import { ApolloClients } from '@vue/apollo-composable'
import { useQuery } from '@vue/apollo-composable'
import { GET_AUTHENTICATED_USER } from '@/graphql/queries/user.query'

const authUser = true
const { loading, result: data, error } = useQuery(GET_AUTHENTICATED_USER)
console.log('Loading:', loading)
console.log('User:', data.value)
console.log('Error:', error)

// const isAuthenticated = computed(() => {
//   return data?.value && data?.value.authenticatedUser
// })
</script>

<template>
  <div class="flex md:flex flex-col">
    <div class="border-b">
      <div class="flex h-16 items-center px-4">
        <Header />
      </div>
    </div>
    <div class="container flex justify-center space-y-4 py-6">
      <RouterView />
    </div>
  </div>
</template>
