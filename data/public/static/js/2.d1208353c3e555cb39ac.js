webpackJsonp([2],{"3Kch":function(t,a,n){var e=n("EmbE");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);n("rjj0")("0d0e112b",e,!0,{})},EmbE:function(t,a,n){(t.exports=n("FZ+f")(!1)).push([t.i,"\n.fix-title > a[data-v-84ba43ca] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  padding: 0 0.266667rem;\n}\n.menu[data-v-84ba43ca] {\n  text-align: center;\n}\n.menu li[data-v-84ba43ca] {\n  margin-top: 0.4rem;\n}",""])},qbhH:function(t,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});n("U80E");var e={name:"admin",methods:{toBack:function(){var t=this;this.axios.post("/api/checktoken").then(function(a){1==a.data.status?t.$router.push("/"):t.$router.back(-1)}).catch(function(t){console.log(t)})}}},i={render:function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"admin"},[n("div",{staticClass:"fix-title"},[n("a",{staticClass:"be-back icon iconfont icon-guanbi",attrs:{href:""},on:{click:function(a){return a.preventDefault(),t.toBack(a)}}}),t._v(" "),n("h2",[t._v("后台管理")])]),t._v(" "),t._m(0)])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("ul",{staticClass:"menu"},[a("li",[a("a",{attrs:{href:"#/upload"}},[this._v("新增商品")])]),this._v(" "),a("li",[a("a",{attrs:{href:"#/edit"}},[this._v("商品管理")])])])}]};var s=n("VU/8")(e,i,!1,function(t){n("3Kch")},"data-v-84ba43ca",null);a.default=s.exports}});