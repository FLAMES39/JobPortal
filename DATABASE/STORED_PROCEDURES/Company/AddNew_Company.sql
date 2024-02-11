USE JobPortal
GO


--Add new company
CREATE OR ALTER  PROCEDURE AddNewCompany (
    @Name VARCHAR(255),
    @Description TEXT,
    @Industry VARCHAR(255),
    @Logo VARCHAR(255),
    @ContactInfo VARCHAR(255)
)
AS
BEGIN
    INSERT INTO Companies (Name, Description, Industry, Logo, ContactInfo)
    VALUES (@Name, @Description, @Industry, @Logo, @ContactInfo);
END;