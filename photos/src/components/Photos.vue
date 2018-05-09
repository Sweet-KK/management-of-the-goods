<template>
  <div id="photos">
    <div class="fix-title">
      <h2>相册</h2>
      <a @click.prevent="checkToken" class="icon iconfont icon-guanliyuan"></a>
    </div>
    <div class="content">
      <cube-scroll
          ref="scroll"
          :options="options.open"
          @pulling-down="onPullingDown"
          @pulling-up="onPullingUp">

        <!--banner-->
        <cube-slide ref="slide" :data="banners">
          <cube-slide-item v-for="(item, index) in banners" :key="index">
            <a :href="item.url">
              <img :src="item.image">
            </a>
          </cube-slide-item>
        </cube-slide>

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
          <div class="photo-list" v-if="items.length>0" v-for="item in items">
            <div class="grid">
              <!--{{item.images.split(',')}}-->
              <photo-preview :images = "item.images | imgArr"></photo-preview>
            </div>
            <div class="main">
              <h3>{{item.title}}</h3>
              <p class="desc">{{item.content}}</p>
              <p class="price">
                <span class="orig">原价:<b>{{item.orig_price || 'null'}}</b></span>
                <span class="curr">售价:<b>{{item.curr_price || 'null'}}</b></span>
              </p>
              <p class="time">发表于 <span>{{moment(Date(item.creat_time)).format('YYYY-MM-DD HH:mm:ss')}}</span></p>
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
  // import cookies from 'js-cookies'

  export default {
    name: 'photos',
    data() {
      return {
        keyword: '',
        banners: [
          {
            url: 'http://www.didichuxing.com/',
            image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png'
          },
          {
            url: 'http://www.didichuxing.com/',
            image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png'
          },
          {
            url: 'http://www.didichuxing.com/',
            image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png'
          }
        ],
        // images: [],
        items: [],
        pageNum: 1,
        pageSize: 5,
        // 上拉刷新下拉加载选项
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
        }, 200)

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
          this.$refs.scroll.forceUpdate()
          this.items = res.data.data;
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
          if (res.data.data.length > 0) {
            // 如果有新数据,拼接到旧数据后面
            this.$refs.scroll.forceUpdate()
            this.items = this.items.concat(res.data.data)
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate()
            this.pageNum = res.data.totalPage;
          }
        })
        .catch((err) => {
          this.$refs.scroll.forceUpdate()
          console.log(err);
        })

      },
      // 判断token
      checkToken(){
        // 发送校验token请求
        this.axios.post('/api/checktoken')
        .then((res)=>{
          if(res.data.status==1){
            this.$router.push('/admin')
          }else {
            this.$router.push('/login')
          }
        })
        .catch((err)=>{
          console.log(err);
        })
      }
    },
    created: function () {
      this.getPageData(this.pageNum,this.pageSize)
    },
    filters: {
      // 后台日期格式化
      dateFormat(val) {
        var date = new Date(val);
        return date.toLocaleString();
      },
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
