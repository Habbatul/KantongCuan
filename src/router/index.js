import { createRouter, createWebHistory } from 'vue-router'
import AssetsView from '../views/AssetsView.vue'
import AssetTransactionsView from '../views/AssetTransactionsView.vue'

const routes = [
  {
    path: '/',
    redirect: '/assets'
  },
  {
    path: '/assets',
    name: 'assets',
    component: AssetsView,
    meta: {
      title: 'Asset Saya'
    }
  },
  {
    path: '/assets/:id/transactions',
    name: 'asset-transactions',
    component: AssetTransactionsView,
    props: true,
    meta: {
      title: 'Daftar Transaksi'
    }
  },
  {
    path: '/test',
   name: 'test',
    component: () => import('../views/Test.vue'),
    meta: {
      title: 'Laporan Keuangan'
    }
  },
  {
    path: '/reports',
    name: 'reports',
    component: () => import('../views/ReportsView.vue'),
    meta: {
      title: 'Laporan Keuangan'
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/SettingsView.vue'),
    meta: {
      title: 'Pengaturan Aplikasi'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: 'Halaman Tidak Ditemukan'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Manajemen Asset'
  next()
})

export default router