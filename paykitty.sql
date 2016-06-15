-- MySQL dump 10.13  Distrib 5.5.49, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: paykitty
-- ------------------------------------------------------
-- Server version	5.5.49-0ubuntu0.14.04.1

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
-- Table structure for table `AirTicketOrderHistory`
--

DROP TABLE IF EXISTS `AirTicketOrderHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AirTicketOrderHistory` (
  `User_ID` int(11) NOT NULL DEFAULT '0',
  `AirTicket_ID` int(11) NOT NULL DEFAULT '0',
  `Finish_Time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `price` float DEFAULT NULL,
  PRIMARY KEY (`User_ID`,`AirTicket_ID`,`Finish_Time`),
  KEY `AirTicket_ID` (`AirTicket_ID`),
  CONSTRAINT `AirTicketOrderHistory_ibfk_1` FOREIGN KEY (`AirTicket_ID`) REFERENCES `TicketsInfo` (`AirTicket_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AirTicketOrderHistory`
--

LOCK TABLES `AirTicketOrderHistory` WRITE;
/*!40000 ALTER TABLE `AirTicketOrderHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `AirTicketOrderHistory` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `DealerAccount` VALUES ('224','AAAA','Yuhangtang Road#866','Normal'),('227','我卖酒店','门口','Normal'),('230','浙大招生办','浙大路38号','Normal');
/*!40000 ALTER TABLE `DealerAccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HotelComments`
--

DROP TABLE IF EXISTS `HotelComments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `HotelComments` (
  `Comment_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Hotel_ID` int(11) DEFAULT NULL,
  `Scores` float DEFAULT NULL,
  `Account_ID` int(11) DEFAULT NULL,
  `Comments` text,
  PRIMARY KEY (`Comment_ID`),
  KEY `Account_ID` (`Account_ID`),
  KEY `Hotel_ID` (`Hotel_ID`),
  CONSTRAINT `HotelComments_ibfk_1` FOREIGN KEY (`Account_ID`) REFERENCES `UserAccount` (`AccountID`) ON DELETE CASCADE,
  CONSTRAINT `HotelComments_ibfk_2` FOREIGN KEY (`Hotel_ID`) REFERENCES `HotelInfo` (`Hotel_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HotelComments`
--

LOCK TABLES `HotelComments` WRITE;
/*!40000 ALTER TABLE `HotelComments` DISABLE KEYS */;
/*!40000 ALTER TABLE `HotelComments` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trig_hotelcomments_check BEFORE INSERT ON HotelComments
FOR EACH ROW BEGIN
IF NEW.Scores <= 0 || NEW.Scores > 5.0 THEN
insert into TicketsComments values('1');
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `HotelInfo`
--

DROP TABLE IF EXISTS `HotelInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `HotelInfo` (
  `Hotel_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Hotel_Name` varchar(20) NOT NULL,
  `Province` varchar(20) NOT NULL,
  `City` varchar(20) NOT NULL,
  `Address` varchar(20) NOT NULL,
  `Stars` int(11) NOT NULL,
  `Description` text NOT NULL,
  `PhoneNumber` varchar(20) NOT NULL,
  `Discount` decimal(3,2) DEFAULT NULL,
  `Score` float DEFAULT NULL,
  `Heat` int(11) DEFAULT NULL,
  `Seller_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`Hotel_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HotelInfo`
--

LOCK TABLES `HotelInfo` WRITE;
/*!40000 ALTER TABLE `HotelInfo` DISABLE KEYS */;
INSERT INTO `HotelInfo` VALUES (9,'法云安曼酒店','浙江省','杭州市','西湖区',5,'很好的酒店。豪华。位于西湖区中心。酒店房间简约明快、舒适温馨，空间奢阔宽敞，高高的天花板舒朗宜人，大理石浴室尊贵豪华，宽大的窗子将室外美景引入室内，舒目远眺，海军部大楼和圣伊萨克大教堂恢弘入画。','0571-88208877',1.00,4,8,1),(12,'四季酒店','浙江省','杭州市','西湖区',5,'尽享奢华，开启惊喜，感受世界之美。四季酒店及度假酒店是世界知名的豪华酒店。感受四季酒店在您欧洲奢华游最贴心的服务，和我们一同尽享奢华。登陆我们的全新官方网站，寻找位于欧洲各地的四季酒店，预订您的欧洲旅行，请查看关于我们或致电(400)148  7200 了解更多！','(400)1487200',1.00,3.5,7,1),(13,'龙之梦','上海市','上海市','长宁区延安西路1116号',5,'53层高的上海龙之梦大酒店座落于繁华的延安西路上，毗邻虹桥开发区，商业中心以及法租界旧址。酒店所有客房均在40平方米及以上并拥有无与伦比城市景观。所有客房均配备42英寸等离子彩电，iPod音响系统以及高速互联网接入。酒店位于48楼的行政酒廊重新定义了酒店行政楼层的奢华标准，为宾客提供尊崇专享的各项服务。 酒店餐饮设施包括全日餐厅、意大利餐厅、中餐厅、日餐厅、咖啡厅、雪茄吧以及大堂酒廊。会议和宴会场地总面积达1900平方米，包括1个928平方米的大宴会厅，1间董事会议室及9间多功能厅。休闲设施包括2间室外网球场、1个30米长室内恒温具备自然采光的游泳池、设备齐全的健身中心及全球知名的迪卡拉水疗中心。 上海龙之梦大酒店以其独特的建筑风格，将传统与现代巧妙的融合为一体，是商务及观光游客的最佳选择。','021-61159988',0.80,4.5,4,2),(14,'西子湖四季酒店','浙江省','杭州市','西湖区',4,'坐落于西子湖畔的杭州四季酒店，楼高两层，拥有78间宽敞舒适的客房，包含5间套房，标准客房面积达63平方米（678平方英尺）以上。若干栋备有私人游泳池的园林别墅轻依湖畔，是团体或举家欢聚的理想居庭。\r\n \r\n室内环境明亮优雅、色调和谐，茶褐色的仿古沙发、37英寸等离子屏幕电视和 DVD/CD 影音系统，豪华设施一应俱全。凭窗远眺翠竹摇曳，景观极尽诗情画意，朝晖晚霞，悠悠湖水，波光粼粼，让人心旷神怡。无论度假亦或公务，四季酒店都是您的首选。','86(0571)8829-8888',1.00,5,5,2),(15,'丽思卡尔顿酒店','广东省','广州市','东莞',4,'第一家丽思·卡尔顿酒店于1927年在波士顿建立，该酒店已经出售给泰姬陵酒店度假村管理公司。纽约的丽思·卡尔顿酒店繁华的曼哈顿地区第四十六街和麦迪逊大道的交汇处。佛罗里达州的那不勒斯市（Naples, Florida）是唯一一个丽思·卡尔顿酒店在同一条马路上的城市。丽思卡尔顿酒店管理集团还在美国及其周边地区提供部分房屋所有权的服务，将之命名为丽思卡尔顿俱乐部。这些不动产位于科罗拉多、维尔京群岛以及旧金山。1998年，万豪酒店国际集团收购了丽思·卡尔顿酒店集团公司的全部股份。\r\n丽思·卡尔顿作为全球首屈一指的奢华酒店品牌，从19世纪创建以来，一直遵从着经典的风格，成为名门、政要下榻的必选酒店。因为极度高贵奢华，她一向被称为“全世界的屋顶”，尤其是她的座右铭“我们以绅士淑女的态度为绅士淑女们忠诚服务”更是在业界被传为经典。不管在哪个城市，只要有丽思酒店，一定是国家政要和社会名流下榻的首选。巴黎的丽思更是全欧洲最豪华神秘的酒店，威尔士亲王、瑞典、葡萄牙、西班牙的国王都曾经在这里入住或就餐。戴安娜王妃遭遇车祸前的最后一顿美好的晚餐也是在那里享用。可可·夏奈尔甚至说：“每当我梦见死后在天堂的生活时，梦中的场景总是发生在丽思酒店。”','0214648888',0.60,0,0,2),(16,'大梅沙京基喜来登度假酒店','广东省','深圳市','盐田区大梅沙盐葵路9号',5,'深圳大梅沙京基喜来登度假酒店位于深圳东部久负盛名的大梅沙海滨，酒店濒临海岸线，由主楼和别墅区组成，高12层的酒店主楼集古典韵味与现代优雅于一体，线条优美流畅，从海上望去宛如一条即将腾飞的巨龙，是深圳东部大梅沙海湾的著名标志。','0755-88886688',1.00,0,0,3),(17,'国际博览中心酒店','江苏省','南京市','建邺区金沙江西街16号',3,'南京国际博览中心酒店坐落于南京国际博览中心内，与河西CBD和国际金融中心隔街相望，毗邻奥体中心，与地铁一、二号线元通站仅百米路程。由河西建设指挥部·河西国资集团投资建造，酒店拥有各类客房，与金陵会议中心、金陵江滨酒店三位一体，配套南京国际博览中心，成为南京地区会展博览、国际商务、信息交流等辅助功能的重要组成部分。','025-87708777',0.95,0,0,3);
/*!40000 ALTER TABLE `HotelInfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trig_hotelinfo_check BEFORE INSERT ON HotelInfo
FOR EACH ROW BEGIN
IF NEW.Stars < 0 || NEW.Stars > 5 THEN
insert into HotelInfo values('1');
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `HotelOrderHistory`
--

DROP TABLE IF EXISTS `HotelOrderHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `HotelOrderHistory` (
  `User_ID` int(11) NOT NULL DEFAULT '0',
  `Hotel_ID` int(11) NOT NULL DEFAULT '0',
  `Finish_Time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `price` float DEFAULT NULL,
  PRIMARY KEY (`User_ID`,`Hotel_ID`,`Finish_Time`),
  KEY `Hotel_ID` (`Hotel_ID`),
  CONSTRAINT `HotelOrderHistory_ibfk_1` FOREIGN KEY (`Hotel_ID`) REFERENCES `HotelInfo` (`Hotel_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HotelOrderHistory`
--

LOCK TABLES `HotelOrderHistory` WRITE;
/*!40000 ALTER TABLE `HotelOrderHistory` DISABLE KEYS */;
INSERT INTO `HotelOrderHistory` VALUES (123,9,'2016-06-02 00:00:00',2000),(123,9,'2016-06-02 08:35:52',4000),(123,9,'2016-06-02 08:42:19',4000),(123,9,'2016-06-02 10:05:02',4000),(123,9,'2016-06-02 10:05:21',2400),(123,9,'2016-06-02 10:06:58',2400),(123,9,'2016-06-02 11:38:25',2400),(123,9,'2016-06-02 23:00:38',2400),(123,9,'2016-06-05 21:50:41',2400),(123,9,'2016-06-08 20:59:45',2400),(123,9,'2016-06-09 15:20:03',2400),(123,9,'2016-06-12 11:13:04',NULL),(123,9,'2016-06-12 11:24:57',NULL),(123,9,'2016-06-15 01:12:28',789),(123,9,'2016-06-15 01:13:33',3356),(123,9,'2016-06-15 01:15:14',3356),(123,9,'2016-06-15 01:47:12',6688),(123,9,'2016-06-15 13:14:33',789),(123,12,'2016-06-02 00:00:00',2400),(123,12,'2016-06-02 08:44:24',10000),(123,12,'2016-06-02 08:46:57',2400),(123,12,'2016-06-02 10:05:59',2400),(123,14,'2016-06-02 11:39:06',10000),(123,14,'2016-06-15 01:48:39',8100),(123,14,'2016-06-15 01:49:44',8100),(123,14,'2016-06-15 11:17:02',8100);
/*!40000 ALTER TABLE `HotelOrderHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HotelPics`
--

DROP TABLE IF EXISTS `HotelPics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `HotelPics` (
  `Hotel_ID` int(11) NOT NULL DEFAULT '0',
  `File_Pos` varchar(40) NOT NULL DEFAULT '',
  PRIMARY KEY (`Hotel_ID`,`File_Pos`),
  CONSTRAINT `HotelPics_ibfk_1` FOREIGN KEY (`Hotel_ID`) REFERENCES `HotelInfo` (`Hotel_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HotelPics`
--

LOCK TABLES `HotelPics` WRITE;
/*!40000 ALTER TABLE `HotelPics` DISABLE KEYS */;
INSERT INTO `HotelPics` VALUES (9,'avatar/Hotel_9/0.jpg'),(9,'avatar/Hotel_9/1.jpg'),(9,'avatar/Hotel_9/large/600x600_0.jpg'),(9,'avatar/Hotel_9/large/600x600_1.jpg'),(9,'avatar/Hotel_9/medium/300x300_0.jpg'),(9,'avatar/Hotel_9/medium/300x300_1.jpg'),(9,'avatar/Hotel_9/small/150x150_0.jpg'),(9,'avatar/Hotel_9/small/150x150_1.jpg'),(12,'avatar/Hotel_12/0.jpg'),(12,'avatar/Hotel_12/large/600x600_0.jpg'),(12,'avatar/Hotel_12/medium/300x300_0.jpg'),(12,'avatar/Hotel_12/small/150x150_0.jpg'),(13,'avatar/Hotel_13/0.jpg'),(13,'avatar/Hotel_13/1.jpg'),(13,'avatar/Hotel_13/2.jpg'),(13,'avatar/Hotel_13/large/600x600_0.jpg'),(13,'avatar/Hotel_13/large/600x600_1.jpg'),(13,'avatar/Hotel_13/large/600x600_2.jpg'),(13,'avatar/Hotel_13/medium/300x300_0.jpg'),(13,'avatar/Hotel_13/medium/300x300_1.jpg'),(13,'avatar/Hotel_13/medium/300x300_2.jpg'),(13,'avatar/Hotel_13/small/150x150_0.jpg'),(13,'avatar/Hotel_13/small/150x150_1.jpg'),(13,'avatar/Hotel_13/small/150x150_2.jpg'),(14,'avatar/Hotel_14/0.jpg'),(14,'avatar/Hotel_14/large/600x600_0.jpg'),(14,'avatar/Hotel_14/medium/300x300_0.jpg'),(14,'avatar/Hotel_14/small/150x150_0.jpg'),(15,'avatar/Hotel_15/0.jpg'),(15,'avatar/Hotel_15/large/600x600_0.jpg'),(15,'avatar/Hotel_15/medium/300x300_0.jpg'),(15,'avatar/Hotel_15/small/150x150_0.jpg'),(16,'avatar/Hotel_16/0.jpg'),(16,'avatar/Hotel_16/1.jpg'),(16,'avatar/Hotel_16/2.jpg'),(16,'avatar/Hotel_16/3.jpg'),(16,'avatar/Hotel_16/large/600x600_0.jpg'),(16,'avatar/Hotel_16/large/600x600_1.jpg'),(16,'avatar/Hotel_16/large/600x600_2.jpg'),(16,'avatar/Hotel_16/large/600x600_3.jpg'),(16,'avatar/Hotel_16/medium/300x300_0.jpg'),(16,'avatar/Hotel_16/medium/300x300_1.jpg'),(16,'avatar/Hotel_16/medium/300x300_2.jpg'),(16,'avatar/Hotel_16/medium/300x300_3.jpg'),(16,'avatar/Hotel_16/small/150x150_0.jpg'),(16,'avatar/Hotel_16/small/150x150_1.jpg'),(16,'avatar/Hotel_16/small/150x150_2.jpg'),(16,'avatar/Hotel_16/small/150x150_3.jpg'),(17,'avatar/Hotel_17/0.jpg'),(17,'avatar/Hotel_17/1.jpg'),(17,'avatar/Hotel_17/large/600x600_0.jpg'),(17,'avatar/Hotel_17/large/600x600_1.jpg'),(17,'avatar/Hotel_17/medium/300x300_0.jpg'),(17,'avatar/Hotel_17/medium/300x300_1.jpg'),(17,'avatar/Hotel_17/small/150x150_0.jpg'),(17,'avatar/Hotel_17/small/150x150_1.jpg');
/*!40000 ALTER TABLE `HotelPics` ENABLE KEYS */;
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
INSERT INTO `PaymentAccount` VALUES ('111111112','ICBC','6288888888888888','Normal'),('12345567','ICBC','6288888888888888','Normal'),('123456','ICBC','6288888888888888','Normal'),('345678','ICBC','6288888888888888','Normal'),('456789','ICBC','6288888888888888','Normal'),('56789','ICBC','6288888888888888','Normal'),('678','ICBC','6288888888888888','Normal'),('P1000002','ICBC','6228888888888888','Normal'),('P1000003','ICBC','6228888888888888','Normal'),('P1000004','ICBC','6228888888888888','Normal'),('P1000005','ICBC','6228888888888888',' Lock'),('P1000006','ICBC','6228888888888888',' Lock'),('P1000007','ICBC','6228888888888888',' Lock'),('P1000008','ICBC','6228888888888888',' Lock');
/*!40000 ALTER TABLE `PaymentAccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RoomInfo`
--

DROP TABLE IF EXISTS `RoomInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RoomInfo` (
  `Hotel_ID` int(11) NOT NULL DEFAULT '0',
  `Type` char(100) NOT NULL DEFAULT '',
  `Room_date` date NOT NULL DEFAULT '0000-00-00',
  `Available` int(11) DEFAULT NULL,
  `Price` float DEFAULT NULL,
  PRIMARY KEY (`Hotel_ID`,`Type`,`Room_date`),
  CONSTRAINT `RoomInfo_ibfk_1` FOREIGN KEY (`Hotel_ID`) REFERENCES `HotelInfo` (`Hotel_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RoomInfo`
--

LOCK TABLES `RoomInfo` WRITE;
/*!40000 ALTER TABLE `RoomInfo` DISABLE KEYS */;
INSERT INTO `RoomInfo` VALUES (9,'单人房','2016-06-01',20,1000),(9,'单人房','2016-06-02',0,1000),(9,'单人房','2016-06-03',0,1000),(9,'单人房','2016-06-04',20,1000),(9,'单人房','2016-06-05',20,1000),(9,'单人房','2016-06-06',20,1000),(9,'单人房','2016-06-07',20,1000),(9,'单人房','2016-06-08',20,1000),(9,'单人房','2016-06-09',20,1000),(9,'单人房','2016-06-10',20,1000),(9,'单人房','2016-06-11',20,1000),(9,'单人房','2016-06-12',20,1000),(9,'单人房','2016-06-13',20,1000),(9,'单人房','2016-06-14',20,1000),(9,'单人房','2016-06-16',18,789),(9,'单人房','2016-06-17',20,789),(9,'单人房','2016-06-18',20,789),(9,'单人房','2016-06-19',20,789),(9,'单人房','2016-06-20',20,789),(9,'单人房','2016-06-21',20,789),(9,'单人房','2016-06-22',20,789),(9,'单人房','2016-06-23',20,789),(9,'单人房','2016-06-24',20,789),(9,'单人房','2016-06-25',20,789),(9,'单人房','2016-06-26',20,789),(9,'单人房','2016-06-27',20,789),(9,'单人房','2016-06-28',20,789),(9,'单人房','2016-06-29',20,789),(9,'单人房','2016-06-30',20,789),(9,'单人房','2016-07-01',20,789),(9,'商务房','2016-06-01',15,1200),(9,'商务房','2016-06-02',5,1200),(9,'商务房','2016-06-03',5,1200),(9,'商务房','2016-06-04',15,1200),(9,'商务房','2016-06-05',15,1200),(9,'商务房','2016-06-12',15,1678),(9,'商务房','2016-06-13',15,1678),(9,'商务房','2016-06-14',15,1678),(9,'商务房','2016-06-15',13,1678),(9,'商务房','2016-06-16',13,1678),(9,'商务房','2016-06-17',15,1678),(9,'商务房','2016-06-18',15,1678),(9,'商务房','2016-06-19',15,1678),(9,'商务房','2016-06-20',15,1678),(9,'商务房','2016-06-21',15,1678),(9,'商务房','2016-06-22',15,1678),(9,'商务房','2016-06-23',15,1678),(9,'商务房','2016-06-24',15,1678),(9,'商务房','2016-06-25',15,1678),(9,'商务房','2016-06-26',15,1678),(9,'商务房','2016-06-27',15,1678),(9,'商务房','2016-06-28',15,1678),(9,'商务房','2016-06-29',15,1678),(9,'豪华大床房','2016-06-02',6,2000),(9,'豪华大床房','2016-06-03',6,2000),(9,'豪华大床房','2016-06-04',10,2000),(9,'豪华大床房','2016-06-05',10,2000),(9,'豪华大床房','2016-06-06',10,2000),(9,'豪华大床房','2016-06-07',10,2000),(9,'豪华大床房','2016-06-08',10,2000),(9,'豪华大床房','2016-06-09',10,2000),(9,'豪华大床房','2016-06-10',10,2000),(9,'豪华大床房','2016-06-11',10,2000),(9,'豪华大床房','2016-06-12',10,3344),(9,'豪华大床房','2016-06-13',10,3344),(9,'豪华大床房','2016-06-14',10,3344),(9,'豪华大床房','2016-06-15',9,3344),(9,'豪华大床房','2016-06-16',9,3344),(9,'豪华大床房','2016-06-17',10,3344),(9,'豪华大床房','2016-06-18',10,3344),(9,'豪华大床房','2016-06-19',10,3344),(9,'豪华大床房','2016-06-20',10,3344),(9,'豪华大床房','2016-06-21',10,3344),(9,'豪华大床房','2016-06-22',10,3344),(9,'豪华大床房','2016-06-23',10,3344),(9,'豪华大床房','2016-06-24',10,3344),(9,'豪华大床房','2016-06-25',10,3344),(9,'豪华大床房','2016-06-26',10,3344),(9,'豪华大床房','2016-06-27',10,3344),(9,'豪华大床房','2016-06-28',10,3344),(9,'豪华大床房','2016-06-29',10,3344),(9,'豪华大床房','2016-06-30',10,3344),(12,'尊贵客房','2016-06-02',5,1200),(12,'尊贵客房','2016-06-03',5,1200),(12,'尊贵客房','2016-06-04',10,1200),(12,'尊贵客房','2016-06-05',10,1200),(12,'尊贵客房','2016-06-06',10,1200),(12,'尊贵客房','2016-06-15',10,1234),(12,'尊贵客房','2016-06-16',10,1234),(12,'尊贵客房','2016-06-17',10,1234),(12,'尊贵客房','2016-06-18',10,1234),(12,'尊贵客房','2016-06-19',10,1234),(12,'尊贵客房','2016-06-20',10,1234),(12,'尊贵客房','2016-06-21',10,1234),(12,'尊贵客房','2016-06-22',10,1234),(12,'尊贵客房','2016-06-23',10,1234),(12,'尊贵客房','2016-06-24',10,1234),(12,'尊贵客房','2016-06-25',10,1234),(12,'尊贵客房','2016-06-26',10,1234),(12,'尊贵客房','2016-06-27',10,1234),(12,'尊贵客房','2016-06-28',10,1234),(12,'尊贵客房','2016-06-29',10,1234),(12,'尊贵客房','2016-06-30',10,1234),(12,'尊贵客房','2016-07-01',10,1234),(12,'尊贵客房','2016-07-02',10,1234),(12,'尊贵客房','2016-07-03',10,1234),(12,'尊贵客房','2016-07-04',10,1234),(12,'尊贵客房','2016-07-05',10,1234),(12,'尊贵客房','2016-07-06',10,1234),(12,'尊贵客房','2016-07-07',10,1234),(12,'豪华大床房','2016-06-02',199,5000),(12,'豪华大床房','2016-06-03',199,5000),(12,'豪华大床房','2016-06-04',200,5000),(12,'豪华大床房','2016-06-05',200,5000),(12,'豪华大床房','2016-06-06',200,5000),(12,'豪华大床房','2016-06-16',200,1500),(12,'豪华大床房','2016-06-17',200,1500),(12,'豪华大床房','2016-06-18',200,1500),(12,'豪华大床房','2016-06-19',200,1500),(12,'豪华大床房','2016-06-20',200,1500),(12,'豪华大床房','2016-06-21',200,1500),(12,'豪华大床房','2016-06-22',200,1500),(12,'豪华大床房','2016-06-23',200,1500),(12,'豪华大床房','2016-06-24',200,1500),(12,'豪华大床房','2016-06-25',200,1500),(12,'豪华大床房','2016-06-26',200,1500),(12,'豪华大床房','2016-06-27',200,1500),(12,'豪华大床房','2016-06-28',200,1500),(13,'豪华房','2016-06-06',40,1200),(13,'豪华房','2016-06-07',40,1200),(13,'豪华房','2016-06-08',40,1200),(13,'豪华房','2016-06-09',40,1200),(13,'豪华房','2016-06-10',40,1200),(13,'豪华房','2016-06-11',40,1200),(13,'豪华房','2016-06-12',40,1200),(13,'豪华房','2016-06-13',40,1200),(13,'豪华房','2016-06-14',40,1200),(13,'豪华房','2016-06-15',40,1200),(13,'豪华房','2016-06-16',40,1200),(13,'豪华房','2016-06-17',40,1200),(13,'豪华房','2016-06-18',40,1200),(13,'豪华房','2016-06-19',40,1200),(13,'豪华房','2016-06-20',40,1200),(13,'豪华房','2016-06-21',40,1200),(13,'豪华房','2016-06-22',40,1200),(13,'豪华房','2016-06-23',40,1200),(13,'豪华房','2016-06-24',40,1200),(13,'豪华房','2016-06-25',40,1200),(13,'豪华房','2016-06-26',40,1200),(13,'豪华房','2016-06-27',40,1200),(13,'贵宾房','2016-06-02',200,8500),(13,'贵宾房','2016-06-03',200,8500),(13,'贵宾房','2016-06-04',200,8500),(13,'贵宾房','2016-06-05',200,8500),(13,'贵宾房','2016-06-06',200,8500),(13,'贵宾房','2016-06-07',200,8500),(13,'贵宾房','2016-06-08',200,8500),(13,'贵宾房','2016-06-09',200,8500),(13,'贵宾房','2016-06-10',200,8500),(13,'贵宾房','2016-06-11',200,8500),(13,'贵宾房','2016-06-12',200,8500),(13,'贵宾房','2016-06-13',200,8500),(13,'贵宾房','2016-06-14',200,8500),(13,'贵宾房','2016-06-15',200,8500),(13,'贵宾房','2016-06-16',200,8500),(13,'贵宾房','2016-06-17',200,8500),(13,'贵宾房','2016-06-18',200,8500),(13,'贵宾房','2016-06-19',200,8500),(13,'贵宾房','2016-06-20',200,8500),(13,'贵宾房','2016-06-21',200,8500),(13,'贵宾房','2016-06-22',200,8500),(14,'特级客房','2016-06-04',50,4050),(14,'特级客房','2016-06-05',50,4050),(14,'特级客房','2016-06-06',50,4050),(14,'特级客房','2016-06-07',50,4050),(14,'特级客房','2016-06-08',50,4050),(14,'特级客房','2016-06-09',50,4050),(14,'特级客房','2016-06-10',50,4050),(14,'特级客房','2016-06-11',50,4050),(14,'特级客房','2016-06-12',50,4050),(14,'特级客房','2016-06-13',50,4050),(14,'特级客房','2016-06-14',50,4050),(14,'特级客房','2016-06-15',47,4050),(14,'特级客房','2016-06-16',47,4050),(14,'特级客房','2016-06-17',50,4050),(14,'特级客房','2016-06-18',50,4050),(14,'特级客房','2016-06-19',50,4050),(14,'特级客房','2016-06-20',50,4050),(14,'行政特级客房','2016-06-02',99,5000),(14,'行政特级客房','2016-06-03',99,5000),(14,'行政特级客房','2016-06-04',100,5000),(14,'行政特级客房','2016-06-05',100,5000),(14,'行政特级客房','2016-06-06',100,5000),(14,'行政特级客房','2016-06-07',100,5000),(14,'行政特级客房','2016-06-08',100,5000),(14,'行政特级客房','2016-06-09',100,5000),(14,'行政特级客房','2016-06-10',100,5000),(14,'行政特级客房','2016-06-11',100,5000),(14,'行政特级客房','2016-06-12',100,5000),(14,'行政特级客房','2016-06-13',100,5000),(14,'行政特级客房','2016-06-14',100,5000),(14,'行政特级客房','2016-06-15',100,5000),(14,'行政特级客房','2016-06-16',100,5000),(14,'行政特级客房','2016-06-17',100,5000),(14,'行政特级客房','2016-06-18',100,5000),(15,'商务房','2016-06-15',20,4000),(15,'商务房','2016-06-16',20,4000),(15,'商务房','2016-06-17',20,4000),(15,'商务房','2016-06-18',20,4000),(15,'商务房','2016-06-19',20,4000),(15,'商务房','2016-06-20',20,4000),(15,'商务房','2016-06-21',20,4000),(15,'商务房','2016-06-22',20,4000),(15,'商务房','2016-06-23',20,4000),(15,'商务房','2016-06-24',20,4000),(15,'商务房','2016-06-25',20,4000),(15,'商务房','2016-06-26',20,4000),(15,'商务房','2016-06-27',20,4000),(15,'商务房','2016-06-28',20,4000),(15,'商务房','2016-06-29',20,4000),(15,'大床房','2016-06-15',10,4500),(15,'大床房','2016-06-16',10,4500),(15,'大床房','2016-06-17',10,4500),(15,'大床房','2016-06-18',10,4500),(15,'大床房','2016-06-19',10,4500),(15,'大床房','2016-06-20',10,4500),(15,'大床房','2016-06-21',10,4500),(15,'大床房','2016-06-22',10,4500),(15,'大床房','2016-06-23',10,4500),(15,'大床房','2016-06-24',10,4500),(15,'大床房','2016-06-25',10,4500),(15,'大床房','2016-06-26',10,4500),(15,'大床房','2016-06-27',10,4500),(15,'大床房','2016-06-28',10,4500),(15,'大床房','2016-06-29',10,4500),(16,'客房','2016-06-02',100,1500),(16,'客房','2016-06-03',100,1500),(16,'客房','2016-06-04',100,1500),(16,'客房','2016-06-05',100,1500),(16,'客房','2016-06-06',100,1500),(16,'海景房','2016-06-01',100,4000),(16,'海景房','2016-06-02',100,4000),(16,'海景房','2016-06-03',100,4000),(16,'海景房','2016-06-04',100,4000),(16,'海景房','2016-06-05',100,4000),(16,'海景房','2016-06-06',100,4000),(16,'海景房','2016-06-07',100,4000),(16,'海景房','2016-06-08',100,4000),(16,'海景房','2016-06-09',100,4000),(16,'海景房','2016-06-10',100,4000),(16,'海景房','2016-06-11',100,4000),(16,'海景房','2016-06-12',100,4000),(16,'海景房','2016-06-13',100,4000),(16,'海景房','2016-06-14',100,4000),(16,'海景房','2016-06-15',100,4000),(16,'海景房','2016-06-16',100,4000),(16,'海景房','2016-06-17',100,4000),(16,'海景房','2016-06-18',100,4000),(16,'海景房','2016-06-19',100,4000),(16,'海景房','2016-06-20',100,4000),(16,'海景房','2016-06-21',100,4000),(16,'海景房','2016-06-22',100,4000),(16,'海景房','2016-06-23',100,4000),(16,'海景房','2016-06-24',100,4000),(16,'海景房','2016-06-25',100,4000),(16,'海景房','2016-06-26',100,4000),(16,'海景房','2016-06-27',100,4000),(16,'海景房','2016-06-28',100,4000),(16,'海景房','2016-06-29',100,4000),(16,'海景房','2016-06-30',100,4000),(17,'客房','2016-06-01',500,400),(17,'客房','2016-06-02',500,400),(17,'客房','2016-06-03',500,400),(17,'客房','2016-06-04',500,400),(17,'客房','2016-06-05',500,400),(17,'客房','2016-06-06',500,400),(17,'客房','2016-06-07',500,400),(17,'客房','2016-06-08',500,400),(17,'客房','2016-06-09',500,400),(17,'客房','2016-06-10',500,400),(17,'客房','2016-06-11',500,400),(17,'客房','2016-06-12',500,400),(17,'客房','2016-06-13',500,400),(17,'客房','2016-06-14',500,400),(17,'客房','2016-06-15',500,400),(17,'客房','2016-06-16',500,400),(17,'客房','2016-06-17',500,400),(17,'客房','2016-06-18',500,400),(17,'客房','2016-06-19',500,400),(17,'客房','2016-06-20',500,400),(17,'客房','2016-06-21',500,400),(17,'客房','2016-06-22',500,400),(17,'客房','2016-06-23',500,400),(17,'客房','2016-06-24',500,400),(17,'客房','2016-06-25',500,400),(17,'客房','2016-06-26',500,400),(17,'客房','2016-06-27',500,400),(17,'客房','2016-06-28',500,400),(17,'客房','2016-06-29',500,400),(17,'客房','2016-06-30',500,400),(17,'豪华房','2016-06-02',100,4500),(17,'豪华房','2016-06-03',100,4500),(17,'豪华房','2016-06-04',100,4500),(17,'豪华房','2016-06-05',100,4500),(17,'豪华房','2016-06-06',100,4500),(17,'豪华房','2016-06-07',100,4500),(17,'豪华房','2016-06-08',100,4500),(17,'豪华房','2016-06-09',100,4500),(17,'豪华房','2016-06-10',100,4500),(17,'豪华房','2016-06-11',100,4500),(17,'豪华房','2016-06-12',100,4500),(17,'豪华房','2016-06-13',100,4500),(17,'豪华房','2016-06-14',100,4500),(17,'豪华房','2016-06-15',100,4500),(17,'豪华房','2016-06-16',100,4500),(17,'豪华房','2016-06-17',100,4500),(17,'豪华房','2016-06-18',100,4500),(17,'豪华房','2016-06-19',100,4500),(17,'豪华房','2016-06-20',100,4500),(17,'豪华房','2016-06-21',100,4500),(17,'豪华房','2016-06-22',100,4500);
/*!40000 ALTER TABLE `RoomInfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trig_roominfo_check BEFORE INSERT ON RoomInfo
FOR EACH ROW BEGIN
IF NEW.Available < 0 || NEW.Price < 0 THEN
insert into RoomType values('1');
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trig_hotel_avail_check BEFORE UPDATE ON RoomInfo
FOR EACH ROW BEGIN
IF NEW.Available < 0 THEN
set NEW.Available = 0;
insert into HotelInfo values('1');
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `RoomType`
--

DROP TABLE IF EXISTS `RoomType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RoomType` (
  `Hotel_ID` int(11) NOT NULL DEFAULT '0',
  `Type` char(100) NOT NULL DEFAULT '',
  `Details` text NOT NULL,
  `Total` int(11) NOT NULL,
  PRIMARY KEY (`Hotel_ID`,`Type`),
  CONSTRAINT `RoomType_ibfk_1` FOREIGN KEY (`Hotel_ID`) REFERENCES `HotelInfo` (`Hotel_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RoomType`
--

LOCK TABLES `RoomType` WRITE;
/*!40000 ALTER TABLE `RoomType` DISABLE KEYS */;
INSERT INTO `RoomType` VALUES (9,'单人房','独处的环境。优雅。',20),(9,'商务房','极致办公。配有办公桌，电脑。',15),(9,'豪华大床房','奢侈的享受。舒适的环境。',10),(12,'尊贵客房','宽敞大气、精致优雅的尊贵客房采用极富魅力的设计元素、柔和自然的色调，配有一张特大床或者两张单人床、全大理石装潢浴室，在此可以欣赏连通圣以撒广场和海军部大厦这两处地标式建筑的宁静而古老街道的美景。 ',10),(12,'豪华大床房','舒适豪华，大房间。\r\n',200),(13,'豪华房','面积42平米 位于27-52层 大床(可以加床) 独立卫浴有窗',40),(13,'贵宾房','面积45平米 位于27-45层 大床/双床(可以加床) 独立卫浴有窗',200),(14,'特级客房','客房将舒适的室内设计与阳台巧妙融合；拉开一扇独具中国特色的折叠门，便可从8平方米阳台延伸至户外私人露台。客人足不出户，也可在经过精心设计的露台上观赏荷塘垂柳，尽情享受优雅写意的生活。',50),(14,'行政特级客房','大理石浴室设有浸泡式浴缸、带花洒淋浴的大型独立玻璃淋浴间以及配有电视的大型洗漱台。',100),(15,'商务房','适合办公。',20),(15,'大床房','适合官员。',10),(16,'客房','面积50-5平米 位于3-4层 其他床型(可以加床) 独立卫浴有窗',100),(16,'海景房','面积50-5平米 位于5-8层 其他床型(可以加床) 独立卫浴有窗',100),(17,'客房','无',500),(17,'豪华房','面积平米 位于1-6层 大床(可以加床) 独立卫浴有窗',100);
/*!40000 ALTER TABLE `RoomType` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trig_roomtype_check BEFORE INSERT ON RoomType
FOR EACH ROW BEGIN
IF NEW.Total < 0 THEN
insert into RoomType values('1');
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trig_roomtype_pics AFTER INSERT ON RoomType
FOR EACH ROW BEGIN
insert into RoomTypePics values(NEW.Hotel_ID, NEW.Type, 'avatar/zzefault_room.png');
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `RoomTypePics`
--

DROP TABLE IF EXISTS `RoomTypePics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RoomTypePics` (
  `Hotel_ID` int(11) NOT NULL DEFAULT '0',
  `Type` char(100) NOT NULL DEFAULT '',
  `File_Pos` varchar(40) NOT NULL DEFAULT '',
  PRIMARY KEY (`Hotel_ID`,`Type`,`File_Pos`),
  CONSTRAINT `RoomTypePics_ibfk_1` FOREIGN KEY (`Hotel_ID`, `Type`) REFERENCES `RoomType` (`Hotel_ID`, `Type`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RoomTypePics`
--

LOCK TABLES `RoomTypePics` WRITE;
/*!40000 ALTER TABLE `RoomTypePics` DISABLE KEYS */;
INSERT INTO `RoomTypePics` VALUES (9,'单人房','avatar/Hotel_9/small/150x150_单人房.jpg'),(9,'单人房','avatar/zzefault_room.png'),(9,'商务房','avatar/Hotel_9/small/150x150_商务房.jpg'),(9,'商务房','avatar/zzefault_room.png'),(9,'豪华大床房','avatar/zzefault_room.png'),(12,'尊贵客房','avatar/zzefault_room.png'),(12,'豪华大床房','avatar/Hotel_12/small/150x150_豪华大床房.jpg'),(12,'豪华大床房','avatar/zzefault_room.png'),(13,'豪华房','avatar/Hotel_13/small/150x150_豪华房.jpg'),(13,'豪华房','avatar/zzefault_room.png'),(13,'贵宾房','avatar/Hotel_13/small/150x150_贵宾房.jpg'),(13,'贵宾房','avatar/zzefault_room.png'),(14,'特级客房','avatar/zzefault_room.png'),(14,'行政特级客房','avatar/zzefault_room.png'),(15,'商务房','avatar/zzefault_room.png'),(15,'大床房','avatar/zzefault_room.png'),(16,'客房','avatar/Hotel_16/small/150x150_客房.jpg'),(16,'客房','avatar/zzefault_room.png'),(16,'海景房','avatar/Hotel_16/small/150x150_海景房.jpg'),(16,'海景房','avatar/zzefault_room.png'),(17,'客房','avatar/Hotel_17/small/150x150_客房.jpg'),(17,'客房','avatar/zzefault_room.png'),(17,'豪华房','avatar/Hotel_17/small/150x150_豪华房.jpg'),(17,'豪华房','avatar/zzefault_room.png');
/*!40000 ALTER TABLE `RoomTypePics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TicketsInfo`
--

DROP TABLE IF EXISTS `TicketsInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TicketsInfo` (
  `AirTicket_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Flight_Company` varchar(50) DEFAULT NULL,
  `Flight_No` char(6) NOT NULL,
  `Departure` varchar(50) NOT NULL,
  `Stopover` varchar(50) DEFAULT NULL,
  `Destination` varchar(50) NOT NULL,
  `Depart_time` datetime NOT NULL,
  `Stopover_time` datetime DEFAULT NULL,
  `Arrive_time` datetime NOT NULL,
  `Total` int(11) NOT NULL,
  `Available` int(11) NOT NULL,
  `Price` int(11) NOT NULL,
  `Discount` decimal(3,2) DEFAULT NULL,
  PRIMARY KEY (`AirTicket_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TicketsInfo`
--

LOCK TABLES `TicketsInfo` WRITE;
/*!40000 ALTER TABLE `TicketsInfo` DISABLE KEYS */;
INSERT INTO `TicketsInfo` VALUES (1,'东方航空','CA1321','厦门','深圳','吉隆坡','2016-06-15 06:30:00','2016-06-15 07:30:00','2016-06-15 10:00:00',600,600,1700,0.85);
/*!40000 ALTER TABLE `TicketsInfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trig_ticketsinfo_check BEFORE INSERT ON TicketsInfo
FOR EACH ROW BEGIN
IF NEW.Total < 0 || NEW.Available < 0 || NEW.Price < 0 THEN
insert into TicketsInfo values('1');
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trig_air_avail_check BEFORE UPDATE ON TicketsInfo
FOR EACH ROW BEGIN
IF NEW.Available < 0 THEN
set NEW.Available = 0;
insert into TicketsInfo values('1');
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
) ENGINE=InnoDB AUTO_INCREMENT=238 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserAccount`
--

LOCK TABLES `UserAccount` WRITE;
/*!40000 ALTER TABLE `UserAccount` DISABLE KEYS */;
INSERT INTO `UserAccount` VALUES (0,'hhhh','123',NULL,'2016-06-15 02:56:56','老大',NULL,'330183199501111111',NULL,'13711122211','xx@sx.com',0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3515.32,NULL),(123,'A1','123','$salt','2016-06-15 05:21:01','张三','M','332222199901010101','浙大路38号','13800138004','abc@zju.edu.cn',0,0,NULL,'111111112','234','P1000008','123','678','678','345678','123',8537.06,'123'),(124,'A2','123','$salt','2016-06-05 14:26:35','李四','F','332222199901010102','浙大路39号','13777776657','abd@zju.edu.cn',1,0,NULL,'P1000002','123','P1000007','123',NULL,NULL,NULL,NULL,734.50,'123'),(224,'B2','123','$salt','2016-05-17 18:17:33','赵六','F','432222199901010102','浙大路49号','13800138000','bbd@zju.edu.cn',1,1,NULL,'P1000004','123','P1000005','123',NULL,NULL,NULL,NULL,1234.50,'123'),(228,'小明','123',NULL,'2016-06-02 02:01:10','老二',NULL,'330183199501111112',NULL,'13456739120','nihao@zz.com',0,0,NULL,'123456','321','456789','123',NULL,NULL,NULL,NULL,10000.00,NULL),(229,'小王','123',NULL,'2016-06-02 02:03:26','老三',NULL,'330183199501111113',NULL,'13711122214','ss@ss.com',0,0,NULL,'12345567','123','56789','123',NULL,NULL,NULL,NULL,10000.00,'234'),(230,'zmx','123',NULL,'2016-06-04 07:25:52','老四',NULL,'330183199501111114',NULL,'18888888895','1234@sohu.com',0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0.00,'readonly=\"readonly\"'),(231,'王','123',NULL,'2016-06-11 11:27:20','老五',NULL,'330183199501111115',NULL,'13456739019','wang@wang.com',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0.00,NULL),(232,'linchaoguang','123',NULL,'2016-06-15 03:51:55','小明',NULL,'330183199501111139',NULL,'15700080907','342246152@qq.com',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0.00,NULL),(233,'LinBaby','123',NULL,'2016-06-15 04:44:47','小明',NULL,'330183199501111138',NULL,'15700080908','15700080908@163.com',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0.00,NULL),(234,'linchaoguang1','123',NULL,'2016-06-15 04:59:30','小明',NULL,'330183199501111137',NULL,'15700080905','15700080905@163.com',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0.00,NULL),(235,'linchaoguang2','123',NULL,'2016-06-15 05:06:59','小明',NULL,'330183199501111136',NULL,'15700080904','15700080904@163.com',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0.00,NULL),(236,'linchaoguang10','123',NULL,'2016-06-15 05:15:12','小明',NULL,'330183199501111130',NULL,'15700080900','15700080900@163.com',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0.00,NULL),(237,'linchaoguangA5','123',NULL,'2016-06-15 05:24:44','林超光',NULL,'610402199508117496',NULL,'15191012218','zjumathlin@gmail.com',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0.00,NULL);
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
  `MessageContent` char(255) DEFAULT NULL,
  `MessageTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `IsClick` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`MessageID`,`AccountID`),
  KEY `AccountID` (`AccountID`),
  CONSTRAINT `UserMessage_ibfk_1` FOREIGN KEY (`AccountID`) REFERENCES `UserAccount` (`AccountID`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserMessage`
--

LOCK TABLES `UserMessage` WRITE;
/*!40000 ALTER TABLE `UserMessage` DISABLE KEYS */;
INSERT INTO `UserMessage` VALUES (11,123,'系统','您的订单333中的海航状态改变为：交易关闭','2016-06-13 08:33:21',1),(12,123,'系统','您的订单444中的飞机票状态改变为：交易关闭','2016-06-13 08:33:21',1),(13,123,'系统','您的订单555中的总统套房状态改变为：待退款','2016-06-13 08:37:05',1),(14,123,'系统','您的订单666中的红酒状态改变为：已退款','2016-06-13 15:01:42',1),(15,123,'系统','您的订单4中的门口状态改变为：已入住','2016-06-14 16:08:57',1),(16,123,'你大爷','您的订单123中的就状态改变为：已入住','2016-06-14 17:30:14',1),(17,123,'你大爷','您的订单123中的门口状态改变为：已入住','2016-06-14 17:30:12',1),(18,123,'系统','您的订单4中的法云安曼酒店状态改变为：待商家确认有房','2016-06-15 03:04:40',1),(19,123,'系统','您的订单4中的法云安曼酒店状态改变为：待商家确认有房','2016-06-15 03:04:40',1),(20,123,'系统','您的订单5中的法云安曼酒店状态改变为：待商家确认有房','2016-06-15 03:04:40',1),(21,123,'系统','您的订单5中的法云安曼酒店状态改变为：已确认有房','2016-06-15 02:57:20',1),(22,123,'系统','您的订单5中的法云安曼酒店状态改变为：已入住','2016-06-15 02:57:17',1),(23,123,'系统','您的订单6中的西子湖四季酒店状态改变为：待商家确认有房','2016-06-15 04:55:51',1),(24,123,'系统','您的订单7中的法云安曼酒店状态改变为：待商家确认有房','2016-06-15 05:14:41',0);
/*!40000 ALTER TABLE `UserMessage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arbitrations`
--

DROP TABLE IF EXISTS `arbitrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `arbitrations` (
  `ManagerID` int(10) unsigned NOT NULL,
  `Orderid` int(10) unsigned NOT NULL,
  `Complaintid` int(10) unsigned NOT NULL,
  `Content` char(200) NOT NULL,
  `ArbiDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Result` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`Complaintid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arbitrations`
--

LOCK TABLES `arbitrations` WRITE;
/*!40000 ALTER TABLE `arbitrations` DISABLE KEYS */;
INSERT INTO `arbitrations` VALUES (10001,1,2,'			                	\n			                大概','2016-06-14 11:54:58',1),(10001,1,3,'			                	\n			      test','2016-05-29 05:20:56',1),(10001,1,4,'我就是不写理由。		                	\n			','2016-06-02 00:17:36',1),(10001,1,5,'test','2016-05-25 21:41:26',1),(10001,1,6,'管理员今天被老板骂了，就是不让你过。		                	\n			','2016-06-03 13:06:01',2),(10001,4,8,'我就试试看看.','2016-05-27 15:49:39',1),(10001,4,9,'	testx		                	\n			','2016-06-03 13:01:57',1),(10001,4,10,'试试功能。','2016-06-03 13:01:57',1),(10001,4,13,'我是个好人			                	\n			','2016-06-12 09:00:29',1),(10001,4,14,'片源泄露			                	\n			','2016-06-12 09:04:37',2),(10001,16,24,'太年轻，实在没话说。			                	\n			','2016-06-08 13:44:59',1),(10001,16,25,'用户投诉非常详细，予以通过。			                	\n			','2016-06-08 13:20:28',1);
/*!40000 ALTER TABLE `arbitrations` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `dealeraccount` VALUES ('224','AAAA','Yuhangtang Road#866','Normal');
/*!40000 ALTER TABLE `dealeraccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `managers`
--

DROP TABLE IF EXISTS `managers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `managers` (
  `ManagerID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `AccountName` char(20) NOT NULL,
  `Password_md5` char(50) NOT NULL,
  `Salt` char(50) NOT NULL,
  `RegisterDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ManagerType` tinyint(3) unsigned NOT NULL,
  `State` tinyint(3) unsigned NOT NULL,
  `ManagerName` char(20) DEFAULT NULL,
  `Email` char(50) NOT NULL,
  `Phone` char(20) DEFAULT NULL,
  PRIMARY KEY (`ManagerID`)
) ENGINE=InnoDB AUTO_INCREMENT=10013 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `managers`
--

LOCK TABLES `managers` WRITE;
/*!40000 ALTER TABLE `managers` DISABLE KEYS */;
INSERT INTO `managers` VALUES (10001,'Lin','123','hahaha','2016-06-12 15:44:39',3,0,'BOB','15700080907@163.com','15700080908'),(10007,'admin','admin','hahaha','2016-06-14 15:44:58',3,0,'admin','342246152@qq.com','110120130'),(10009,'我是你爸爸','admin','hahaha','2016-06-12 09:28:45',2,0,'赵伯南','3130000170@zju.edu.cn','11012032432'),(10010,'小伙伴','123','hahaha','2016-06-12 09:11:24',1,0,'小明大王','xiaoming@xx.com','1231231'),(10012,'10001','123','hahaha','2016-06-14 11:46:50',1,0,'dasf','asf@df.com','fdaf');
/*!40000 ALTER TABLE `managers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modifyLog`
--

DROP TABLE IF EXISTS `modifyLog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modifyLog` (
  `id` int(11) DEFAULT NULL,
  `modifyTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `message` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modifyLog`
--

LOCK TABLES `modifyLog` WRITE;
/*!40000 ALTER TABLE `modifyLog` DISABLE KEYS */;
/*!40000 ALTER TABLE `modifyLog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `realIDs`
--

DROP TABLE IF EXISTS `realIDs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `realIDs` (
  `ID` char(20) NOT NULL,
  `RealName` char(20) NOT NULL,
  `UserNumber` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `realIDs`
--

LOCK TABLES `realIDs` WRITE;
/*!40000 ALTER TABLE `realIDs` DISABLE KEYS */;
INSERT INTO `realIDs` VALUES ('100000000000000001','测试用户',0),('100000000000000002','测试用户',0),('100000000000000003','测试用户',0),('100000000000000004','测试用户',0),('100000000000000005','测试用户',0),('330183199501111111','老大',1),('330183199501111112','老二',1),('330183199501111113','老三',1),('330183199501111114','老四',1),('330183199501111115','老五',1),('330183199501111116','老六',0),('330183199501111117','小明',0),('330183199501111118','小明',0),('330183199501111119','小明',0),('330183199501111120','小明',0),('330183199501111121','小明',0),('330183199501111122','小明',0),('330183199501111123','小明',0),('330183199501111124','小明',0),('330183199501111125','小明',0),('330183199501111126','小明',0),('330183199501111127','小明',0),('330183199501111128','小明',0),('330183199501111129','小明',0),('330183199501111130','小明',1),('330183199501111131','小明',0),('330183199501111132','小明',0),('330183199501111133','小明',0),('330183199501111134','小明',0),('330183199501111135','小明',0),('330183199501111136','小明',1),('330183199501111137','小明',1),('330183199501111138','小明',1),('330183199501111139','小明',1),('610402199508117496','林超光',1);
/*!40000 ALTER TABLE `realIDs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-06-15 13:34:41
