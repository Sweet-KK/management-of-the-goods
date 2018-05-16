/**
 * 数据库操作
 */

var DbOpt = {
    addOne: function(obj,params, req, callback) {
        obj.create(params).then(function (result){
            callback(null, result);
        }).catch(function(err){
            callback(err, null);
        })

    },
    delOne: function(obj,params,req,  callback) {
        obj.destroy(params).then(function (result){
            callback(null, result);
        }).catch(function(err){
            callback(err, null);
        })
    },
    findOne: function(obj,params, req, callback) {
        obj.findOne(params).then(function (result){
            callback(null, result);
        }).catch(function(err){
            callback(err, null);
        })
    },
    updateOne: function(obj,params,criteria, req,callback) {
        obj.update(params,criteria).then(function (result){
            callback(null, result);
        }).catch(function(err){
            callback(err, null);
        })
    },
    findAllByParam: function(obj,params,req, callback) {
        obj.findAll(params).then(function (result){
            callback(null, result);
        }).catch(function(err){
            callback(err, null);
        })
    },
    count: function(obj,params,req, callback) {
        obj.count(params).then(function (result){
            callback(null, result);
        }).catch(function(err){
            callback(err, null);
        })
    }
}


module.exports = DbOpt;