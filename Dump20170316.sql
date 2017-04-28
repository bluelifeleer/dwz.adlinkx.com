CREATE DATABASE  IF NOT EXISTS `adease` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `adease`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: adease
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.16-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `invite_code`
--

DROP TABLE IF EXISTS `invite_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invite_code` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` char(8) NOT NULL DEFAULT '',
  `user_id` char(16) NOT NULL DEFAULT '',
  `is_del` tinyint(1) NOT NULL DEFAULT '0',
  `use_num` int(11) NOT NULL DEFAULT '0',
  `timer` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invite_code`
--

LOCK TABLES `invite_code` WRITE;
/*!40000 ALTER TABLE `invite_code` DISABLE KEYS */;
INSERT INTO `invite_code` VALUES (1,'M9Ri3Bvw','1483863319667052',0,0,1489202176),(2,'e5mTkhVN','1483863319667052',0,0,1489202206),(3,'nguHNY0d','1483863319667052',0,0,1489202235),(4,'7AcLtlXs','1483863319667052',0,0,1489202261),(5,'r$v2RrjZ','1483863319667052',0,0,1489202569);
/*!40000 ALTER TABLE `invite_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operate_log`
--

DROP TABLE IF EXISTS `operate_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `operate_log` (
  `uid` char(16) NOT NULL DEFAULT '',
  `actions` varchar(155) NOT NULL DEFAULT '',
  `remarks` text,
  `ip` bigint(20) NOT NULL DEFAULT '0',
  `location` varchar(255) NOT NULL DEFAULT '',
  `group` varchar(16) DEFAULT '' COMMENT '用户所属组',
  `permissions` char(5) NOT NULL DEFAULT 'r',
  `language` varchar(50) DEFAULT '' COMMENT '用户使用的浏览器语言。',
  `os` varchar(50) DEFAULT '' COMMENT '用户操作系统 ',
  `device` varchar(50) DEFAULT '' COMMENT '用户使用设备',
  `is_del` tinyint(2) NOT NULL DEFAULT '0',
  `timer` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operate_log`
--

LOCK TABLES `operate_log` WRITE;
/*!40000 ALTER TABLE `operate_log` DISABLE KEYS */;
INSERT INTO `operate_log` VALUES ('1483863319667052','用户注册','尊敬的用户[李鹏]:您于2017-01-08注册成功。<a href=\"https://www.adease.com\">www.adease.com</a>',2130706433,'','','rw','',NULL,'',0,1483863319),('1483863319667052','用户登录','尊敬的用户[李鹏]:您于2017-01-08登录成功。<a href=\"https://www.adease.com\">www.adease.com</a>',2130706433,'','','rw','',NULL,'',0,1483863336),('1483863319667052','用户登录','尊敬的用户[李鹏]:您于2017-02-09登录成功。<a href=\"https://www.adease.com\">www.adease.com</a>',3232239617,'','','rw','',NULL,'',0,1486654258),('1483863319667052','用户登录','尊敬的用户[李鹏]:您于2017-02-10登录成功。<a href=\"https://www.adease.com\">www.adease.com</a>',2130706433,'','','rw','','','',0,1486735935),('1483863319667052','用户登录','尊敬的用户[李鹏]:您于2017-03-11登录成功。<a href=\"https://www.adease.com\">www.adease.com</a>',2130706433,'','','rw','','','',0,1489202631);
/*!40000 ALTER TABLE `operate_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `short_code`
--

DROP TABLE IF EXISTS `short_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `short_code` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `short` char(6) NOT NULL DEFAULT '',
  `invite_code` char(8) NOT NULL DEFAULT '',
  `is_del` tinyint(1) NOT NULL DEFAULT '0',
  `click` int(11) NOT NULL DEFAULT '0',
  `link` varchar(255) NOT NULL DEFAULT '',
  `true_ip` char(50) NOT NULL DEFAULT '',
  `proxy_ip` char(50) DEFAULT '',
  `short_full_link` varchar(100) DEFAULT '' COMMENT '生成的短链全连接',
  `qr_code` varchar(255) DEFAULT '' COMMENT '二维码图片地址',
  `timer` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `short_code`
--

LOCK TABLES `short_code` WRITE;
/*!40000 ALTER TABLE `short_code` DISABLE KEYS */;
INSERT INTO `short_code` VALUES (1,'RnnnFF','M9Ri3Bvw',0,0,'http://codeigniter.org.cn/user_guide/database/examples.html','127.0.0.1','short.adlinkx.com','','',1489218035),(2,'2dIycI','M9Ri3Bvw',0,0,'http://blog.csdn.net/ypb455360299/article/details/7421603','127.0.0.1','short.adlinkx.com','','',1489218238),(3,'gX7C2f','M9Ri3Bvw',0,0,'http://php.net/reserved.variables.server','127.0.0.1','short.adlinkx.com','','',1489218309),(4,'6WCxjM','M9Ri3Bvw',0,0,'http://www.cnblogs.com/houfeng/archive/2009/10/28/1591128.html','127.0.0.1','short.adlinkx.com','','',1489218421),(5,'srwamj','M9Ri3Bvw',0,0,'http://www.cnblogs.com/houfeng/archive/2009/10/28/1591128.html','127.0.0.1','short.adlinkx.com','','',1489218435),(6,'2Le7eL','nguHNY0d',0,0,'http://www.cnblogs.com/mvpchenjian/p/6251706.html','127.0.0.1','short.adlinkx.com','https://short.adlinkx.com/2Le7eL','',1489598329),(7,'SmH5kK','nguHNY0d',0,0,'http://www.cnblogs.com/mvpchenjian/p/6251706.html','127.0.0.1','short.adlinkx.com','https://short.adlinkx.com/SmH5kK','',1489598890),(8,'3gmbHm','e5mTkhVN',0,0,'http://www.yiibai.com/redis/hashes_hset.html','127.0.0.1','short.adlinkx.com','https://short.adlinkx.com/3gmbHm','',1489599206),(9,'NT5pLC','M9Ri3Bvw',0,0,'http://www.cnblogs.com/weafer/archive/2011/09/21/2184059.html','127.0.0.1','short.adlinkx.com','https://short.adlinkx.com/NT5pLC','',1489599307),(10,'t7XgS4','M9Ri3Bvw',0,0,'http://codeigniter.org.cn/forums/thread-19316-1-1.html','127.0.0.1','short.adlinkx.com','https://short.adlinkx.com/t7XgS4','',1489599632);
/*!40000 ALTER TABLE `short_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` char(16) NOT NULL DEFAULT '',
  `name` varchar(100) NOT NULL DEFAULT '',
  `password` char(32) NOT NULL DEFAULT '',
  `avatar` varchar(255) NOT NULL DEFAULT '',
  `email` char(100) NOT NULL DEFAULT '',
  `phone` char(11) NOT NULL DEFAULT '',
  `qq` char(15) NOT NULL DEFAULT '',
  `wechat` char(100) NOT NULL DEFAULT '',
  `money` decimal(10,2) NOT NULL DEFAULT '0.00',
  `company_addr` varchar(255) NOT NULL DEFAULT '',
  `company_name` varchar(255) NOT NULL DEFAULT '',
  `website` varchar(255) NOT NULL DEFAULT '',
  `enctype` char(8) NOT NULL DEFAULT '',
  `group` varchar(16) DEFAULT '' COMMENT '用户所属组',
  `permissions` char(5) NOT NULL DEFAULT 'r',
  `is_del` tinyint(2) NOT NULL DEFAULT '0',
  `add_time` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'1483863319667052','李鹏','bb378f0f747bbea2bc30fdbb435742da','','thebulelife@outlook.com','15167167331','','',0.00,'','','','*fixmQ75','','rw',0,1483863319);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-03-16  2:22:39
