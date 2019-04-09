/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Version : 80015
 Source Host           : localhost
 Source Database       : docker_monitor

 Target Server Version : 80015
 File Encoding         : utf-8

 Date: 04/09/2019 16:02:15 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `endpoint`
-- ----------------------------
DROP TABLE IF EXISTS `endpoint`;
CREATE TABLE `endpoint` (
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `dockerUrl` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `promUrl` varchar(50) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `endpoint`
-- ----------------------------
BEGIN;
INSERT INTO `endpoint` VALUES ('local', '192.168.99.116:2376', '192.168.99.116:9090'), ('test', 'unix://var/run/docker.sock', 'localhost:9090');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
