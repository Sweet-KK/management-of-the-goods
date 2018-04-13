# management-of-the-goods
vue+node +express+mysql,商品展示、搜索、上传、编辑修改

第一次尝试全栈开发,不知道如何把一个express项目和vue项目合并起来,所以就采取一种较为笨拙的方法,分别创建两个项目,一个负责后端,一个负责前端.开发完毕以后把vue项目打包,只需要把dist里面的index.html文件拷贝到express项目中的views文件夹下,把dist里面的static文件夹拷贝到express项目中的public文件夹下,最后只需要跑express项目就行了

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

# serve with hot reload at localhost:3000
npm run dev
```