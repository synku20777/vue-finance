<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { TrendingDown, TrendingUp, PiggyBank } from 'lucide-vue-next'
import { formatMoney } from '@/lib/format'
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
  <Card class="min-w-0 p-6">
    <div class="flex items-center justify-between gap-2">
      <p class="text-sm text-muted-foreground">Total income</p>
      <span class="grid size-8 shrink-0 place-items-center rounded-full bg-success/10 text-success">
        <TrendingUp class="size-4" aria-hidden="true" />
      </span>
    </div>
    <p v-if="data" class="mt-4 break-words text-3xl font-light tracking-tight tabular-nums">
      {{ formatMoney(getTotalAmountByCategory('saving')) }}
    </p>
    <div
      v-else
      class="mt-3 h-9 w-28 animate-pulse rounded-full bg-muted motion-reduce:animate-none"
      role="status"
      aria-label="Loading total income"
    />
  </Card>
  <Card class="min-w-0 p-6">
    <div class="flex items-center justify-between gap-2">
      <p class="text-sm text-muted-foreground">Total expenses</p>
      <span
        class="grid size-8 shrink-0 place-items-center rounded-full bg-destructive/10 text-destructive"
      >
        <TrendingDown class="size-4" aria-hidden="true" />
      </span>
    </div>
    <p v-if="data" class="mt-4 break-words text-3xl font-light tracking-tight tabular-nums">
      {{ formatMoney(getTotalAmountByCategory('expense')) }}
    </p>
    <div
      v-else
      class="mt-3 h-9 w-28 animate-pulse rounded-full bg-muted motion-reduce:animate-none"
      role="status"
      aria-label="Loading total expenses"
    />
  </Card>
  <Card class="min-w-0 p-6">
    <div class="flex items-center justify-between gap-2">
      <p class="text-sm text-muted-foreground">Total investments</p>
      <span class="grid size-8 shrink-0 place-items-center rounded-full bg-chart-3/10 text-chart-3">
        <PiggyBank class="size-4" aria-hidden="true" />
      </span>
    </div>
    <p v-if="data" class="mt-4 break-words text-3xl font-light tracking-tight tabular-nums">
      {{ formatMoney(getTotalAmountByCategory('investment')) }}
    </p>
    <div
      v-else
      class="mt-3 h-9 w-28 animate-pulse rounded-full bg-muted motion-reduce:animate-none"
      role="status"
      aria-label="Loading total investments"
    />
  </Card>
</template>
