<template>
  <div class="upload">
    <!--<form id="signForm" enctype="multipart/form-data">-->
    <cube-form
        :model="model"
        :schema="schema"
        :immediate-validate="true"
        :options="options"
        @submit="submitHandler"
        ></cube-form>
    <!--</form>-->
  </div>
</template>

<script>
  export default {
    name: "upload",
    data() {
      return {
        validity: {},
        valid: undefined,
        model: {
          title: '',
          origPrice: null,
          currPrice: null,
          content: '',
          images: []
        },
        schema: {
          groups: [
            {
              legend: '商品信息',
              fields: [
                {
                  type: 'input',
                  modelKey: 'title',
                  label: '标题',
                  props: {
                    placeholder: '请输入商品标题',
                  },
                  rules: {
                    required: true
                  }
                },
                {
                  type: 'textarea',
                  modelKey: 'content',
                  label: '内容',
                  rules: {
                    required: true
                  },
                  props: {
                    placeholder: '请输入商品介绍',
                    maxlength: 500,
                  }
                },
                {
                  type: 'input',
                  modelKey: 'origPrice',
                  label: '原价',
                  props: {
                    placeholder: '请输入商品原价',
                    type: 'number',
                  },
                  rules: {
                    required: false
                  }
                },
                {
                  type: 'input',
                  modelKey: 'currPrice',
                  label: '现价',
                  props: {
                    placeholder: '请输入商品售价',
                    type: 'number',
                  },
                  rules: {
                    required: false
                  }
                }
              ]
            },
            {
              legend: '选择图片',
              fields: [
                {
                  type: 'upload',
                  modelKey: 'images',
                  label: '图片',
                  rules: {
                    required: true
                  },
                  props: {
                    max: 9,
                    auto: true,
                    simultaneousUploads: 3,
                    action: {
                      target: '/api/assets',
                    }
                  }
                }
              ]
            },
            {
              fields: [
                {
                  type: 'submit',
                  label: 'Submit'
                },
                {
                  type: 'reset',
                  label: 'Reset'
                }
              ]
            }
          ]
        },
        options: {
          scrollToInvalidField: true,
          layout: 'standard' // classic fresh
        }
      }
    },
    methods: {
      submitHandler(e) {
        e.preventDefault()
        // console.log('submit', e)
        // console.log(this.model);
        // 整理上传参数
        let imgArr = [];
        this.model.images.forEach(function (v,i) {
          console.log(v);
          imgArr.push(v.url);
        })
        
        let bodys = {
          title: this.model.title,
          content: this.model.content,
          images: JSON.stringify(imgArr),
          origPrice: this.model.origPrice,
          currPrice: this.model.currPrice
        }
        this.axios.post('/api/add',bodys)
        .then((res) => {
          if (res.data.status == 1) {
            // 新增成功
            const toast = this.$createToast({
              type: 'warn',
              time: 1000,
              txt: '上传成功,两秒后跳转到展示页面'
            })
            toast.show()
            setTimeout(()=>{//两秒后跳转
              // this.$router.push('/')
            },2000);
          } else {
            // 如果失败
            const toast = this.$createToast({
              type: 'warn',
              time: 1000,
              txt: res.data.msg
            })
            toast.show()
          }
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>

</style>