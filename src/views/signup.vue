<script setup lang="ts">
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SIGN_UP } from '../graphql/mutations/user.mutation'

const router = useRouter()
const toast = useToast()

// Reactive state for form data
const signUpData = ref({
  name: '',
  email: '',
  password: '',
})

const {
  mutate: signUp,
  loading,
  error,
} = useMutation(SIGN_UP, {
  onCompleted: (data: any) => {
    console.log('User signed up:', data)
    toast.success('Sign up successful!')
    router.push('/login') // Redirect to login page after successful registration
  },
})

const handleSubmit = async (event: Event) => {
  event.preventDefault()
  try {
    await signUp({
      variables: {
        input: {
          name: signUpData.value.name,
          username: signUpData.value.email,
          password: signUpData.value.password,
        },
      },
    })
  } catch (error) {
    console.error('Error:', error)
    toast.error((error as any).message)
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
