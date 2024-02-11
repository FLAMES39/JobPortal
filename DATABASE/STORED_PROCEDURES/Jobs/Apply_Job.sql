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
    VALUES (@JobID, @UserID, @ApplicationDate, 'applied', @CoverLetter);
END;