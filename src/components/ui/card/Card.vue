<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="
      cn('rounded-lg border-[0.5px] border-border/60 bg-card text-card-foreground', props.class)
    "
  >
    <slot />
  </div>
</template>
