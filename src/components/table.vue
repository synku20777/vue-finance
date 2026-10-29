<script setup lang="ts">
import { computed, ref } from 'vue'
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
import { GET_TRANSACTIONS } from '@/graphql/queries/transaction.query'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { DELETE_TRANSACTION } from '@/graphql/mutations/transaction.mutation'
import { useToast } from '@/components/ui/toast/use-toast'
import { formatDate, formatMoney, categoryLabel } from '@/lib/format'
import { Trash2 } from 'lucide-vue-next'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface TransactionRow {
  id: string
  date: string | number
  description: string
  category: string
  amount: number
  paymentType: string
}

const { toast } = useToast()
const { result, loading, error } = useQuery(GET_TRANSACTIONS)

const deletingId = ref('')

const rows = computed(() => {
  const txs = result.value?.transactions
  if (!txs || !Array.isArray(txs)) return []
  return [...txs].sort(
    (a: TransactionRow, b: TransactionRow) => Number(b.date) - Number(a.date),
  )
})

const { mutate: deleteTransaction, loading: deleteLoading } = useMutation(DELETE_TRANSACTION, {
  refetchQueries: ['GetTransactions', 'GetTransactionStatistics'],
})

const handleDelete = async (transactionId: string) => {
  deletingId.value = transactionId
  const description =
    rows.value.find((t: TransactionRow) => t.id === transactionId)?.description || 'transaction'
  try {
    await deleteTransaction({ transactionId })
    toast({
      title: `Deleted ${description}`,
    })
  } catch {
    toast({
      variant: 'destructive',
      title: 'Could not delete',
    })
  } finally {
    deletingId.value = ''
  }
}
</script>

<template>
  <Card :aria-busy="loading || deleteLoading">
    <CardHeader>
      <CardTitle class="text-xl font-normal">Transactions</CardTitle>
      <CardDescription>Newest first</CardDescription>
    </CardHeader>
    <CardContent class="px-3 pb-3 sm:px-6 sm:pb-6">
      <div class="max-h-[28rem] overflow-y-auto">
        <Table class="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead
                class="hidden w-28 whitespace-nowrap text-xs font-normal text-muted-foreground sm:table-cell"
                >Date</TableHead
              >
              <TableHead class="text-xs font-normal text-muted-foreground">Description</TableHead>
              <TableHead
                class="hidden w-28 whitespace-nowrap text-xs font-normal text-muted-foreground sm:table-cell"
                >Category</TableHead
              >
              <TableHead
                class="w-28 whitespace-nowrap px-2 text-right text-xs font-normal text-muted-foreground sm:w-32"
                >Amount</TableHead
              >
              <TableHead class="w-10 px-1"><span class="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <template v-if="loading">
              <TableRow v-for="n in 3" :key="n" aria-label="Loading transaction">
                <TableCell class="hidden sm:table-cell"
                  ><div
                    class="h-4 w-full animate-pulse rounded bg-muted motion-reduce:animate-none"
                /></TableCell>
                <TableCell
                  ><div
                    class="h-8 w-full animate-pulse rounded bg-muted motion-reduce:animate-none"
                /></TableCell>
                <TableCell class="hidden sm:table-cell"
                  ><div
                    class="h-4 w-full animate-pulse rounded bg-muted motion-reduce:animate-none"
                /></TableCell>
                <TableCell
                  ><div
                    class="ml-auto h-4 w-16 animate-pulse rounded bg-muted motion-reduce:animate-none"
                /></TableCell>
                <TableCell class="px-1"
                  ><div class="h-4 w-4 animate-pulse rounded bg-muted motion-reduce:animate-none"
                /></TableCell>
              </TableRow>
            </template>
            <TableRow v-else-if="error">
              <TableCell colspan="3" class="text-destructive sm:hidden" role="alert">
                Could not load transactions. Refresh the page to try again.
              </TableCell>
              <TableCell colspan="5" class="hidden text-destructive sm:table-cell" role="alert">
                Could not load transactions. Refresh the page to try again.
              </TableCell>
            </TableRow>
            <TableRow v-else-if="!rows.length">
              <TableCell colspan="3" class="py-10 text-center text-muted-foreground sm:hidden">
                No transactions yet. Add your first one.
              </TableCell>
              <TableCell
                colspan="5"
                class="hidden py-10 text-center text-muted-foreground sm:table-cell"
              >
                No transactions yet. Add your first one.
              </TableCell>
            </TableRow>
            <template v-else>
              <TableRow v-for="t in rows" :key="t.id">
                <TableCell class="hidden whitespace-nowrap text-muted-foreground sm:table-cell">{{
                  formatDate(t.date)
                }}</TableCell>
                <TableCell class="break-words">
                  {{ t.description }}
                  <div class="mt-0.5 text-xs text-muted-foreground">
                    <span class="capitalize">{{ t.paymentType }}</span>
                    <span class="sm:hidden"> &middot; {{ categoryLabel(t.category) }}</span>
                  </div>
                  <div class="mt-0.5 text-xs text-muted-foreground sm:hidden">
                    {{ formatDate(t.date) }}
                  </div>
                </TableCell>
                <TableCell class="hidden sm:table-cell">
                  <span
                    class="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium"
                    :class="{
                      'bg-success/10 text-success': t.category === 'saving',
                      'bg-destructive/10 text-destructive': t.category === 'expense',
                      'bg-chart-3/10 text-chart-3': t.category === 'investment',
                    }"
                  >
                    <span class="size-1.5 rounded-full bg-current" aria-hidden="true" />
                    {{ categoryLabel(t.category) }}
                  </span>
                </TableCell>
                <TableCell
                  class="whitespace-nowrap px-2 text-right font-normal tabular-nums"
                  :class="{ 'text-success': t.category === 'saving' }"
                >
                  {{ t.category === 'expense' ? '-' : t.category === 'saving' ? '+' : ''
                  }}{{ formatMoney(t.amount) }}
                </TableCell>
                <TableCell class="px-1">
                  <AlertDialog>
                    <AlertDialogTrigger as-child>
                      <Button
                        variant="ghost"
                        size="icon"
                        class="size-8 text-muted-foreground hover:text-destructive"
                        :aria-label="`Delete ${t.description}`"
                        :disabled="deletingId === t.id"
                      >
                        <Trash2 class="size-4" aria-hidden="true" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent class="max-w-[calc(100%-2rem)] rounded-xl sm:max-w-sm">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete this transaction?</AlertDialogTitle>
                        <AlertDialogDescription class="break-words">
                          &quot;{{ t.description }}&quot; will leave your totals. You cannot undo
                          this.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          class="border-0 bg-transparent text-primary shadow-none hover:bg-accent hover:text-accent-foreground"
                          >Keep</AlertDialogCancel
                        >
                        <AlertDialogAction
                          class="bg-destructive text-destructive-foreground hover:brightness-95"
                          @click="handleDelete(t.id)"
                          >Delete</AlertDialogAction
                        >
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            </template>
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
</template>
