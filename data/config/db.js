var mysql = require("mysql");
var pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"20160502",
    database:"shop"
});
/*设置一个函数用来抽取对应的增删改查
* 设置第二个参数表示回调*/
exports.query = function (sql,callback){
  pool.getConnection(function(err,connection){
    connection.query(sql, function (err,rows) {
      connection.release();
      callback(err,rows);
    });
  });
};