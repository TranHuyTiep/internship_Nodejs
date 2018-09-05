/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : internship_nodejs

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2018-08-09 23:06:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tbl_login
-- ----------------------------
DROP TABLE IF EXISTS `tbl_login`;
CREATE TABLE `tbl_login` (
  `login_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `oauth_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL,
  `role_id` int(10) DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  `createBy` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`login_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of tbl_login
-- ----------------------------
INSERT INTO `tbl_login` VALUES ('1', 'Trần Huy Tiệp', '', 'tranhuytiep95@gmail.com', '2304764226418358', '1', '2', '2018-08-06 15:01:14', '2304764226418358');

-- ----------------------------
-- Table structure for tbl_order
-- ----------------------------
DROP TABLE IF EXISTS `tbl_order`;
CREATE TABLE `tbl_order` (
  `id` int(11) NOT NULL,
  `login_id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL,
  `amount` float NOT NULL,
  `address` text COLLATE utf8_unicode_ci NOT NULL,
  `createAt` datetime NOT NULL,
  UNIQUE KEY `id_2` (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of tbl_order
-- ----------------------------
INSERT INTO `tbl_order` VALUES ('0', '1', 'Trần Huy Tiệp', '01663335020', '1', '300000000', 'Ngõ 360/1 số nhà 20, Gần ĐẠI HỌC MỸ THUẬT CÔNG NGHIỆP Hà Nội, Phường Ô Chợ Dừa, Quận Đống Đa, Hà Nội     ', '2018-08-22 05:03:19');
INSERT INTO `tbl_order` VALUES ('1', '1', 'Hello', '09653582582', '0', '300000000', 'Ngõ 360/1 số nhà 20, Gần ĐẠI HỌC MỸ THUẬT CÔNG NGHIỆP Hà Nội, Phường Ô Chợ Dừa, Quận Đống Đa, Hà Nội     ', '2018-08-15 06:10:11');

-- ----------------------------
-- Table structure for tbl_order_detail
-- ----------------------------
DROP TABLE IF EXISTS `tbl_order_detail`;
CREATE TABLE `tbl_order_detail` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `order_id` int(10) NOT NULL,
  `product_id` text COLLATE utf8_unicode_ci NOT NULL,
  `product_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `qty` int(10) NOT NULL,
  `classify` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `price` int(10) NOT NULL,
  UNIQUE KEY `id_3` (`id`),
  KEY `id` (`id`),
  KEY `id_2` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of tbl_order_detail
-- ----------------------------
INSERT INTO `tbl_order_detail` VALUES ('1', '1', '11111111111111111', 'Vợt yonetx đẹp căng dây sẵn', '2', 'xanh', '30000000');
INSERT INTO `tbl_order_detail` VALUES ('2', '1', '11111111111111111', 'ádasdas', '2', 'vàng', '30000000');
INSERT INTO `tbl_order_detail` VALUES ('3', '1', '11111111111111111', 'Vợt yonetx đẹádasaa', '2', 'xanh', '30000000');
INSERT INTO `tbl_order_detail` VALUES ('4', '1', '11111111111111111', 'Vợt yonetx đẹp cdấdasa', '2', 'đỏ', '30000000');

-- ----------------------------
-- Table structure for tbl_status
-- ----------------------------
DROP TABLE IF EXISTS `tbl_status`;
CREATE TABLE `tbl_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  UNIQUE KEY `id_2` (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of tbl_status
-- ----------------------------
INSERT INTO `tbl_status` VALUES ('1', 'Đang xử lý');
INSERT INTO `tbl_status` VALUES ('2', 'Hòa thành');

-- ----------------------------
-- Table structure for tbl_status_order
-- ----------------------------
DROP TABLE IF EXISTS `tbl_status_order`;
CREATE TABLE `tbl_status_order` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `order_id` int(50) NOT NULL,
  `status` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `createAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_2` (`id`),
  KEY `id_3` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of tbl_status_order
-- ----------------------------
INSERT INTO `tbl_status_order` VALUES ('1', '1', 'Đang xử lý', '2018-08-14 14:19:27');
INSERT INTO `tbl_status_order` VALUES ('2', '1', 'Hoàn thành', '2018-08-14 14:19:27');

-- ----------------------------
-- Table structure for tbl_user_informations
-- ----------------------------
DROP TABLE IF EXISTS `tbl_user_informations`;
CREATE TABLE `tbl_user_informations` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `login_id` int(50) NOT NULL,
  `phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `address` text COLLATE utf8_unicode_ci NOT NULL,
  `sex` tinyint(1) NOT NULL,
  `birthday` date NOT NULL,
  `createAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `login_id` (`login_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of tbl_user_informations
-- ----------------------------
INSERT INTO `tbl_user_informations` VALUES ('1', '1', '+841663335020', 'Trần Huy Tiệp', 'Ngõ 360/1 số nhà 20, Gần ĐẠI HỌC MỸ THUẬT CÔNG NGHIỆP Hà Nội, Phường Ô Chợ Dừa, Quận Đống Đa, Hà Nội                     ', '1', '1995-03-25', '2018-08-06 14:54:48');
INSERT INTO `tbl_user_informations` VALUES ('2', '1', '+841663335020', 'Trần Huy Tiệp', 'Ngõ 360/1 số nhà 20, Gần ĐẠI HỌC MỸ THUẬT CÔNG NGHIỆP Hà Nội, Phường Ô Chợ Dừa, Quận Đống Đa, Hà Nội                     ', '1', '1995-03-25', '2018-08-06 14:54:48');

-- ----------------------------
-- Table structure for tbl_verify
-- ----------------------------
DROP TABLE IF EXISTS `tbl_verify`;
CREATE TABLE `tbl_verify` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login_id` int(11) NOT NULL,
  `verify_code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `createAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of tbl_verify
-- ----------------------------
INSERT INTO `tbl_verify` VALUES ('1', '1', '12e459f6e1ea8d8282978c4b1402fe2020a5405cad985df55d8169dab048829c', '2018-08-07 09:57:08');
