<template>
  <div id="edit">
    <div class="fix-title">
      <a href="" @click.prevent="toBack" class="be-back icon iconfont icon-guanbi"></a>
      <h2>商品管理</h2>
    </div>
    <div class="content">
      <cube-scroll
          ref="scroll"
          :options="options.open"
          @pulling-down="onPullingDown"
          @pulling-up="onPullingUp">

        <!--Search-->
        <div class="searchBar">
          <cube-input
              v-model="keyword"
              placeholder="请输入关键词搜索"
              type="search"
              @keydown.enter.native="search"
          ></cube-input>
          <a href="" @click.prevent="search" class="icon iconfont icon-sousuo"></a>
        </div>

        <div class="photos">
          <div class="photo-list" v-if="items.length>0" v-for="(item, index) in items">
            <a class="delete icon iconfont icon-close" href="" @click.prevent="toDelete(item.id,index)"></a>
            <div class="grid">
              <photo-preview :images = "item.images | imgArr"></photo-preview>
            </div>
            <div class="main">
              <h3>{{item.title}}</h3>
              <p class="desc">{{item.content}}</p>
              <p class="price">
                <span class="orig">原价:<b>{{item.orig_price || 'null'}}</b></span>
                <span class="curr">售价:<b>{{item.curr_price || 'null'}}</b></span>
              </p>
              <p class="time">发表于 <span>{{moment(item.update_time).format('YYYY-MM-DD HH:mm:ss')}}</span></p>
              <router-link :to="'/edit-this/'+item.id" class="edit-this icon iconfont icon-bianji">编辑</router-link>
            </div>
          </div>
          <div class="photo-list" :class="[items.length==0 ? 'nodata' : '']" v-if="items.length==0">
            <div class="tip">暂无数据</div>
          </div>
        </div>

      </cube-scroll>
    </div>
  </div>
</template>

<script>
  import PhotoPreview from '../components/PhotoPreview'

  export default {
    name: 'edit',
    data() {
      return {
        keyword: '',
        // images: [],
        items: [],
        pageNum: 1,
        pageSize: 5,
        options: {
          open: {
            pullDownRefresh: {
              threshold: 50,
              stop: 50,
              txt: '刷新成功'
            },
            pullUpLoad: {
              threshold: 0,
              txt: {
                more: '加载更多',
                noMore: '加载完毕'
              }
            }
          },
          close: {
            pullDownRefresh: false,
            pullUpLoad: false
          }
        }
      }
    },
    methods: {
      // 下拉刷新
      onPullingDown() {
        // 更新数据
        this.pageNum = 1;
        setTimeout(()=>{
          this.getPageData(this.pageNum,this.pageSize)
        }, 200)
      },
      // 上拉加载
      onPullingUp() {
        // 更新数据
        this.pageNum++;
        setTimeout(()=>{
          this.addPageData(this.pageNum,this.pageSize)
        }, 300)

      },
      // 搜索关键词
      search() {
        // 初始化页码
        this.pageNum = 1;
        this.getPageData(this.pageNum,this.pageSize)
      },
      // 获取某页数据
      getPageData(num,pageSz) {
        this.axios.get('/api/get', {
          params: {
            pageNum: num,
            pageSize: pageSz,
            keyword: this.keyword
          }
        })
        .then((res) => {
          if (res.data.return == 1) {
            this.items = res.data.data;;
          }
          this.$refs.scroll.forceUpdate()
        })
        .catch((err) => {
          this.$refs.scroll.forceUpdate()
          console.log(err);
        })

      },
      // 获取某页数据拼接原来数据显示
      addPageData(num,pageSz) {
        this.axios.get('/api/get', {
          params: {
            pageNum: num,
            pageSize: pageSz,
            keyword: this.keyword
          }
        })
        .then((res) => {
          console.log(res);
          if (res.data.return == 1) {
            // 如果有新数据,拼接到旧数据后面
            this.$refs.scroll.forceUpdate()
            this.items = this.items.concat(res.data.data)
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate()
            this.pageNum--;
          }
        })
        .catch((err) => {
          this.$refs.scroll.forceUpdate()
          console.log(err);
        })

      },
      // 路由后退
      toBack() {
        this.$router.back(-1)
      },
      // 删除指定数据
      toDelete(id,index){
        this.$createDialog({
          type: 'confirm',
          icon: '',
          title: '',
          content: '确认删除此条数据?',
          confirmBtn: {
            text: '确定',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            // 确认即删除
            this.axios.post('/api/del',{
              id: id
            })
            .then((res)=>{
              if(res.data.return==1){
                this.items.splice(index,1)
              }else {
                this.$createToast({
                  type: 'warn',
                  time: 1000,
                  txt: '删除失败'+res.data.msg
                }).show()
              }
            })
            .catch((err)=>{
              console.log(err);
            })
          },
          onCancel: () => {
            // 取消不作任何处理
          }
        }).show()
      }
    },
    created: function () {
      this.getPageData(this.pageNum,this.pageSize)
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

<style>
  @import "../assets/css/photo_list.css";
</style>
