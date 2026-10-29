<script setup lang="ts">
import type { AlertDialogTitleProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { AlertDialogTitle } from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<AlertDialogTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <AlertDialogTitle v-bind="delegatedProps" :class="cn('text-xl font-normal', props.class)">
    <slot />
  </AlertDialogTitle>
</template>
