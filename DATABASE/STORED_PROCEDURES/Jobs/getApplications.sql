USE JobPortal
GO

CREATE OR ALTER  PROCEDURE GetJobCategory (
    @CategoryID INT
)
AS
BEGIN
    SELECT * FROM Jobs WHERE CategoryID = @CategoryID;
END;




USE JobPortal 
GO


--ApplyForJob
CREATE OR ALTER PROCEDURE ApplyForJob (
    @JobID INT,
    @UserID INT,
    @ApplicationDate DATE,
    @CoverLetter TEXT
)
AS
BEGIN
    INSERT INTO Applications (JobID, UserID, ApplicationDate, Status, CoverLetter)
    VALUES (@JobID, @UserID, @ApplicationDate, 'Applied', @CoverLetter);
END;

USE JobPortal
GO

CREATE OR ALTER PROCEDURE getApplications
AS
BEGIN
SELECT * FROM Applications
END;