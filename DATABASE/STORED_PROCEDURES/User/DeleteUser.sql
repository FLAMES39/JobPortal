USE JobPortal 
GO


--DeleteJobApplication
CREATE OR ALTER PROCEDURE DeleteUser (
	@UserID INT
)
AS
BEGIN
    DELETE FROM Applications WHERE UserID = @UserID;
END;