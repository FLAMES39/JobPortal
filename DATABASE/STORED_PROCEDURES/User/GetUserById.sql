USE JobPortal 
GO

--GETUSERBYID
CREATE OR ALTER PROCEDURE GetUserByID(@UserID INT)
AS
BEGIN
    SELECT * FROM Users WHERE @UserID = UserID;
END