USE JobPortal
GO


-- List Job Applications for a User
--Retrieve all jobs a user has applied for, useful for job seekers to track their applications.
CREATE OR ALTER PROCEDURE ListApplicationsForUser (
    @UserID INT
)
AS
BEGIN
    SELECT a.*, j.Title, j.Location, j.Type
    FROM Applications a
    JOIN Jobs j ON a.JobID = j.JobID
    WHERE a.UserID = @UserID;
END;