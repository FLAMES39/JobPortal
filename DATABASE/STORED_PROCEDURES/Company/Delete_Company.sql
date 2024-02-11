USE JobPortal
GO


--DELETE COPMANY
CREATE OR ALTER PROCEDURE DeleteCompany (
    @CompanyID INT
)
AS
BEGIN
    DELETE FROM Companies WHERE CompanyID = @CompanyID;
END;
