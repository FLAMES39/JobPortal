USE JobPortal
GO

CREATE OR ALTER PROCEDURE SearchJobs
    @searchJob VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
     
    SELECT *
    FROM Jobs
    WHERE Title LIKE '%' + @searchJob + '%'
        
END