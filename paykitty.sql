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
-- Table structure for table `DealerAccount`
--

DROP TABLE IF EXISTS `DealerAccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DealerAccount` (
  `DealerNo` char(20) NOT NULL,
  `Name` char(20) DEFAULT NULL,
  `Address` char(100) DEFAULT NULL,
  `State` char(20) DEFAULT NULL,
  PRIMARY KEY (`DealerNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DealerAccount`
--

LOCK TABLES `DealerAccount` WRITE;
/*!40000 ALTER TABLE `DealerAccount` DISABLE KEYS */;
INSERT INTO `DealerAccount` VALUES ('224','AAAA','Yuhangtang Road#866','Normal');
/*!40000 ALTER TABLE `DealerAccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PaymentAccount`
--

DROP TABLE IF EXISTS `PaymentAccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PaymentAccount` (
  `PaymentNo` char(20) NOT NULL,
  `BankName` char(20) DEFAULT NULL,
  `Address` char(100) DEFAULT NULL,
  `State` char(20) DEFAULT NULL,
  PRIMARY KEY (`PaymentNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PaymentAccount`
--

LOCK TABLES `PaymentAccount` WRITE;
/*!40000 ALTER TABLE `PaymentAccount` DISABLE KEYS */;
INSERT INTO `PaymentAccount` VALUES ('P1000001','ICBC','6228888888888888','Normal'),('P1000002','ICBC','6228888888888888','Normal'),('P1000003','ICBC','6228888888888888','Normal'),('P1000004','ICBC','6228888888888888','Normal'),('P1000005','ICBC','6228888888888888',' Lock'),('P1000006','ICBC','6228888888888888',' Lock'),('P1000007','ICBC','6228888888888888',' Lock'),('P1000008','ICBC','6228888888888888',' Lock');
/*!40000 ALTER TABLE `PaymentAccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserAccount`
--

DROP TABLE IF EXISTS `UserAccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserAccount` (
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
  `Payment1Password` char(50) DEFAULT NULL,
  `Payment2` char(20) DEFAULT NULL,
  `Payment2Password` char(50) DEFAULT NULL,
  `Payment3` char(20) DEFAULT NULL,
  `Payment3Password` char(50) DEFAULT NULL,
  `Payment4` char(20) DEFAULT NULL,
  `Payment4Password` char(50) DEFAULT NULL,
  `Balance` decimal(12,2) DEFAULT NULL,
  `PayPassword` char(50) DEFAULT NULL,
  PRIMARY KEY (`AccountID`),
  UNIQUE KEY `AccountName` (`AccountName`),
  UNIQUE KEY `IdNo` (`IdNo`),
  UNIQUE KEY `Phone` (`Phone`),
  KEY `Payment1` (`Payment1`),
  KEY `Payment2` (`Payment2`),
  KEY `Payment3` (`Payment3`),
  KEY `Payment4` (`Payment4`),
  CONSTRAINT `UserAccount_ibfk_2` FOREIGN KEY (`Payment1`) REFERENCES `PaymentAccount` (`PaymentNo`),
  CONSTRAINT `UserAccount_ibfk_3` FOREIGN KEY (`Payment2`) REFERENCES `PaymentAccount` (`PaymentNo`),
  CONSTRAINT `UserAccount_ibfk_4` FOREIGN KEY (`Payment3`) REFERENCES `PaymentAccount` (`PaymentNo`),
  CONSTRAINT `UserAccount_ibfk_5` FOREIGN KEY (`Payment4`) REFERENCES `PaymentAccount` (`PaymentNo`)
) ENGINE=InnoDB AUTO_INCREMENT=227 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserAccount`
--

LOCK TABLES `UserAccount` WRITE;
/*!40000 ALTER TABLE `UserAccount` DISABLE KEYS */;
INSERT INTO `UserAccount` VALUES (123,'A1','123','$salt','2016-05-18 12:49:27','张三','M','332222199901010101','浙大路38号','13800138004','abc@zju.edu.cn',0,0,NULL,'P1000001','123', 'P1000008','123', NULL,NULL,NULL,NULL,1234.50,'123'),(124,'A2','123','$salt','2016-05-18 17:27:28','李四','F','332222199901010102','浙大路39号','13777776657','abd@zju.edu.cn',1,0,NULL,'P1000002', '123','P1000007', '123', NULL,NULL,NULL,NULL,1234.50,'123'),(224,'B2','123','$salt','2016-05-17 18:17:33','赵六','F','432222199901010102','浙大路49号','13800138000','bbd@zju.edu.cn',1,1,NULL,'P1000004','123', 'P1000005','123', NULL,NULL,NULL,NULL,1234.50,'123');
/*!40000 ALTER TABLE `UserAccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserMessage`
--

DROP TABLE IF EXISTS `UserMessage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserMessage` (
  `MessageID` int(11) NOT NULL AUTO_INCREMENT,
  `AccountID` int(11) NOT NULL DEFAULT '0',
  `MessageSender` char(20) DEFAULT '系统',
  `MessageContent` char(20) DEFAULT NULL,
  `MessageTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `IsClick` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`MessageID`,`AccountID`),
  KEY `AccountID` (`AccountID`),
  CONSTRAINT `UserMessage_ibfk_1` FOREIGN KEY (`AccountID`) REFERENCES `UserAccount` (`AccountID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserMessage`
--

LOCK TABLES `UserMessage` WRITE;
/*!40000 ALTER TABLE `UserMessage` DISABLE KEYS */;
INSERT INTO `UserMessage` VALUES (1,123,'系统','您购买的飞机票已发货','2016-05-24 06:12:48',0),(2,123,'系统','您购买的汽车票已到杭州','2016-05-24 06:12:48',0),(3,123,'系统','您购买的火车票等待签收','2016-05-24 06:12:48',0),(4,124,'系统','您购买的茶杯已发货','2016-05-24 06:12:48',0),(5,124,'系统','您购买的茶壶已到杭州','2016-05-24 06:12:48',0),(6,124,'系统','您购买的勺子等待签收','2016-05-24 06:12:48',0),(7,224,'系统','您售出的飞机票已送出','2016-05-24 06:12:48',0),(8,224,'系统','您售出的汽车票已到杭州','2016-05-24 06:12:48',0),(9,224,'系统','您售出的火车票等待签收','2016-05-24 06:12:48',0);
/*!40000 ALTER TABLE `UserMessage` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-05-24 14:14:55
