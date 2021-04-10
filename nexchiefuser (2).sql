-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 10 Apr 2021 pada 02.25
-- Versi server: 10.4.17-MariaDB
-- Versi PHP: 7.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nexchiefuser`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `code` varchar(255) NOT NULL,
  `nameProduct` varchar(255) NOT NULL,
  `packaging` varchar(255) NOT NULL,
  `product_desc` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `launch_date` date NOT NULL,
  `status` varchar(255) NOT NULL,
  `price` int(100) NOT NULL,
  `stock` int(100) NOT NULL,
  `created_at` date NOT NULL,
  `created_by` varchar(255) NOT NULL,
  `updated_at` date NOT NULL,
  `updated_by` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`code`, `nameProduct`, `packaging`, `product_desc`, `category`, `launch_date`, `status`, `price`, `stock`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES
('7a756fc7-e65f-47f9-8533-ab0899d47297', 'KOPI KAPALAPI', '250gr', 'kopi kapal api original', 'TOPITEM', '2021-01-01', 'INACTIVE', 13500, 0, '2021-04-06', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', '2021-04-06', '79c1fbf2-970f-4e92-9039-01ee02c13e5b'),
('88b2c9d1-fb7f-488c-945b-723a1665a149', 'GO POTATO! CHEESE FLAVOUR', '8GR X 20 BKS', '', 'TOPITEM', '2021-01-01', 'ACTIVE', 7500, 20, '2021-04-07', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', '2021-04-08', '79c1fbf2-970f-4e92-9039-01ee02c13e5b'),
('CH-05-CA', 'CHACHA COKLAT KACANG', '20X15GR', 'CHACHA RASA COKLAT KACANG', 'TOPITEM', '2021-01-01', 'INACTIVE', 13000, 0, '2021-03-29', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', '2021-04-06', '79c1fbf2-970f-4e92-9039-01ee02c13e5b'),
('CHC-123-LO', 'HATARI SUGAR CHOCOLATE CREAM', '250gr', 'hatari sugar chocolate cream choco cream flavour', 'STANDARD', '2021-01-01', 'INACTIVE', 9000, 23, '2021-03-24', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', '2021-03-29', '79c1fbf2-970f-4e92-9039-01ee02c13e5b'),
('dffd0a5a-0d87-46ab-b8ce-8e920a7b5a1a', 'DEO GO! POTATO', '10GR X 20 BKS', 'deo go!potato biskuit kentang rasa original', 'STANDARD', '2021-01-01', 'INACTIVE', 8500, 23, '2021-04-06', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', '2021-04-07', '79c1fbf2-970f-4e92-9039-01ee02c13e5b'),
('DW-05-KO', 'SUSU DANCOW', '5X50GR', 'SUSU DANCOW RASA VANILLA SACHET', 'TOPITEM', '2021-02-02', 'ACTIVE', 11200, 1, '2021-03-29', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', '2021-03-29', '79c1fbf2-970f-4e92-9039-01ee02c13e5b'),
('ea7c6cde-1505-4b07-8ea6-0f5529a64883', 'GERY SALUT MALKIS', '3X7X200GR', 'GERY SALUT COKELAT', 'TOPITEM', '2021-01-01', 'ACTIVE', 5500, 38, '2021-03-31', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', '2021-04-08', '79c1fbf2-970f-4e92-9039-01ee02c13e5b'),
('ML-10-LO', 'SUSU MILO', '5x50gr', 'SUSU MILO RASA COKLAT SACHET ', 'TOPITEM', '2021-02-02', 'INACTIVE', 10000, 0, '2021-03-29', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', '2021-04-08', '79c1fbf2-970f-4e92-9039-01ee02c13e5b'),
('MN-09-TS', 'PERMEN MENTOS', '3gr x 30pcs', 'Permen mentos mint', 'TOPITEM', '2021-01-01', 'ACTIVE', 9000, 10, '2021-03-29', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', '2021-03-29', '79c1fbf2-970f-4e92-9039-01ee02c13e5b'),
('MN-13-01', 'Permen Mintz', '2.3gr x 50pcs', 'Permen Mintz Rasa Peppermint chewy mints', 'STANDARD', '2021-01-01', 'INACTIVE', 5500, 12, '2021-03-29', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', '2021-03-29', '79c1fbf2-970f-4e92-9039-01ee02c13e5b'),
('SLY-01-03', 'OREO BISKUIT VANILLA', '250GR', 'OREO BISKUIT RASA VANILLA', 'TOPITEM', '2021-01-01', 'INACTIVE', 8000, 15, '2021-03-29', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', '2021-03-29', '79c1fbf2-970f-4e92-9039-01ee02c13e5b'),
('SLY-07-90', 'Slay-Olay Strawberry flavour', '350gr', 'slay olay biskuit isi krim strawberry', 'TOPITEM', '2021-01-01', 'ACTIVE', 8000, 50, '2021-04-08', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', '2021-04-08', '79c1fbf2-970f-4e92-9039-01ee02c13e5b'),
('TS-09-UE', 'TISUE NICE', '250 LEMBAR', 'tisue nice kemasan 250 lembar', 'STANDARD', '2021-01-01', 'INACTIVE', 15000, 30, '2021-04-06', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', '2021-04-06', '79c1fbf2-970f-4e92-9039-01ee02c13e5b'),
('WD-01-21', 'Wardah nature daily', '100 ml', 'Wardah nature daily aloe hydramild hand gel ', 'TOPITEM', '2020-01-18', 'INACTIVE', 18000, 10, '2021-03-24', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', '2021-03-29', '79c1fbf2-970f-4e92-9039-01ee02c13e5b');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sales`
--

