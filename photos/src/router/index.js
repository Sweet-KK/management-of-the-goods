import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '相册首页',
      component: resolve => require(['@/components/Photos.vue'], resolve)
    },
    {
      path: '/login',
      name: '管理员登录页面',
      component: resolve => require(['@/components/Login.vue'], resolve)
    },
    {
      path: '/admin',
      name: '相册管理页面',
      component: resolve => require(['@/components/Admin.vue'], resolve)
    },
    {
      path: '/upload',
      name: '新增数据页',
      component: resolve => require(['@/components/Upload.vue'], resolve)
    },
    {
      path: '/edit',
      name: '商品管理页面',
      component: resolve => require(['@/components/Edit.vue'], resolve)
    },
    {
      path: '/edit-this/:id',
      name: '单条数据编辑页面',
      component: resolve => require(['@/components/EditThis.vue'], resolve)
    }
  ]
})
