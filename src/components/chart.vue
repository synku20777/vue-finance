<script setup lang="ts">
import { DonutChart } from '@/components/ui/chart-donut'
import { GET_TRANSACTION_STATISTICS } from '@/graphql/queries/transaction.query'
import { useQuery } from '@vue/apollo-composable'
import { computed } from 'vue'

const { result: data } = useQuery(GET_TRANSACTION_STATISTICS)

const getTotalAmountByCategory = (category: string) => {
  const stat = data.value?.categoryStatistics.find(
    (stat: { category: string; totalAmount: number }) => stat.category === category,
  )
  return stat ? stat.totalAmount : 0
}

const chartData = computed(() => {
  return [
    { name: 'Expenses', total: getTotalAmountByCategory('expense') },
    { name: 'Income', total: getTotalAmountByCategory('saving') },
    { name: 'Investments', total: getTotalAmountByCategory('investment') },
  ]
})
</script>

<template>
  <DonutChart
    index="name"
    :category="'total'"
    :data="chartData"
    :colors="['red', 'green', 'blue']"
  />
</template>
