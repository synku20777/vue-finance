<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/header.vue'
// import { ApolloClients } from '@vue/apollo-composable'
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
