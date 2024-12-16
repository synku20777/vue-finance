<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-vue-next'
import { GET_TRANSACTIONS } from '@/graphql/queries/transaction.query'
import { useQuery } from '@vue/apollo-composable'

const { result, loading, error } = useQuery(GET_TRANSACTIONS)

const formatDate = (dateString: string) => {
  const date = new Date(parseInt(dateString))
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}
</script>

<template>
  <div class="col-span-3 h-full">
    <Card class="xl:col-span-2">
      <CardHeader class="flex flex-row items-center border-b">
        <div class="grid gap-2">
          <CardTitle>Transactions</CardTitle>
          <CardDescription> Recent transactions </CardDescription>
        </div>
        <Button as-child size="sm" class="ml-auto gap-1">
          <a href="#">
            View All
            <ArrowUpRight class="h-4 w-4" />
          </a>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableHead> Date </TableHead>
            <TableHead> Description </TableHead>
            <TableHead> Category </TableHead>
            <TableHead> Amount </TableHead>
          </TableHeader>
          <TableBody>
            <TableRow v-if="loading">
              <TableCell colspan="4">Loading...</TableCell>
            </TableRow>
            <TableRow v-else-if="error">
              <TableCell colspan="4">Error: {{ error.message }}</TableCell>
            </TableRow>
            <TableRow v-else v-for="transaction in result.transactions" :key="transaction.id">
              <TableCell> {{ formatDate(transaction.date) }} </TableCell>
              <TableCell> {{ transaction.description }} </TableCell>
              <TableCell> {{ transaction.category }} </TableCell>
              <TableCell> ${{ transaction.amount }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>
