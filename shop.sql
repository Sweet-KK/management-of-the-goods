/*
Navicat MySQL Data Transfer

Source Server         : 展示管理
Source Server Version : 50546
Source Host           : localhost:3306
Source Database       : shop

Target Server Type    : MYSQL
Target Server Version : 50546
File Encoding         : 65001

Date: 2018-04-18 09:12:01
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for shop_list
-- ----------------------------
DROP TABLE IF EXISTS `shop_list`;
CREATE TABLE `shop_list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `creat_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `title` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `images` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `orig_price` float DEFAULT NULL,
  `curr_price` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_list
-- ----------------------------
INSERT INTO `shop_list` VALUES ('7', '2018-04-13 10:13:15', '1号商品', '高端大气上档次', '/api/assets/152358557000038.jpg', '9999', '8888');
INSERT INTO `shop_list` VALUES ('8', '2018-04-13 10:14:05', '2号商品', '低调奢华有内涵', '/api/assets/152358562900061.jpg', '99', '69');
INSERT INTO `shop_list` VALUES ('9', '2018-04-13 10:14:26', '3号商品', '清仓大甩卖', '/api/assets/152358564800080.jpg,/api/assets/152358565000082.jpg', '1999', '299');
INSERT INTO `shop_list` VALUES ('10', '2018-04-13 10:15:05', '4号商品', '全场最低价', '/api/assets/152358566800036.jpg', '199', '19');
INSERT INTO `shop_list` VALUES ('11', '2018-04-13 10:15:34', '5号商品', '555555555555555', '/api/assets/152358571300094.jpg,/api/assets/152358571700090.jpg,/api/assets/152358571900067.jpg,/api/assets/152358572000098.jpg', '888', '688');
INSERT INTO `shop_list` VALUES ('12', '2018-04-13 16:52:35', '6号商品', '虚拟女友ssssss', '/api/assets/152358573700064.jpg', '2999', '1999');
INSERT INTO `shop_list` VALUES ('13', '2018-04-16 09:46:55', '7号商品', '7777777777777777777777756555', '/api/assets/152358577100047.png', '777', '666');
INSERT INTO `shop_list` VALUES ('15', '2018-04-16 09:47:05', '8号商品999888', 'test内容88888888888888\n', '/api/assets/152360899900046.jpg,/api/assets/152360900000069.jpg', '99999', '79999');
INSERT INTO `shop_list` VALUES ('16', '2018-04-17 10:50:04', '99999999999号99', '999999999999999999', '/api/assets/15238432340005.jpg,/api/assets/152384323700025.jpg', '999', '799');
INSERT INTO `shop_list` VALUES ('17', '2018-04-17 11:50:58', '1010101010', '10~~~~~~~~~~~~10', '/api/assets/152393387400031.jpg', '1999', '1699');
