USE JobPortal
GO
-- Companies Table
CREATE TABLE Companies (
    CompanyID INT IDENTITY(1,1) PRIMARY KEY ,
    Name VARCHAR(255),
    Description TEXT,
    Industry VARCHAR(255),
    Logo VARCHAR(255),
    ContactInfo VARCHAR(255),
    role VARCHAR(100) DEFAULT 'Company',
	Email  VARCHAR (100) UNIQUE,
	Password  VARCHAR (100) 

);