USE JobPortal
GO

-- Applications Table
CREATE TABLE Applications (
    ApplicationID INT IDENTITY(1,1) PRIMARY KEY ,
    JobID INT,
    UserID INT,
    ApplicationDate DATE,
    Status VARCHAR(100),
    CoverLetter TEXT,
    FOREIGN KEY (JobID) REFERENCES Jobs(JobID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
