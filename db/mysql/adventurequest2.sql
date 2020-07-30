-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 31, 2020 at 01:25 AM
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
-- Database: `adventurequest2`
--
DROP DATABASE IF EXISTS adventurequest2;
CREATE DATABASE adventurequest2;
USE adventurequest2;
-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `messageID` int(11) NOT NULL,
  `threadID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `message` varchar(1500) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`messageID`, `threadID`, `userID`, `message`, `timestamp`) VALUES
(5, 3, 14, 'Hey I can\'t think of a good subject line, could you help me out? I\'m a fucking retard and I can\'t do shit.', '2020-07-30 23:23:01'),
(6, 4, 15, 'Hey I need to reschedule our appointment tomorrow for Wed @ 4:30.\r\n\r\nThanks,\r\nJane Deer', '2020-07-30 23:23:01');

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
  `latitude` double NOT NULL,
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

INSERT INTO `quests` (`questID`, `doctorID`, `patientID`, `additionalItems`, `description`, `difficulty`, `latitude`, `longitude`, `name`, `objectives`, `reward`, `status`, `type`) VALUES
(13, 22, 7, 'asdf', 'asdf', 'trivial', 33.53179440793684, -82.00185966582045, 'asdf', 'asdf', 10, 0, 'daily');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('CWxUXoE4UE9BRy2ZxNolvUVF5-0V57db', 1596231840, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":6}}'),
('qn1xvj_U58ElF_gsk_gBSMm2pj1We5-M', 1596236835, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":6}}');

-- --------------------------------------------------------

--
-- Table structure for table `threads`
--

CREATE TABLE `threads` (
  `threadID` int(11) NOT NULL,
  `doctorID` int(11) NOT NULL,
  `patientID` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `favorite` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `threads`
--

INSERT INTO `threads` (`threadID`, `doctorID`, `patientID`, `subject`, `favorite`) VALUES
(3, 22, 7, 'Need Help With My Subject Line', 1),
(4, 22, 8, 'Need to reschedule appointment', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `username`, `password`, `email`) VALUES
(6, 'hbull5', '$2a$10$la.hbSOzysosh2EzVUuPReBla4T7Xel6ZsxhJ4yzMQtBCqY5WgNnO', 'hbull@mail.com'),
(12, 'steve12', '$2a$10$xRxbeLMOvhK8lS2OE1roVewa5WEWI0lAUDlbQUx4kGn52jFWKWw5i', 'steve@apple.com'),
(13, 'billy12', '$2a$10$neCgtxUWnoe2u3D7mXSjq.qF8qO0TGUL.j1blyUYDh30sQIwTMr.a', 'billyG@microsoft.com'),
(14, 'jDoe12', '$2a$10$Wd4Lv2tU2IEqVDQtE8zxE.8SFmZAfmCsQVYlQ3Ewvz1x51TX93v1O', 'john@mail.com'),
(15, 'jDeer', '$2a$10$Wd4Lv2tU2IEqVDQtE8zxE.8SFmZAfmCsQVYlQ3Ewvz1x51TX93v1O', 'jane@mail.com');

-- --------------------------------------------------------

--
-- Table structure for table `users_medical`
--

CREATE TABLE `users_medical` (
  `doctorID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `fName` varchar(25) NOT NULL,
  `lName` varchar(25) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `organization` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users_medical`
--

INSERT INTO `users_medical` (`doctorID`, `userID`, `fName`, `lName`, `phone`, `organization`) VALUES
(22, 6, 'Harcourt', 'Bull', '8169126682', 'Best Company'),
(24, 12, 'Steve', 'Jobs', '8169126682', 'Apple Co.'),
(25, 13, 'Bill', 'Gates', '8169126682', 'Microsoft Co.');

-- --------------------------------------------------------

--
-- Table structure for table `users_patients`
--

CREATE TABLE `users_patients` (
  `patientID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `doctorID` int(11) NOT NULL,
  `fName` varchar(50) NOT NULL,
  `mName` varchar(25) NOT NULL,
  `lName` varchar(50) NOT NULL,
  `homePhone` varchar(10) NOT NULL,
  `workPhone` varchar(10) NOT NULL,
  `medication` varchar(1500) NOT NULL,
  `notes` varchar(1500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users_patients`
--

INSERT INTO `users_patients` (`patientID`, `userID`, `doctorID`, `fName`, `mName`, `lName`, `homePhone`, `workPhone`, `medication`, `notes`) VALUES
(7, 14, 22, 'John', 'Methuzula', 'Doe', '1234567890', '1234567890', 'drugs', 'some notes about things'),
(8, 15, 22, 'Jane', 'Methuzula', 'Deer', '1234567890', '1234567890', 'moar drugs', 'notes about notey notes');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`messageID`),
  ADD KEY `threadID` (`threadID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `quests`
--
ALTER TABLE `quests`
  ADD PRIMARY KEY (`questID`),
  ADD KEY `questDr` (`doctorID`),
  ADD KEY `questPatient` (`patientID`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `threads`
--
ALTER TABLE `threads`
  ADD PRIMARY KEY (`threadID`),
  ADD KEY `doctorID` (`doctorID`),
  ADD KEY `patientID` (`patientID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `users_medical`
--
ALTER TABLE `users_medical`
  ADD PRIMARY KEY (`doctorID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `users_patients`
--
ALTER TABLE `users_patients`
  ADD PRIMARY KEY (`patientID`),
  ADD KEY `assignedDr` (`doctorID`),
  ADD KEY `userID` (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `messageID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `quests`
--
ALTER TABLE `quests`
  MODIFY `questID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `threads`
--
ALTER TABLE `threads`
  MODIFY `threadID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users_medical`
--
ALTER TABLE `users_medical`
  MODIFY `doctorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users_patients`
--
ALTER TABLE `users_patients`
  MODIFY `patientID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`threadID`) REFERENCES `threads` (`threadID`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`);

--
-- Constraints for table `quests`
--
ALTER TABLE `quests`
  ADD CONSTRAINT `questDr` FOREIGN KEY (`doctorID`) REFERENCES `users_medical` (`doctorID`),
  ADD CONSTRAINT `questPatient` FOREIGN KEY (`patientID`) REFERENCES `users_patients` (`patientID`);

--
-- Constraints for table `threads`
--
ALTER TABLE `threads`
  ADD CONSTRAINT `threads_ibfk_1` FOREIGN KEY (`doctorID`) REFERENCES `users_medical` (`doctorID`),
  ADD CONSTRAINT `threads_ibfk_2` FOREIGN KEY (`patientID`) REFERENCES `users_patients` (`patientID`);

--
-- Constraints for table `users_medical`
--
ALTER TABLE `users_medical`
  ADD CONSTRAINT `users_medical_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`);

--
-- Constraints for table `users_patients`
--
ALTER TABLE `users_patients`
  ADD CONSTRAINT `assignedDr` FOREIGN KEY (`doctorID`) REFERENCES `users_medical` (`doctorID`),
  ADD CONSTRAINT `users_patients_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
