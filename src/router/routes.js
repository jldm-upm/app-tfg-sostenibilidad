
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/conf', component: () => import('pages/Conf.vue') },
      { path: '/list', component: () => import('pages/List.vue') },
      { path: '/product', component: () => import('pages/Product.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/help', component: () => import('pages/Help.vue') },

      { path: '/capture', component: () => import('pages/Capture.vue') },
      { path: '/search', component: () => import('pages/Search.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
