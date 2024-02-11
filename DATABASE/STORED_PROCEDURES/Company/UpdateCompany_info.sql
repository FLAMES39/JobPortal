USE JobPortal
GO


--Update Compnay details
CREATE OR ALTER PROCEDURE UpdateCompanyInfo (
    @CompanyID INT,
    @Name VARCHAR(255),
    @Description TEXT,
    @Industry VARCHAR(255),
    @Logo VARCHAR(255),
    @ContactInfo VARCHAR(255)
)
AS
BEGIN
    UPDATE Companies
    SET Name = @Name,
        Description =@Description,
        Industry = @Industry,
        Logo = @Logo,
        ContactInfo = @ContactInfo
    WHERE CompanyID = @CompanyID;
END;