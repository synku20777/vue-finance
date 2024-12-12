<script setup lang="ts">
import Head from '../components/head.vue'
import Cards from '../components/cards.vue'
import Chart from '../components/chart.vue'
import Table from '../components/table.vue'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
</script>

<template>
  <main>
    <Tabs default-value="Home" class="space-y-4">
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
    <Head />
    <div class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-x-10 gap-y-10">
      <div class="col-span-3 flex flex-col gap-4">
        <div class="grow">
          <Chart />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-2">
          <Cards />
        </div>
      </div>
      <Table />
    </div>
  </main>
</template>
