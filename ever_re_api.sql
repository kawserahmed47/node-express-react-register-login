-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 13, 2021 at 10:39 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ever_re_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `user_name`, `profile_picture`, `email`, `password`, `user_type`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'First Name', 'LAst Name', 'Admin', 'profile.png', 'admin@info.com', '12345678', 1, 1, '2021-12-11 21:31:16', '2021-12-11 21:31:16'),
(2, 'kawser', ' ahmed', 'kawser', NULL, 'kawser@info.com', '12345678', 1, 1, '2021-12-13 20:17:08', '2021-12-13 20:17:08'),
(3, 'Chanchal', 'Soriful', 'Chanchal', NULL, 'ss@info.com', '12345678', 1, 1, '2021-12-13 20:28:43', '2021-12-13 20:28:43'),
(4, 'Test1', 'Test2', 'Test1', NULL, 'test1@info.com', '12345678', 1, 1, '2021-12-13 20:33:16', '2021-12-13 20:33:16'),
(5, 'aaaaa', 'bbbbb', 'aaaaa', NULL, 'aaaa@info.com', '12345678', 1, 1, '2021-12-13 21:37:20', '2021-12-13 21:37:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
