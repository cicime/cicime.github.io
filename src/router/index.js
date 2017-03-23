import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import List from '@/components/List'
import Detail from '@/components/Detail'
import Me from '@/components/Me'
import Test from '@/components/Test'
import Notfund from '@/components/Notfund'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'Home', component: Home},
    {path: '/about', name: 'Me', component: Me},
    {path: '/diary', name: 'List', component: List},
    {path: '/diary/v/:id', name: 'Detail', component: Detail},
    {path: '/test', name: 'Test', component: Test},
    {path: '*', name: 'Notfund', component: Notfund}
  ]
})
