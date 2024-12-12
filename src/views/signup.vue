<script setup lang="ts">
import { SIGN_UP } from '../graphql/mutations/user.mutation'
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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

// Handle form submission
const handleSubmit = async () => {
  try {
    await signUp({
      input: {
        name: `${signUpData.value.firstName} ${signUpData.value.lastName}`,
        username: signUpData.value.email,
        password: signUpData.value.password,
      },
    })
    toast.success('Sign up successful!')
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
        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-2">
            <Label for="first-name">First name</Label>
            <Input id="first-name" v-model="signUpData.firstName" placeholder="Max" required />
          </div>
          <div class="grid gap-2">
            <Label for="last-name">Last name</Label>
            <Input id="last-name" v-model="signUpData.lastName" placeholder="Robinson" required />
          </div>
        </div>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            v-model="signUpData.email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input id="password" v-model="signUpData.password" type="password" required />
        </div>
        <Button type="submit" class="w-full" :disabled="loading">
          {{ loading ? 'Loading...' : 'Create an account' }}
        </Button>
      </form>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <a href="#" class="underline">Sign in</a>
      </div>
    </CardContent>
  </Card>
</template>
