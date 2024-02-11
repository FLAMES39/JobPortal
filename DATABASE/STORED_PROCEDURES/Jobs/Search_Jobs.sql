USE JobPortal
GO


--SEARCH JOBS
--A procedure to search for jobs based on various criteria such as keywords, location, category, and type.
CREATE OR ALTER PROCEDURE SearchJobs (
    @Keyword VARCHAR(255),
    @Location VARCHAR(255),
    @CategoryID INT,
    @Type VARCHAR(100)
)
AS
BEGIN
    SELECT * FROM Jobs
    WHERE Title LIKE CONCAT('%', @Keyword, '%')
    OR Description LIKE CONCAT('%', @Keyword, '%')
    AND (Location = @Location OR @Location IS NULL)
    AND (CategoryID = @CategoryID OR @CategoryID IS NULL)
    AND (Type = @Type OR @Type IS NULL);
END;