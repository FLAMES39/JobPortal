USE JobPortal
GO

-- Jobs Table
CREATE TABLE Jobs (
    JobID INT IDENTITY(1,1) PRIMARY KEY ,
    CompanyID INT,
    CategoryID INT,
    Title VARCHAR(255),
    Description TEXT,
    Location VARCHAR(255),
    SalaryRange VARCHAR(255),
    Type VARCHAR(100),
    PostedDate DATE,
    ExpiryDate DATE,
    FOREIGN KEY (CompanyID) REFERENCES Companies(CompanyID),
    FOREIGN KEY (CategoryID) REFERENCES JobCategories(CategoryID)
);