<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Tabs } from '@/components/ui/tabs'
import Header from '@/components/header.vue'
import TabsList from './components/ui/tabs/TabsList.vue';
</script>

<template>
  <div class="hidden md:flex flex-col">
    <div class="border-b">
      <div class="flex h-16 items-center px-4">
        <Header />
      </div>
      <Tabs default-value="Home" class="space-y-4">
        <TabsList>
          <TabsTrigger value="Home">
            <RouterLink to="/">
              Home
            </RouterLink>
          </TabsTrigger>
          <TabsTrigger value="settings">
            <RouterLink to="/settings">
              Settings
            </RouterLink>
          </TabsTrigger>
          <TabsTrigger value="about">
            <RouterLink to="/about">
              About
            </RouterLink>
          </TabsTrigger>
          
        </TabsList>
      </Tabs>
    </div>
    <RouterView />
  </div>
</template>
