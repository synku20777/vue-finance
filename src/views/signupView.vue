<script setup lang="ts">
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { useRouter } from 'vue-router'
import { useToast } from '@/components/ui/toast/use-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SIGN_UP } from '../graphql/mutations/user.mutation'
import { GET_AUTHENTICATED_USER } from '../graphql/queries/user.query'
import type { FetchResult } from '@apollo/client'

const router = useRouter()
const toast = useToast()

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

onDone(
  ({ data }: FetchResult<{ signUp: { user: { id: string; name: string; email: string } } }>) => {
    console.log('User logged in:', data)

    toast.toast({
      title: 'Signup successful!',
      description: `Welcome to financial tracker!`,
    })
    router.push('/') // Redirect to home page after successful login
  },
)

// const { mutate: register, loading } = useMutation(SIGN_UP, {
//   onCompleted: (data: { signUp: { user: { id: string; name: string; email: string } } }) => {
//     console.log('User signed up:', data)
//     toast.toast({
//       title: 'Signup successful!',
//       description: `Welcome to financial tracker!`,
//     })
//     router.push('/login') // Redirect to login page after successful registration
//   },
// })

const handleSubmit = async (event: Event) => {
  event.preventDefault()
  try {
    await register({
      input: {
        name: signUpData.value.name,
        email: signUpData.value.email,
        username: signUpData.value.email,
        password: signUpData.value.password,
      },
    })
  } catch (error) {
    console.error('Error:', error)
    toast.toast({
      title: 'Error',
      description: (error as Error).message,
      variant: 'destructive',
    })
  }
}
</script>

<template>
  <Card class="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle class="text-xl">Sign Up</CardTitle>
      <CardDescription>Enter your information to create an account</CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="handleSubmit" class="grid gap-4">
        <div class="grid gap-2">
          <Label for="name">Name</Label>
          <Input id="name" v-model="signUpData.name" placeholder="Name" required />
        </div>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            v-model="signUpData.email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input id="password" type="password" v-model="signUpData.password" required />
        </div>
        <Button type="submit" :disabled="loading" class="w-full">Create an account</Button>
      </form>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <router-link to="/login" class="underline">Sign in</router-link>
      </div>
    </CardContent>
  </Card>
</template>
