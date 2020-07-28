-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 03, 2020 at 09:16 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `adventurequest`
--
DROP DATABASE IF EXISTS adventurequest;
CREATE DATABASE adventurequest;
USE adventurequest;
-- --------------------------------------------------------

--
-- Table structure for table `quests`
--

CREATE TABLE `quests` (
  `questID` int(11) NOT NULL,
  `doctorID` int(11) NOT NULL,
  `patientID` int(11) NOT NULL,
  `additionalItems` varchar(255) NOT NULL,
  `description` varchar(1500) NOT NULL,
  `difficulty` varchar(10) NOT NULL,
  `lattitude` double NOT NULL,
  `longitude` double NOT NULL,
  `name` varchar(50) NOT NULL,
  `objectives` varchar(1000) NOT NULL,
  `reward` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quests`
--

INSERT INTO `quests` (`questID`, `doctorID`, `patientID`, `additionalItems`, `description`, `difficulty`, `lattitude`, `longitude`, `name`, `objectives`, `reward`, `status`, `type`) VALUES
(3, 1, 1, 'Pen & Paper', 'Bacon ipsum dolor amet ball tip swine meatloaf, shoulder buffalo jerky venison spare ribs strip steak. Frankfurter shoulder swine alcatra andouille ground round hamburger. Bacon pork chop frankfurter, turkey beef meatball filet mignon capicola strip steak. Rump tri-tip fatback bresaola prosciutto. Drumstick fatback chuck pancetta, meatloaf jowl venison flank corned beef porchetta pork loin alcatra buffalo swine. Kevin tail spare ribs pig.', 'Extreme', 9.795677582831246, -40.429687500000426, 'Bacon', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque', 50, 0, 'Weekly Quests');

-- --------------------------------------------------------

--
-- Table structure for table `users_medical`
--

CREATE TABLE `users_medical` (
  `doctorID` int(11) NOT NULL,
  `fName` varchar(25) NOT NULL,
  `lName` varchar(25) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `moderator` tinyint(4) NOT NULL DEFAULT 0,
  `username` varchar(25) NOT NULL,
  `password` varchar(500) NOT NULL,
  `organization` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users_medical`
--

INSERT INTO `users_medical` (`doctorID`, `fName`, `lName`, `email`, `phone`, `moderator`, `username`, `password`, `organization`) VALUES
(1, 'Albert', 'Einstien', 'albert33@mail.com', '7061234567', 1, 'albert33', 'password', 'Medical College of Georgia'),
(2, 'Bill', 'Gates', 'billyG@mail.com', '7064561234', 1, 'billyG', 'password', 'Microsoft International Corp');

-- --------------------------------------------------------

--
-- Table structure for table `users_patients`
--

CREATE TABLE `users_patients` (
  `patientID` int(11) NOT NULL,
  `doctorID` int(11) NOT NULL,
  `fName` varchar(50) NOT NULL,
  `mName` varchar(50) NOT NULL,
  `lName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `homePhone` varchar(10) NOT NULL,
  `workPhone` varchar(10) NOT NULL,
  `medication` varchar(1500) NOT NULL,
  `notes` varchar(1500) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users_patients`
--

INSERT INTO `users_patients` (`patientID`, `doctorID`, `fName`, `mName`, `lName`, `email`, `homePhone`, `workPhone`, `medication`, `notes`, `username`, `password`) VALUES
(1, 2, 'John ', 'Christopher', 'Doe', 'jDoe77@mail.com', '8162224444', '8163335555', 'Xanax, Ambien, Prozac', 'Depression, Anxiety, Obsessive Compulsive Disorder. Subject exhibits atypical behavior of all of the aforementioned aliments. ', 'jDoe77', 'password'),
(2, 1, 'Jane', 'Rose', 'Deer', 'jDeer@mail.com', '7068030000', '8037060000', 'Advil, Tylenol, Ibuprofen', 'Chronic pain. Subject exhibits all of the quintessential traits of someone experiencing daily pain.  ', 'deer12', 'password');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `quests`
--
ALTER TABLE `quests`
  ADD PRIMARY KEY (`questID`),
  ADD KEY `questDr` (`doctorID`),
  ADD KEY `questPatient` (`patientID`);

--
-- Indexes for table `users_medical`
--
ALTER TABLE `users_medical`
  ADD PRIMARY KEY (`doctorID`);

--
-- Indexes for table `users_patients`
--
ALTER TABLE `users_patients`
  ADD PRIMARY KEY (`patientID`),
  ADD KEY `assignedDr` (`doctorID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `quests`
--
ALTER TABLE `quests`
  MODIFY `questID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users_medical`
--
ALTER TABLE `users_medical`
  MODIFY `doctorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users_patients`
--
ALTER TABLE `users_patients`
  MODIFY `patientID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `quests`
--
ALTER TABLE `quests`
  ADD CONSTRAINT `questDr` FOREIGN KEY (`doctorID`) REFERENCES `users_medical` (`doctorID`),
  ADD CONSTRAINT `questPatient` FOREIGN KEY (`patientID`) REFERENCES `users_patients` (`patientID`);

--
-- Constraints for table `users_patients`
--
ALTER TABLE `users_patients`
  ADD CONSTRAINT `assignedDr` FOREIGN KEY (`doctorID`) REFERENCES `users_medical` (`doctorID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
