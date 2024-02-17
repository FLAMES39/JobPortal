USE JobPortal 
GO


--DeleteJobApplication
CREATE OR ALTER PROCEDURE DeleteJobApplication (
	@ApplicationID INT
)
AS
BEGIN
    DELETE FROM Applications WHERE ApplicationID = @ApplicationID;
END;