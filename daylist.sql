-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Окт 24 2020 г., 12:56
-- Версия сервера: 10.4.11-MariaDB
-- Версия PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `daylist`
--

-- --------------------------------------------------------

--
-- Структура таблицы `customers`
--

CREATE TABLE `customers` (
  `login` varchar(255) NOT NULL,
  `password` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `tb_id` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `customers`
--

INSERT INTO `customers` (`login`, `password`, `email`, `tb_id`) VALUES
('Denis', 'root', 'aqezy21@gmail.com', 'D1'),
('Valera', 'dbom', 'aasd@asfar', 'V1');

-- --------------------------------------------------------

--
-- Структура таблицы `d1_tb`
--

CREATE TABLE `d1_tb` (
  `r_date` datetime NOT NULL,
  `record` text NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `d1_tb`
--

INSERT INTO `d1_tb` (`r_date`, `record`, `id`) VALUES
('2021-05-12 00:12:00', 'Ну всё, гг', 25),
('2020-01-10 15:15:00', 'A', 26),
('2020-01-11 17:16:00', 'C', 27),
('2020-01-11 16:15:00', 'D', 28),
('2020-09-30 00:12:00', 'Some information', 30),
('2020-10-01 00:12:00', 'Report', 32),
('2020-01-20 00:12:00', 'Create an account in Github', 33),
('2020-09-30 18:00:00', 'Gi', 35),
('2020-09-30 04:00:00', 'Ge', 36);

-- --------------------------------------------------------

--
-- Структура таблицы `v1_tb`
--

CREATE TABLE `v1_tb` (
  `r_date` datetime NOT NULL,
  `record` text NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `v1_tb`
--

INSERT INTO `v1_tb` (`r_date`, `record`, `id`) VALUES
('2020-09-29 01:21:00', 'jksaldfjklsdjf;kl', 1),
('2020-10-04 02:31:00', 'kjfsd', 2),
('2020-01-20 02:12:00', 'dkflngldfjglkdfjgkl', 4),
('2020-01-02 02:41:00', 'kfsdjfk', 6);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `customers`
--
ALTER TABLE `customers`
  ADD UNIQUE KEY `login` (`login`),
  ADD UNIQUE KEY `login_2` (`login`),
  ADD UNIQUE KEY `db_id` (`tb_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Индексы таблицы `d1_tb`
--
ALTER TABLE `d1_tb`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `v1_tb`
--
ALTER TABLE `v1_tb`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `d1_tb`
--
ALTER TABLE `d1_tb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT для таблицы `v1_tb`
--
ALTER TABLE `v1_tb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
