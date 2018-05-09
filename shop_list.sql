/*
Navicat MySQL Data Transfer

Source Server         : 展示管理
Source Server Version : 50546
Source Host           : localhost:3306
Source Database       : shop

Target Server Type    : MYSQL
Target Server Version : 50546
File Encoding         : 65001

Date: 2018-05-09 16:37:38
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_list
-- ----------------------------
INSERT INTO `shop_list` VALUES ('1', '2018-05-09 15:21:17', 'aaaaa', '777', '/api/assets/152585047100016.jpg', '888', '88');
