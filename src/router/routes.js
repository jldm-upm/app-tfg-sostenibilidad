
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/capture', component: () => import('pages/Capture.vue') },
      { path: '/history', component: () => import('pages/History.vue') },
      { path: '/list', component: () => import('pages/List.vue') },
      { path: '/product', component: () => import('pages/Product.vue') }
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
