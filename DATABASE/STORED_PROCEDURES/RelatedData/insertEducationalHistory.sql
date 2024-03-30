
USE JobPortal
GO
CREATE OR ALTER PROCEDURE InsertEducationHistory
    @ApplicationID INT,
    @Institution NVARCHAR(255),
    @Degree NVARCHAR(255),
    @FieldOfStudy NVARCHAR(255)
AS
BEGIN
    INSERT INTO EducationHistory (ApplicationID, Institution, Degree, FieldOfStudy)
    VALUES (@ApplicationID, @Institution, @Degree, @FieldOfStudy);
END;
