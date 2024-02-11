USE JobPortal 
GO

--UpdateJob Posting 
CREATE OR ALTER PROCEDURE UpdateJobPosting (
    @JobID INT,
    @CompanyID INT,
    @CategoryID INT,
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
    UPDATE Jobs
    SET CompanyID = @CompanyID,
        CategoryID = @CategoryID,
        Title = @Title,
        Description = @Description,
        Location = @Location,
        SalaryRange = @SalaryRange,
        Type = @Type,
        PostedDate = @PostedDate,
        ExpiryDate = @ExpiryDate
    WHERE JobID = @JobID;
END;