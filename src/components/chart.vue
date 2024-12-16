<script setup lang="ts">
import { DonutChart } from '@/components/ui/chart-donut'
import { GET_TRANSACTION_STATISTICS } from '@/graphql/queries/transaction.query'
import { useQuery } from '@vue/apollo-composable'
import { computed } from 'vue'

const { result: data } = useQuery(GET_TRANSACTION_STATISTICS)
// const getTotalAmountByCategory = (category: string) => {
//   const stat = data.value?.transactionStatistics.find(
//     (stat: { category: string; total: number }) => stat.category === category,
//   )
//   return stat ? stat.total : 0
// }

// const chartData = computed(() => {
//   const chartDataArray =
//     data.value?.transactionStatistics.map((stat: { category: string; total: number }) => ({
//       name: stat.category,
//       total: getTotalAmountByCategory(stat.category),
//     })) || []

//   console.log('Chart Data:', chartDataArray)
//   return chartDataArray
// })
</script>

<template>
  <DonutChart index="category" :category="'total'" :data="data" />
</template>
