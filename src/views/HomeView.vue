<script setup lang="ts">
import Head from '../components/head.vue'
import Cards from '../components/cards.vue'
import Chart from '../components/chart.vue'
import Table from '../components/table.vue'
</script>

<template>
  <main class="container max-w-[1400px] space-y-7 py-8 sm:py-10">
    <Head />
    <div class="grid gap-4 sm:grid-cols-3 lg:gap-6">
      <Cards />
    </div>
    <div class="grid gap-6 lg:grid-cols-5">
      <Chart class="min-w-0 lg:col-span-2" />
      <Table class="min-w-0 lg:col-span-3" />
    </div>
  </main>
</template>
