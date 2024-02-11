USE JobPortal 
GO


--Update Application Status
CREATE OR ALTER PROCEDURE UpdateApplicationStatus (
    @ApplicationID INT,
    @Status VARCHAR(100)
)
AS
BEGIN
    UPDATE Applications
    SET Status = @Status
    WHERE ApplicationID = @ApplicationID;
END;