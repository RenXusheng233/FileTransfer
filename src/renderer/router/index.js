import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/pages/landingPage/landingPage.vue').default,
    },
    {
      path: '/folder-selection',
      name: 'folder-selection-page',
      component: require('@/pages/folderSelection/folderSelection.vue').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})
