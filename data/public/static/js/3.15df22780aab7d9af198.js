webpackJsonp([3],{AJqI:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"edit",data:function(){return{keyword:"",banners:[{url:"http://www.didichuxing.com/",image:"//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png"},{url:"http://www.didichuxing.com/",image:"//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png"},{url:"http://www.didichuxing.com/",image:"//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png"}],items:[],pageNum:1,pageSize:5,options:{open:{pullDownRefresh:{threshold:50,stop:50,txt:"刷新成功"},pullUpLoad:{threshold:0,txt:{more:"加载更多",noMore:"加载完毕"}}},close:{pullDownRefresh:!1,pullUpLoad:!1}}}},methods:{onPullingDown:function(){var t=this;this.pageNum=1,setTimeout(function(){t.getPageData(t.pageNum,t.pageSize)},200)},onPullingUp:function(){var t=this;this.pageNum++,setTimeout(function(){t.addPageData(t.pageNum,t.pageSize)},300)},search:function(){this.pageNum=1,this.getPageData(this.pageNum,this.pageSize)},getPageData:function(t,e){var n=this;this.axios.get("/api/get",{params:{pageNum:t,pageSize:e,keyword:this.keyword}}).then(function(t){n.$refs.scroll.forceUpdate(),n.items=t.data.data}).catch(function(t){n.$refs.scroll.forceUpdate(),console.log(t)})},addPageData:function(t,e){var n=this;this.axios.get("/api/get",{params:{pageNum:t,pageSize:e,keyword:this.keyword}}).then(function(t){t.data.data.length>0?(n.$refs.scroll.forceUpdate(),n.items=n.items.concat(t.data.data)):(n.$refs.scroll.forceUpdate(),n.pageNum=t.data.totalPage)}).catch(function(t){n.$refs.scroll.forceUpdate(),console.log(t)})},toBack:function(){this.$router.back(-1)},toDelete:function(t,e){var n=this;this.$createDialog({type:"confirm",icon:"",title:"",content:"确认删除此条数据?",confirmBtn:{text:"确定",active:!0,disabled:!1,href:"javascript:;"},cancelBtn:{text:"取消",active:!1,disabled:!1,href:"javascript:;"},onConfirm:function(){n.axios.post("/api/del",{id:t}).then(function(t){1==t.data.status?n.items.splice(e,1):n.$createToast({type:"warn",time:1e3,txt:"删除失败"+t.data.msg}).show()}).catch(function(t){console.log(t)})},onCancel:function(){}}).show()}},created:function(){this.getPageData(this.pageNum,this.pageSize)},filters:{dateFormat:function(t){return new Date(t).toLocaleString()},imgArr:function(t){return t.split(",")}},components:{"photo-preview":n("+1Fr").a}},o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"edit"}},[n("div",{staticClass:"fix-title"},[n("a",{staticClass:"be-back icon iconfont icon-guanbi",attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.toBack(e)}}}),t._v(" "),n("h2",[t._v("商品管理")])]),t._v(" "),n("div",{staticClass:"content"},[n("cube-scroll",{ref:"scroll",attrs:{options:t.options.open},on:{"pulling-down":t.onPullingDown,"pulling-up":t.onPullingUp}},[n("div",{staticClass:"searchBar"},[n("cube-input",{attrs:{placeholder:"请输入关键词搜索",type:"search"},nativeOn:{keydown:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.search(e):null}},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}}),t._v(" "),n("a",{staticClass:"icon iconfont icon-sousuo",attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.search(e)}}})],1),t._v(" "),n("div",{staticClass:"photos"},[t._l(t.items,function(e,i){return t.items.length>0?n("div",{staticClass:"photo-list"},[n("a",{staticClass:"delete icon iconfont icon-close",attrs:{href:""},on:{click:function(n){n.preventDefault(),t.toDelete(e.id,i)}}}),t._v(" "),n("div",{staticClass:"grid"},[n("photo-preview",{attrs:{images:t._f("imgArr")(e.images)}})],1),t._v(" "),n("div",{staticClass:"main"},[n("h3",[t._v(t._s(e.title))]),t._v(" "),n("p",{staticClass:"desc"},[t._v(t._s(e.content))]),t._v(" "),n("p",{staticClass:"price"},[n("span",{staticClass:"orig"},[t._v("原价:"),n("b",[t._v(t._s(e.orig_price||"null"))])]),t._v(" "),n("span",{staticClass:"curr"},[t._v("售价:"),n("b",[t._v(t._s(e.curr_price||"null"))])])]),t._v(" "),n("p",{staticClass:"time"},[t._v("发表于 "),n("span",[t._v(t._s(t._f("dateFormat")(e.creat_time)))])]),t._v(" "),n("router-link",{staticClass:"edit-this icon iconfont icon-bianji",attrs:{to:"/edit-this/"+e.id}},[t._v("编辑")])],1)]):t._e()}),t._v(" "),0==t.items.length?n("div",{staticClass:"photo-list",class:[0==t.items.length?"nodata":""]},[n("div",{staticClass:"tip"},[t._v("暂无数据")])]):t._e()],2)])],1)])},staticRenderFns:[]};var a=n("VU/8")(i,o,!1,function(t){n("V3GV")},null,null);e.default=a.exports},LRKW:function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,'\n#photos .fix-title>a {\n  position: absolute;\n  right: 0.266667rem;\n  top: 0;\n  font-size: 0.48rem;\n  color: #000;\n}\n#edit .fix-title > a {\n  position: absolute;\n  left: 0;\n  top: 0;\n  padding: 0 0.266667rem;\n}\n.content {\n  height: calc(100% - 1.173333rem);\n  overflow: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.content .cube-slide-dots > span {\n  height: 0.08rem;\n}\n.cube-slide-item > a img {\n  margin: 0 auto;\n  width: 100%;\n}\n.searchBar {\n  margin: 0.266667rem 0;\n  background-color: #b6b6b6;\n  position: relative;\n}\n.searchBar .cube-input {\n  width: 90%;\n}\n.searchBar a {\n  padding: 0.266667rem 0;\n  width: 10%;\n  text-align: center;\n  font-size: 0.533333rem;\n  position: absolute;\n  right: 0;\n  top: 0;\n  border-radius: 0.053333rem;\n  color: #fff;\n}\n.photo-list {\n  background-color: #fff;\n  border-radius: 0.133333rem;\n  position: relative;\n}\n.photo-list .delete {\n  padding: 0.08rem;\n  color: #f00;\n  position: absolute;\n  top: 0;\n  right: 0;\n  background-color: #fff;\n}\n.photo-list.nodata {\n  background-color: transparent;\n}\n.nodata .tip {\n  padding-top: 0.266667rem;\n  font-size: 0.373333rem;\n  text-align: center;\n  color: #999;\n}\n.photo-list .photo-preview img {\n  max-height: 4rem;\n  vertical-align: top;\n}\n.photo-list .grid {\n  padding-top: 0.373333rem;\n}\n.photo-list .main {\n  padding: 0 0.266667rem;\n  font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB", "Hiragino Sans GB W3", FontAwesome, sans-serif;\n}\n.photo-list .main h3 {\n  text-align: left;\n  font-size: 0.426667rem;\n  font-weight: 600;\n  margin: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.photo-list .main .desc {\n  text-indent: 1em;\n  margin: 0.533333rem 0;\n  font-size: 0.4rem;\n}\n.photo-list .main .price {\n  font-size: 0.373333rem;\n  padding-top: 0.533333rem;\n  margin-bottom: 0.4rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: space-evenly;\n  -ms-flex-pack: space-evenly;\n  justify-content: space-evenly;\n}\n.price .orig {\n  color: #205cff;\n  text-decoration: line-through;\n}\n.price .curr {\n  color: #ff1425;\n  font-size: 0.4rem;\n}\n.photo-list .main .time {\n  margin-bottom: 0.266667rem;\n  padding-bottom: 0.533333rem;\n  text-align: right;\n  font-size: 0.32rem;\n  color: #999;\n}\n.photo-list .main .edit-this {\n  position: absolute;\n  left: 0.266667rem;\n  bottom: 0.533333rem;\n  font-size: 0.373333rem;\n  color: #00f;\n}',""])},V3GV:function(t,e,n){var i=n("LRKW");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n("rjj0")("58c4ef5a",i,!0,{})}});