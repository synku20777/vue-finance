<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>

<template>
  <main class="grid min-h-svh place-items-center px-4 text-center">
    <div class="max-w-sm space-y-5">
      <p class="text-6xl font-light tabular-nums text-primary">404</p>
      <h1 class="text-3xl font-light tracking-tight">Page not found</h1>
      <p class="text-sm text-muted-foreground">The page you asked for does not exist.</p>
      <RouterLink
        to="/"
        class="inline-flex h-9 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Back to dashboard
      </RouterLink>
      <div class="pt-3">
        <ThemeToggle />
      </div>
    </div>
  </main>
</template>
