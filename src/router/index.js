import Vue from 'vue'
import Router from 'vue-router'

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
  //{path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  },
  {
    path: '/application',
    component: Layout,
    // redirect: '/pms/product',
    name: 'application',
    meta: {title: '应用管理'},
    children: [{
      path: 'application_list',
      name: 'application_list',
      component: () => import('@/views/application/index'),
      meta: {title: '应用列表'}
      },
      {
        path: 'application_add',
        name: 'application_add',
        component: () => import('@/views/application/add'),
        meta: {title: '添加应用'}
      }
      ]
  },
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: '/device',
  //   children: [{
  //     path: 'device',
  //     name: 'device',
  //     component: () => import('@/views/devices/index'),
  //     meta: {title: '设备管理'}
  //   }]
  // },
  {
    path: '/rules',
    component: Layout,
    // redirect: '/pms/product',
    name: 'rules',
    meta: {title: '规则管理'},
    children: [{
      path: 'rules_list',
      name: 'rules_list',
      component: () => import('@/views/rules/index'),
      meta: {title:'规则列表'}
      },
      {
      path: 'add',
      name: 'add',
      component: () => import('@/views/rules/add'),
      meta: {title: '创建规则'}
      },
      // {
      //   path: 'parse_device',
      //   name: 'parse_device',
      //   component: () => import('@/views/rules/index'),
      //   meta: {title: '设备解析类规则'}
      // },
      // {
      //   path: 'rt_packet',
      //   name: 'rt_packet',
      //   component: () => import('@/views/rules/index'),
      //   meta: {title: '数据流转类规则'}
      // },
      // {
      //   path: 'rt_event',
      //   name: 'rt_event',
      //   component: () => import('@/views/rules/index'),
      //   meta: {title: '告警通知类规则'}
      //   // hidden: true
      // },
      // {
      //   path: 'rt_db',
      //   name: 'rt_db',
      //   component: () => import('@/views/rules/index'),
      //   meta: {title: '入库类规则'}
      //   // hidden: true
      // },
      // {
      //   path: 'rt_nsq',
      //   name: 'rt_nsq',
      //   component: () => import('@/views/rules/index'),
      //   meta: {title: '入第三方业务类规则'}
      //   // hidden: true
      // },
      // {
      //   path: 'rt_device',
      //   name: 'rt_device',
      //   component: () => import('@/views/rules/index'),
      //   meta: {title: '设备下发类规则'}
      //}
    ]
  },
  {
    path: '/notification',
    component: Layout,
    name: 'notification',
    meta: {title:'通知管理'},
    //redirect: '/notification',
    children: [{
      path: 'notifications',
      name: 'notifications',
      component: () => import('@/views/notifier/index'),
      meta: {title: '通知人列表'}
    },
    {
      path: 'notifer_add',
      name: 'notifier_add',
      component: () => import('@/views/notifier/add'),
      meta: {title: '添加通知人'}
    },
    // {
    //   path: 'mail_add',
    //   name: 'mail_add',
    //   component: () => import('@/views/notifier/add_mail'),
    //   meta: {title: '添加邮件通知人'}
    // }
  ]
  },
  {
    path: '/account',
    component: Layout,
    name: 'account',
    meta: {title:'账号管理'},
    children:[{
      path: 'application_list',
      name: 'application_list',
      component: () => import('@/views/application/index'),
      meta: {title: '账号管理'}
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

