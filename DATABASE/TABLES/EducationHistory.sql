USE JobPortal
GO


CREATE TABLE EducationHistory (
    EducationID INT IDENTITY(1,1) PRIMARY KEY,
    ApplicationID INT,
    Institution VARCHAR(255),
    Degree VARCHAR(255),
    FieldOfStudy VARCHAR(255),
    FOREIGN KEY (ApplicationID) REFERENCES Applications(ApplicationID)
);
