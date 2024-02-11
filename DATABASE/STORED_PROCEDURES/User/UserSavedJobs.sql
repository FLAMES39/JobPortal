USE JobPortal
GO


--List Saved Jobs
CREATE OR ALTER PROCEDURE ListSavedJobsForUser (
    @UserID INT
)
AS
BEGIN
    SELECT j.*
    FROM SavedJobs s
    JOIN Jobs j ON s.JobID = j.JobID
    WHERE s.UserID = @UserID;
END;