CREATE TABLE `sales` (
  `idSales` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `distributor` varchar(255) NOT NULL,
  `customer` varchar(255) NOT NULL,
  `discount` int(100) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `sales`
--

INSERT INTO `sales` (`idSales`, `date`, `distributor`, `customer`, `discount`, `status`) VALUES
('087ebb01-e291-4ba2-9b61-094b32a06348', '2021-03-31', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO KRIS', 12000, 'UNPAID'),
('0e632cd1-d423-4bc3-b09c-619b4267c959', '2021-03-29', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO AFIF', 13000, 'UNPAID'),
('13540d43-42ad-4d13-be8b-11abd14bc399', '2021-03-30', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO BUDI2', 1000, 'UNPAID'),
('1b82ceff-626e-442f-aa25-30307a24ef8c', '2021-03-05', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO DHIFA', 5000, 'paid'),
('1f23c68b-973f-4276-8a15-4dc3d3b80666', '2021-03-01', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO TRIS', 10000, 'paid'),
('23596702-7343-41f5-ad9d-10960eb50830', '2021-03-30', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO FAUZAN', 5500, 'UNPAID'),
('387e611b-9f99-42cc-b8eb-7183f92c199d', '2021-03-15', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO ALMA', 7500, 'UNPAID'),
('3a4de68c-16c1-4949-a025-d883ace0d9e0', '2021-04-01', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'Toko bca', 100, 'paid'),
('3c358431-45c1-451c-8199-fb10e0abae1f', '2021-04-06', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO KRIS', 3000, 'UNPAID'),
('52bbc906-00d4-4e16-a629-aa3d0871ca04', '2021-04-06', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO AMAL', 1000, 'UNPAID'),
('5948ee6f-9771-4af1-84c0-b8ff55b85456', '2021-04-05', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO AGUNG', 2500, 'UNPAID'),
('5fdb6f16-c4aa-459a-a8bf-2f363441895f', '2021-03-29', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO SILO', 1000, 'UNPAID'),
('63d40810-bed0-4fba-842d-b0cf54f3d594', '2021-04-02', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO ERIC', 10000, 'paid'),
('7b8906a3-7358-4d81-ab96-d8e8ab370d61', '2021-03-31', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO AGUNG', 7500, 'paid'),
('7c4595e6-d6b4-453b-a412-998640b85775', '2021-04-04', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO AGUNG', 5500, 'UNPAID'),
('816b9999-d7ef-411d-ba46-159227e6cdd0', '2021-03-30', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO BUDIYONO', 6000, 'UNPAID'),
('8827d5b9-2b39-4e36-a227-36b5f6a63149', '2021-04-04', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO TRIS', 1500, 'UNPAID'),
('8ba2c02c-2947-4f65-a9e6-dbb3d1fbe5d8', '2021-04-07', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO TRIS', 5000, 'UNPAID'),
('8c9c8750-204d-4365-9a9a-1a31b1af6e36', '2021-03-29', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO AGUNG', 10000, 'UNPAID'),
('8fbd04c6-02b0-4f06-8a55-ae5aea1511d7', '2021-03-25', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO LULU', 10000, 'UNPAID'),
('9b656c84-06d9-4e2b-b44b-9835f0a64ec5', '2021-03-29', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO OJAN', 15000, 'UNPAID'),
('aa6f3f9b-ad20-4de9-831e-09d4e6441d66', '2021-04-07', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO AGUNG', 1500, 'UNPAID'),
('ad2d46a1-6579-4e35-a3ba-084965b9984c', '2021-03-29', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO SILO', 5500, 'UNPAID'),
('b0661609-3485-466d-af73-7b20ad4bb185', '2021-04-01', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO BiBAH', 10000, 'paid'),
('b60d1b42-ecfd-4122-880e-b1204245451a', '2021-04-17', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'toko abc', 1000, 'UNPAID'),
('babd697d-a583-474d-a582-51bede475b19', '2021-03-31', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO AMAL', 12500, 'UNPAID'),
('bcdf9737-18e6-456c-8a06-232528b4f6f9', '2021-04-06', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO SILO', 4000, 'UNPAID'),
('c291919b-c4f4-48f0-8f3e-08e575a43e3b', '2021-03-24', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO ERIC', 10000, 'paid'),
('c5e3e0f8-db64-46c3-befe-3886f1f7d4a9', '2021-03-16', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO ERIC2', 15000, 'UNPAID'),
('d2fb3ddd-de23-4e28-b09a-81830acad4b5', '2021-04-15', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO LALA', 10000, 'UNPAID'),
('d45595cd-32cf-44ef-a5de-a7f8d2168e26', '2021-04-09', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO LALA', 2500, 'UNPAID'),
('d642528d-59f3-47a8-8bfc-d619beac1104', '2021-03-26', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO LULU', 10000, 'UNPAID'),
('ea11165c-d120-4022-846c-fd81783f7219', '2021-03-29', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO ALIF', 8500, 'paid'),
('eba28822-3f38-46a4-9c8f-12b8f5cb7acd', '2021-04-01', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'Toko Afif', 13000, 'paid'),
('f0620ef0-e3da-4b11-8af1-e8555fa62258', '2021-04-07', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO BUDI', 1000, 'UNPAID'),
('f27cd993-3950-471e-82a7-a0b03cf9d3e9', '2021-03-22', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO LIA', 0, 'UNPAID'),
('f4dcd2d6-3395-4647-962f-7d3587b5e37e', '2021-03-31', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO HUSEN', 10000, 'UNPAID'),
('f96b33d5-479c-461d-8a87-c80c00e742fb', '2021-03-31', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO SILO', 12000, 'UNPAID'),
('fd2e5355-7301-4d68-9897-6e2a849548db', '2021-04-02', '79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'TOKO HUSEN', 10000, 'paid');

-- --------------------------------------------------------

--
-- Struktur dari tabel `salesdetail`
--

CREATE TABLE `salesdetail` (
  `idDetail` varchar(255) NOT NULL,
  `idSales` varchar(255) NOT NULL,
  `codeProduct` varchar(255) NOT NULL,
  `qty` int(100) NOT NULL,
  `priceProduct` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `salesdetail`
--

INSERT INTO `salesdetail` (`idDetail`, `idSales`, `codeProduct`, `qty`, `priceProduct`) VALUES
('04fcc255-c827-424e-9296-364ea04fdd83', '7c4595e6-d6b4-453b-a412-998640b85775', 'ea7c6cde-1505-4b07-8ea6-0f5529a64883', 7, 5500),
('0847c774-3201-43fa-bce8-e6e53ffec131', 'aa6f3f9b-ad20-4de9-831e-09d4e6441d66', '88b2c9d1-fb7f-488c-945b-723a1665a149', 17, 7500),
('085f4516-aca0-4cbd-b864-c835c0aa3586', 'ad2d46a1-6579-4e35-a3ba-084965b9984c', 'WD-01-21', 5, 18000),
('087fdf1e-aecb-44bb-bdae-637d4d9b03f8', '8c9c8750-204d-4365-9a9a-1a31b1af6e36', 'WD-01-21', 1, 18000),
('0a94e707-e461-49da-920b-f0267795e1c4', '7c4595e6-d6b4-453b-a412-998640b85775', '7a756fc7-e65f-47f9-8533-ab0899d47297', 2, 13500),
('0cafc85c-c6eb-461f-8691-c8e6e4d60e23', '1f23c68b-973f-4276-8a15-4dc3d3b80666', 'SLY-01-03', 7, 8000),
('17813e96-05ff-4bfa-979c-911ae89810f0', '1b82ceff-626e-442f-aa25-30307a24ef8c', 'MN-09-TS', 5, 9000),
('1d78af1d-d5d2-4654-89d9-5d18937f12c5', 'd642528d-59f3-47a8-8bfc-d619beac1104', 'CHC-123-LO', 5, 9000),
('1f7bcaee-7816-4109-8d33-3895fc671b7b', '52bbc906-00d4-4e16-a629-aa3d0871ca04', 'CH-05-CA', 5, 13000),
('2049a764-edcb-4c5b-93ba-f5f48eb8d453', '387e611b-9f99-42cc-b8eb-7183f92c199d', 'DW-05-KO', 10, 11200),
('21ae889b-7717-4e95-87b4-42a60bb7d67f', 'eba28822-3f38-46a4-9c8f-12b8f5cb7acd', 'MN-09-TS', 1, 9000),
('26969fcd-ba7b-4bdc-a0af-9d60f3733637', '63d40810-bed0-4fba-842d-b0cf54f3d594', '88b2c9d1-fb7f-488c-945b-723a1665a149', 3, 7500),
('26bf65ff-7798-4425-bd42-2ca9bfb753d6', 'b60d1b42-ecfd-4122-880e-b1204245451a', 'CHC-123-LO', 10, 9000),
('2a6e6321-741f-487e-b645-4588f95456c6', '13540d43-42ad-4d13-be8b-11abd14bc399', 'MN-13-01', 5, 5500),
('2a795040-7530-4c9d-a69d-2be8245c32ab', 'ad2d46a1-6579-4e35-a3ba-084965b9984c', 'DW-05-KO', 5, 11200),
('3619f893-54b5-4a70-9520-c2f95e6b9741', '3a4de68c-16c1-4949-a025-d883ace0d9e0', 'DW-05-KO', 7, 11200),
('36c5841f-0da6-4d8a-9064-b252c3dce900', '8ba2c02c-2947-4f65-a9e6-dbb3d1fbe5d8', 'ea7c6cde-1505-4b07-8ea6-0f5529a64883', 12, 5500),
('38eaab3f-e77f-426a-97d3-45c78e31271a', '816b9999-d7ef-411d-ba46-159227e6cdd0', 'DW-05-KO', 5, 11200),
('3f95db92-4173-4a8c-a4e5-d5b06589f130', '9b656c84-06d9-4e2b-b44b-9835f0a64ec5', 'DW-05-KO', 5, 11200),
('4921d9a4-9fef-4c36-8d45-13d8f6a43571', '8fbd04c6-02b0-4f06-8a55-ae5aea1511d7', 'CHC-123-LO', 7, 9000),
('4a8d630a-b1d2-43e3-9577-f2d56847e2fd', 'babd697d-a583-474d-a582-51bede475b19', 'DW-05-KO', 5, 11200),
('576241c5-fdf2-4f52-88d1-a86ad9ea49f3', '3c358431-45c1-451c-8199-fb10e0abae1f', 'CH-05-CA', 5, 13000),
('59594db2-adc4-4b60-a179-e730f958de12', '3a4de68c-16c1-4949-a025-d883ace0d9e0', 'ML-10-LO', 1, 10000),
('5ac1271e-dc9c-41c0-9546-c8b46a3c129c', 'ea11165c-d120-4022-846c-fd81783f7219', 'ML-10-LO', 10, 10000),
('5ad0df3a-2bf3-4f74-b759-25981b6ae073', 'fd2e5355-7301-4d68-9897-6e2a849548db', 'ea7c6cde-1505-4b07-8ea6-0f5529a64883', 9, 5500),
('5f456c10-1eb4-414f-b714-70d1d7e555da', '5948ee6f-9771-4af1-84c0-b8ff55b85456', 'ML-10-LO', 1, 10000),
('5fe22d57-0a92-4bdb-be6a-77ad14f6fc6b', 'f27cd993-3950-471e-82a7-a0b03cf9d3e9', 'SLY-01-03', 4, 8000),
('6147796c-0001-4eba-8fa7-97041852f1b8', '52bbc906-00d4-4e16-a629-aa3d0871ca04', 'MN-09-TS', 5, 9000),
('61b569f7-3195-4e26-b26c-25ae49c4bac3', 'bcdf9737-18e6-456c-8a06-232528b4f6f9', 'CH-05-CA', 5, 13000),
('647de392-c371-403f-ab87-629c1a2ae0c8', '1f23c68b-973f-4276-8a15-4dc3d3b80666', 'CHC-123-LO', 5, 9000),
('6649f950-b40a-4ada-9cca-90a65ac00957', '5948ee6f-9771-4af1-84c0-b8ff55b85456', 'DW-05-KO', 5, 11200),
('6a80f68d-6a3a-41e3-9c6d-e8b77a8b1e84', 'f0620ef0-e3da-4b11-8af1-e8555fa62258', '7a756fc7-e65f-47f9-8533-ab0899d47297', 18, 13500),
('6cd384a9-4abc-48d4-811f-9f8708749903', '3c358431-45c1-451c-8199-fb10e0abae1f', 'dffd0a5a-0d87-46ab-b8ce-8e920a7b5a1a', 7, 9000),
('6f812e23-9a5d-416c-9dff-7bb269c1ce83', 'c291919b-c4f4-48f0-8f3e-08e575a43e3b', 'WD-01-21', 21, 18000),
('70094902-78f7-469a-8fab-88db215b0e4c', 'bcdf9737-18e6-456c-8a06-232528b4f6f9', 'ea7c6cde-1505-4b07-8ea6-0f5529a64883', 8, 5500),
('718722c9-91bf-40ae-bbff-b75294b06dda', 'babd697d-a583-474d-a582-51bede475b19', 'MN-13-01', 10, 5500),
('73e6925f-f0f4-4e8b-9ecd-73785f56f885', '8827d5b9-2b39-4e36-a227-36b5f6a63149', 'ea7c6cde-1505-4b07-8ea6-0f5529a64883', 3, 5500),
('76b01207-ce5b-4bbd-81c1-85654e731d05', '7b8906a3-7358-4d81-ab96-d8e8ab370d61', 'MN-13-01', 11, 5500),
('7b390d23-fd98-47b9-8dfe-05d7e80c43e3', 'f96b33d5-479c-461d-8a87-c80c00e742fb', 'MN-13-01', 9, 5500),
('7c16d0e7-3631-418e-ad5c-3581ca4ce832', 'b0661609-3485-466d-af73-7b20ad4bb185', 'WD-01-21', 10, 18000),
('8006f66f-fd81-4680-908e-4214b47721ae', 'd2fb3ddd-de23-4e28-b09a-81830acad4b5', 'WD-01-21', 2, 18000),
('836d672e-5b9b-46fc-b405-391c2d962bc4', '387e611b-9f99-42cc-b8eb-7183f92c199d', 'MN-13-01', 8, 5500),
('83eb6813-ca10-4559-89d1-0d694043071f', 'ad2d46a1-6579-4e35-a3ba-084965b9984c', 'CHC-123-LO', 5, 9000),
('87b54f4f-973a-4ee8-b490-5c657d7792ff', '8fbd04c6-02b0-4f06-8a55-ae5aea1511d7', 'WD-01-21', 3, 18000),
('8bdcbeef-0c69-4df5-aa65-c3b3d8563182', 'eba28822-3f38-46a4-9c8f-12b8f5cb7acd', 'DW-05-KO', 2, 11200),
('8da32505-c80b-407c-9f63-b51ea98051ca', '8827d5b9-2b39-4e36-a227-36b5f6a63149', 'dffd0a5a-0d87-46ab-b8ce-8e920a7b5a1a', 5, 9000),
('8dc363b4-283c-4c88-ade5-09da6636476c', '5fdb6f16-c4aa-459a-a8bf-2f363441895f', 'CHC-123-LO', 3, 9000),
('9311edff-312e-4482-83fd-f46d9e245c46', '8ba2c02c-2947-4f65-a9e6-dbb3d1fbe5d8', 'MN-09-TS', 5, 9000),
('95235d45-2203-4c61-9ed6-51aa5f4c5947', 'f4dcd2d6-3395-4647-962f-7d3587b5e37e', 'ML-10-LO', 10, 10000),
('95c0e002-c5fd-46a4-a43f-312e5c134d7f', '1f23c68b-973f-4276-8a15-4dc3d3b80666', 'CH-05-CA', 4, 13000),
('960315c0-ec1f-4751-ab54-1aa480197d48', '0e632cd1-d423-4bc3-b09c-619b4267c959', 'CHC-123-LO', 10, 9000),
('9623ade3-37f6-4254-b6d8-0f03e73bafc2', '816b9999-d7ef-411d-ba46-159227e6cdd0', 'MN-13-01', 10, 5500),
('97f81efd-d991-46c6-8555-1769c1e1ba1c', 'ea11165c-d120-4022-846c-fd81783f7219', 'SLY-01-03', 10, 8000),
('9af72480-6460-4fdd-b7fb-75f5c6b54ea8', 'b0661609-3485-466d-af73-7b20ad4bb185', 'DW-05-KO', 10, 11200),
('9e111688-1751-4c4b-9224-d5a9cedd0685', '9b656c84-06d9-4e2b-b44b-9835f0a64ec5', 'SLY-01-03', 9, 8000),
('a64470d3-f30f-40d9-a57d-026133f46a6c', 'babd697d-a583-474d-a582-51bede475b19', 'ML-10-LO', 5, 10000),
('aa033f63-89bf-418a-a683-6b311e5c2e17', 'ad2d46a1-6579-4e35-a3ba-084965b9984c', 'CH-05-CA', 3, 13000),
('ac44524f-5041-4c3b-b7f1-25723d5dd036', '3a4de68c-16c1-4949-a025-d883ace0d9e0', 'CH-05-CA', 15, 13000),
('ad4264d2-22cd-4eb2-a78a-b32240769b0f', 'd2fb3ddd-de23-4e28-b09a-81830acad4b5', 'CHC-123-LO', 5, 9000),
('adec8602-2d33-4947-8468-a60aafcad5e9', '23596702-7343-41f5-ad9d-10960eb50830', 'ML-10-LO', 15, 10000),
('b509a14c-66eb-4470-91d1-98e378a163b8', '63d40810-bed0-4fba-842d-b0cf54f3d594', 'MN-13-01', 13, 5500),
('bf9239ee-39c0-4aee-8ce8-9af887a9c9f1', 'f4dcd2d6-3395-4647-962f-7d3587b5e37e', 'MN-13-01', 10, 5500),
('d45d4c56-3e1e-4c8f-bf75-d9430d35d99d', 'f27cd993-3950-471e-82a7-a0b03cf9d3e9', 'MN-09-TS', 9, 9000),
('d63b503a-12c7-416f-8a23-dc3d500725e6', 'f27cd993-3950-471e-82a7-a0b03cf9d3e9', 'DW-05-KO', 10, 11200),
('d6cc3572-0948-4b42-945a-57a12a6dbefb', 'c291919b-c4f4-48f0-8f3e-08e575a43e3b', 'CHC-123-LO', 20, 9000),
('dd44cba1-9b68-4dd0-9a6d-5c556237754b', '087ebb01-e291-4ba2-9b61-094b32a06348', 'DW-05-KO', 5, 11200),
('de4245eb-3b3f-449a-8e92-93937076a754', 'eba28822-3f38-46a4-9c8f-12b8f5cb7acd', 'ML-10-LO', 30, 10000),
('deffdf3a-4852-417f-8ecb-8351a03faa88', '1b82ceff-626e-442f-aa25-30307a24ef8c', 'MN-13-01', 12, 5500),
('e084a6c9-7048-4437-a19f-d9a68aa4c71b', '7b8906a3-7358-4d81-ab96-d8e8ab370d61', 'ML-10-LO', 5, 10000),
('e572e956-8544-4686-8ad2-30bbf3f5b419', 'fd2e5355-7301-4d68-9897-6e2a849548db', 'WD-01-21', 5, 18000),
('e74f8e17-d924-45e7-974f-3b288f8d2e4b', '087ebb01-e291-4ba2-9b61-094b32a06348', 'ML-10-LO', 15, 10000),
('ecda1aff-ef4e-4346-91f4-db7e57695e14', 'c5e3e0f8-db64-46c3-befe-3886f1f7d4a9', 'WD-01-21', 16, 18000),
('edef5a40-47d6-4c9c-b55b-f1f588e65330', 'f96b33d5-479c-461d-8a87-c80c00e742fb', 'CHC-123-LO', 7, 9000),
('f9e2396a-8a97-4a72-9e9a-d9f28df1ad1d', 'ad2d46a1-6579-4e35-a3ba-084965b9984c', 'SLY-01-03', 5, 8000),
('fb48c3ca-88f4-44ed-9b2e-acaef6a032c8', '63d40810-bed0-4fba-842d-b0cf54f3d594', 'ea7c6cde-1505-4b07-8ea6-0f5529a64883', 3, 5500),
('ff1f2789-5b74-45b8-bd12-3afaf11081bb', 'd45595cd-32cf-44ef-a5de-a7f8d2168e26', '88b2c9d1-fb7f-488c-945b-723a1665a149', 10, 7500);

--
-- Trigger `salesdetail`
--
DELIMITER $$
CREATE TRIGGER `delete_stock` AFTER DELETE ON `salesdetail` FOR EACH ROW BEGIN

UPDATE product SET stock= stock+OLD.qty WHERE code= OLD.codeProduct;

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_stock` AFTER INSERT ON `salesdetail` FOR EACH ROW BEGIN

UPDATE product SET stock=stock-NEW.qty WHERE code=NEW.codeProduct;

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(8) NOT NULL,
  `password` varchar(6) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `name`, `username`, `password`, `email`, `phone`) VALUES
('2845ae58-bb39-4e01-bff6-3030b99ab30a', 'silo', 'silomilo', 'Admin1', 'silo@milo.com', '081879083111'),
('79c1fbf2-970f-4e92-9039-01ee02c13e5b', 'lili', 'lili12', 'Bibah1', 'lili@gmail.com', '085860032048');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`code`),
  ADD KEY `code` (`code`);

--
-- Indeks untuk tabel `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`idSales`),
  ADD KEY `distributor` (`distributor`),
  ADD KEY `idSales` (`idSales`),
  ADD KEY `distributor_2` (`distributor`),
  ADD KEY `idSales_2` (`idSales`),
  ADD KEY `idSales_3` (`idSales`);

--
-- Indeks untuk tabel `salesdetail`
--
ALTER TABLE `salesdetail`
  ADD PRIMARY KEY (`idDetail`),
  ADD KEY `codeProduct` (`codeProduct`),
  ADD KEY `idSales` (`idSales`),
  ADD KEY `idSales_2` (`idSales`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`distributor`) REFERENCES `user` (`id`);

--
-- Ketidakleluasaan untuk tabel `salesdetail`
--
ALTER TABLE `salesdetail`
  ADD CONSTRAINT `salesdetail_ibfk_1` FOREIGN KEY (`codeProduct`) REFERENCES `product` (`code`),
  ADD CONSTRAINT `salesdetail_ibfk_2` FOREIGN KEY (`idSales`) REFERENCES `sales` (`idSales`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
