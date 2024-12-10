<script setup lang="ts">
import Head from '../components/head.vue'
import Cards from '../components/cards.vue'
import Chart from '../components/chart.vue'
import Table from '../components/table.vue'
</script>

<template>
  <main>
    <Head />
    <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-x-10 gap-y-1">
      <div class="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-2">
        <div class="col-span-3 row-span-4">
          <Chart />
        </div>
        <Cards />
      </div>
      <Table />
    </div>
  </main>
</template>
