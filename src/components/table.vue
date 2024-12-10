<script setup lang="ts">
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
  <div class="col-span-3 row-span-12">
    <h3 class="pb-2 scroll-m-20 border-b text-xl font-bold">Transaction history</h3>
    <Table>
      <TableHead>
        <TableCell> Date </TableCell>
        <TableCell> Description </TableCell>
        <TableCell> Category </TableCell>
        <TableCell> Amount </TableCell>
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
</template>
