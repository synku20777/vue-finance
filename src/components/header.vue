<template>
  <header class="sticky top-0 z-30 border-b-[0.5px] bg-card/80 backdrop-blur-xl">
    <div class="container max-w-[1400px] flex h-16 items-center justify-between">
      <RouterLink
        to="/"
        class="rounded-sm text-base font-medium tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Finance Tracker
      </RouterLink>
      <div class="flex items-center gap-2">
        <span
          v-if="userName"
          class="hidden max-w-48 truncate text-sm text-muted-foreground sm:inline"
        >
          {{ userName }}
        </span>
        <ThemeToggle />
        <button
          class="inline-flex h-9 items-center rounded-full px-2 text-sm text-primary transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          @click="handleLogout"
        >
          Log out
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { useToast } from '@/components/ui/toast/use-toast'
import { LOGOUT } from '@/graphql/mutations/user.mutation'
import { GET_AUTHENTICATED_USER } from '@/graphql/queries/user.query'

const { toast } = useToast()
const { result } = useQuery(GET_AUTHENTICATED_USER)
const userName = computed(() => result.value?.authUser?.username || '')
void userName.value

const { mutate: logout } = useMutation(LOGOUT, {
  context: {
    credentials: 'include',
  },
})

const handleLogout = async () => {
  try {
    await logout()
    toast({
      title: 'Logged out',
    })
    window.location.reload()
  } catch {
    toast({
      variant: 'destructive',
      title: 'Could not log out',
      description: 'Try again in a moment.',
    })
  }
}
</script>
