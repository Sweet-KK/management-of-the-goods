<template>
  <div id="photos">
    <div class="fix-title">
      <h2>相册</h2>
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
              :maxlength="maxlength"
              @keydown.enter.native="search"
          ></cube-input>
          <a href="" @click.prevent="search">搜索</a>
        </div>
        
        <div class="photos">
          <div class="photo-list" v-for="item in items">
            <div class="grid">
              <photo-preview :images="JSON.parse(item.images)"></photo-preview>
            </div>
            <div class="main">
              <h3>{{item.title}}</h3>
              <p class="desc">{{item.content}}</p>
              <p class="time">发表于 <span>{{item.creat_time | dateFormat}}</span></p>
            
            </div>
          </div>
        </div>
      
      
      </cube-scroll>
    </div>
  
  </div>
</template>

<script>
  import PhotoPreview from '../components/PhotoPreview'
  
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
        maxlength: 20,
        items: [],
        pageNum: 1,
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
        setTimeout(this.getPageDate(1), 200)
      },
      // 上拉加载
      onPullingUp() {
        // 更新数据
        this.pageNum++;
        setTimeout(this.addPageDate(this.pageNum), 300)
        
      },
      // 搜索关键词
      search() {
        if (this.keyword == '') {
          const toast = this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '搜索内容不能为空!'
          })
          toast.show()
          return
        }
        this.axios.post('/api/search', {
          keyword: this.keyword
        })
        .then((res) => {
          if (res.data.data.length > 0) {
            // 如果有数据
            // console.log(res.data.data);
            //把所有搜索到的数据呈现,切换到别的页面显示,可以实现上拉加载
            
          } else {
            // 如果没有数据
            const toast = this.$createToast({
              type: 'warn',
              time: 1000,
              txt: '搜索不到相关内容,请换个关键词!'
            })
            toast.show()
          }
        })
        .catch((err) => {
          console.log(err);
        })
      },
      // 获取某页数据
      getPageDate(num) {
        var num = num || 1;
        this.axios.get('/api/get', {
          params: {
            page: num
          }
        })
        .then((res) => {
          if (res.data.data.length > 0) {
            // 如果有新数据,新数据覆盖旧数据
            this.items = res.data.data;
            this.$refs.scroll.forceUpdate()
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate()
          }
        })
        .catch((err) => {
          this.$refs.scroll.forceUpdate()
          console.log(err);
        })
        
      },
      // 获取某页数据拼接原来数据显示
      addPageDate(num) {
        var num = num;
        this.axios.get('/api/get', {
          params: {
            page: num
          }
        })
        .then((res) => {
          if (res.data.data.length > 0) {
            // 如果有新数据,拼接到旧数据后面
            this.items = this.items.concat(res.data.data)
            this.$refs.scroll.forceUpdate()
          } else {
            // 如果没有新数据
            this.pageNum = res.data.totalPage;
            this.$refs.scroll.forceUpdate()
          }
        })
        .catch((err) => {
          this.$refs.scroll.forceUpdate()
          console.log(err);
        })
        
      }
    },
    created: function () {
      // 初次获取数据
      this.getPageDate()
    },
    mounted: function () {
      
    },
    filters: {
      // 后台日期格式化
      dateFormat(val) {
        var date = new Date(val);
        return date.toLocaleString();
      }
    },
    components: {
      'photo-preview': PhotoPreview
    }
  }
</script>

<style scoped>
  #photos {
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
  .fix-title {
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
  .content {
    height: calc(100% - 44px);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .content .cube-slide-dots > span {
    height: 0.08rem;
  }
  .cube-slide-item > a img {
    margin: 0 auto;
    width: 100%;
  }
  .searchBar {
    margin: 10px 0;
    background-color: #b6b6b6;
    position: relative;
  }
  .searchBar .cube-input {
    width: 88%;
  }
  .searchBar a {
    padding: 0.266667rem 0;
    width: 12%;
    text-align: center;
    font-size: 0.373333rem;
    line-height: 1.429;
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 2px;
    color: #fff;
  }
  .photo-list {
    background-color: #fff;
    -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;
  }
  .photo-list .main {
    padding: 0 10px;
    font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB", "Hiragino Sans GB W3", FontAwesome, sans-serif;
  }
  .photo-list .main h3 {
    text-align: left;
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .photo-list .main .desc {
    text-indent: 2em;
    margin: 20px 0;
    font-size: 0.4rem;
  }
  .photo-list .main .time {
    margin-bottom: 10px;
    padding-bottom: 20px;
    text-align: right;
    font-size: 14px;
    color: #999;
  }
</style>
