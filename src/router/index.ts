import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import login from '../views/loginView.vue'
import signup from '../views/signupView.vue'
import { useApolloClient } from '@vue/apollo-composable'
import { GET_AUTHENTICATED_USER } from '@/graphql/queries/user.query'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: { requiresAuth: false }, // Allow only guests to access this route
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup,
      meta: { requiresAuth: false }, // Allow only guests to access this route
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }, // Require authentication to access this route
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const { resolveClient } = useApolloClient()
  const apolloClient = resolveClient()

  try {
    // Execute the authUser query
    const { data } = await apolloClient.query({
      query: GET_AUTHENTICATED_USER,
      fetchPolicy: 'network-only', // Ensure fresh data from the server
    })

    if (data.authUser) {
      if (to.meta.requiresAuth === false) {
        next('/')
      } else {
        next()
      }
    } else if (to.meta.requiresAuth) {
      next('/login')
    } else {
      next()
    }
  } catch (error) {
    console.error('Auth check failed:', error)
    if (to.meta.requiresAuth) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
