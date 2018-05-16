/**
 * Created by Eric on 2017/5/9.
 * 数据库初始化
 */
(function() {
    let rootConfig = require('../config/rootConfig');
    let Sequelize = require('sequelize');

    let seqInstance = new Sequelize(
        rootConfig.dbname, // 数据库名
        rootConfig.dbusername,   // 用户名
        rootConfig.dbpwd,   // 用户密码
        {
            'dialect': 'mysql',  // 数据库使用mysql
            'host': rootConfig.dbhost, // 数据库服务器ip
            'port': rootConfig.dbport,        // 数据库服务器端口
            'define': {
                // 字段以下划线（_）来分割（默认是驼峰命名风格）
                'underscored': true
            }
        }
    );
    module.exports = {
        sequelize:seqInstance,
        seqobj:Sequelize

    };

}).call(this);
