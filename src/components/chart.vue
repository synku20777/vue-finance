<script setup lang="ts">
import { DonutChart } from '@/components/ui/chart-donut'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GET_TRANSACTION_STATISTICS } from '@/graphql/queries/transaction.query'
import { useQuery } from '@vue/apollo-composable'
import { computed } from 'vue'
import { formatMoney } from '@/lib/format'

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

const net = computed(() => {
  return getTotalAmountByCategory('saving') - getTotalAmountByCategory('expense')
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-xl font-normal">Breakdown</CardTitle>
      <CardDescription>All transactions</CardDescription>
    </CardHeader>
    <CardContent>
      <div
        v-if="!data"
        class="mx-auto h-56 w-56 max-w-full animate-pulse rounded-full bg-muted motion-reduce:animate-none"
        role="status"
        aria-label="Loading breakdown"
      />
      <p
        v-else-if="chartData.every((d) => !d.total)"
        class="py-10 text-center text-sm text-muted-foreground"
      >
        No data yet. Add a transaction to see your breakdown.
      </p>
      <template v-else>
        <DonutChart
          class="h-56 items-center"
          index="name"
          category="total"
          :data="chartData"
          :colors="['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))']"
          :central-label="formatMoney(net)"
          central-sub-label="Net"
          :value-formatter="formatMoney"
          aria-label="Transaction breakdown. Values are listed below."
        />
        <ul class="mt-6 divide-y divide-border/60 text-sm">
          <li v-for="(item, i) in chartData" :key="item.name" class="flex items-center gap-2 py-3">
            <span
              class="size-2.5 shrink-0 rounded-full"
              :class="['bg-chart-1', 'bg-chart-2', 'bg-chart-3'][i]"
              aria-hidden="true"
            />
            <span>{{ item.name }}</span>
            <span class="ml-auto font-normal tabular-nums">{{ formatMoney(item.total) }}</span>
          </li>
        </ul>
      </template>
    </CardContent>
  </Card>
</template>
