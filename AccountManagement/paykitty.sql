-- MySQL dump 10.13  Distrib 5.6.21, for Win64 (x86_64)
--
-- Host: localhost    Database: paykitty
-- ------------------------------------------------------
-- Server version	5.6.21-log

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
-- Table structure for table `dealeraccount`
--

DROP TABLE IF EXISTS `dealeraccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dealeraccount` (
  `DealerNo` char(20) NOT NULL,
  `Name` char(20) DEFAULT NULL,
  `Address` char(100) DEFAULT NULL,
  `State` char(20) DEFAULT NULL,
  PRIMARY KEY (`DealerNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dealeraccount`
--

LOCK TABLES `dealeraccount` WRITE;
/*!40000 ALTER TABLE `dealeraccount` DISABLE KEYS */;
INSERT INTO `dealeraccount` VALUES ('D001','AAAA','Yuhangtang Road#866','Normal'),('D002','BBBB','余杭塘路866号','Lock');
/*!40000 ALTER TABLE `dealeraccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentaccount`
--

DROP TABLE IF EXISTS `paymentaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paymentaccount` (
  `PaymentNo` char(20) NOT NULL,
  `BankName` char(20) DEFAULT NULL,
  `Address` char(100) DEFAULT NULL,
  `State` char(20) DEFAULT NULL,
  PRIMARY KEY (`PaymentNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentaccount`
--

LOCK TABLES `paymentaccount` WRITE;
/*!40000 ALTER TABLE `paymentaccount` DISABLE KEYS */;
INSERT INTO `paymentaccount` VALUES ('P1000001','ICBC','6228888888888888','Normal'),('P1000002','ICBC','6228888888888888','Normal'),('P1000003','ICBC','6228888888888888','Normal'),('P1000004','ICBC','6228888888888888','Normal'),('P1000005','ICBC','6228888888888888',' Lock'),('P1000006','ICBC','6228888888888888',' Lock'),('P1000007','ICBC','6228888888888888',' Lock'),('P1000008','ICBC','6228888888888888',' Lock');
/*!40000 ALTER TABLE `paymentaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `useraccount`
--

DROP TABLE IF EXISTS `useraccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `useraccount` (
  `AccountID` int(11) NOT NULL AUTO_INCREMENT,
  `AccountName` char(20) DEFAULT NULL,
  `Password` char(50) DEFAULT NULL,
  `Salt` char(50) DEFAULT NULL,
  `RegisterDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Name` char(20) DEFAULT NULL,
  `Gender` char(1) DEFAULT NULL,
  `IdNo` char(18) DEFAULT NULL,
  `Address` char(100) DEFAULT NULL,
  `Phone` char(20) DEFAULT NULL,
  `Email` char(50) DEFAULT NULL,
  `State` int(11) DEFAULT NULL,
  `Type` int(11) DEFAULT NULL,
  `DealerNo` char(20) DEFAULT NULL,
  `Payment1` char(20) DEFAULT NULL,
  `Payment2` char(20) DEFAULT NULL,
  `Payment3` char(20) DEFAULT NULL,
  `Payment4` char(20) DEFAULT NULL,
  `Balance` decimal(12,2) DEFAULT NULL,
  `PayPassword` char(50) DEFAULT NULL,
  PRIMARY KEY (`AccountID`),
  UNIQUE KEY `AccountName` (`AccountName`),
  UNIQUE KEY `IdNo` (`IdNo`),
  UNIQUE KEY `Phone` (`Phone`),
  KEY `DealerNo` (`DealerNo`),
  KEY `Payment1` (`Payment1`),
  KEY `Payment2` (`Payment2`),
  KEY `Payment3` (`Payment3`),
  KEY `Payment4` (`Payment4`),
  CONSTRAINT `useraccount_ibfk_1` FOREIGN KEY (`DealerNo`) REFERENCES `dealeraccount` (`DealerNo`),
  CONSTRAINT `useraccount_ibfk_2` FOREIGN KEY (`Payment1`) REFERENCES `paymentaccount` (`PaymentNo`),
  CONSTRAINT `useraccount_ibfk_3` FOREIGN KEY (`Payment2`) REFERENCES `paymentaccount` (`PaymentNo`),
  CONSTRAINT `useraccount_ibfk_4` FOREIGN KEY (`Payment3`) REFERENCES `paymentaccount` (`PaymentNo`),
  CONSTRAINT `useraccount_ibfk_5` FOREIGN KEY (`Payment4`) REFERENCES `paymentaccount` (`PaymentNo`)
) ENGINE=InnoDB AUTO_INCREMENT=227 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useraccount`
--

LOCK TABLES `useraccount` WRITE;
/*!40000 ALTER TABLE `useraccount` DISABLE KEYS */;
INSERT INTO `useraccount` VALUES (123,'A1','123','$salt','2016-05-18 12:49:27','张三','M','332222199901010101','浙大路38号','13800138004','abc@zju.edu.cn',0,0,NULL,'P1000001','P1000008',NULL,NULL,1234.50,'123'),(124,'A2','123','$salt','2016-05-18 17:27:28','李四','F','332222199901010102','浙大路39号','13777776657','abd@zju.edu.cn',1,0,NULL,'P1000002','P1000007',NULL,NULL,1234.50,'123'),(224,'B2','123','$salt','2016-05-17 18:17:33','赵六','F','432222199901010102','浙大路49号','13800138000','bbd@zju.edu.cn',1,1,'D001','P1000004','P1000005',NULL,NULL,1234.50,'123'),(225,'123','123',NULL,'2016-05-17 18:17:33',NULL,NULL,'330182222222222222',NULL,'13812341234','123@123.com',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'123'),(226,'mtz','mtz',NULL,'2016-05-18 17:20:34',NULL,NULL,'330302199504082019',NULL,'15606888158','11@163.com',NULL,0,NULL,NULL,NULL,NULL,NULL,0.00,'123');
/*!40000 ALTER TABLE `useraccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usermessage`
--

DROP TABLE IF EXISTS `usermessage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usermessage` (
  `MessageID` int(11) NOT NULL AUTO_INCREMENT,
  `AccountID` int(11) NOT NULL DEFAULT '0',
  `MessageSender` char(20) DEFAULT NULL,
  `MessageContent` char(20) DEFAULT NULL,
  `MessageTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `IsClick` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`MessageID`,`AccountID`),
  KEY `AccountID` (`AccountID`),
  CONSTRAINT `usermessage_ibfk_1` FOREIGN KEY (`AccountID`) REFERENCES `useraccount` (`AccountID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usermessage`
--

LOCK TABLES `usermessage` WRITE;
/*!40000 ALTER TABLE `usermessage` DISABLE KEYS */;
INSERT INTO `usermessage` VALUES (1,123,NULL,'您的订单(10000001)已付款','2016-05-24 18:12:00',0),(2,123,NULL,'您的订单(10000002)交易成功','2016-05-24 18:12:00',0),(3,123,NULL,'您的订单(10000003)等待结账','2016-05-24 18:12:00',0),(4,124,NULL,'您的订单(20000001)已付款','2016-05-24 18:12:00',0),(5,124,NULL,'您的订单(20000002)交易成功','2016-05-24 18:12:00',0),(6,124,NULL,'您的订单(20000003)等待结账','2016-05-24 18:12:01',0),(7,224,NULL,'您的订单(30000001)已付款','2016-05-24 18:12:01',0),(8,224,NULL,'您的订单(30000002)交易成功','2016-05-24 18:12:01',0),(9,224,NULL,'您的订单(30000003)等待结账','2016-05-24 18:12:01',0);
/*!40000 ALTER TABLE `usermessage` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-05-25  2:13:52
