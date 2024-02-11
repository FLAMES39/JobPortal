USE JobPortal
GO


--List Job Applications for a Job
--Retrieve all applications for a specific job, useful for employers to see who has applied
CREATE OR ALTER PROCEDURE ListApplicationsForJob (
    @JobID INT
)
AS
BEGIN
    SELECT a.*, u.Name, u.Email
    FROM Applications a
    JOIN Users u ON a.UserID = u.UserID
    WHERE a.JobID = @JobID;
END;