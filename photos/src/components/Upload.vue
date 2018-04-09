<template>
  <div class="upload">
    <div class="fix-title">
      <h2>商品上传</h2>
    </div>
    
    <form method="post" enctype="multipart/form-data" action="" @submit.prevent="uploadData">
      <div class="item">
        <label for="">选择图片：</label>
        <cube-upload
          v-if="isRender"
          action="/api/upload/img"
          @file-success="updateArr"
          :simultaneous-uploads="9"/>
        <input type="hidden" name="images" :value="images">
      </div>
      <div class="item">
        <label for=""><i>*</i>标题：</label>
        <cube-input v-model="title" placeholder="请输入商品标题"></cube-input>
      </div>
      <div class="item">
        <label for=""><i>*</i>内容：</label>
        <cube-textarea :maxlength="500" v-model="content" placeholder="请输入商品介绍"></cube-textarea>
      </div>
      <div class="item">
        <label for="">原价：</label>
        <cube-input v-model="origPrice" type="number" placeholder="请输入商品原价"></cube-input>
      </div>
      <div class="item">
        <label for="">售价：</label>
        <cube-input v-model="currPrice" type="number" placeholder="请输入商品售价"></cube-input>
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
      updateArr(file) {
        if (file.status == 'success') {
          var filename = file.response.filename;
          // console.log(filename);
          this.images.push('/api/temp/'+filename);
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
          // 重新渲染上传组件,清空已提交信息
          this.isRender = false;
          this.$nextTick(()=>{
            this.isRender = true;
          });
          this.title = ''
          this.content = ''
          this.origPrice = ''
          this.currPrice = ''
          this.images = ''
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>
  .upload{
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #efeff4;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .upload .fix-title {
    position: relative;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #f7f7f7;
    box-shadow: 0 1px 6px #ccc;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 5;
  }
  .upload form{
    padding: 10px;
    font-size: 18px;
  }
  .upload .item{
    margin-top: 10px;
  }
  .upload .cube-btn-primary{
    margin-top: 20px;
  }
  .item label>i{
    color: #e64340;
    vertical-align: middle;
    margin-right: 5px;
  }
</style>