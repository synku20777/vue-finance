<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
  // FormControl,
  // FormDescription,
  FormField,
  // FormItem,
  FormLabel,
  // FormMessage,
} from '@/components/ui/form'
import Input from './ui/input/Input.vue'
import { CREATE_TRANSACTION } from '@/graphql/mutations/transaction.mutation'
import { useMutation } from '@vue/apollo-composable'
import { useToast } from '@/components/ui/toast/use-toast'

const toast = useToast()

const { mutate: createTransaction } = useMutation(CREATE_TRANSACTION, {
  refetchQueries: ['GetTransactions', 'GetTransactionStatistics'],
})
const handleSubmit = async (e: Event) => {
  e.preventDefault()
  console.log('Form submission started')

  const form = e.target as HTMLFormElement
  const formData = new FormData(form)
  const transactionData = {
    description: formData.get('description'),
    paymentType: formData.get('paymentType'),
    category: formData.get('category'),
    amount: parseFloat((formData.get('amount') as string) || '0'),
    date: formData.get('date'), // Replace with actual user ID
  }

  console.log('Transaction data:', transactionData)

  try {
    await createTransaction({ input: transactionData })
    console.log('Transaction created successfully')

    form.reset()
    toast.toast({
      title: 'Form successful!',
      description: `Welcome to financial tracker!`,
    })
  } catch (error) {
    console.error('Error creating transaction:', error)
    toast.toast({
      title: 'Error!',
      description: error instanceof Error ? error.message : String(error),
    })
  }
}
</script>

<template>
  <div class="flex flex-row justify-between items-center pb-10">
    <h2 class="scroll-m-20 text-2xl font-semibold">Summary</h2>
    <div class="flex flex-row gap-2">
      <Sheet>
        <SheetTrigger as-child>
          <Button variant="secondary"> Add transaction </Button>
        </SheetTrigger>
        <SheetContent class="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle class="">Add transaction</SheetTitle>
          </SheetHeader>
          <br />
          <form class="space-y-2" @submit="handleSubmit">
            <FormField name="description">
              <FormLabel for="description">Transaction</FormLabel>
              <Input
                id="description"
                name="description"
                type="text"
                required
                placeholder="Rent, Groceries, Salary, etc."
              />
            </FormField>
            <FormField name="paymentType">
              <FormLabel for="paymentType">Payment Type</FormLabel>
              <Select id="paymentType" name="paymentType">
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="card"> Card </SelectItem>
                    <SelectItem value="cash"> Cash </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormField>
            <FormField name="category">
              <FormLabel for="category">Category</FormLabel>
              <Select id="category" name="category">
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="saving"> Income </SelectItem>
                    <SelectItem value="expense"> Expense </SelectItem>
                    <SelectItem value="investment"> Investment </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormField>
            <FormField name="amount">
              <FormLabel for="amount">Amount($)</FormLabel>
              <Input id="amount" name="amount" type="number" placeholder="150" />
            </FormField>
            <FormField name="date">
              <FormLabel for="date">Date</FormLabel>
              <Input id="date" name="date" type="date" placeholder="Select date" />
            </FormField>
            <Button type="submit"> Submit </Button>
          </form>
        </SheetContent>
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button> Import Data </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem> Import from CSV </DropdownMenuItem>
            <DropdownMenuItem> Import from Excel </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel> Import from </DropdownMenuLabel>
            <DropdownMenuItem> Google Sheets </DropdownMenuItem>
            <DropdownMenuItem> Microsoft Excel </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel> Import from </DropdownMenuLabel>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <DropdownMenuItem> Google Drive </DropdownMenuItem>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem> Google Sheets </DropdownMenuItem>
                <DropdownMenuItem> Google Docs </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <DropdownMenuItem> Microsoft Office </DropdownMenuItem>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem> Excel </DropdownMenuItem>
                <DropdownMenuItem> Word </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuShortcut> Ctrl + Shift + I </DropdownMenuShortcut>
            <DropdownMenuItem> Import from browser </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem> Import from clipboard </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>
