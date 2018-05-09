<template>
  <div class="admin">
    <div class="fix-title">
      <a href="" @click.prevent="toBack" class="be-back icon iconfont icon-guanbi"></a>
      <h2>后台管理</h2>
    </div>

    <ul class="menu">
      <li><a href="#/upload">新增商品</a></li>
      <li><a href="#/edit">商品管理</a></li>
    </ul>
  </div>
</template>

<script>
  // import cookie from 'js-cookies'

  export default {
    name: "admin",
    methods: {
      toBack() {
        // 发送校验token请求
        this.axios.post('/api/checktoken')
        .then((res)=>{
          if(res.data.status==1){
            this.$router.push('/')
          }else {
            this.$router.back(-1)
          }
        })
        .catch((err)=>{
          console.log(err);
        })

      }
    }
  }
</script>

<style scoped>
  .fix-title > a {
    position: absolute;
    left: 0;
    top: 0;
    padding: 0 10px;
  }
  .menu{
    text-align: center;
  }
  .menu li{
    margin-top: 15px;
  }
</style>
