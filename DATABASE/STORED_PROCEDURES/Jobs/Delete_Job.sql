USE JobPortal 
GO


--DeleteJobPosting
CREATE OR ALTER PROCEDURE DeleteJobPosting (
	@JobID INT
)
AS
BEGIN
    DELETE FROM Jobs WHERE JobID = @JobID;
END;