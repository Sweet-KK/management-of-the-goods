import Vue from 'vue'
import Router from 'vue-router'
import Photos from '../components/Photos'
import Upload from '../components/Upload'
import Admin from '../components/Admin'
import Login from '../components/Login'
import Edit from '../components/Edit'
import EditThis from '../components/EditThis'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '相册首页',
      component:　Photos
    },
    {
      path: '/login',
      name: '管理员登录页面',
      component: Login
    },
    {
      path: '/api',
      name: '相册管理页面',
      component: Admin
    },
    {
      path: '/upload',
      name: '新增数据页',
      component: Upload
    },
    {
      path: '/edit',
      name: '商品管理页面',
      component: Edit
    },
    {
      path: '/edit-this/:id',
      name: '单条数据编辑页面',
      component: EditThis
    }
  ]
})
