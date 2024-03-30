USE JobPortal
GO


CREATE OR ALTER PROCEDURE insertApplication
    @JobID INT,
    @UserID  INT ,
    @ResumePath VARCHAR(MAX),
    @Name VARCHAR(255),
    @Email VARCHAR(255),
    @ContactInfo VARCHAR(255),
    @Status VARCHAR(100)
AS
BEGIN
    INSERT INTO Applications (JobID,  UserID, ResumePath, Name, Email, ContactInfo, Status)
    VALUES (@JobID, @UserID, @ResumePath, @Name, @Email, @ContactInfo, @Status)
    
    -- Return the ID of the newly inserted application
    SELECT SCOPE_IDENTITY() AS ApplicationID;
END