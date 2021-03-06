USE [AdventureQuestDB]
GO
/****** Object:  Table [dbo].[App_Users]    Script Date: 6/30/2020 4:06:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[App_Users](
	[Email_Address] [varchar](max) NOT NULL,
	[Password] [varchar](max) NOT NULL,
	[Doctor_ID] [int] NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Patient_Records]    Script Date: 6/30/2020 4:06:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Patient_Records](
	[Patient_Number] [int] IDENTITY(1,1) NOT NULL,
	[Doctor_ID] [int] NULL,
	[First_Name] [varchar](50) NOT NULL,
	[Middle_Name] [nvarchar](50) NULL,
	[Last_Name] [varchar](50) NOT NULL,
	[Email_Address] [varchar](max) NOT NULL,
	[Home_Number] [varchar](50) NOT NULL,
	[Work_Number] [varchar](50) NULL,
	[Medication] [varchar](max) NULL,
	[Notes] [varchar](max) NULL,
	[Quest_List] [varchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Quests]    Script Date: 6/30/2020 4:06:38 PM ******/
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
/****** Object:  Table [dbo].[Users_Medical]    Script Date: 6/30/2020 4:06:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users_Medical](
	[Doctor_ID] [int] IDENTITY(1,1) NOT NULL,
	[First_Name] [varchar](50) NOT NULL,
	[Last_Name] [varchar](50) NOT NULL,
	[Doctor_Email_Address] [varchar](max) NOT NULL,
	[Contact] [varchar](50) NULL,
	[Moderator] [varchar](50) NOT NULL,
	[Username] [varchar](max) NOT NULL,
	[Password] [varchar](max) NOT NULL,
	[Organization] [varchar](max) NULL,
	[P_List] [varchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[App_Users] ([Email_Address], [Password], [Doctor_ID]) VALUES (N'castle.F@mail.com', N'123456', 6)
INSERT [dbo].[App_Users] ([Email_Address], [Password], [Doctor_ID]) VALUES (N'dewayne.cameron76@gmail.com', N'456321', 6)
INSERT [dbo].[App_Users] ([Email_Address], [Password], [Doctor_ID]) VALUES (N'jDoe@mail.com', N'123456', 6)
INSERT [dbo].[App_Users] ([Email_Address], [Password], [Doctor_ID]) VALUES (N'mcfly@mail.com', N'123456', 6)
INSERT [dbo].[App_Users] ([Email_Address], [Password], [Doctor_ID]) VALUES (N'mouse@mail.com', N'123456', 6)
GO
SET IDENTITY_INSERT [dbo].[Patient_Records] ON 

INSERT [dbo].[Patient_Records] ([Patient_Number], [Doctor_ID], [First_Name], [Middle_Name], [Last_Name], [Email_Address], [Home_Number], [Work_Number], [Medication], [Notes], [Quest_List]) VALUES (1, NULL, N'John', N'n/a', N'Doe', N'jDoe@mail.com', N'1112223333', N'1113332222', N'None', N'Social Disorder', NULL)
INSERT [dbo].[Patient_Records] ([Patient_Number], [Doctor_ID], [First_Name], [Middle_Name], [Last_Name], [Email_Address], [Home_Number], [Work_Number], [Medication], [Notes], [Quest_List]) VALUES (2, 6, N'FRANK', NULL, N'CASTLE', N'castle.F@mail.com', N'45678', N'456872', N'None', N'None', NULL)
INSERT [dbo].[Patient_Records] ([Patient_Number], [Doctor_ID], [First_Name], [Middle_Name], [Last_Name], [Email_Address], [Home_Number], [Work_Number], [Medication], [Notes], [Quest_List]) VALUES (3, 6, N'Dewayne', N'N/A', N'Cameron', N'dewayne.cameron76@gmail.com', N'7069412124', N'7068281915', N'None', N'TBI, PTSD Anxiety Disorder\r\n\rPatient was injured in Iraq in 2007 suffered a brain injury, has touble sleeping and being out in public.', NULL)
INSERT [dbo].[Patient_Records] ([Patient_Number], [Doctor_ID], [First_Name], [Middle_Name], [Last_Name], [Email_Address], [Home_Number], [Work_Number], [Medication], [Notes], [Quest_List]) VALUES (4, 6, N'John', N'n/a', N'Doe', N'jDoe@mail.com', N'1112223333', N'1113332222', N'None', N'None', NULL)
INSERT [dbo].[Patient_Records] ([Patient_Number], [Doctor_ID], [First_Name], [Middle_Name], [Last_Name], [Email_Address], [Home_Number], [Work_Number], [Medication], [Notes], [Quest_List]) VALUES (5, 6, N'Marty', N'James', N'McFly', N'mcfly@mail.com', N'1112224567', N'1236541234', N'none', N'Lorem ipsum dolor sit amet, consectetuer adipiscing', N'Outside Again,Going to Wal-Mart,')
INSERT [dbo].[Patient_Records] ([Patient_Number], [Doctor_ID], [First_Name], [Middle_Name], [Last_Name], [Email_Address], [Home_Number], [Work_Number], [Medication], [Notes], [Quest_List]) VALUES (6, 6, N'Mickey', N'Mouse', N'The', N'mouse@mail.com', N'1112224567', N'1236541234', N'none', N'Lorem ipsum dolor sit amet, consectetuer adipiscing', N'Sunlight,')
SET IDENTITY_INSERT [dbo].[Patient_Records] OFF
GO
INSERT [dbo].[Quests] ([Doctor_ID], [Patient_Number], [Quest_Additional_Items], [Quest_Description], [Quest_Difficulty], [Quest_LocationLat], [Quest_LocationLong], [Quest_Name], [Quest_Objectives], [Quest_Reward], [Quest_Status], [Quest_Type]) VALUES (N'6', 3, N'None', N'Go to Walmart at 1030 AM today and walk the electronics area. Take a picture of yourself and at least one item', N'Hard', CAST(33 AS Decimal(18, 0)), CAST(-82 AS Decimal(18, 0)), N'Go to the Store', N'Gain confidence in being in public', CAST(50 AS Decimal(18, 0)), N'InActive', N'Weekly Quests')
INSERT [dbo].[Quests] ([Doctor_ID], [Patient_Number], [Quest_Additional_Items], [Quest_Description], [Quest_Difficulty], [Quest_LocationLat], [Quest_LocationLong], [Quest_Name], [Quest_Objectives], [Quest_Reward], [Quest_Status], [Quest_Type]) VALUES (N'6', 3, N'Pen & Paper', N'Your dream journal is a safe place for your to record moments that your replay at night in your dreams', N'Easy', CAST(33 AS Decimal(18, 0)), CAST(-82 AS Decimal(18, 0)), N'Journal It', N'Help identify key moments that trigger high anxiety moments', CAST(15 AS Decimal(18, 0)), N'InActive', N'Daily Quests')
INSERT [dbo].[Quests] ([Doctor_ID], [Patient_Number], [Quest_Additional_Items], [Quest_Description], [Quest_Difficulty], [Quest_LocationLat], [Quest_LocationLong], [Quest_Name], [Quest_Objectives], [Quest_Reward], [Quest_Status], [Quest_Type]) VALUES (N'6', 3, N'none', N'Staying inside is ok, but getting out of your house and just learning to enjoy the outdoors is fun. Take a friend along or your wife', N'Normal', CAST(33 AS Decimal(18, 0)), CAST(-82 AS Decimal(18, 0)), N'Walking is good!!!', N'Exercise your body and get out of the house', CAST(10 AS Decimal(18, 0)), N'InActive', N'Weekly Quests')
INSERT [dbo].[Quests] ([Doctor_ID], [Patient_Number], [Quest_Additional_Items], [Quest_Description], [Quest_Difficulty], [Quest_LocationLat], [Quest_LocationLong], [Quest_Name], [Quest_Objectives], [Quest_Reward], [Quest_Status], [Quest_Type]) VALUES (N'6', 4, N'None', N'Go to your doctors office be on time and keep the appointment', N'Easy', CAST(33 AS Decimal(18, 0)), CAST(-82 AS Decimal(18, 0)), N'Visit with your Doctor', N'Keep Appointment', CAST(50 AS Decimal(18, 0)), N'Active', N'Monthly Quests')
INSERT [dbo].[Quests] ([Doctor_ID], [Patient_Number], [Quest_Additional_Items], [Quest_Description], [Quest_Difficulty], [Quest_LocationLat], [Quest_LocationLong], [Quest_Name], [Quest_Objectives], [Quest_Reward], [Quest_Status], [Quest_Type]) VALUES (N'6', 5, N'SOME STUFF', N'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque', N'Easy', CAST(33 AS Decimal(18, 0)), CAST(-82 AS Decimal(18, 0)), N'Going to Wal-Mart', N'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque', CAST(10 AS Decimal(18, 0)), N'Active', N'Daily Quests')
INSERT [dbo].[Quests] ([Doctor_ID], [Patient_Number], [Quest_Additional_Items], [Quest_Description], [Quest_Difficulty], [Quest_LocationLat], [Quest_LocationLong], [Quest_Name], [Quest_Objectives], [Quest_Reward], [Quest_Status], [Quest_Type]) VALUES (N'6', 5, N'Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet ', N'Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,', N'East', CAST(33 AS Decimal(18, 0)), CAST(-82 AS Decimal(18, 0)), N'Outside Again', N'Maecenas tempus, tellus eget condimentum rhoncus, sem quam', CAST(10 AS Decimal(18, 0)), N'Active', N'Daily Quests')
INSERT [dbo].[Quests] ([Doctor_ID], [Patient_Number], [Quest_Additional_Items], [Quest_Description], [Quest_Difficulty], [Quest_LocationLat], [Quest_LocationLong], [Quest_Name], [Quest_Objectives], [Quest_Reward], [Quest_Status], [Quest_Type]) VALUES (N'6', 6, N'Some Stuff', N'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque', N'Easy', CAST(33 AS Decimal(18, 0)), CAST(-82 AS Decimal(18, 0)), N'Going to Wal-Mart', N'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque', CAST(10 AS Decimal(18, 0)), N'InActive', N'Daily Quests')
INSERT [dbo].[Quests] ([Doctor_ID], [Patient_Number], [Quest_Additional_Items], [Quest_Description], [Quest_Difficulty], [Quest_LocationLat], [Quest_LocationLong], [Quest_Name], [Quest_Objectives], [Quest_Reward], [Quest_Status], [Quest_Type]) VALUES (N'6', 6, N'Yes you need stuff', N'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque', N'Easy', CAST(33 AS Decimal(18, 0)), CAST(-82 AS Decimal(18, 0)), N'Sunlight', N'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque', CAST(50 AS Decimal(18, 0)), N'Active', N'Weekly Quests')
GO
SET IDENTITY_INSERT [dbo].[Users_Medical] ON 

INSERT [dbo].[Users_Medical] ([Doctor_ID], [First_Name], [Last_Name], [Doctor_Email_Address], [Contact], [Moderator], [Username], [Password], [Organization], [P_List]) VALUES (4, N'Dewayne', N'Cameron', N'me@mail.com', NULL, N'true', N'dcameron1', N'123456', N'GruntGames LLC', NULL)
INSERT [dbo].[Users_Medical] ([Doctor_ID], [First_Name], [Last_Name], [Doctor_Email_Address], [Contact], [Moderator], [Username], [Password], [Organization], [P_List]) VALUES (6, N'Johnny', N'Bravo', N'jbravo221@mail.com', NULL, N'true', N'jBravo221', N'123456', N'Happy Therapy', N'mcfly@mailcom*mouse@mailcom*dewaynecameron76@gmailcom*castleF@mailcom*jDoe@mailcom*')
SET IDENTITY_INSERT [dbo].[Users_Medical] OFF
GO
