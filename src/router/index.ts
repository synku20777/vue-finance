import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import login from '../views/loginView.vue'
import signup from '../views/signupView.vue'
import Settings from '@/views/Settings.vue'
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
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true }, // Require authentication to access this route
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: { requiresAuth: true }, // Require authentication to access this route
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  console.log(`Navigating to: ${to.path} from: ${from.path}`)
  const { resolveClient } = useApolloClient()
  const apolloClient = resolveClient()

  try {
    // Execute the authUser query
    const { data } = await apolloClient.query({
      query: GET_AUTHENTICATED_USER,
      fetchPolicy: 'network-only', // Ensure fresh data from the server
    })

    // console.log('Auth user data:', data)

    if (data.authUser) {
      if (to.meta.requiresAuth === false) {
        console.log('Authenticated user trying to access public page, redirecting to home')
        next('/') // Adjust to your app's protected page
      } else {
        console.log('Authenticated user, proceeding to requested page')
        next() // Proceed to the requested page
      }
    } else if (to.meta.requiresAuth) {
      console.log('Unauthenticated user trying to access protected page, redirecting to login')
      next('/login')
    } else {
      console.log('Unauthenticated user accessing public page, proceeding')
      next() // Allow navigation to public pages
    }
  } catch (error) {
    console.error('Auth check failed:', error)
    if (to.meta.requiresAuth) {
      console.log('Error during auth check, redirecting to login')
      next('/login') // Redirect to login on error
    } else {
      console.log('Error during auth check, but accessing public page, proceeding')
      next() // Proceed to public pages
    }
  }
})

export default router
