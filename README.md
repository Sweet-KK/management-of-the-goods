# management-of-the-goods
vue+node+express+mysql,商品展示、搜索、上传、编辑修改

第一次尝试全栈开发,不知道如何把一个express项目和vue项目合并起来,所以就采取一种较为笨拙的方法,分别创建两个项目,一个只提供接口,一个负责页面.开发过程中需要跑两个(express项目和vue项目),开发完毕以后把vue项目打包到express项目中的public文件夹下(已修改webpack打包路径配置),最后只需要跑express项目就行了,然后访问localhost:3000就ok了

express项目:data目录    
vue项目:photos目录


暂未写好此文档,有很多错误,后续再做修改

### RUN DEMO

注意:请先安装mysql,数据库结构,备份文件

``` bash
# 进入express项目目录
cd data/

# install dependencies
npm install

# serve with hot reload at localhost:3000
npm start
    
浏览器打开localhost:3000即可
```


### 开发环境

``` bash
先把接口服务跑起来

# 进入express项目目录
cd data/

# install dependencies
npm install

# serve with hot reload at localhost:3000
npm start   
    

然后把vue项目跑起来

# 进入photos项目目录
cd photos/

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

```