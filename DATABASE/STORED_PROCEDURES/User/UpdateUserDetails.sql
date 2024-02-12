USE JobPortal 
GO

--UPDATE USER DETAILS
CREATE OR ALTER PROCEDURE UpdateUserDetails(
    @userID INT,
    @Name VARCHAR(255),
    @password VARCHAR(255),
    @Email VARCHAR(255),
    @ProfilePicture VARCHAR(255),
    @Resume TEXT,
    @Bio TEXT
)
AS
BEGIN
    UPDATE Users
    SET Name = @Name,
        Email = @Email,
        Passsword= @Password,
        ProfilePicture = @ProfilePicture,
        Resume = @Resume,
        Bio = @Bio
    WHERE @UserID = @UserID;
END 