<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingDown, TrendingUp, Euro } from 'lucide-vue-next'
import { GET_TRANSACTION_STATISTICS } from '@/graphql/queries/transaction.query'
import { useQuery } from '@vue/apollo-composable'

const { result: data } = useQuery(GET_TRANSACTION_STATISTICS)

const getTotalAmountByCategory = (category: string) => {
  const stat = data.value?.categoryStatistics.find(
    (stat: { category: string; totalAmount: number }) => stat.category === category,
  )
  return stat ? stat.totalAmount : 0
}
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row items-center gap-2 space-y-0 pb-2">
      <TrendingUp :size="20" :stroke-width="1.5" />
      <CardTitle class="text-sm"> Total Income </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="text-2xl font-bold">{{ getTotalAmountByCategory('saving') }}$</div>
    </CardContent>
  </Card>
  <Card>
    <CardHeader class="flex flex-row items-center gap-2 space-y-0 pb-2">
      <TrendingDown :size="20" :stroke-width="1.5" />
      <CardTitle class="text-sm"> Total Expenses </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="text-2xl font-bold">{{ getTotalAmountByCategory('expense') }}$</div>
    </CardContent>
  </Card>
  <Card>
    <CardHeader class="flex flex-row items-center gap-2 space-y-0 pb-2">
      <Euro :size="20" :stroke-width="1.5" />
      <CardTitle class="text-sm"> Total Investments </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="text-2xl font-bold">{{ getTotalAmountByCategory('investment') }}$</div>
    </CardContent>
  </Card>
</template>
