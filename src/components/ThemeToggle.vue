<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
import { useColorMode } from '@vueuse/core'
import { Button } from '@/components/ui/button'

// Pass { disableTransition: false } to enable transitions
const mode = useColorMode()
</script>

<template>
  <div
    class="inline-flex shrink-0 gap-0.5 rounded-lg bg-muted p-0.5"
    role="group"
    aria-label="Appearance"
  >
    <Button
      variant="ghost"
      class="h-8 gap-1.5 rounded-md px-2 text-xs font-normal hover:text-foreground"
      :class="mode === 'light' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'"
      :aria-pressed="mode === 'light'"
      @click="mode = 'light'"
    >
      <Sun class="size-3.5" aria-hidden="true" />
      <span class="sr-only sm:not-sr-only">Light</span>
    </Button>
    <Button
      variant="ghost"
      class="h-8 gap-1.5 rounded-md px-2 text-xs font-normal hover:text-foreground"
      :class="mode === 'dark' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'"
      :aria-pressed="mode === 'dark'"
      @click="mode = 'dark'"
    >
      <Moon class="size-3.5" aria-hidden="true" />
      <span class="sr-only sm:not-sr-only">Dark</span>
    </Button>
  </div>
</template>
