USE JobPortal
GO

CREATE TABLE Skills (
    SkillID INT IDENTITY(1,1) PRIMARY KEY,
    ApplicationID INT,
    Skills VARCHAR(255),
    FOREIGN KEY (ApplicationID) REFERENCES Applications(ApplicationID)
);
