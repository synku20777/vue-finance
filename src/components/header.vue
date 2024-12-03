<template>
    <header class="container py-3 flex justify-between items-center">
        
      <h1 class="text-lg font-bold">Finance Tracker</h1>
      <div class="flex items-center space-x-4">
        <ThemeToggle />
        <span>Welcome, User</span>
        <button class="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded">Logout</button>
      </div>
    </header>
  </template>
  
  <script lang="ts">
    import ThemeToggle from '@/components/ThemeToggle.vue';
  import { defineComponent } from "vue";

  
  export default defineComponent({
    name: "Header",
    components: {
    ThemeToggle,
  },
  });
  </script>
  