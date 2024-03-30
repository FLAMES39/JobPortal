USE JobPortal
GO

CREATE  OR ALTER PROCEDURE InsertEmploymentHistory
    @ApplicationID INT,
    @CompanyName VARCHAR(255),
    @JobTitle VARCHAR(255),
    @Responsibilities VARCHAR(MAX),
    @ReasonForLeaving VARCHAR(MAX) 
AS
BEGIN
    -- Inserting a new record into the EmploymentHistory table
    INSERT INTO EmploymentHistory (ApplicationID, CompanyName, JobTitle, Responsibilities, ReasonForLeaving)
    VALUES (@ApplicationID, @CompanyName, @JobTitle, @Responsibilities, @ReasonForLeaving);
END;
