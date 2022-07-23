import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/pages/dashboard/Dashboard')
  },
  {
    path: '/country/:country/add',
    name: 'CountryAddFirstVersion',
    component: () => import('@/views/pages/country/CountryAddVersion')
  },
  {
    path: '/country/add',
    name: 'CountryAddVersion',
    component: () => import('@/views/pages/country/CountryAddVersion')
  },
  {
    path: '/country/:country/version/:version',
    name: 'CountryDetailsWithVersion',
    component: () => import('@/views/pages/country/CountryDetails')
  },
  {
    path: '/country/:country',
    name: 'CountryDetails',
    component: () => import('@/views/pages/country/CountryDetails')
  },
  {
    path: '/404',
    name: 'NotFound404',
    component: () => import('@/views/pages/notFound/NotFound')
  },
  {
    path: '/not-found',
    name: 'NotFound',
    component: () => import('@/views/pages/notFound/NotFound')
  },
  {
    path: '*',
    component: () => import('@/views/pages/page/Page'),
  }
];

const router = new VueRouter({ mode: 'history', routes })

export default router
