USE jobPortal 
GO

--GetJobByID
CREATE OR ALTER  PROCEDURE GetJobByID (
    @jobID INT
)
AS
BEGIN
    SELECT * FROM jobs WHERE jobID = @jobID;
END;