<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
</script>

<template>
  <div class="about">
    <Tabs default-value="about" class="space-y-4">
      <TabsList>
        <RouterLink to="/">
          <TabsTrigger value="Home"> Home </TabsTrigger>
        </RouterLink>
        <RouterLink to="/settings">
          <TabsTrigger value="settings"> Settings </TabsTrigger>
        </RouterLink>
        <RouterLink to="/about">
          <TabsTrigger value="about"> About </TabsTrigger>
        </RouterLink>
      </TabsList>
    </Tabs>
    <h1>This is an about page</h1>
  </div>
</template>
