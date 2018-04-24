import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/edit',
    component: Layout,
    redirect: '/edit/form',
    name: 'Edit',
    children: [
      {
        path: 'form',
        name: 'form',
        component: () => import('@/views/edit/index'),
        meta: { title: '图表编辑', icon: 'table' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  {
    path: '/debug',
    component: Layout,
    meta: { title: 'Debug', icon: 'bug' },
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/debug/index'),
        meta: { title: '测试功能'}
      },
      {
        path: 'select',
        name: 'select',
        component: () => import('@/views/debug/select'),
        meta: { title: '选择器' }
      },
      {
        path: 'table',
        name: 'table',
        component: () => import('@/views/debug/table'),
        meta: { title: '表格操作' }
      },
      {
        path: 'highchart',
        name: 'highchart',
        component: () => import('@/views/debug/highchart'),
        meta: { title: 'highchart' }
      },
      {
        path: 'codemirror',
        name: 'codemirror',
        component: () => import('@/views/debug/see_code'),
        meta: { title: 'codemirror' }
      }
      // {
      //   path: 'vuechart',
      //   name: 'vuechart',
      //   component: () => import('@/views/debug/vuechart'),
      //   meta: { title: 'vuechart' }
      // }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

