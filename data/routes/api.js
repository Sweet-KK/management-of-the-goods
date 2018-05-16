const express = require('express'),
  router = express.Router(),
  formidable = require('formidable'),
  fs = require('fs'),
  jwt = require("jsonwebtoken"),
  shop_list = require("../model/shop_list"),
  DbOpt = require("../model/Dboption"),
  DbInit = require('../model/DbInit');

// token信息
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
      expiresIn: 60 * 15  //15分钟
    });
    res.send({
      return: 1,
      code: 1,
      msg: '账号密码正确',
      data: token
    })
    // res.json({status: 1, msg: token})
  } else {
    res.send({
      return: -1,
      code: -1,
      msg: '账号密码不正确',
      data: ''
    })
    // res.json({status: 0, msg: '账号或密码不正确'})
  }
})
/**
 * 校验token
 */
router.post('/checktoken', function (req, res, next) {
  var token = req.cookies.token || req.body.token || req.headers["x-access-token"]; // 从body或query或者header中获取token
  jwt.verify(token, secretOrPrivateKey, function (err, decode) {
    if (err) {  //  时间失效的时候/ 伪造的token
      res.send({
        return: -1,
        code: -1,
        msg: 'token错误',
        data: err
      })
      // res.json({status: 0, msg: err})
    } else {
      res.send({
        return: 1,
        code: 1,
        msg: 'token验证通过',
        data: decode
      })
      // res.json({status: 1, msg: decode})
    }
  })
})

/**
 * 根据id查询数据
 */
router.get("/getforid", function (req, res, next) {
  let id = req.query.id;
  let findParams = {
    id: id
  }
  if (id) {
    DbOpt.findOne(shop_list, {where: findParams}, req, function (err, results) {
      if (err) {
        res.send({
          return: -1,
          code: -1,
          msg: 'find error',
          data: err,
        })
      } else {
        res.send({
          return: 1,
          code: 1,
          msg: 'find success',
          data: results,
        })
      }
    });
  } else {
    res.send({
      return: -1,
      code: -1,
      msg: 'id can not be null',
      data: [],
    })
  }
});


/**
 * 根据关键字分页查询数据,不传为查询所有
 */
router.get("/get", function (req, res, next) {
  let keyword = req.query.keyword || '';
  // // pageSize为每页显示条数
  let pageSize = parseInt(req.query.pageSize) || 5;
  let pageNum = parseInt(req.query.pageNum) || 1;

  let findParams = {
    '$or': []
  };
  //对页码进行容错,同时避免pagesize过大,请求数据太慢
  if (pageSize > 20) {
    pageSize = 20
  }
  if (pageNum < 1) {
    pageNum = 1
  }
  // OR条件
  findParams['$or'].push({'title': {'$like': '%' + keyword + '%'}})
  findParams['$or'].push({'content': {'$like': '%' + keyword + '%'}})
  // AND条件
  // findParams.title = {'$like': '%' + keyword + '%'}
  // findParams.content = {'$like': '%' + keyword + '%'}

  DbOpt.findAllByParam(shop_list, {
    limit: pageSize,
    offset: parseInt(pageSize * (pageNum - 1)) || 0,
    order: [['update_time', 'DESC']],
    where: findParams
  }, req, function (err, results) {
    if (err) {
      res.send({
        return: -1,
        code: -1,
        msg: 'find error',
        data: err,
        rowcount: 0,
        pagesize: pageSize,
        pagenum: pageNum
      })
    }
    else {
      if (results.length > 0) {
        DbOpt.count(shop_list, {where: findParams}, req, function (err, result) {
          if (err) {
            res.send({
              return: -1,
              code: -1,
              msg: 'count error',
              data: err,
              rowcount: 0,
              pagesize: pageSize,
              pagenum: pageNum,
            })
          } else {
            let totalPage = parseInt(result) / pageSize;
            let pageStr = totalPage.toString();
            // 不能被整除
            if (pageStr.indexOf('.') > 0) {
              totalPage = parseInt(pageStr.split('.')[0]) + 1;
            }
            res.send({
              return: 1,
              code: 1,
              msg: 'find success',
              data: results,
              rowcount: result,
              pagesize: pageSize,
              pagenum: pageNum,
              totalPage: totalPage
            })
          }
        });
      } else {
        res.send({
          return: 0,
          code: 0,
          msg: 'no data',
          data: [],
          rowcount: 0,
          pagesize: pageSize,
          pagenum: pageNum,
          totalPage: 0
        })
      }
    }
  })
});
/**
 * 添加数据
 * 1.图片上传
 * 2.纯文本数据添加到数据库
 */
