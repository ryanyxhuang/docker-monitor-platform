/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Version : 80015
 Source Host           : localhost
 Source Database       : docker_monitor

 Target Server Version : 80015
 File Encoding         : utf-8

 Date: 06/03/2019 23:01:26 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `compose`
-- ----------------------------
DROP TABLE IF EXISTS `compose`;
CREATE TABLE `compose` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `stack_id` varchar(50) NOT NULL,
  `is_stack_depend_on` bit(1) NOT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `compose`
-- ----------------------------
BEGIN;
INSERT INTO `compose` VALUES ('mon', 'mon', 'version: \"3.3\"\n\nnetworks:\n  net:\n    driver: overlay\n    attachable: true\n\nvolumes:\n    prometheus: {}\n    grafana: {}\n    alertmanager: {}\n\nconfigs:\n  caddy_config:\n    file: ./caddy/Caddyfile\n  dockerd_config:\n    file: ./dockerd-exporter/Caddyfile\n  node_rules:\n    file: ./prometheus/rules/swarm_node.rules.yml\n  task_rules:\n    file: ./prometheus/rules/swarm_task.rules.yml\n\nservices:\n  dockerd-exporter:\n    image: stefanprodan/caddy\n    networks:\n      - net\n    environment:\n      - DOCKER_GWBRIDGE_IP=172.18.0.1\n    configs:\n      - source: dockerd_config\n        target: /etc/caddy/Caddyfile\n    deploy:\n      mode: global\n      resources:\n        limits:\n          memory: 128M\n        reservations:\n          memory: 64M\n\n  cadvisor:\n    image: google/cadvisor\n    networks:\n      - net\n    command: -logtostderr -docker_only\n    volumes:\n      - /var/run/docker.sock:/var/run/docker.sock:ro\n      - /:/rootfs:ro\n      - /var/run:/var/run\n      - /sys:/sys:ro\n      - /var/lib/docker/:/var/lib/docker:ro\n    deploy:\n      mode: global\n      resources:\n        limits:\n          memory: 128M\n        reservations:\n          memory: 64M\n\n  grafana:\n    image: stefanprodan/swarmprom-grafana:5.3.4\n    networks:\n      - net\n    environment:\n      - GF_SECURITY_ADMIN_USER=${ADMIN_USER:-admin}\n      - GF_SECURITY_ADMIN_PASSWORD=${ADMIN_PASSWORD:-admin}\n      - GF_USERS_ALLOW_SIGN_UP=false\n      #- GF_SERVER_ROOT_URL=${GF_SERVER_ROOT_URL:-localhost}\n      #- GF_SMTP_ENABLED=${GF_SMTP_ENABLED:-false}\n      #- GF_SMTP_FROM_ADDRESS=${GF_SMTP_FROM_ADDRESS:-grafana@test.com}\n      #- GF_SMTP_FROM_NAME=${GF_SMTP_FROM_NAME:-Grafana}\n      #- GF_SMTP_HOST=${GF_SMTP_HOST:-smtp:25}\n      #- GF_SMTP_USER=${GF_SMTP_USER}\n      #- GF_SMTP_PASSWORD=${GF_SMTP_PASSWORD}\n    volumes:\n      - grafana:/var/lib/grafana\n    deploy:\n      mode: replicated\n      replicas: 1\n      placement:\n        constraints:\n          - node.role == manager\n      resources:\n        limits:\n          memory: 128M\n        reservations:\n          memory: 64M\n\n  alertmanager:\n    image: stefanprodan/swarmprom-alertmanager:v0.14.0\n    networks:\n      - net\n    environment:\n      - SLACK_URL=${SLACK_URL:-https://hooks.slack.com/services/TOKEN}\n      - SLACK_CHANNEL=${SLACK_CHANNEL:-general}\n      - SLACK_USER=${SLACK_USER:-alertmanager}\n    command:\n      - \'--config.file=/etc/alertmanager/alertmanager.yml\'\n      - \'--storage.path=/alertmanager\'\n    volumes:\n      - alertmanager:/alertmanager\n    deploy:\n      mode: replicated\n      replicas: 1\n      placement:\n        constraints:\n          - node.role == manager\n      resources:\n        limits:\n          memory: 128M\n        reservations:\n          memory: 64M\n\n  unsee:\n    image: cloudflare/unsee:v0.8.0\n    networks:\n      - net\n    environment:\n      - \"ALERTMANAGER_URIS=default:http://alertmanager:9093\"\n    deploy:\n      mode: replicated\n      replicas: 1\n\n  node-exporter:\n    depends_on:\n     - prometheus\n     - caddy\n    image: stefanprodan/swarmprom-node-exporter:v0.16.0\n    networks:\n      - net\n    environment:\n      - NODE_ID={{.Node.ID}}\n    volumes:\n      - /proc:/host/proc:ro\n      - /sys:/host/sys:ro\n      - /:/rootfs:ro\n      - /etc/hostname:/etc/nodename\n    command:\n      - \'--path.sysfs=/host/sys\'\n      - \'--path.procfs=/host/proc\'\n      - \'--collector.textfile.directory=/etc/node-exporter/\'\n      - \'--collector.filesystem.ignored-mount-points=^/(sys|proc|dev|host|etc)($$|/)\'\n      - \'--no-collector.ipvs\'\n    deploy:\n      mode: global\n      resources:\n        limits:\n          memory: 128M\n        reservations:\n          memory: 64M\n\n  prometheus:\n    image: stefanprodan/swarmprom-prometheus:v2.5.0\n    networks:\n      - net\n    command:\n      - \'--config.file=/etc/prometheus/prometheus.yml\'\n      - \'--storage.tsdb.path=/prometheus\'\n      - \'--storage.tsdb.retention=24h\'\n    volumes:\n      - prometheus:/prometheus\n    configs:\n      - source: node_rules\n        target: /etc/prometheus/swarm_node.rules.yml\n      - source: task_rules\n        target: /etc/prometheus/swarm_task.rules.yml\n    deploy:\n      mode: replicated\n      replicas: 1\n      placement:\n        constraints:\n          - node.role == manager\n      resources:\n        limits:\n          memory: 2048M\n        reservations:\n          memory: 128M\n\n  caddy:\n    image: stefanprodan/caddy\n    ports:\n      - \"3000:3000\"\n      - \"9090:9090\"\n      - \"9093:9093\"\n      - \"9094:9094\"\n    networks:\n      - net\n    environment:\n      - ADMIN_USER=${ADMIN_USER:-admin}\n      - ADMIN_PASSWORD=${ADMIN_PASSWORD:-admin}\n    configs:\n      - source: caddy_config\n        target: /etc/caddy/Caddyfile\n    deploy:\n      mode: replicated\n      replicas: 1\n      placement:\n        constraints:\n          - node.role == manager\n      resources:\n        limits:\n          memory: 128M\n        reservations:\n          memory: 64M\n    healthcheck:\n      test: [\"CMD\", \"curl\", \"-f\", \"http://localhost:3000\"]\n      interval: 5s\n      timeout: 1s\n      retries: 5\n', 'mon', b'0', null, null, null);
COMMIT;

-- ----------------------------
--  Table structure for `endpoint`
-- ----------------------------
DROP TABLE IF EXISTS `endpoint`;
CREATE TABLE `endpoint` (
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `docker_url` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `prom_url` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `endpoint`
-- ----------------------------
BEGIN;
INSERT INTO `endpoint` VALUES ('192.168.99.116', '192.168.99.116:2375', '192.168.99.116:9090'), ('192.168.99.117', '192.168.99.117:2375', '192.168.99.117:9090'), ('local', '192.168.99.116:2375', '192.168.99.116:9090');
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

-- ----------------------------
--  Table structure for `swarm`
-- ----------------------------
DROP TABLE IF EXISTS `swarm`;
CREATE TABLE `swarm` (
  `id` varchar(50) NOT NULL,
  `prom_port` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `swarm_mngt_endpoint`
-- ----------------------------
DROP TABLE IF EXISTS `swarm_mngt_endpoint`;
CREATE TABLE `swarm_mngt_endpoint` (
  `id` varchar(80) COLLATE utf8_bin NOT NULL,
  `swarm_id` varchar(50) COLLATE utf8_bin NOT NULL,
  `manage_node_id` varchar(50) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

SET FOREIGN_KEY_CHECKS = 1;
