USE JobPortal
GO

CREATE OR ALTER  PROCEDURE GetJobCategory (
    @CategoryID INT
)
AS
BEGIN
    SELECT * FROM Jobs WHERE CategoryID = @CategoryID;
END;