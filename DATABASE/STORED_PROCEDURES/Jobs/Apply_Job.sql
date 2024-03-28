USE JobPortal 
GO


CREATE OR ALTER PROCEDURE insertApplication
    @JobID INT,
    @CoverLetter VARCHAR(MAX),
    @ResumePath VARCHAR(MAX),
    @Name VARCHAR(255),
    @Email VARCHAR(255),
    @ContactInfo VARCHAR(255),
    @ApplicationDate DATE,
    @Status VARCHAR(100)
AS
BEGIN
    INSERT INTO Applications (JobID,  ResumePath, Name, Email, ContactInfo, ApplicationDate, Status,CoverLetter)
    VALUES (@JobID, @CoverLetter, @ResumePath, @Name, @Email, @ContactInfo, @ApplicationDate, @Status)
    
    -- Return the ID of the newly inserted application
    SELECT SCOPE_IDENTITY() AS ApplicationID;
END