import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes.js'
import { decode } from 'js-base64'
import { useAppStore } from '@/store/modules/app'
// import { useI18n } from '@/hooks/web/usei18n'
// const { t } = useI18n()
export const router = createRouter({
  history: createWebHistory(),
  routes: [...routes],
  scrollBehavior: () => ({ left: 0, top: 0 })
})


export function setupRouter(app) {
  app.use(router)
}
