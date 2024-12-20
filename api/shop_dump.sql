-- MySQL dump 10.13  Distrib 9.1.0, for macos14 (x86_64)
--
-- Host: 127.0.0.1    Database: shop_hw
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Table structure for table `categories`
--
use shop_hw;
DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (6,'Gaming Computer','High-performance computers designed for gaming and demanding applications.'),(7,'TV','LED, OLED and QLED TVs that support 4K, 8K and Smart TV features.'),(8,'Smartphone','Mobile devices with powerful processors, cameras and support for 5G networks.'),(9,'Home Appliance','Large and small home appliances including refrigerators, washing machines and vacuum cleaners.'),(10,'Audio & Headphones','Speakers, soundbars, headphones and headsets for music, gaming and socializing.'),(11,'Computers','Personal computers for work, study and entertainment. Includes desktop PCs and notebooks.');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `place_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `registration_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `items_categories_id_fk` (`category_id`),
  KEY `items_places_id_fk` (`place_id`),
  CONSTRAINT `items_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `items_places_id_fk` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (5,6,3,'Alienware Aurora','A high-performance gaming computer with a powerful graphics card and processor, ideal for modern video games.','images/0bc6fb23-92c9-4045-a9ea-1df02994fd9b.jpg','2024-12-20 17:58:57'),(6,11,5,'Apple MacBook Pro 16” Laptop','Stylish and powerful laptop with Retina display, perfect for work and entertainment.','images/b57d6c59-57fb-46a9-bebe-2edb22cdba36.jpg','2024-12-20 18:05:40'),(7,7,6,'Samsung QLED 65”','Ultra-clear TV with QLED technology for vibrant and rich colors.','images/5370a04b-abd8-4784-a880-77bbe4d87df1.jpg','2024-12-20 18:07:50'),(8,8,4,'iPhone 15 Pro','Apple\'s new flagship with an improved camera and A17 Bionic processor.','images/401ba959-087e-4e10-996b-cbed41de72f5.jpg','2024-12-20 18:10:03'),(9,9,7,'Bosch SMS46KI03E','Energy efficient dishwasher with multiple programs and quiet operation.','images/e94e68b0-4f5a-4077-a6cf-f94b7452fb02.png','2024-12-20 18:15:31'),(10,10,8,'JBL PartyBox 1000','A powerful backlit speaker system that is perfect for parties and events.','images/b6df6515-f2bb-4efa-a29c-e43e1d1f2c34.jpg','2024-12-20 18:16:53'),(11,6,3,'Razer Blade 15','',NULL,'2024-12-20 18:18:05'),(12,7,5,'LG OLED55CX6LA','OLED TV, perfect for watching movies and playing games.',NULL,'2024-12-20 18:19:22'),(13,8,5,'Samsung Galaxy S23 Ultra','','images/3bb01045-1e52-4a98-a8d4-d9e75297149a.jpg','2024-12-20 18:20:45');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `places`
--

DROP TABLE IF EXISTS `places`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `places` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `places`
--

LOCK TABLES `places` WRITE;
/*!40000 ALTER TABLE `places` DISABLE KEYS */;
INSERT INTO `places` VALUES (3,'TechWorld - Grand Mall','An electronics store in Grand Mall specializing in smartphones, laptops, tablets and other gadgets from the world\'s leading brands.'),(4,'GadgetZone - Downtown Plaza','A gadget store in Downtown Plaza offering a wide range of electronics including cameras, smart watches and gaming consoles.'),(5,'SmartTech - CityCenter Mall','A store focused on selling smart devices and high-tech electronics such as smart homes, security systems and wearable devices.'),(6,'Digital World - MegaTech Center','A store that offers a variety of digital technology, from computers and monitors to audio systems and tech accessories.'),(7,'Future Electronics - TechPark','An electronics store that specializes in innovative products including VR headsets, the latest smartphones and Internet of Things (IoT) devices.'),(8,'ElectroMax - HighTech Mall','A store that offers electronics and computer components as well as high-end home technology including televisions and appliances.');
/*!40000 ALTER TABLE `places` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-20 23:05:34
