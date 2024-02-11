USE JobPortal
GO


--gET COMPANY BY ID
CREATE OR ALTER PROCEDURE GetCompanyByID (
    @CompanyID INT
)
AS
BEGIN
    SELECT * FROM Companies WHERE CompanyID = @CompanyID;
END;