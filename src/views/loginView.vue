<script setup lang="ts" name="LoginView">
import { ref } from 'vue'
import AuthLayout from '@/components/AuthLayout.vue'
import { useMutation } from '@vue/apollo-composable'
import { useRouter } from 'vue-router'
import { useToast } from '@/components/ui/toast/use-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LOGIN } from '../graphql/mutations/user.mutation'
import { GET_AUTHENTICATED_USER } from '../graphql/queries/user.query'

const router = useRouter()
const { toast } = useToast()

// Reactive state for form data
const loginData = ref({
  username: '',
  password: '',
})

const {
  mutate: login,
  loading,
  onDone,
} = useMutation(LOGIN, {
  refetchQueries: [{ query: GET_AUTHENTICATED_USER }],
})

onDone(() => {
  toast({
    title: 'Welcome back',
  })
  router.push('/')
})

const handleSubmit = async (event: Event) => {
  event.preventDefault()
  try {
    await login({
      input: {
        username: loginData.value.username,
        password: loginData.value.password,
      },
    })
  } catch (error) {
    toast({
      title: 'Login failed',
      description: (error as Error).message,
      variant: 'destructive',
    })
  }
}
</script>

<template>
  <AuthLayout>
    <Card class="w-full max-w-sm border-0 bg-transparent shadow-none">
      <CardHeader>
        <CardTitle class="text-4xl font-light tracking-tight">Log in</CardTitle>
        <CardDescription>Welcome back. Log in to see your finances.</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleSubmit" class="grid gap-5" :aria-busy="loading">
          <div class="grid gap-2">
            <Label for="username">Username</Label>
            <Input
              id="username"
              v-model="loginData.username"
              autocomplete="username"
              autofocus
              placeholder="Your username"
              required
            />
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input
              id="password"
              type="password"
              v-model="loginData.password"
              autocomplete="current-password"
              required
            />
          </div>
          <Button type="submit" :disabled="loading" class="mt-2 w-full">
            {{ loading ? 'Logging in...' : 'Log in' }}
          </Button>
        </form>
        <p class="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?
          <RouterLink
            to="/signup"
            class="rounded-sm text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >Create one</RouterLink
          >
        </p>
      </CardContent>
    </Card>
  </AuthLayout>
</template>
