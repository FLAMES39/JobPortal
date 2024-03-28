
USE JobPortal
GO

CREATE TABLE EmploymentHistory (
    EmploymentID INT IDENTITY(1,1) PRIMARY KEY,
    ApplicationID INT,
    CompanyName VARCHAR(255),
    JobTitle VARCHAR(255),
    Responsibilities TEXT,
    ReasonForLeaving TEXT,
    FOREIGN KEY (ApplicationID) REFERENCES Applications(ApplicationID)
);
