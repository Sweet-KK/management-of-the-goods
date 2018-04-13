<template>
  <div class="upload">
    <div class="fix-title">
      <a href="" @click.prevent="toBack" class="be-back icon iconfont icon-guanbi"></a>
      <h2>商品上传</h2>
    </div>
    
    <form method="post" enctype="multipart/form-data" action="" @submit.prevent="uploadData">
      <div class="item">
        <label for="">选择图片：</label>
        <cube-upload
          v-if="isRender"
          action="/api/upload/img"
          @file-success="addToArr"
          @file-removed="filesRemoved"
          :simultaneous-uploads="9"/>
        <input type="hidden" name="images" :value="images">
      </div>
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
  export default {
    name: "upload",
    data() {
      return {
        isRender: true,
        title: '',
        content: '',
        origPrice: null,
        currPrice: null,
        images: []
      }
    },
    methods: {
      addToArr(file) {
        if (file.status == 'success') {
          var filename = file.response.filename;
          // console.log(filename);
          this.images.push('/api/assets/'+filename);
        }
      },
      delFromArr(fileName){
        var index = this.images.indexOf('/api/assets/'+fileName);
        if (index > -1) {
          this.images.splice(index, 1);
        }
      },
      filesRemoved(file){
        console.log(file);
        // 图片上传成功删除时才需要删除对应文件
        if(file.response.status==1){
          var fileName = file.response.filename;
          console.log(fileName);
          this.axios.post('/api/delfile',{
            fileName:fileName
          })
          .then((res)=>{
            if(res.data.status==1){
              this.delFromArr(fileName)
            }
          })
          .catch((err)=>{
            console.log(err);
          })
        }
      },
      uploadData(){
        // 非空验证,正则验证
        if(this.title=='' || this.content==''){
          const toast = this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '标题和内容不能为空!'
          })
          toast.show()
          return;
        }
        
        // 提交数据
        this.axios.post('/api/upload/text',{
          title: this.title,
          content: this.content,
          origPrice: this.origPrice,
          currPrice: this.currPrice,
          images: this.images
        })
        .then((res) => {
          if(res.data.status==1){
            // 重新渲染上传组件,清空已提交信息
            this.isRender = false;
            this.$nextTick(()=>{
              this.isRender = true;
            });
            this.title = ''
            this.content = ''
            this.origPrice = null
            this.currPrice = null
            this.images = []
          }else {
            console.log('商品新增失败');
          }
        })
        .catch((err) => {
          console.log(err);
        })
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