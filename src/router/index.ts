import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw, RouteParams } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

export type AppRouteNames =
  | 'dashboard'
  | 'tvshow'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/tvshow/:slug',
    name: 'tvshow',
    component: () => import('../views/TVShowView.vue')
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export const routerPush = (name: AppRouteNames, params?: RouteParams): ReturnType<typeof router.push> => {
  return params !== undefined
    ? router.push({
      name,
      params,
    })
    : router.push({ name })
}

export default router
