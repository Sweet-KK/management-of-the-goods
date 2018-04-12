<template>
  <div class="edit-this">
    <div class="fix-title">
      <a href="" @click.prevent="toBack" class="be-back icon iconfont icon-guanbi"></a>
      <h2>商品编辑</h2>
    </div>
  
    <photo-preview v-if="images.length>0" :images = "images | imgArr"></photo-preview>
    
    <form method="post" enctype="multipart/form-data" action="" @submit.prevent="updateData">
      <div class="item">
        <label for=""><i>*</i>标题：</label>
        <cube-input :clearable="true" v-model="title" placeholder="请输入商品标题"></cube-input>
      </div>
      <div class="item">
        <label for=""><i>*</i>内容：</label>
        <cube-textarea :maxlength="500" v-model="content" placeholder="请输入商品介绍"></cube-textarea>
      </div>
      <div class="item">
        <label for="">原价：</label>
        <cube-input :clearable="true" v-model="origPrice" type="number" placeholder="请输入商品原价"></cube-input>
      </div>
      <div class="item">
        <label for="">售价：</label>
        <cube-input :clearable="true" v-model="currPrice" type="number" placeholder="请输入商品售价"></cube-input>
      </div>
      <cube-button :primary="true" type="submit" >提交</cube-button>
    </form>
  </div>
</template>

<script>
  import PhotoPreview from '../components/PhotoPreview'
  
  export default {
    name: "edit-this",
    data() {
      return {
        id: this.$route.params.id,
        title: '',
        content: '',
        origPrice: null,
        currPrice: null,
        images: '',
      }
    },
    methods: {
      updateData(){
        // 非空验证,正则验证
        if(this.title=='' || this.content==''){
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '标题和内容不能为空!'
          }).show()
          return;
        }
        // 提交更新
        this.axios.post('/api/update',{
          id: this.id,
          title: this.title,
          content: this.content,
          origPrice: this.origPrice,
          currPrice: this.currPrice
        })
        .then((res) => {
          if(res.data.status==1){
            this.$createToast({
              type: 'warn',
              time: 1000,
              txt: '修改成功!'
            }).show()
            setTimeout(()=>{
              this.toBack()
            },1200)
          }else {
            console.log('修改失败'+res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        })
      },
      getData(id) {
        this.axios.get('/api/getforid', {
          params: {
            id: id
          }
        })
        .then((res) => {
          console.log(res.data.data[0]);
          this.images = res.data.data[0].images;
          this.title = res.data.data[0].title;
          this.content = res.data.data[0].content;
          this.origPrice = res.data.data[0].orig_price;
          this.currPrice = res.data.data[0].curr_price;
        })
        .catch((err) => {
          console.log(err);
        })
      },
      toBack(){
        this.$router.back(-1)
      }
    },
    created:function () {
      this.getData(this.id)
    },
    filters: {
      // 图片字符串转换成数组
      imgArr(val) {
        return val.split(',');
      }
    },
    components: {
      'photo-preview': PhotoPreview
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
  /deep/ .photo-preview img{
    max-height: 200px;
    vertical-align: top;
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