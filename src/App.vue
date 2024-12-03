<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList,TabsTrigger } from '@/components/ui/tabs'
import Header from '@/components/header.vue'
</script>

<template>
  <div class="hidden md:flex flex-col">
    <div class="border-b">
      <div class="flex h-16 items-center px-4">
        <Header />
      </div>
    </div>
    <div class="container flex-1 space-y-4 py-6">
    <Tabs default-value="Home" class="space-y-4">
        <TabsList>
          <RouterLink to="/">
            <TabsTrigger value="Home">
              Home
            </TabsTrigger>
            </RouterLink>
          <RouterLink to="/settings">
          <TabsTrigger value="settings" >
              Settings
          </TabsTrigger>
        </RouterLink>
            <RouterLink to="/about">
            <TabsTrigger value="about">
              About
            </TabsTrigger>
            </RouterLink>
          
        </TabsList>
      </Tabs>
    <RouterView />
  </div>
</div>
</template>
