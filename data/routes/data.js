var express = require('express');
var router = express.Router();

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
      var allPage = parseInt(allCount)/pageSize;
      var pageStr = allPage.toString();
      // // 不能被整除
      if (pageStr.indexOf('.')>0) {
        allPage = parseInt(pageStr.split('.')[0]) + 1;
      }
  
      // 两条语句同时查询报错,就分两次查询了
      sql = `SELECT * FROM shop_list order by id desc limit ${start},${pageSize};`;
      db.query(sql, function (err, rows) {
        if (err) {
          res.json({status: 0, msg: '获取数据出错', error: err})
        } else if(pageNum>allPage) {
          res.json({status: 0, msg: '无更多数据', data: [],totalPage:allPage,currentPage:pageNum})
        } else {
          res.json({status: 1, msg: '', data: rows,totalPage:allPage,currentPage:pageNum})
        }
      });
    }
  });
});

/**
 * 添加数据
 */
// 处理图片上传
router.post("/assets", function (req, res, next) {
  // res.end(req);
  // res.json(req.body);
  // res.json(req.files);
  // res.end()
});
router.post("/add", function (req, res, next) {
  var title = req.body.title;
  var content = req.body.content;
  var images = req.body.images;
  var origPrice = req.body.origPrice;
  var currPrice = req.body.currPrice;
  db.query(`insert into shop_list(title,content,images,orig_price,curr_price) values('${title}','${content}','${images}','${origPrice}','${currPrice}')`, function (err, rows) {
    if (err) {
      res.json({status: 0, msg: '新增失败', error: err})
    } else {
      res.json({status: 1, msg: '', data: rows})
      // res.redirect("/users");
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
  if(title!=undefined){sql += `title = '${title}',`}
  if(content!=undefined){sql += `content = '${content}',`}
  if(images!=undefined){sql += `images = '${images}',`}
  if(origPrice!=undefined){sql += `orig_price = '${origPrice}',`}
  if(currPrice!=undefined){sql += `curr_price = '${currPrice}',`}
  sql = sql.slice(0,-1);
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