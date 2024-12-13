import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import login from '../views/login.vue'
import signup from '../views/signup.vue'
import Settings from '@/views/Settings.vue'
import { GET_AUTHENTICATED_USER } from '@/graphql/queries/user.query'
import { useQuery } from '@vue/apollo-composable'
import { ref, watch } from 'vue'

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

const isAuthenticated = ref(false)

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const { result, loading, error } = useQuery(GET_AUTHENTICATED_USER)

    const checkAuth = () => {
      if (result.value && result.value.authUser) {
        isAuthenticated.value = true
      } else {
        isAuthenticated.value = false
      }

      if (!isAuthenticated.value) {
        next({ name: 'login' }) // Redirect to login page if not authenticated
      } else {
        next() // Proceed to the route if authenticated
      }
    }

    if (loading.value) {
      watch(loading, (newValue) => {
        if (!newValue) {
          checkAuth()
        }
      })
    } else {
      checkAuth()
    }
  } else {
    next() // Proceed to the route if it does not require authentication
  }
})

export default router
