USE JobPortal 
GO

--REGISTER USER
CREATE OR ALTER PROCEDURE RegisterUser(
    @Name VARCHAR(255),
    @Email VARCHAR(255),
    @Password VARCHAR(255)
)
AS
BEGIN
    INSERT INTO Users (Name, Email, Password)
    VALUES (@Name, @Email, @Password)
END 