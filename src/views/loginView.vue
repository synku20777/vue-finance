<script setup lang="ts" name="LoginView">
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import type { FetchResult } from '@apollo/client'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LOGIN } from '../graphql/mutations/user.mutation'
import { GET_AUTHENTICATED_USER } from '../graphql/queries/user.query'

const router = useRouter()
const toast = useToast()

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

onDone(
  ({ data }: FetchResult<{ login: { user: { id: string; name: string; email: string } } }>) => {
    console.log('User logged in:', data)
    toast.success('Login successful!')
    router.push('/') // Redirect to home page after successful login
  },
)

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
    console.error('Error logging in:', error)
    toast.error((error as Error).message)
  }
}
</script>

<template>
  <Card class="w-full max-w-sm mx-auto">
    <CardHeader>
      <CardTitle class="text-2xl">Login</CardTitle>
      <CardDescription>Enter your credentials to login to your account.</CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="handleSubmit" class="grid gap-4">
        <div class="grid gap-2">
          <Label for="username">Username</Label>
          <Input
            id="username"
            v-model="loginData.username"
            onChange="{handleChange}"
            placeholder="Username"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
            onChange="{handleChange}"
            v-model="loginData.password"
            required
          />
        </div>
        <Button type="submit" :disabled="loading" class="w-full">{{
          loading ? 'Loading...' : 'Login'
        }}</Button>
      </form>
      <div class="mt-4 text-center text-sm">
        Don't have an account?
        <router-link to="/signup" class="underline">Sign Up</router-link>
      </div>
    </CardContent>
  </Card>
</template>
