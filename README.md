# management-of-the-goods
vue+node+express+mysql  
商品展示、搜索、图片上传、数据增删改查

第一次尝试全栈开发,采取的一种较为笨拙的方法,分别创建两个项目,express项目负责提供接口,vue项目负责前端页面.开发过程中需要跑两个服务(express项目和vue项目),开发完毕以后把vue项目打包到express项目中的public文件夹下(已修改webpack打包路径配置),最后只需要把express项目跑起来就行了,然后访问localhost:3000或者localhost:3000/index.html就ok了

express项目:data文件夹    
vue项目:photos文件夹




### RUN DEMO

注意:采用的是sequlize,请手动创建数据库shop,运行时会自动创建表,数据库连接配置在/data/config/rootConfig.js

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