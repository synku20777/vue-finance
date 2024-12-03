<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TrendingDown, TrendingUp, Euro } from 'lucide-vue-next'
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
</script>

<template>
  <div class="flex flex-row justify-between items-center pb-10">
    <h2 class="scroll-m-20 text-2xl font-semibold">Summary</h2>
    <div class="flex flex-row gap-2">
      <Button variant="secondary"> Add transaction </Button>
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

  <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
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

    <div class="col-span-3">
      <h3 class="pb-2 scroll-m-20 border-b text-xl font-bold">Transaction history</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader> Date </TableHeader>
            <TableHeader> Description </TableHeader>
            <TableHeader> Category </TableHeader>
            <TableHeader> Amount </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell> 12/12/2021 </TableCell>
            <TableCell> Salary </TableCell>
            <TableCell> Income </TableCell>
            <TableCell> $2000 </TableCell>
          </TableRow>
          <TableRow>
            <TableCell> 12/12/2021 </TableCell>
            <TableCell> Salary </TableCell>
            <TableCell> Income </TableCell>
            <TableCell> $2000 </TableCell>
          </TableRow>
          <TableRow>
            <TableCell> 12/12/2021 </TableCell>
            <TableCell> Salary </TableCell>
            <TableCell> Income </TableCell>
            <TableCell> $2000 </TableCell>
          </TableRow>
          <TableRow>
            <TableCell> 12/12/2021 </TableCell>
            <TableCell> Salary </TableCell>
            <TableCell> Income </TableCell>
            <TableCell> $2000 </TableCell>
          </TableRow>
          <TableRow>
            <TableCell> 12/12/2021 </TableCell>
            <TableCell> Salary </TableCell>
            <TableCell> Income </TableCell>
            <TableCell> $2000 </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
