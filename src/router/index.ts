import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import login from '../views/loginView.vue'
import signup from '../views/signupView.vue'
import Settings from '@/views/Settings.vue'
// import { GET_AUTHENTICATED_USER } from '@/graphql/queries/user.query'
// import { useQuery } from '@vue/apollo-composable'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: { requiresAuth: true }, // Add meta field to indicate that this route requires authentication
    },
  ],
})

// const { loading, error, data } = useQuery(GET_AUTHENTICATED_USER)

// console.log('loading', loading)
// console.log('auth user:', data)
// console.log('error:', error)

// if (loading) {
//   console.log('Loading...')
// }

export default router
