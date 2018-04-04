import Vue from 'vue'
import Router from 'vue-router'
import Photos from '../components/Photos'
import Upload from '../components/Upload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '相册首页',
      component:　Photos
    },
    {
      path: '/add',
      name: '新增数据页',
      component: Upload
    }
  ]
})
