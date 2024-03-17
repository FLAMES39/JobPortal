USE JobPortal 
GO

--CreateJobPosting
CREATE OR ALTER PROCEDURE CreateJobPosting (
    @Title VARCHAR(255),
    @Description TEXT,
    @Location VARCHAR(255),
    @SalaryRange VARCHAR(255),
    @Type VARCHAR(100),
    @PostedDate DATE,
    @ExpiryDate DATE
)
AS
BEGIN
    INSERT INTO Jobs ( Title, Description, Location, SalaryRange, Type, PostedDate, ExpiryDate)
    VALUES (@Title, @Description, @Location, @SalaryRange, @Type, @PostedDate, @ExpiryDate);
END;