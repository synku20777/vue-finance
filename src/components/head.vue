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
</template>
