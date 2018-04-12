<template>
  <div class="login">
    <div class="fix-title">
      <a href="" @click.prevent="toBack" class="be-back icon iconfont icon-guanbi"></a>
      <h2>管理员登录</h2>
    </div>
    
    <form method="post" enctype="multipart/form-data" action="" @submit.prevent="toLogin">
      <div class="item">
        <label for="">账号：</label>
        <cube-input :clearable="true" v-model="account" placeholder="请输入账管理员账号"></cube-input>
      </div>
      <div class="item">
        <label for="">密码：</label>
        <cube-input :clearable="true" type="password" v-model="pwd" placeholder="请输入登录密码"></cube-input>
      </div>
      <cube-button :primary="true" type="submit" >登录</cube-button>
    </form>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        isRender: true,
        account: '',
        pwd: '',
      }
    },
    methods: {
      toLogin(){
        // 非空验证
        if(this.account=='' || this.pwd==''){
          const toast = this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '请输入账号密码!!!'
          })
          toast.show()
          return;
        }
        // 账号密码验证,后续改成发送数据到后台验证
        if(this.account=='admin' && this.pwd=='306484328'){
          const toast = this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '登录成功,页面即将跳转!'
          })
          toast.show()
          setTimeout(()=>{
            this.$router.push('/api')
          },1500)
        }else {
          const toast = this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '错误的账号或密码,请重新输入!!!'
          })
          toast.show()
          return;
        }
      },
      toBack(){
        this.$router.back(-1)
      }
    }
  }
</script>

<style scoped>
  .fix-title>a{
    padding: 0 10px;
    position: absolute;
    left: 0;
    top: 0;
    font-size: 16px;
  }
  form{
    padding: 10px;
    font-size: 18px;
  }
  .item{
    margin-top: 10px;
  }
  .cube-btn-primary{
    margin-top: 20px;
  }
  .item label>i{
    color: #e64340;
    vertical-align: middle;
    margin-right: 5px;
  }
</style>