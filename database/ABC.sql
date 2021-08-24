-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: localhost    Database: PWC1
-- ------------------------------------------------------
-- Server version	8.0.25-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_register`
--

DROP TABLE IF EXISTS `admin_register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_register` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `employee_id` int unsigned NOT NULL,
  `password` text,
  PRIMARY KEY (`id`),
  KEY `admin_register_FK` (`employee_id`),
  CONSTRAINT `admin_register_FK` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_register`
--

LOCK TABLES `admin_register` WRITE;
/*!40000 ALTER TABLE `admin_register` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `employee_number` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_form`
--

DROP TABLE IF EXISTS `user_form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_form` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `country` enum('jordan','canada','usa') NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `category` set('connection','disconnection') NOT NULL,
  `subject` text NOT NULL,
  `message` text NOT NULL,
  `status` enum('dismissed','resolved','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_form_FK` (`user_id`),
  CONSTRAINT `user_form_FK` FOREIGN KEY (`user_id`) REFERENCES `user_register` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_form`
--

LOCK TABLES `user_form` WRITE;
/*!40000 ALTER TABLE `user_form` DISABLE KEYS */;
INSERT INTO `user_form` VALUES (2,1,'samy1212','ahmad','jordan','male','connection,disconnection','heey i\'m not alone','yes yes he is not alone','resolved'),(3,1,'sad','master','jordan','male','connection','nono','yesyesyes','resolved'),(4,1,'hi','hello','jordan','male','connection','try','test','resolved'),(5,1,'das','tame','jordan','male','connection','testing testing','guys i\'m testing','pending'),(6,1,'man','not woman','jordan','male','connection',' I\'m a human','but not a woman','dismissed'),(7,1,'female','not male','jordan','female','connection','Hey human','I\'m not a male','pending'),(8,1,'nono','yes','jordan','male','connection','hey','not me','pending'),(9,7,'asd','sad123','jordan','male','connection','dsadwqe','sadask;jk','pending'),(10,7,'man','osd','jordan','male','connection','no','nothing','pending');
/*!40000 ALTER TABLE `user_form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_register`
--

DROP TABLE IF EXISTS `user_register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_register` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_register`
--

LOCK TABLES `user_register` WRITE;
/*!40000 ALTER TABLE `user_register` DISABLE KEYS */;
INSERT INTO `user_register` VALUES (1,'samy1212','ahmad@gmail.com','$2b$10$R6yjWfl0Hoqu6LhsBXEOJud10gzhtiKRVuPMQsiRHYuMY6yeQ/nA2'),(2,'samy1212','ahm@gmail.com','$2b$10$YcRkvV0AR3nYpkP3LTC/ge/Inw7imMgCUyUZDEkxL2V6FJ/mOkA32'),(3,'samy12123','ahm1@gmail.com','$2b$10$QX7ZK4E24./txo1mErdm6OtJ.s8SGSbD4zfJEJphOuhJppgmCeXQ.'),(4,'samy12123','ahm12@gmail.com','$2b$10$7UWm9pSF/pkD9W1Wz41uZejaLt77My.fpqLvj7UiFdU7A2w6886gO'),(5,'samy12123','ahm112@gmail.com','$2b$10$cAilXrrWd4VXTWTu8AKI8OGBLThpk2tZyCcOaW9i8LWEwVticOj/y'),(6,'samy12123','ahm1122@gmail.com','$2b$10$zj/IfAHMMSRauMv4qr/aFuTVyKVCvrxoacvrgkvqacHuP6TccRwZC'),(7,'samy12123','ahm11223@gmail.com','$2b$10$rhMEvFUd9VwYDIA2UUZpHuaP.Gwl9eaMmahtsqFpcWnEuThgiq3f2'),(8,'fafa','fadobule@fatriple.com','$2b$10$2XxAXs.9zTlOkVEG5gYLSuUGc09kAvfOAheNR3Qp9Y5USBN3PXrBK');
/*!40000 ALTER TABLE `user_register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'PWC1'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-24 18:07:46
