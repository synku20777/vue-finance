<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TrendingDown, TrendingUp, Euro } from 'lucide-vue-next'
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row items-center gap-2 space-y-0 pb-2">
      <TrendingUp :size="20" :stroke-width="1.5" />
      <CardTitle class="text-sm"> Total Income </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="text-2xl font-bold">$45,231.89</div>
      <p class="text-xs text-muted-foreground">+20.1% from last month</p>
    </CardContent>
  </Card>
  <Card>
    <CardHeader class="flex flex-row items-center gap-2 space-y-0 pb-2">
      <TrendingDown :size="20" :stroke-width="1.5" />
      <CardTitle class="text-sm"> Total Expenses </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="text-2xl font-bold">20000$</div>
      <p class="text-xs text-muted-foreground">+20.1% from last month</p>
    </CardContent>
  </Card>
  <Card>
    <CardHeader class="flex flex-row items-center gap-2 space-y-0 pb-2">
      <Euro :size="20" :stroke-width="1.5" />
      <CardTitle class="text-sm"> Net Balance </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="text-2xl font-bold">900,231.89</div>
      <p class="text-xs text-muted-foreground">+999.1% from last month</p>
    </CardContent>
  </Card>
</template>
