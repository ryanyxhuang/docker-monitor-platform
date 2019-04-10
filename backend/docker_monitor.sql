/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Version : 80015
 Source Host           : localhost
 Source Database       : docker_monitor

 Target Server Version : 80015
 File Encoding         : utf-8

 Date: 04/10/2019 09:37:30 AM
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

-- ----------------------------
--  Table structure for `setting`
-- ----------------------------
DROP TABLE IF EXISTS `setting`;
CREATE TABLE `setting` (
  `key` varchar(20) NOT NULL,
  `value` varchar(50) NOT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `remark` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `setting`
-- ----------------------------
BEGIN;
INSERT INTO `setting` VALUES ('netIOThreshold', '1', 'b/s', null), ('diskIOThreshold', '1', 'b/s', null), ('cpuUsageThreshold', '1', '%', null), ('memoryUsageThreshold', '1', null, null), ('promAccount', 'admin:admin', null, null), ('promInterval', '30m', null, null);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
