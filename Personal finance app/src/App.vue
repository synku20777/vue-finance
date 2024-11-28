<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { Button } from '@/components/ui/button'
import Header from '@/components/header.vue'
</script>

<template>
  <div class="hidden md:flex flex-col">
    <div class="border-b">
      <div class="flex h-16 items-center px-4">
        <Header />
      </div>
    </div>
    
  
    <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <Button>Click me</Button>
    </div>
  </header>

    <RouterView />
  </div>
</template>
