USE JobPortal
GO


--gET COMPANY BY Name
CREATE OR ALTER PROCEDURE GetCompanyByName (
    @Name INT
)
AS
BEGIN
    SELECT * FROM Companies WHERE Name = @Name
END;