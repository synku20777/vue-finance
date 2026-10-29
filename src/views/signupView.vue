<script setup lang="ts">
import { ref } from 'vue'
import AuthLayout from '@/components/AuthLayout.vue'
import { useMutation } from '@vue/apollo-composable'
import { useRouter } from 'vue-router'
import { useToast } from '@/components/ui/toast/use-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SIGN_UP } from '../graphql/mutations/user.mutation'
import { GET_AUTHENTICATED_USER } from '../graphql/queries/user.query'

const router = useRouter()
const { toast } = useToast()

// Reactive state for form data
const signUpData = ref({
  name: '',
  email: '',
  username: '',
  password: '',
})

const {
  mutate: register,
  loading,
  onDone,
} = useMutation(SIGN_UP, {
  refetchQueries: [{ query: GET_AUTHENTICATED_USER }],
})

onDone(() => {
  toast({
    title: 'Account created',
  })
  router.push('/')
})

const handleSubmit = async (event: Event) => {
  event.preventDefault()
  try {
    await register({
      input: {
        name: signUpData.value.name,
        email: signUpData.value.email,
        username: signUpData.value.username,
        password: signUpData.value.password,
      },
    })
  } catch (error) {
    toast({
      title: 'Error',
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
        <CardTitle class="text-4xl font-light tracking-tight">Create account</CardTitle>
        <CardDescription>Start tracking your money in a minute.</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleSubmit" class="grid gap-5" :aria-busy="loading">
          <div class="grid gap-2">
            <Label for="name">Name</Label>
            <Input
              id="name"
              v-model="signUpData.name"
              autocomplete="name"
              placeholder="Your name"
              required
            />
          </div>
          <div class="grid gap-2">
            <Label for="username">Username</Label>
            <Input
              id="username"
              v-model="signUpData.username"
              autocomplete="username"
              placeholder="Your username"
              required
            />
          </div>
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              v-model="signUpData.email"
              autocomplete="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input
              id="password"
              type="password"
              v-model="signUpData.password"
              autocomplete="new-password"
              minlength="6"
              aria-describedby="password-help"
              required
            />
            <p id="password-help" class="text-xs text-muted-foreground">
              Use at least 6 characters.
            </p>
          </div>
          <Button type="submit" :disabled="loading" class="mt-2 w-full">
            {{ loading ? 'Creating account...' : 'Create account' }}
          </Button>
        </form>
        <p class="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?
          <RouterLink
            to="/login"
            class="rounded-sm text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >Log in</RouterLink
          >
        </p>
      </CardContent>
    </Card>
  </AuthLayout>
</template>
