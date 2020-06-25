USE [master]
GO
/****** Object:  Database [AdventureQuestDB]    Script Date: 6/25/2020 2:39:44 PM ******/
CREATE DATABASE [AdventureQuestDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'AdventureQuestDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\AdventureQuestDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'AdventureQuestDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\AdventureQuestDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [AdventureQuestDB] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [AdventureQuestDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [AdventureQuestDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [AdventureQuestDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [AdventureQuestDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [AdventureQuestDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [AdventureQuestDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [AdventureQuestDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [AdventureQuestDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [AdventureQuestDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [AdventureQuestDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [AdventureQuestDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [AdventureQuestDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [AdventureQuestDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [AdventureQuestDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [AdventureQuestDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [AdventureQuestDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [AdventureQuestDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [AdventureQuestDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [AdventureQuestDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [AdventureQuestDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [AdventureQuestDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [AdventureQuestDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [AdventureQuestDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [AdventureQuestDB] SET RECOVERY FULL 
GO
ALTER DATABASE [AdventureQuestDB] SET  MULTI_USER 
GO
ALTER DATABASE [AdventureQuestDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [AdventureQuestDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [AdventureQuestDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [AdventureQuestDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [AdventureQuestDB] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'AdventureQuestDB', N'ON'
GO
ALTER DATABASE [AdventureQuestDB] SET QUERY_STORE = OFF
GO
USE [AdventureQuestDB]
GO
/****** Object:  Table [dbo].[App_Users]    Script Date: 6/25/2020 2:39:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[App_Users](
	[Email_Address] [varchar](max) NOT NULL,
	[Password] [varchar](max) NOT NULL,
	[Doctor_ID] [varchar](50) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Patient_Records]    Script Date: 6/25/2020 2:39:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Patient_Records](
	[Patient_Number] [int] NOT NULL,
	[First_Name] [varchar](50) NOT NULL,
	[Home_Number] [int] NOT NULL,
	[Last_Name] [varchar](50) NOT NULL,
	[Medication] [varchar](max) NULL,
	[Middle_Name] [nvarchar](50) NULL,
	[Notes] [varchar](max) NULL,
	[Email_Address] [varchar](max) NOT NULL,
	[Quest_List] [varchar](max) NULL,
	[Work_Number] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Quests]    Script Date: 6/25/2020 2:39:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Quests](
	[Doctor_ID] [varchar](50) NOT NULL,
	[Patient_Number] [int] NOT NULL,
	[Quest_Additional_Items] [varchar](max) NULL,
	[Quest_Description] [varchar](max) NOT NULL,
	[Quest_Difficulty] [varchar](50) NOT NULL,
	[Quest_LocationLat] [decimal](18, 0) NOT NULL,
	[Quest_LocationLong] [decimal](18, 0) NOT NULL,
	[Quest_Name] [varchar](50) NOT NULL,
	[Quest_Objectives] [varchar](max) NOT NULL,
	[Quest_Reward] [decimal](18, 0) NOT NULL,
	[Quest_Status] [varchar](50) NOT NULL,
	[Quest_Type] [varchar](50) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users_Medical]    Script Date: 6/25/2020 2:39:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users_Medical](
	[Doctor_ID] [varchar](50) NOT NULL,
	[Contact] [varchar](50) NOT NULL,
	[Doctor_Email_Address] [varchar](max) NOT NULL,
	[First_Name] [varchar](50) NOT NULL,
	[Last_Name] [varchar](50) NOT NULL,
	[Moderator] [varchar](50) NOT NULL,
	[Organization] [varchar](max) NULL,
	[P_List] [varchar](max) NULL,
	[Password] [varchar](max) NOT NULL,
	[Username] [varchar](max) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [AdventureQuestDB] SET  READ_WRITE 
GO
