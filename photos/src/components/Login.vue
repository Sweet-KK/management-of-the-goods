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
  import md5 from 'md5';
  import cookies from 'js-cookies'

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
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '请输入账号密码!!!'
          }).show()
          return;
        }
        // 获取token
        const salt = '54guanliyuan';
        this.axios.post('/api/gettoken',{
          account: md5(this.account+salt),
          pwd: md5(this.pwd+salt)
        })
        .then((res)=>{
          if(res.data.return==1){
            // 把token存储到session/cookies
            var token = res.data.data;
            cookies.setItem('token', token);

            // toast2秒后页面跳转
            this.$createToast({
              type: 'warn',
              time: 1000,
              txt: '登录成功,页面将在2s后跳转!'
            }).show()
            setTimeout(()=>{
              this.$router.push('/admin')
            },2000)
          }else {
            this.$createToast({
              type: 'warn',
              time: 1000,
              txt: '登录失败,账号或密码不正确!'
            }).show()
          }
        })
        .catch((err)=>{
          console.log(err);
        })
      },
      toBack(){
        // 发送校验token请求
        this.axios.post('/api/checktoken')
          .then((res)=>{
            if(res.data.return==1){
              this.$router.back(-1)
            }else {
              this.$router.push('/')
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