router.post("/upload/img", function (req, res, next) {
  /*1.创建表单*/
  let form = new formidable.IncomingForm();
  /*1.1设置上传图片放置的临时路径*/
  form.uploadDir = './upload';

  /*2.使用表单解析对应的请求*/
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.send({
        return: -1,
        code: -1,
        msg: 'img upload error',
        data: err,
      })
      // res.json({status: 0, msg: '图片上传失败', error: err})
    } else {
      // console.log(files);   //上传文件
      let types = files.file.name.split('.'); //将文件名以.分隔，取得数组最后一项作为文件后缀名。
      let date = new Date();
      let ms = Date.parse(date); //计算当前时间与1970年1月1日午夜相差的毫秒数 赋值给ms以确保文件名无重复。
      let newPath = `${__dirname}/../public/assets/`;
      let newName = `${ms}${Math.floor(Math.random() * 100)}.${String(types[types.length - 1])}`;
      console.log(newName + ' 图片上传成功');
      /*3.文件重命名到新路径*/
      fs.renameSync(files.file.path, newPath + newName);

      res.send({
        return: 1,
        code: 1,
        msg: 'img upload success',
        filename: newName
      })
      // res.json({status: 1, msg: '', filename: newName})
    }
  })
});
router.post("/upload/text", function (req, res, next) {
  let title = req.body.title;
  let content = req.body.content;
  let images = req.body.images || [];
  let origPrice = req.body.origPrice || 0;
  let currPrice = req.body.currPrice || 0;

  let params = {
    title: title,
    content: content,
    images: images,
    orig_price: origPrice,
    curr_price: currPrice
  }

  console.log(params);
  // 添加到数据库中
  DbOpt.addOne(shop_list, params, req, function (err, result) {
    if (err) {
      res.send({
        return: -1,
        code: -1,
        msg: 'add data error',
        data: err
      })
    } else {
      res.send({
        return: 1,
        code: 1,
        msg: 'add data success',
        data: result
      })
    }
  })

  // // 添加到数据库中
  // db.query(`insert into shop_list(title,content,images,orig_price,curr_price) values('${title}','${content}','${images}','${origPrice}','${currPrice}')`, function (err, rows) {
  //   if (err) {
  //     res.json({status: 0, msg: '新增数据失败', error: err})
  //   } else {
  //     res.json({status: 1, msg: '', data: rows})
  //   }
  // });

});

/**
 * 更新数据(目前只能修改文本信息,不支持图片修改)
 */
router.post("/update", function (req, res, next) {
  let id = req.body.id;
  let title = req.body.title;
  let content = req.body.content;
  // let images = req.body.images;
  let origPrice = req.body.origPrice;
  let currPrice = req.body.currPrice;

  let updateparams = {
    title: title,
    content: content,
    orig_price: origPrice,
    curr_price: currPrice
  }

  if (id) {
    DbOpt.findOne(shop_list, {where: {id: id}}, req, function (err, results) {
      if (err) {
        res.send({
          return: -1,
          code: -1,
          msg: 'find error',
          data: err,
        })
      } else {
        if (title.length <= 0 || content.length <= 0) {
          res.send({
            return: -1,
            code: -1,
            msg: 'title and content can not be null,undefined,empty',
            data: '',
          })
        } else {
          DbOpt.updateOne(shop_list, updateparams, {where: {id: id}}, req, function (err, result) {
            if (err) {
              res.send({
                return: -1,
                code: -1,
                msg: 'update error',
                data: err,
              })
            } else {
              res.send({
                return: 1,
                code: 1,
                msg: 'update success',
                data: '',
              })
            }
          })
        }
      }
    });
  } else {
    res.send({
      return: -1,
      code: -1,
      msg: 'id can not be null,undefined,empty',
      data: '',
    })
  }

  //
  // // 向数据库发起修改
  // db.query(sql, function (err, rows) {
  //   if (err) {
  //     res.json({status: 0, msg: '修改失败', error: err})
  //   } else {
  //     res.json({status: 1, msg: '', data: rows})
  //   }
  // });
});


/**
 * 删除储存文件
 */
router.post("/delfile", function (req, res) {
  let fileName = req.body.fileName;
  deleteFile(fileName, function () {
    res.send({
      return: 1,
      code: 1,
      msg: `${fileName} 图片删除成功!`,
      data: '',
    })
  })
});
/**
 * 删除储存文件和数据
 */
router.post("/del", function (req, res) {
  let id = req.body.id;

  DbOpt.findOne(shop_list, {where: {id: id}}, req, function (err, results) {
    if (err) {
      res.send({
        return: -1,
        code: -1,
        msg: 'find error',
        data: err,
      })
    } else {
      // 先遍历图片数组删除对应图片
      // console.log(results.images);
      let imageArr = results.images.split(',')
      imageArr.forEach((value, index, array) => {
        let fileName = value.split('/')[value.split('/').length - 1];
        deleteFile(fileName)
      })

      // 再删除数据库数据
      DbOpt.delOne(shop_list, {where: {id: id}}, req, function (err, result) {
        if (err) {
          res.send({
            return: -1,
            code: -1,
            msg: 'del error',
            data: err,
          })
        } else {
          res.send({
            return: 1,
            code: 1,
            msg: 'del success',
            data: '',
          })
        }
      })
    }
  });
});

function deleteFile(fileName, fn) {
  fs.unlink(`${__dirname}/../public/assets/${fileName}`, function (err) {
    if (err) {
      console.log(`出现错误:${err} , ${fileName} 删除失败!`);
    } else {
      console.log(`${fileName} 删除成功!`);
      if (fn) {
        fn()
      }
    }
  });
}


module.exports = router;
