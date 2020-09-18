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
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
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
  {
    path: '',
    component: Layout,
    redirect: '/device',
    children: [{
      path: 'device',
      name: 'device',
      component: () => import('@/views/devices/index'),
      meta: {title: '设备管理'}
    }]
  },
  {
    path: '/rule_engine',
    component: Layout,
    // redirect: '/pms/product',
    name: 'rule_engine',
    meta: {title: '引擎规则'},
    children: [{
      path: 'parse_device',
      name: 'parse_device',
      component: () => import('@/views/pms/product/index'),
      meta: {title: '创建设备数据解析规则'}
      },
      {
        path: 'rt_packet',
        name: 'rt_packet',
        component: () => import('@/views/pms/product/add'),
        meta: {title: '数据流转类规则'}
      },
      {
        path: 'rt_event',
        name: 'rt_event',
        component: () => import('@/views/pms/product/update'),
        meta: {title: '告警通知类规则'}
        // hidden: true
      },
      {
        path: 'rt_db',
        name: 'rt_db',
        component: () => import('@/views/pms/product/index'),
        meta: {title: '入库类规则'}
        // hidden: true
      },
      {
        path: 'rt_nsq',
        name: 'rt_nsq',
        component: () => import('@/views/pms/product/index'),
        meta: {title: '入其他topic类规则'}
        // hidden: true
      },
      {
        path: 'rt_device',
        name: 'rt_device',
        component: () => import('@/views/pms/productCate/index'),
        meta: {title: '设备下发类规则'}
      }]
  },
  {
    path: '',
    component: Layout,
    redirect: '/notification',
    children: [{
      path: 'notification',
      name: 'notification',
      component: () => import('@/views/home/index'),
      meta: {title: '通知管理'}
    }]
  },
  // {
  //   path: '/sysinfo',
  //   component: Layout,
  //   redirect: '/sysinfo/order',
  //   name: 'sysinfo',
  //   meta: {title: '订单', icon: 'order'},
  //   children: [
  //     {
  //       path: 'order',
  //       name: 'order',
  //       component: () => import('@/views/oms/order/index'),
  //       meta: {title: '订单列表', icon: 'product-list'}
  //     },
  //     {
  //       path: 'orderDetail',
  //       name: 'orderDetail',
  //       component: () => import('@/views/oms/order/orderDetail'),
  //       meta: {title: '订单详情'},
  //       hidden:true
  //     },
  //     {
  //       path: 'deliverOrderList',
  //       name: 'deliverOrderList',
  //       component: () => import('@/views/oms/order/deliverOrderList'),
  //       meta: {title: '发货列表'},
  //       hidden:true
  //     },
  //     {
  //       path: 'orderSetting',
  //       name: 'orderSetting',
  //       component: () => import('@/views/oms/order/setting'),
  //       meta: {title: '订单设置', icon: 'order-setting'}
  //     },
  //     {
  //       path: 'returnApply',
  //       name: 'returnApply',
  //       component: () => import('@/views/oms/apply/index'),
  //       meta: {title: '退货申请处理', icon: 'order-return'}
  //     },
  //     {
  //       path: 'returnReason',
  //       name: 'returnReason',
  //       component: () => import('@/views/oms/apply/reason'),
  //       meta: {title: '退货原因设置', icon: 'order-return-reason'}
  //     },
  //     {
  //       path: 'returnApplyDetail',
  //       name: 'returnApplyDetail',
  //       component: () => import('@/views/oms/apply/applyDetail'),
  //       meta: {title: '退货原因详情'},
  //       hidden:true
  //     }
  //   ]
  // },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

