-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 15, 2024 at 09:37 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jntlibrarydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `ID` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varbinary(255) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`ID`, `username`, `password`, `role`) VALUES
(1, 'joahsaw@gmail.com', 0x9a09eafe9bcbfeab18c42d0cc04bdc52, 'ADMIN'),
(2, 'soohong@gmail.com', 0x615846474d6c5a48617a6b335756564d6355705163334e516245396d55543039, 'USER'),
(4, 'test@gmail.com', 0x515538724e455a6a6544465964336f325544647a4e45354d4e574a5251543039, 'ADMIN'),
(5, 'adsf@gmail.com', 0x5a6d70354d56684f5333465062556877656b3830576b31334f456c6c647a3039, 'ADMIN');

-- --------------------------------------------------------

--
-- Table structure for table `actiontrace`
--

CREATE TABLE `actiontrace` (
  `ID` int(11) NOT NULL,
  `accountID` int(11) NOT NULL,
  `actionDesc` varchar(255) NOT NULL,
  `actionTime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `ID` int(11) NOT NULL,
  `bookTitle` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `type` varchar(30) NOT NULL,
  `language` varchar(30) NOT NULL,
  `totalQuantity` int(11) NOT NULL,
  `currentQuantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`ID`, `bookTitle`, `author`, `type`, `language`, `totalQuantity`, `currentQuantity`) VALUES
(1, 'To Kill a Mockingbird', 'Harper Lee', 'Fiction', 'English', 10, 7),
(2, '1984', 'George Orwell', 'Dystopian', 'English', 15, 10),
(3, 'Pride and Prejudice', 'Jane Austen', 'Classic', 'English', 12, 5),
(4, 'The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 'English', 20, 18),
(5, 'Moby Dick', 'Herman Melville', 'Adventure', 'English', 8, 4),
(6, 'sdf', 'sdf', 'ghghdg', 'sdf', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `borrowedhistory`
--

CREATE TABLE `borrowedhistory` (
  `ID` int(11) NOT NULL,
  `borrowedBy` int(11) NOT NULL,
  `handleBy` int(11) NOT NULL,
  `bookID` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `statusBorrowedBookID` int(11) NOT NULL,
  `borrowDate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `borrowedhistory`
--

INSERT INTO `borrowedhistory` (`ID`, `borrowedBy`, `handleBy`, `bookID`, `quantity`, `statusBorrowedBookID`, `borrowDate`) VALUES
(1, 1, 1, 1, 2, 2, '2024-11-15 04:00:44'),
(2, 2, 1, 2, 1, 2, '2024-11-15 04:00:44'),
(3, 1, 1, 3, 3, 2, '2024-11-15 04:00:44'),
(4, 2, 1, 4, 1, 1, '2024-11-15 04:00:44'),
(5, 1, 1, 5, 1, 2, '2024-11-15 04:00:44');

-- --------------------------------------------------------

--
-- Table structure for table `statusborrowedbook`
--

CREATE TABLE `statusborrowedbook` (
  `ID` int(11) NOT NULL,
  `desc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `statusborrowedbook`
--

INSERT INTO `statusborrowedbook` (`ID`, `desc`) VALUES
(1, 'RETURN'),
(2, 'BORROW');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `actiontrace`
--
ALTER TABLE `actiontrace`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `accountID` (`accountID`);

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `borrowedhistory`
--
ALTER TABLE `borrowedhistory`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `borrowedBy` (`borrowedBy`),
  ADD KEY `handleBy` (`handleBy`),
  ADD KEY `bookID` (`bookID`),
  ADD KEY `statusBorrowedBookID` (`statusBorrowedBookID`);

--
-- Indexes for table `statusborrowedbook`
--
ALTER TABLE `statusborrowedbook`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `actiontrace`
--
ALTER TABLE `actiontrace`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `borrowedhistory`
--
ALTER TABLE `borrowedhistory`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `statusborrowedbook`
--
ALTER TABLE `statusborrowedbook`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `actiontrace`
--
ALTER TABLE `actiontrace`
  ADD CONSTRAINT `actiontrace_ibfk_1` FOREIGN KEY (`accountID`) REFERENCES `account` (`ID`);

--
-- Constraints for table `borrowedhistory`
--
ALTER TABLE `borrowedhistory`
  ADD CONSTRAINT `borrowedhistory_ibfk_1` FOREIGN KEY (`borrowedBy`) REFERENCES `account` (`ID`),
  ADD CONSTRAINT `borrowedhistory_ibfk_2` FOREIGN KEY (`handleBy`) REFERENCES `account` (`ID`),
  ADD CONSTRAINT `borrowedhistory_ibfk_3` FOREIGN KEY (`bookID`) REFERENCES `book` (`ID`),
  ADD CONSTRAINT `borrowedhistory_ibfk_4` FOREIGN KEY (`statusBorrowedBookID`) REFERENCES `statusborrowedbook` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
