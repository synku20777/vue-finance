<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import Input from './ui/input/Input.vue'
import { CREATE_TRANSACTION } from '@/graphql/mutations/transaction.mutation'
import { useMutation } from '@vue/apollo-composable'
import { useToast } from '@/components/ui/toast/use-toast'
import { formatMoney } from '@/lib/format'

const { toast } = useToast()

const open = ref(false)
const formKey = ref(0)

const now = new Date()
const year = now.getFullYear()
const month = String(now.getMonth() + 1).padStart(2, '0')
const day = String(now.getDate()).padStart(2, '0')
const today = `${year}-${month}-${day}`

const { mutate: createTransaction, loading } = useMutation(CREATE_TRANSACTION, {
  refetchQueries: ['GetTransactions', 'GetTransactionStatistics'],
})
void loading

const handleSubmit = async (e: Event) => {
  e.preventDefault()

  const form = e.target as HTMLFormElement
  const formData = new FormData(form)

  const description = (formData.get('description') as string) || ''
  const paymentType = (formData.get('paymentType') as string) || ''
  const category = (formData.get('category') as string) || ''
  const rawAmount = formData.get('amount') as string
  const amount = parseFloat(rawAmount || '0')
  const date = (formData.get('date') as string) || today

  if (!category) {
    toast({
      variant: 'destructive',
      title: 'Choose a type.',
    })
    return
  }

  if (!paymentType) {
    toast({
      variant: 'destructive',
      title: 'Choose how you paid.',
    })
    return
  }

  if (isNaN(amount) || amount <= 0) {
    toast({
      variant: 'destructive',
      title: 'Enter an amount like 12.50.',
    })
    return
  }

  const transactionData = {
    description,
    paymentType,
    category,
    amount,
    date,
  }

  try {
    await createTransaction({ input: transactionData })

    form.reset()
    formKey.value++
    open.value = false

    toast({
      title: `Added ${description}`,
      description: formatMoney(amount),
    })
  } catch {
    toast({
      variant: 'destructive',
      title: 'Could not save',
      description: 'Check your connection and try again.',
    })
  }
}
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-4">
    <div>
      <h1 class="text-4xl font-light tracking-tight">Overview</h1>
      <p class="mt-2 text-sm text-muted-foreground">Your income, spending, and investments.</p>
    </div>
    <Sheet v-model:open="open">
      <SheetTrigger as-child>
        <Button class="gap-2"><Plus class="size-4" aria-hidden="true" /> Add transaction</Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        class="mx-auto max-h-[calc(100svh-1rem)] w-full overflow-y-auto rounded-t-xl border-t-[0.5px] bg-card px-6 pb-8 pt-7 sm:max-w-lg"
      >
        <SheetHeader>
          <SheetTitle>Add transaction</SheetTitle>
          <SheetDescription>Record income, an expense, or an investment.</SheetDescription>
        </SheetHeader>
        <form :key="formKey" class="mt-7 space-y-5" @submit="handleSubmit" :aria-busy="loading">
          <div class="grid gap-2">
            <Label for="category">Type</Label>
            <Select name="category" required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Choose a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="saving">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="grid gap-2">
            <Label for="amount">Amount (EUR)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              min="0.01"
              inputmode="decimal"
              required
              placeholder="12.50"
            />
          </div>
          <div class="grid gap-2">
            <Label for="description">Description</Label>
            <Input
              id="description"
              name="description"
              type="text"
              required
              placeholder="Groceries"
            />
          </div>
          <div class="grid gap-2">
            <Label for="paymentType">Paid with</Label>
            <Select name="paymentType" required>
              <SelectTrigger id="paymentType">
                <SelectValue placeholder="Choose card or cash" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="grid gap-2">
            <Label for="date">Date</Label>
            <Input id="date" name="date" type="date" :default-value="today" required />
          </div>
          <SheetFooter>
            <Button type="submit" class="mt-3 w-full" :disabled="loading">
              {{ loading ? 'Saving...' : 'Add transaction' }}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  </div>
</template>
