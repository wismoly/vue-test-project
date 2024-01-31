const layoutMap = [{
    path: '/anime-01',
    name: 'anime-01',
    component: () => import('@/view/anime-01/index.vue'),
    meta: {
      title: 'anime-01',
      icon: 'HomeFilled'
    }
  },
  {
    path: '/anime-02',
    name: 'anime-02',
    component: () => import('@/view/anime-02/index.vue'),
    meta: {
      title: 'anime-02',
      icon: 'HomeFilled'
    }
  },
  {
    path: '/anime-03',
    name: 'anime-03',
    component: () => import('@/view/anime-03/index.vue'),
    meta: {
      title: 'anime-03',
      icon: 'HomeFilled'
    }
  },
  {
    path: '/anime-04',
    name: 'anime-04',
    component: () => import('@/view/anime-04/index.vue'),
    meta: {
      title: 'anime-04',
      icon: 'HomeFilled'
    }
  }
]

const routes = [
  ...layoutMap
]

export {
  routes,
  layoutMap
}