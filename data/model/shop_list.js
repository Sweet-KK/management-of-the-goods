/**
 * 创建表
 */
const DbInit = require('./DbInit');
const sequelize = DbInit.sequelize;
const Sequelize = DbInit.seqobj;

const shop_list = sequelize.define('shop_list', {
    id: {
      type: Sequelize.INTEGER(10),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    title: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT('long'),
      allowNull: false
    },
    images: {
      type: Sequelize.TEXT('long'),
      allowNull: true
    },
    orig_price: {
      type: Sequelize.FLOAT,
      allowNull: true
    },
    curr_price: {
      type: Sequelize.FLOAT,
      allowNull: true
    }
  },
  {
    timestamps: true,
    createdAt: 'creat_time',
    updatedAt: 'update_time',
    charset: 'utf8',
    collate: 'utf8_general_ci',
    deletedAt: false,
    freezeTableName: true // Model 对应的表名将与model名相同
  });

// xx.sync() 会创建表并且返回一个Promise对象
// 如果 force = true 则会把存在的表（如果xx表已存在）先销毁再创建表
// 默认情况下 forse = false
shop_list.sync({ force: false });

module.exports = shop_list;