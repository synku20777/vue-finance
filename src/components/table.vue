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
</script>

<template>
  <div class="col-span-3 h-full">
    <Card class="xl:col-span-2">
      <CardHeader class="flex flex-row items-center border-b">
        <div class="grid gap-2">
          <CardTitle>Transactions</CardTitle>
          <CardDescription> Recent transactions from your store. </CardDescription>
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
            <TableRow>
              <TableCell> 12/12/2021 </TableCell>
              <TableCell> Salary </TableCell>
              <TableCell> Income </TableCell>
              <TableCell> $2000 </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>
