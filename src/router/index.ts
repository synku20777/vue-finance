import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import login from '../views/login.vue'
import signup from '../views/signup.vue'
import Settings from '@/views/Settings.vue'
import { GET_AUTHENTICATED_USER } from '@/graphql/queries/user.query'

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

// const useAuthStore = useQuery(GET_AUTHENTICATED_USER)
// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore()
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!authStore.isAuthenticated) {
//       next({ name: 'login' }) // Redirect to login page if not authenticated
//     } else {
//       next() // Proceed to the route if authenticated
//     }
//   } else {
//     next() // Proceed to the route if it does not require authentication
//   }
// })

export default router
