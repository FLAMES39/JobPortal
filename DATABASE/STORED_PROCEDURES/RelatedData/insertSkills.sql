USE JobPortal
GO


CREATE PROCEDURE InsertSkill
    @ApplicationID INT,
    @Skill NVARCHAR(255)
AS
BEGIN
    INSERT INTO Skills (ApplicationID, Skill)
    VALUES (@ApplicationID, @Skill);
END;
