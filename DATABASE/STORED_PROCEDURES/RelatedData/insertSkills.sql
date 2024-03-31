USE JobPortal
GO


CREATE OR ALTER PROCEDURE InsertSkill
    @ApplicationID INT,
    @Skills VARCHAR(255)
AS
BEGIN
    INSERT INTO Skills (ApplicationID, Skills)
    VALUES (@ApplicationID, @Skills);
END;