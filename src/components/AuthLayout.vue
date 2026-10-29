<script setup lang="ts">
import { Wallet } from 'lucide-vue-next'
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>

<template>
  <div class="grid min-h-svh lg:grid-cols-2">
    <aside
      class="auth-brand-panel relative hidden flex-col justify-between gap-10 overflow-hidden border-r-[0.5px] p-12 lg:flex"
    >
      <div class="flex items-center gap-3 text-lg font-medium">
        <Wallet class="size-6 text-primary" aria-hidden="true" />
        Finance Tracker
      </div>
      <div aria-hidden="true" class="w-full max-w-sm rounded-xl border-[0.5px] bg-card/90 p-8">
        <p class="text-sm text-muted-foreground">Example month</p>
        <p class="mt-4 text-5xl font-light tracking-tight tabular-nums">+&euro;2,430</p>
      </div>
      <p class="max-w-sm text-2xl font-light leading-relaxed">
        Track income, expenses, and investments in one place.
      </p>
    </aside>
    <main
      class="relative flex min-w-0 items-center justify-center bg-card px-4 pb-10 pt-24 sm:px-6 lg:p-10"
    >
      <ThemeToggle class="absolute right-4 top-4" />
      <div class="w-full max-w-sm">
        <div class="mb-8 flex items-center justify-center gap-2 text-lg font-medium lg:hidden">
          <Wallet class="size-6 text-primary" aria-hidden="true" />
          Finance Tracker
        </div>
        <slot />
      </div>
    </main>
  </div>
</template>
