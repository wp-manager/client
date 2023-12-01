import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue';
import Sites from '@/views/Sites.vue';
import Site from '@/views/Site.vue';
import SiteCore from '@/views/SiteCore.vue';
import AddSite from '@/views/AddSite.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/sites',
      name: 'sites',
      component: Sites
    },
    {
      path: '/sites/add',
      name: 'add-site',
      component: AddSite
    },
    {
      path: '/sites/:id',
      name: 'site',
      component: Site,
      children: [
        {
          path: 'core',
          name: 'site-core',
          component: SiteCore
        }
      ]
    }
  ]
})

export default router
