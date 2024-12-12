<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
</script>

<template>
  <main>
    <Tabs default-value="settings" class="space-y-4">
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
    Hello from settings!
  </main>
</template>
