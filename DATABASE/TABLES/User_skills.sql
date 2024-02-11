USE JobPortal
GO


-- UserSkills Table
CREATE TABLE UserSkills (
    SkillID INT ,
    UserID INT,
    SkillName VARCHAR(255),
    Proficiency VARCHAR(100),
    PRIMARY KEY (SkillID, UserID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
