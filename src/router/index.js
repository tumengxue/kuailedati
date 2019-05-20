import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Item from '@/components/Item'
import Score from '@/components/Score'//@代表src
Vue.use(Router)
export default new Router({
  routes: [     //切换对应的组件
    {
      path: '/',
      name: 'Index',
      component: Index//路由映射的组件,必填
    },{
      path: '/item',
      name: 'Item',
      component: Item
    },{
      path: '/score',
      name: 'Score',
      component: Score
    }
  ]
})
