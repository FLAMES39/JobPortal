CREATE SCHEMA JobPortal
GO
-- Users Table
CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(255),
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    ProfilePicture VARCHAR(255),
    Resume TEXT,
    Bio TEXT,
	emailSent INT DEFAULT 0
);