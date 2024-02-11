USE Jobportal
GO

-- CompanyReviews Table
CREATE TABLE CompanyReviews (
    ReviewID INT IDENTITY(1,1) PRIMARY KEY ,
    CompanyID INT,
    UserID INT,
    Rating INT,
    Comment TEXT,
    CreatedAt DATE,
    FOREIGN KEY (CompanyID) REFERENCES Companies(CompanyID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);