var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var jwt = require("jsonwebtoken");

var db = require('../config/db');

const userMd5 = '8BD6BBD87C11BF8574B976871E991119';
const pwdMd5 = 'D0769C827224F907C232414758FF8944';
const content = {uid: userMd5};
const secretOrPrivateKey = 'I am an admin!';


/**
 * 校验管理员账户密码,返回token(懒得再新建个表存储账号密码了,直接验证)
 */
router.post('/gettoken', function (req, res, next) {
  var acoount = req.body.account.toUpperCase();
  var pwd = req.body.pwd.toUpperCase();
  if (acoount == userMd5 && pwd == pwdMd5) {
    var token = jwt.sign(content, secretOrPrivateKey, {
      expiresIn: 60*15  //15分钟
    });
    res.json({status: 1, msg: token})
  } else {
    res.json({status: 0, msg: '账号或密码不正确'})
  }
})
/**
 * 校验token
 */
router.post('/checktoken', function (req, res, next) {
  var token = req.cookies.token || req.body.token || req.headers["x-access-token"]; // 从body或query或者header中获取token
  jwt.verify(token, secretOrPrivateKey, function (err, decode) {
    if (err) {  //  时间失效的时候/ 伪造的token
      res.json({status: 0, msg: err})
    } else {
      // req.decode = decode;
      res.json({status: 1, msg: decode})
    }
  })
})

/**
 * 根据id查询数据
 */
router.get("/getforid", function (req, res, next) {
  var id = req.query.id;
  db.query(`SELECT * from shop_list WHERE id=${id};`, function (err, rows) {
    if (err) {
      console.log(`查询错误${err}`);
    } else {
      res.json({status: 1, msg: '', data: rows})
    }
  })
});
/**
 * 根据关键字分页查询数据,不传为查询所有
 */
router.get("/get", function (req, res, next) {
  var keyword = req.query.keyword || '';
  // pageSize为每页显示条数
  var pageSize = req.query.pageSize || 5;
  var pageNum = req.query.pageNum || 1;
  var start = (pageNum - 1) * pageSize;
  var sql = `SELECT COUNT(*) FROM shop_list where title like '%${keyword}%' or content like '%${keyword}%';`;
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
      sql = `SELECT * FROM shop_list where title like '%${keyword}%' or content like '%${keyword}%' order by creat_time desc limit ${start},${pageSize};`;
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
      // console.log(files);   //上传文件
      
      var types = files.file.name.split('.'); //将文件名以.分隔，取得数组最后一项作为文件后缀名。
      var date = new Date();
      var ms = Date.parse(date); //计算当前时间与1970年1月1日午夜相差的毫秒数 赋值给ms以确保文件名无重复。
      var newPath = `${__dirname}/../public/assets/`;
      var newName = `${ms}${Math.floor(Math.random() * 100)}.${String(types[types.length - 1])}`;
      console.log(newName+'图片上传成功');
  
  
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
 * 删除文件
 */
function deleteFile(fileName, fn) {
  fs.unlink(`${__dirname}/../public/assets/${fileName}`, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log(`${fileName}删除成功!`);
      if (fn) {
        fn()
      }
    }
  });
}

/**
 * 删除储存文件
 */
router.post("/delfile", function (req, res) {
  var fileName = req.body.fileName;
  deleteFile(fileName, function () {
    res.json({status: 1, msg: `${fileName}删除成功!`})
  })
});
/**
 * 删除储存文件和数据
 */
router.post("/del", function (req, res) {
  var id = req.body.id;
  db.query(`SELECT * from shop_list WHERE id=${id};`, function (err, rows) {
    if (err) {
      console.log(`查询删除错误${err}`);
    } else {
      // 先遍历图片数组删除对应图片
      let imageArr = rows[0].images.split(',')
      imageArr.forEach((value, index, array) => {
        let fileName = value.split('/')[value.split('/').length - 1];
        
        deleteFile(fileName)
      })
      
      // 再删除存储数据
      db.query(`delete from shop_list where id = ${id}`, function (err, rows) {
        if (err) {
          res.json({status: 0, msg: '删除失败', error: err})
        } else {
          res.json({status: 1, msg: '', data: rows})
        }
      });
    }
  })
});

/**
 * 修改数据(目前只能修改文本信息,不支持图片修改)
 */
router.post("/update", function (req, res, next) {
  var id = req.body.id;
  var title = req.body.title;
  var content = req.body.content;
  // var images = req.body.images;
  var origPrice = req.body.origPrice;
  var currPrice = req.body.currPrice;
  
  var sql = "update shop_list set ";
  
  if (title != undefined) {
    sql += `title = '${title}',`
  }
  if (content != undefined) {
    sql += `content = '${content}',`
  }
  // if (images != undefined) {
  //   sql += `images = '${images}',`
  // }
  if (origPrice != undefined) {
    sql += `orig_price = '${origPrice}',`
  }
  if (currPrice != undefined) {
    sql += `curr_price = '${currPrice}',`
  }
  sql = sql.slice(0, -1);
  sql += ` where id = ${id}`;
  // 向数据库发起修改
  db.query(sql, function (err, rows) {
    if (err) {
      res.json({status: 0, msg: '修改失败', error: err})
    } else {
      res.json({status: 1, msg: '', data: rows})
    }
  });
});


module.exports = router;