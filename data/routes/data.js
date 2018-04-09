var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

var db = require('../config/db');

/**
 * 根据页面查询数据
 */
router.get("/get", function (req, res, next) {
  // pageSize为每页显示条数
  var pageSize = 3;
  var pageNum = req.query.page * 1 || 1;
  var start = (pageNum - 1) * pageSize;
  var sql = 'SELECT COUNT(*) FROM shop_list';
  db.query(sql, function (err, rows) {
    if (err) {
      res.json({status: 0, msg: '获取数据出错', error: err})
    } else {
      // // 计算总页数
      var allCount = rows[0]['COUNT(*)'];
      var allPage = parseInt(allCount) / pageSize;
      var pageStr = allPage.toString();
      // // 不能被整除
      if (pageStr.indexOf('.') > 0) {
        allPage = parseInt(pageStr.split('.')[0]) + 1;
      }
      
      // 两条语句同时查询报错,就分两次查询了
      sql = `SELECT * FROM shop_list order by id desc limit ${start},${pageSize};`;
      db.query(sql, function (err, rows) {
        if (err) {
          res.json({status: 0, msg: '获取数据出错', error: err})
        } else if (pageNum > allPage) {
          res.json({status: 0, msg: '无更多数据', data: [], totalPage: allPage, currentPage: pageNum})
        } else {
          res.json({status: 1, msg: '', data: rows, totalPage: allPage, currentPage: pageNum})
        }
      });
    }
  });
});

/**
 * 添加数据
 */
// 处理图片上传
router.post("/upload/img", function (req, res, next) {
  /*1.创建表单*/
  var form = new formidable.IncomingForm();
  
  /*1.1设置上传图片放置的路径*/
  form.uploadDir = './upload';
  
  /*2.使用表单解析对应的请求*/
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.json({status: 0, msg: '图片上传失败', error: err})
    } else {
      console.log('图片上传成功');
      // console.log(files);   //上传文件
  
      var types = files.file.name.split('.'); //将文件名以.分隔，取得数组最后一项作为文件后缀名。
      var date = new Date();
      var ms = Date.parse(date); //计算当前时间与1970年1月1日午夜相差的毫秒数 赋值给ms以确保文件名无重复。
      var newPath = `${__dirname}\\..\\temp\\`;
      var newName = `${ms}${Math.floor(Math.random() * 100)}.${String(types[types.length - 1])}`;
      
      // 文件重命名
      fs.renameSync(files.file.path, newPath + newName);
      res.json({status: 1, msg: '', filename: newName})
    }
  })
});
// 处理最终信息上传及添加到数据库中
router.post("/upload/text", function (req, res, next) {
  // console.log(req.body);
  var title = req.body.title;
  var content = req.body.content;
  var images = req.body.images;
  var origPrice = req.body.origPrice || 0;
  var currPrice = req.body.currPrice || 0;
  
  // 添加到数据库中
  db.query(`insert into shop_list(title,content,images,orig_price,curr_price) values('${title}','${content}','${images}','${origPrice}','${currPrice}')`, function (err, rows) {
    if (err) {
      res.json({status: 0, msg: '新增数据失败', error: err})
    } else {
      res.json({status: 1, msg: '', data: rows})
    }
  });
  
});

/**
 * 删除数据
 */
router.get("/del/:id", function (req, res) {
  var id = req.params.id;
  db.query(`delete from shop_list where id = ${id}`, function (err, rows) {
    if (err) {
      res.json({status: 0, msg: '删除失败', error: err})
    } else {
      res.json({status: 1, msg: '', data: rows})
      // res.redirect("/users");
    }
  });
});

/**
 * 修改数据
 */
router.get("/toUpdate/:id", function (req, res, next) {
  var id = req.params.id;
  var sql = `select * from shop_list where id ${id}`;
  console.log(sql);
  db.query(sql, function (err, rows) {
    if (err) {
      res.send("修改页面跳转失败");
    } else {
      res.send("跳转到修改页面");
      // res.render("update", {datas: rows});
    }
  });
});

router.post("/update", function (req, res, next) {
  var id = req.body.id;
  var title = req.body.title;
  var content = req.body.content;
  var images = req.body.images;
  var origPrice = req.body.origPrice;
  var currPrice = req.body.currPrice;
  
  var sql = "update shop_list set ";
  if (title != undefined) {
    sql += `title = '${title}',`
  }
  if (content != undefined) {
    sql += `content = '${content}',`
  }
  if (images != undefined) {
    sql += `images = '${images}',`
  }
  if (origPrice != undefined) {
    sql += `orig_price = '${origPrice}',`
  }
  if (currPrice != undefined) {
    sql += `curr_price = '${currPrice}',`
  }
  sql = sql.slice(0, -1);
  sql += ` where id = ${id}`;
  console.log(sql);
  db.query(sql, function (err, rows) {
    if (err) {
      res.json({status: 0, msg: '修改失败', error: err})
    } else {
      res.json({status: 1, msg: '', data: rows})
      // res.redirect("/users");
    }
  });
});


/**
 * 搜索关键词
 */
router.post("/search", function (req, res, next) {
  var keyword = req.body.keyword;
  var sql = "select * from shop_list";
  if (keyword) {
    sql += ` where title like '%${keyword}%'`;
    sql += ` or content like '%${keyword}%'`;
  }
  
  db.query(sql, function (err, rows) {
    if (err) {
      res.json({status: 0, msg: '查询失败', error: err})
    } else {
      res.json({status: 1, msg: '', data: rows, keyword: keyword})
    }
  });
})

module.exports = router;