USE JobPortal
GO


--Procedure for users to save jobs they are interested in
--SAVED JOBS
CREATE OR ALTER  PROCEDURE SaveJobForUser (
    @UserID INT,
    @JobID INT
)
AS
BEGIN
    INSERT INTO SavedJobs (UserID, JobID)
    VALUES (@UserID, @JobID);
END;