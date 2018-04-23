# management-of-the-goods
vue+node+express+mysql,商品展示、搜索、上传、编辑修改

第一次尝试全栈开发,采取的一种较为笨拙的方法,分别创建两个项目,express项目负责提供接口,vue项目负责前端页面.开发过程中需要跑两个服务(express项目和vue项目),开发完毕以后把vue项目打包到express项目中的public文件夹下(已修改webpack打包路径配置),最后只需要把express项目跑起来就行了,然后访问localhost:3000或者localhost:3000/index.html就ok了

express项目:data目录    
vue项目:photos目录




### RUN DEMO

注意:请先安装mysql,创建数据库shop,已备份好sql文件,可以直接用Navicat运行创建数据表,也可以右键编辑查看数据库信息

``` bash
# 进入express项目目录
cd data/

# 安装依赖
npm install

# 运行服务
npm start或者node bin/www   
浏览器打开localhost:3000或者localhost:3000/index.html即可
```


### 开发

``` bash
# 1.先把接口服务跑起来

# 进入express项目目录
cd data/

# 安装依赖
npm install

# 运行服务
npm start   
    

# 2.然后把vue项目跑起来

# 进入photos项目目录
cd photos/

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev



# 3.项目开发完成
npm run build

```