import Vue from 'vue'
import Router from 'vue-router'
import Navbar from '@/components/Navbar.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Navbar',
      component: Navbar
    }
  ]
})
