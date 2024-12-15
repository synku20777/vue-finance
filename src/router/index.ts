import { createRouter, createWebHistory } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import HomeView from '../views/HomeView.vue'
import login from '../views/loginView.vue'
import signup from '../views/signupView.vue'
import Settings from '@/views/Settings.vue'
import { GET_AUTHENTICATED_USER } from '@/graphql/queries/user.query'
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

const { loading, result: data } = useQuery(GET_AUTHENTICATED_USER)

router.beforeEach((to, from, next) => {
  if (loading.value) return next(false)

  const authUser = data.value?.authUser

  if (to.meta.requiresAuth && !authUser) {
    next({ path: '/login' })
  } else if (to.meta.guestOnly && authUser) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
